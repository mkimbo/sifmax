"use server";
import {
  parseISO, // More robust for ISO strings than new Date()
  startOfDay,
  addHours,
  addMinutes, // Keep if needed, but not used in main slot loop
  addDays, // Keep if needed, maybe for dayEndUTC calculation alternative
  isWithinInterval, // Keep if needed for alternate checks
  compareAsc,
} from "date-fns";
import { toZonedTime, fromZonedTime } from "date-fns-tz";

// --- Configuration ---
const TARGET_TIMEZONE = "Africa/Dar_es_Salaam"; // EAT (UTC+3)

// --- Helper Types ---
type TimeInterval = {
  start: Date; // Represents UTC time
  end: Date; // Represents UTC time
};

export const getFreeSlots = async ({
  inputDate, // Expecting UTC ISO 8601 string, e.g., "2025-04-05" or "2025-04-05T00:00:00.000Z"
  calendarId,
  serviceName,
  approxDurationMinutes,
}: {
  inputDate: string;
  calendarId: string;
  serviceName: string;
  approxDurationMinutes: number;
}) => {
  // --- 1. Input Validation & Setup ---
  // assert(calendarId, 'calendarId is required.');
  // assert(inputDate, 'inputDate is required.');
  // assert(approxDurationMinutes > 0, 'approxDurationMinutes must be positive.');

  const BUFFER_MINUTES = 30;
  const totalDurationMinutes = approxDurationMinutes + BUFFER_MINUTES;

  // --- 2. Define Time Range for the Query (Full Day in EAT, converted to UTC) ---
  let dayStartUTC: Date;
  let dayEndUTC: Date; // Exclusive end (start of next day in EAT, represented in UTC)

  try {
    // Parse the input UTC ISO string. parseISO is generally safer than new Date() for strings.
    const parsedInputDate = parseISO(inputDate);
    if (isNaN(parsedInputDate.getTime())) {
      throw new Error(
        `Invalid date format: "${inputDate}". Please use UTC ISO 8601 format (e.g., YYYY-MM-DD).`
      );
    }

    // Find the equivalent time in the target timezone (EAT)
    const timeInEAT = toZonedTime(parsedInputDate, TARGET_TIMEZONE);

    // Get the start of that day (00:00:00) in EAT
    const startOfTargetDayInEAT = startOfDay(timeInEAT);

    // Convert the EAT start-of-day back to a UTC Date object for the API query
    dayStartUTC = fromZonedTime(startOfTargetDayInEAT, TARGET_TIMEZONE);

    // Calculate the end of the EAT day (start of the next day) also in UTC
    // Adding 24 hours to the UTC start ensures we cover the full EAT day
    dayEndUTC = new Date(dayStartUTC.getTime() + 24 * 60 * 60 * 1000);
    // Alternative using date-fns (slightly more verbose for this specific case):
    // const startOfNextDayInEAT = addDays(startOfTargetDayInEAT, 1);
    // dayEndUTC = fromZonedTime(startOfNextDayInEAT, TARGET_TIMEZONE);
  } catch (error) {
    console.error("Failed to establish date range:", error);
    return []; // Cannot proceed without a valid date range
  }

  const timeMin = dayStartUTC.toISOString(); // UTC ISO string for API
  const timeMax = dayEndUTC.toISOString(); // UTC ISO string for API

  console.log(
    `Querying Google Calendar from ${timeMin} to ${timeMax} (UTC) for EAT day starting at ${fromZonedTime(
      dayStartUTC,
      TARGET_TIMEZONE
    ).toISOString()}`
  ); // Debug logging

  // --- 3. Fetch Busy Intervals from Google Calendar API (using UTC range) ---
  let busyIntervalsUTC: TimeInterval[] = [];
  try {
    const apiKey = process.env.FREE_BUSY_API_KEY;
    const targetCalendarId = process.env.APPOINTMENT_CALENDAR_ID || calendarId;

    if (!apiKey)
      throw new Error("Missing Google Calendar API Key (FREE_BUSY_API_KEY)");
    if (!targetCalendarId) throw new Error("Missing Calendar ID");

    const res = await fetch(
      `https://www.googleapis.com/calendar/v3/freeBusy?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          timeMin: timeMin,
          timeMax: timeMax,
          items: [{ id: targetCalendarId }],
        }),
      }
    );

    if (!res.ok) {
      const errorBody = await res.text();
      throw new Error(
        `Google Calendar API error: ${res.status} ${res.statusText} - ${errorBody}`
      );
    }

    const response = await res.json();
    const calendarData = response?.calendars?.[targetCalendarId];
    const busyTimes = calendarData?.busy || [];

    busyIntervalsUTC = busyTimes
      .map((busy: { start: string; end: string }) => ({
        start: parseISO(busy.start), // Use parseISO for consistency
        end: parseISO(busy.end),
      }))
      .sort((a: TimeInterval, b: TimeInterval) => compareAsc(a.start, b.start));
  } catch (error) {
    console.error("Error fetching free/busy information:", error);
    return [];
  }

  // --- 4. Calculate Free Gaps (in UTC) ---
  const freeGapsUTC: TimeInterval[] = [];
  let currentPointerUTC = new Date(dayStartUTC); // Start at the calculated UTC start

  busyIntervalsUTC.forEach((busyUTC) => {
    if (compareAsc(busyUTC.start, currentPointerUTC) > 0) {
      freeGapsUTC.push({
        start: new Date(currentPointerUTC),
        end: new Date(busyUTC.start),
      });
    }
    currentPointerUTC =
      compareAsc(currentPointerUTC, busyUTC.end) > 0
        ? currentPointerUTC
        : new Date(busyUTC.end);
  });

  if (compareAsc(dayEndUTC, currentPointerUTC) > 0) {
    freeGapsUTC.push({
      start: new Date(currentPointerUTC),
      end: new Date(dayEndUTC),
    });
  }

  // --- 5. Find Valid Slots within Free Gaps (Considering EAT hours) ---
  const validStartSlotsUTC: string[] = [];
  const totalDurationMillis = totalDurationMinutes * 60 * 1000;

  freeGapsUTC.forEach((gapUTC) => {
    const gapStartUTC = gapUTC.start;
    const gapEndUTC = gapUTC.end;
    const gapDurationMillis = gapEndUTC.getTime() - gapStartUTC.getTime();

    if (gapDurationMillis < totalDurationMillis) {
      return; // Skip gap if too short
    }

    // Find the first potential start time ON THE HOUR in EAT within this UTC gap.
    let potentialStartTimeEAT: Date;

    // Convert UTC gap start to EAT time
    let tempPotentialStartEAT = toZonedTime(gapStartUTC, TARGET_TIMEZONE);

    // Check if it's already on the hour in EAT
    if (
      tempPotentialStartEAT.getMinutes() > 0 ||
      tempPotentialStartEAT.getSeconds() > 0 ||
      tempPotentialStartEAT.getMilliseconds() > 0
    ) {
      // Not on the hour, round up to the next hour IN EAT
      tempPotentialStartEAT.setMinutes(0, 0, 0); // Clear minutes/seconds/ms
      potentialStartTimeEAT = addHours(tempPotentialStartEAT, 1); // Go to next hour
    } else {
      // Already on the hour EAT
      potentialStartTimeEAT = tempPotentialStartEAT;
    }

    // Iterate potential start times (hourly in EAT) within the gap
    while (true) {
      // Convert potential EAT start time back to UTC for calculations/comparisons
      const potentialStartTimeUTC = fromZonedTime(
        potentialStartTimeEAT,
        TARGET_TIMEZONE
      );

      // Ensure the calculated start time hasn't somehow gone *before* the actual gap start
      // (Can happen if rounding up crosses the gap boundary, though less likely with this logic)
      if (compareAsc(potentialStartTimeUTC, gapStartUTC) < 0) {
        console.warn(
          "Potential start time calculation resulted in time before gap start. Skipping ahead."
        );
        potentialStartTimeEAT = addHours(potentialStartTimeEAT, 1); // Move to next EAT hour
        continue;
      }

      // Calculate the potential end time in UTC
      const potentialEndTimeUTC = new Date(
        potentialStartTimeUTC.getTime() + totalDurationMillis
      );

      // Check if the calculated UTC end time fits within the UTC gap
      // Use <= because the gap end is exclusive, but the slot end is inclusive of its time range
      if (compareAsc(potentialEndTimeUTC, gapEndUTC) <= 0) {
        // Valid slot found! Store the UTC start time string
        validStartSlotsUTC.push(potentialStartTimeUTC.toISOString());

        // Move to the next hour IN EAT for the next potential slot
        potentialStartTimeEAT = addHours(potentialStartTimeEAT, 1);
      } else {
        // This slot (and any further slots starting in this EAT hour in this gap) won't fit. Break inner loop.
        break;
      }
    }
  });

  // --- 6. Return the list of valid start times (UTC ISO strings) ---
  return validStartSlotsUTC;
};
// Helper function to get UTC midnight of a given date string
// const getUTCMidnight = (dateStr: string): Date => {
//   const date = new Date(dateStr);
//   // Ensure we are working with UTC to match ISO strings and API behavior
//   date.setUTCFullYear(date.getUTCFullYear());
//   date.setUTCMonth(date.getUTCMonth());
//   date.setUTCDate(date.getUTCDate());
//   date.setUTCHours(0, 0, 0, 0);
//   return date;
// };

// export const getFreeSlots = async ({
//   inputDate,
//   calendarId,
//   serviceName, // Included for context, not used in logic currently
//   approxDurationMinutes,
// }: {
//   inputDate: string;
//   calendarId: string;
//   serviceName: string;
//   approxDurationMinutes: number;
// }) => {
//   // --- 1. Input Validation & Setup ---
//   console.log(calendarId, "calendarId");

//   //   assert(calendarId, "calendarId is required.");
//   //   assert(inputDate, "inputDate is required.");
//   //   assert(approxDurationMinutes > 0, "approxDurationMinutes must be positive.");

//   const BUFFER_MINUTES = 30;
//   const totalDurationMinutes = approxDurationMinutes + BUFFER_MINUTES;

//   // --- 2. Define Time Range for the Query (Full Day in UTC) ---
//   const dayStart = getUTCMidnight(inputDate);
//   const dayEnd = new Date(dayStart);
//   dayEnd.setUTCDate(dayEnd.getUTCDate() + 1); // Move to the start of the next day

//   const timeMin = dayStart.toISOString();
//   const timeMax = dayEnd.toISOString();

//   // --- 3. Fetch Busy Intervals from Google Calendar API ---
//   let busyIntervals: TimeInterval[] = [];
//   try {
//     // Ensure API key and potentially Calendar ID are securely sourced (e.g., env vars)
//     const apiKey = process.env.FREE_BUSY_API_KEY;
//     const targetCalendarId = process.env.APPOINTMENT_CALENDAR_ID || calendarId; // Allow override via env if needed

//     if (!apiKey) {
//       throw new Error("Missing Google Calendar API Key (FREE_BUSY_API_KEY)");
//     }
//     if (!targetCalendarId) {
//       throw new Error(
//         "Missing Calendar ID (APPOINTMENT_CALENDAR_ID or function input)"
//       );
//     }

//     const res = await fetch(
//       `https://www.googleapis.com/calendar/v3/freeBusy?key=${apiKey}`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Accept: "application/json", // Good practice
//         },
//         body: JSON.stringify({
//           timeMin: timeMin,
//           timeMax: timeMax,
//           // Consider making TimeZone configurable or detecting it if needed
//           // Using UTC as standard due to ISO strings, API usually defaults well.
//           // timeZone: "UTC", // Explicitly setting UTC
//           items: [
//             {
//               id: targetCalendarId,
//             },
//           ],
//         }),
//       }
//     );

//     if (!res.ok) {
//       const errorBody = await res.text();
//       throw new Error(
//         `Google Calendar API error: ${res.status} ${res.statusText} - ${errorBody}`
//       );
//     }

//     const response = await res.json();

//     // Check if the specific calendar has data and busy times
//     const calendarData = response?.calendars?.[targetCalendarId];
//     const busyTimes = calendarData?.busy || []; // Default to empty array if no busy times

//     // Convert ISO strings to Date objects and sort
//     busyIntervals = busyTimes
//       .map((busy: { start: string; end: string }) => ({
//         start: new Date(busy.start),
//         end: new Date(busy.end),
//       }))
//       .sort(
//         (a: TimeInterval, b: TimeInterval) =>
//           a.start.getTime() - b.start.getTime()
//       );
//   } catch (error) {
//     console.error("Error fetching free/busy information:", error);
//     // Depending on requirements, you might return empty array or re-throw
//     return [];
//     // Or: throw new Error("Failed to retrieve calendar availability.");
//   }

//   // --- 4. Calculate Free Gaps ---
//   const freeGaps: TimeInterval[] = [];
//   let currentPointer = new Date(dayStart); // Start at the beginning of the day

//   busyIntervals.forEach((busy) => {
//     // If there's a gap between the current pointer and the start of the busy interval
//     if (busy.start > currentPointer) {
//       freeGaps.push({
//         start: new Date(currentPointer),
//         end: new Date(busy.start),
//       });
//     }
//     // Move the pointer to the end of the current busy interval
//     // Use Math.max in case busy intervals overlap (take the later end time)
//     currentPointer = new Date(
//       Math.max(currentPointer.getTime(), busy.end.getTime())
//     );
//   });

//   // Add the final gap from the last busy interval's end (or start of day if no busy times) to the end of the day
//   if (currentPointer < dayEnd) {
//     freeGaps.push({ start: new Date(currentPointer), end: new Date(dayEnd) });
//   }

//   // --- 5. Find Valid Slots within Free Gaps ---
//   const validStartSlots: string[] = [];
//   const totalDurationMillis = totalDurationMinutes * 60 * 1000;

//   freeGaps.forEach((gap) => {
//     const gapStartMillis = gap.start.getTime();
//     const gapEndMillis = gap.end.getTime();
//     const gapDurationMillis = gapEndMillis - gapStartMillis;

//     // Skip gap if it's shorter than the required total duration
//     if (gapDurationMillis < totalDurationMillis) {
//       return;
//     }

//     // Start checking from the beginning of the gap, rounded up to the next hour
//     let potentialStartTime = new Date(gap.start);

//     // If the gap doesn't start exactly on an hour, move to the next hour
//     if (
//       potentialStartTime.getUTCMinutes() > 0 ||
//       potentialStartTime.getUTCSeconds() > 0 ||
//       potentialStartTime.getUTCMilliseconds() > 0
//     ) {
//       potentialStartTime.setUTCHours(
//         potentialStartTime.getUTCHours() + 1,
//         0,
//         0,
//         0
//       );
//     }

//     // Iterate potential start times (hourly) within the gap
//     while (true) {
//       const potentialStartTimeMillis = potentialStartTime.getTime();
//       const potentialEndTimeMillis =
//         potentialStartTimeMillis + totalDurationMillis;

//       // Check if the slot (start + total duration) fits within the current free gap
//       if (potentialEndTimeMillis <= gapEndMillis) {
//         // Valid slot found
//         validStartSlots.push(potentialStartTime.toISOString());

//         // Move to the next hour for the next potential slot
//         potentialStartTime.setUTCHours(potentialStartTime.getUTCHours() + 1);
//       } else {
//         // This slot (and any further slots in this gap) won't fit, break inner loop
//         break;
//       }
//     }
//   });

//   // --- 6. Return the list of valid start times ---
//   return validStartSlots;
// };
