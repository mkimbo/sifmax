import { Appointment1 } from '@/payload-types'
import { CollectionAfterChangeHook } from 'payload'
import { google } from 'googleapis'

// export const createGoogleCalendarEvent: CollectionAfterChangeHook<Appointment1> = async ({ doc, req: { context, payload } }) => {
//     // Check if the operation is create
//     if (context.operation !== 'create') {
//         return doc;
//     }

//     try {
//         // Load Google API credentials from environment variables
//         const serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
//         const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');
//         const calendarId = process.env.GOOGLE_CALENDAR_ID;

//         if (!serviceAccountEmail || !privateKey || !calendarId) {
//             throw new Error("Missing Google API credentials or calendar ID in environment variables.");
//         }

//         // Authenticate using the service account
//         const auth = new google.auth.JWT({
//             email: serviceAccountEmail,
//             key: privateKey,
//             scopes: ['https://www.googleapis.com/auth/calendar'],
//         });

//         const calendar = google.calendar({ version: 'v3', auth });

//         // Extract necessary data from the appointment document
//         const { appointmentDateTime,  } = doc;

//         if (!appointmentDateTime || !customerName || !duration) {
//             throw new Error("Missing required appointment details.");
//         }

//         // Format start and end times
//         const startTime = new Date(appointmentDateTime).toISOString();
//         const endTime = new Date(new Date(appointmentDateTime).getTime() + duration * 60000).toISOString();

//         // Create the event in Google Calendar
//         const event = {
//             summary: `${customerName} - ${serviceName || "Appointment"}`,
//             start: { dateTime: startTime },
//             end: { dateTime: endTime },
//         };

//         const response = await calendar.events.insert({
//             calendarId,
//             requestBody: event,
//         });

//         const googleCalendarEventId = response.data.id;

//         if (!googleCalendarEventId) {
//             throw new Error("Failed to retrieve Google Calendar event ID.");
//         }

//         // Update the original Payload appointment document with the Google Calendar event ID
//         await payload.update({
//             collection: 'appointments',
//             id: doc.id,
//             data: { googleCalendarEventId },
//         });

//         return { ...doc, googleCalendarEventId };
//     } catch (error) {
//         console.error("Error creating Google Calendar event:", error);
//         return doc; // Return the original document even if an error occurs
//     }
// };

const serviceAccountEmail = process.env.GSA_CLIENT_EMAIL
const privateKey = process.env.GSA_PRIVATE_KEY?.replace(/\\n/g, '\n')
const CALENDAR_ID = process.env.SIFMAX_APPOINTMENT_CALENDAR_ID

//const GOOGLE_CREDENTIALS_JSON = process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON
//const CALENDAR_ID = process.env.GOOGLE_CALENDAR_ID; // Your target calendar ID

if (!CALENDAR_ID) {
  console.warn(
    'GOOGLE_CALENDAR_ID environment variable not set. Google Calendar integration disabled.',
  )
}
if (!serviceAccountEmail || !privateKey /* && !KEYFILEPATH */) {
  console.warn(
    'Google application credentials environment variable(s) not set. Google Calendar integration disabled.',
  )
}

const SCOPES = ['https://www.googleapis.com/auth/calendar.events']

const getGoogleAuth = () => {
  if (!serviceAccountEmail || !privateKey) return null
  try {
    // const credentials = JSON.parse(GOOGLE_CREDENTIALS_JSON);
    // return new google.auth.GoogleAuth({
    //   credentials,
    //   scopes: SCOPES,
    // });
    return new google.auth.JWT({
      email: serviceAccountEmail,
      key: privateKey,
      scopes: ['https://www.googleapis.com/auth/calendar'],
    })
  } catch (error) {
    console.error('Failed to parse Google credentials JSON:', error)
    return null
  }
  // --- OR using key file path ---
  // if (!KEYFILEPATH) return null;
  // return new google.auth.GoogleAuth({
  //   keyFile: KEYFILEPATH,
  //   scopes: SCOPES,
  // });
}

const calendar = google.calendar('v3')
// --- End Google Calendar Setup ---

export const afterAppointmentChange: CollectionAfterChangeHook<Appointment1> = async ({
  doc, // The full document object that was saved
  req, // Full express request
  operation, // 'create' or 'update'
  previousDoc, // Document before change for 'update'
}) => {
  const { payload } = req

  // --- Handle only on create operations ---
  if (operation === 'create' && doc.id && CALENDAR_ID && serviceAccountEmail && privateKey) {
    console.log(`afterChange hook triggered for new appointment: ${doc.id}`)

    try {
      // 1. Get Customer Name (doc.customer should be populated by beforeChange)
      let customerName = 'Unknown Customer'
      if (doc.customer && typeof doc.customer === 'object' && doc.customer.id) {
        // If customer was populated with depth > 0
        customerName = doc.customer.name || customerName
      } else if (doc.customer && typeof doc.customer === 'string') {
        // If customer is just an ID, fetch the full customer doc
        try {
          const customerDoc = await payload.findByID({
            collection: 'customers',
            id: doc.customer,
            depth: 0, // No need for further relationships
          })
          customerName = customerDoc.name || customerName
        } catch (customerError) {
          payload.logger.error(
            `Error fetching customer ${doc.customer} in afterAppointmentChange: ${customerError}`,
          )
        }
      }

      // 2. Get Service Details & Calculate Duration
      let serviceNames = 'Service'
      let totalDurationMinutes = 60 // Default duration if services fail
      if (doc.services && doc.services.length > 0) {
        // Check if services are populated objects or just IDs
        const serviceIds = doc.services.map((service) =>
          typeof service === 'object' ? service.id : service,
        )

        if (serviceIds.length > 0) {
          try {
            const { docs: serviceDocs } = await payload.find({
              collection: 'services',
              where: {
                id: { in: serviceIds },
              },
              limit: serviceIds.length,
              depth: 0,
            })

            if (serviceDocs && serviceDocs.length > 0) {
              serviceNames = serviceDocs.map((s) => s.name).join(', ')
              totalDurationMinutes = serviceDocs.reduce((sum, s) => sum + (s.duration || 0), 0)
            }
          } catch (serviceError) {
            payload.logger.error(
              `Error fetching services ${serviceIds.join(',')} in afterAppointmentChange: ${serviceError}`,
            )
          }
        }
      }

      // 3. Prepare Google Calendar Event Data
      const startTime = new Date(doc.appointmentDateTime)
      const endTime = new Date(startTime.getTime() + totalDurationMinutes * 60000) // Add duration in milliseconds

      const event = {
        summary: `${customerName} - ${serviceNames}`,
        description: `Appointment for ${customerName}.\nServices: ${serviceNames}.\nSource: ${doc.source || 'N/A'}\nNotes: ${doc.notes || ''}`,
        start: {
          dateTime: startTime.toISOString(),
          timeZone: 'Africa/Dar_es_Salaam', // IMPORTANT: Set your specific timezone
        },
        end: {
          dateTime: endTime.toISOString(),
          timeZone: 'Africa/Dar_es_Salaam', // IMPORTANT: Set your specific timezone
        },
        // Add attendees, reminders etc. if needed
        // attendees: [{ email: customerEmail }], // Requires fetching customer email
        // reminders: { useDefault: false, overrides: [...] }
      }

      // 4. Authenticate and Create Event
      const auth = getGoogleAuth()
      if (!auth) {
        throw new Error('Google Auth client could not be initialized.')
      }

      console.log(`Creating GCal event for appointment ${doc.id}: ${event.summary}`)
      const createdEvent = await calendar.events.insert({
        auth: auth,
        calendarId: CALENDAR_ID,
        requestBody: event,
      })

      const googleEventId = createdEvent.data.id
      console.log(`GCal event created: ${googleEventId}`)

      // 5. Update the Appointment with the Google Event ID (Non-blocking)
      if (googleEventId) {
        payload
          .update({
            collection: 'appointments',
            id: doc.id,
            data: {
              googleCalendarEventId: googleEventId,
            },
          })
          .catch((updateError) => {
            // Log error but don't fail the whole process if update fails
            payload.logger.error(
              `Failed to update appointment ${doc.id} with GCal event ID ${googleEventId}: ${updateError}`,
            )
          })
      }
    } catch (error: any) {
      payload.logger.error(
        `Error creating Google Calendar event for appointment ${doc.id}: ${error.message}`,
      )
      // Decide if you want to notify someone or just log
    }
  }

  // No need to return anything from afterChange hook
}
