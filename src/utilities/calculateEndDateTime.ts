export default function calculateEndDateTime(
  startDateTimeString: string,
  durationInMinutes: number,
) {
  // 1. Validate duration input
  if (typeof durationInMinutes !== 'number' || isNaN(durationInMinutes)) {
    console.error('Error: durationInMinutes must be a valid number.')
    return null // Indicate invalid input
  }

  // 2. Parse the start datetime string into a Date object
  const startDate = new Date(startDateTimeString)

  // 3. Validate if the startDateTimeString was parsed correctly
  //    isNaN(date.getTime()) is a reliable way to check for Invalid Date
  if (isNaN(startDate.getTime())) {
    console.error('Error: Invalid startDateTimeString format or value.')
    return null // Indicate invalid input
  }

  // 4. Get the time value of the start date in milliseconds
  const startTimeMilliseconds = startDate.getTime()

  // 5. Convert the duration from minutes to milliseconds
  //    (minutes * seconds_per_minute * milliseconds_per_second)
  const durationInMilliseconds = durationInMinutes * 60 * 1000

  // 6. Calculate the end time in milliseconds by adding the duration
  const endTimeMilliseconds = startTimeMilliseconds + durationInMilliseconds

  // 7. Create a new Date object for the end time
  const endDate = new Date(endTimeMilliseconds)

  // 8. Format the end date back into the required ISO string format (YYYY-MM-DDTHH:mm:ss.sssZ)
  const endDateTimeString = endDate.toISOString()

  return endDateTimeString
}
