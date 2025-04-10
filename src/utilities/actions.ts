'use server'
import {
  parseISO, // More robust for ISO strings than new Date()
  startOfDay,
  addHours,
  addMinutes, // Keep if needed, but not used in main slot loop
  addDays, // Keep if needed, maybe for dayEndUTC calculation alternative
  isWithinInterval, // Keep if needed for alternate checks
  compareAsc,
} from 'date-fns'
import { toZonedTime, fromZonedTime } from 'date-fns-tz'

import { nanoid } from 'nanoid'
// --- Configuration ---
const TARGET_TIMEZONE = 'Africa/Dar_es_Salaam' // EAT (UTC+3)

// --- Helper Types ---
type TimeInterval = {
  start: Date // Represents UTC time
  end: Date // Represents UTC time
}

export const getFreeSlots = async ({
  inputDate, // Expecting UTC ISO 8601 string, e.g., "2025-04-05" or "2025-04-05T00:00:00.000Z"
  calendarId,
  serviceName,
  approxDurationMinutes,
}: {
  inputDate: string
  calendarId: string
  serviceName: string
  approxDurationMinutes: number
}) => {
  // --- 1. Input Validation & Setup ---
  // assert(calendarId, 'calendarId is required.');
  // assert(inputDate, 'inputDate is required.');
  // assert(approxDurationMinutes > 0, 'approxDurationMinutes must be positive.');

  const BUFFER_MINUTES = 30
  const totalDurationMinutes = approxDurationMinutes + BUFFER_MINUTES

  // --- 2. Define Time Range for the Query (Full Day in EAT, converted to UTC) ---
  let dayStartUTC: Date
  let dayEndUTC: Date // Exclusive end (start of next day in EAT, represented in UTC)

  try {
    // Parse the input UTC ISO string. parseISO is generally safer than new Date() for strings.
    const parsedInputDate = parseISO(inputDate)
    if (isNaN(parsedInputDate.getTime())) {
      throw new Error(
        `Invalid date format: "${inputDate}". Please use UTC ISO 8601 format (e.g., YYYY-MM-DD).`,
      )
    }

    // Find the equivalent time in the target timezone (EAT)
    const timeInEAT = toZonedTime(parsedInputDate, TARGET_TIMEZONE)

    // Get the start of that day (00:00:00) in EAT
    const startOfTargetDayInEAT = startOfDay(timeInEAT)

    // Convert the EAT start-of-day back to a UTC Date object for the API query
    dayStartUTC = fromZonedTime(startOfTargetDayInEAT, TARGET_TIMEZONE)

    // Calculate the end of the EAT day (start of the next day) also in UTC
    // Adding 24 hours to the UTC start ensures we cover the full EAT day
    dayEndUTC = new Date(dayStartUTC.getTime() + 24 * 60 * 60 * 1000)
    // Alternative using date-fns (slightly more verbose for this specific case):
    // const startOfNextDayInEAT = addDays(startOfTargetDayInEAT, 1);
    // dayEndUTC = fromZonedTime(startOfNextDayInEAT, TARGET_TIMEZONE);
  } catch (error) {
    console.error('Failed to establish date range:', error)
    return [] // Cannot proceed without a valid date range
  }

  const timeMin = dayStartUTC.toISOString() // UTC ISO string for API
  const timeMax = dayEndUTC.toISOString() // UTC ISO string for API

  console.log(
    `Querying Google Calendar from ${timeMin} to ${timeMax} (UTC) for EAT day starting at ${fromZonedTime(
      dayStartUTC,
      TARGET_TIMEZONE,
    ).toISOString()}`,
  ) // Debug logging

  // --- 3. Fetch Busy Intervals from Google Calendar API (using UTC range) ---
  let busyIntervalsUTC: TimeInterval[] = []
  try {
    const apiKey = process.env.SIFMAX_FREE_BUSY_API_KEY
    const targetCalendarId = process.env.SIFMAX_APPOINTMENT_CALENDAR_ID || calendarId

    if (!apiKey) throw new Error('Missing Google Calendar API Key (FREE_BUSY_API_KEY)')
    if (!targetCalendarId) throw new Error('Missing Calendar ID')

    const res = await fetch(`https://www.googleapis.com/calendar/v3/freeBusy?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        timeMin: timeMin,
        timeMax: timeMax,
        items: [{ id: targetCalendarId }],
      }),
    })

    if (!res.ok) {
      const errorBody = await res.text()
      throw new Error(`Google Calendar API error: ${res.status} ${res.statusText} - ${errorBody}`)
    }

    const response = await res.json()
    const calendarData = response?.calendars?.[targetCalendarId]
    const busyTimes = calendarData?.busy || []

    busyIntervalsUTC = busyTimes
      .map((busy: { start: string; end: string }) => ({
        start: parseISO(busy.start), // Use parseISO for consistency
        end: parseISO(busy.end),
      }))
      .sort((a: TimeInterval, b: TimeInterval) => compareAsc(a.start, b.start))
  } catch (error) {
    console.error('Error fetching free/busy information:', error)
    return []
  }

  // --- 4. Calculate Free Gaps (in UTC) ---
  const freeGapsUTC: TimeInterval[] = []
  let currentPointerUTC = new Date(dayStartUTC) // Start at the calculated UTC start

  busyIntervalsUTC.forEach((busyUTC) => {
    if (compareAsc(busyUTC.start, currentPointerUTC) > 0) {
      freeGapsUTC.push({
        start: new Date(currentPointerUTC),
        end: new Date(busyUTC.start),
      })
    }
    currentPointerUTC =
      compareAsc(currentPointerUTC, busyUTC.end) > 0 ? currentPointerUTC : new Date(busyUTC.end)
  })

  if (compareAsc(dayEndUTC, currentPointerUTC) > 0) {
    freeGapsUTC.push({
      start: new Date(currentPointerUTC),
      end: new Date(dayEndUTC),
    })
  }

  // --- 5. Find Valid Slots within Free Gaps (Considering EAT hours) ---
  const validStartSlotsUTC: string[] = []
  const totalDurationMillis = totalDurationMinutes * 60 * 1000

  freeGapsUTC.forEach((gapUTC) => {
    const gapStartUTC = gapUTC.start
    const gapEndUTC = gapUTC.end
    const gapDurationMillis = gapEndUTC.getTime() - gapStartUTC.getTime()

    if (gapDurationMillis < totalDurationMillis) {
      return // Skip gap if too short
    }

    // Find the first potential start time ON THE HOUR in EAT within this UTC gap.
    let potentialStartTimeEAT: Date

    // Convert UTC gap start to EAT time
    const tempPotentialStartEAT = toZonedTime(gapStartUTC, TARGET_TIMEZONE)

    // Check if it's already on the hour in EAT
    if (
      tempPotentialStartEAT.getMinutes() > 0 ||
      tempPotentialStartEAT.getSeconds() > 0 ||
      tempPotentialStartEAT.getMilliseconds() > 0
    ) {
      // Not on the hour, round up to the next hour IN EAT
      tempPotentialStartEAT.setMinutes(0, 0, 0) // Clear minutes/seconds/ms
      potentialStartTimeEAT = addHours(tempPotentialStartEAT, 1) // Go to next hour
    } else {
      // Already on the hour EAT
      potentialStartTimeEAT = tempPotentialStartEAT
    }

    // Iterate potential start times (hourly in EAT) within the gap
    while (true) {
      // Convert potential EAT start time back to UTC for calculations/comparisons
      const potentialStartTimeUTC = fromZonedTime(potentialStartTimeEAT, TARGET_TIMEZONE)

      // Ensure the calculated start time hasn't somehow gone *before* the actual gap start
      // (Can happen if rounding up crosses the gap boundary, though less likely with this logic)
      if (compareAsc(potentialStartTimeUTC, gapStartUTC) < 0) {
        console.warn(
          'Potential start time calculation resulted in time before gap start. Skipping ahead.',
        )
        potentialStartTimeEAT = addHours(potentialStartTimeEAT, 1) // Move to next EAT hour
        continue
      }

      // Calculate the potential end time in UTC
      const potentialEndTimeUTC = new Date(potentialStartTimeUTC.getTime() + totalDurationMillis)

      // Check if the calculated UTC end time fits within the UTC gap
      // Use <= because the gap end is exclusive, but the slot end is inclusive of its time range
      if (compareAsc(potentialEndTimeUTC, gapEndUTC) <= 0) {
        // Valid slot found! Store the UTC start time string
        validStartSlotsUTC.push(potentialStartTimeUTC.toISOString())

        // Move to the next hour IN EAT for the next potential slot
        potentialStartTimeEAT = addHours(potentialStartTimeEAT, 1)
      } else {
        // This slot (and any further slots starting in this EAT hour in this gap) won't fit. Break inner loop.
        break
      }
    }
  })

  // --- 6. Return the list of valid start times (UTC ISO strings) ---
  return validStartSlotsUTC
}

export const createAppointmentSlot = async (params: CreateAppointmentSlotParams) => {
  try {
    const res = await fetch(`${process.env.APPOINTMENTS_HOOK}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data_type: 'new',
        user_id: nanoid(),
        ...params,
      }),
    })

    if (!res.ok) {
      throw new Error('Failed to create appointment slot.')
    }

    return { success: true }
  } catch (error) {
    console.error('An error occurred while creating a new appointment:', error)
    return { success: false }
  }
}
