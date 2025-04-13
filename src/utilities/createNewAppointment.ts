'use server'
/**
 * Creates a new appointment by sending data to the Payload CMS API.
 * Handles both existing and new customer scenarios.
 *
 * @param appointmentData - The details of the appointment and customer.
 * @returns A promise that resolves with the created appointment data from Payload.
 * @throws An error if the API request fails or if input data is invalid.
 */
import { getPayload } from 'payload'
import config from '@payload-config'
import { Appointment1 } from '@/payload-types'
export default async function createAppointment(
  appointmentData: AppointmentInputData,
): Promise<Appointment1> {
  const payload = await getPayload({ config })

  // --- 1. Input Validation ---
  if (
    !appointmentData.appointmentDateTime ||
    !appointmentData.serviceIds ||
    appointmentData.serviceIds.length === 0
  ) {
    throw new Error('Missing required appointment details: date/time and services.')
  }
  if (!appointmentData.existingCustomerId && !appointmentData.newCustomer) {
    throw new Error(
      'Customer information is missing. Provide either existingCustomerId or newCustomer details.',
    )
  }
  if (appointmentData.existingCustomerId && appointmentData.newCustomer) {
    throw new Error('Provide either existingCustomerId OR newCustomer details, not both.')
  }
  if (
    appointmentData.newCustomer &&
    (!appointmentData.newCustomer.name || !appointmentData.newCustomer.phone)
  ) {
    throw new Error('New customer requires at least name and phone number.')
  }

  // --- 2. Construct Payload Body ---
  const payloadBody: Omit<Appointment1, 'sizes' | 'createdAt' | 'updatedAt' | 'id'> &
    Partial<Pick<Appointment1, 'createdAt' | 'updatedAt' | 'id'>> = {
    appointmentDateTime: appointmentData.appointmentDateTime,
    services: appointmentData.serviceIds, // Send array of IDs
    status: 'Booked', // Default status for new website bookings
    source: appointmentData.source || 'website', // Default source
  }

  if (appointmentData.notes) {
    payloadBody.notes = appointmentData.notes
  }

  // Add customer data based on the scenario
  if (appointmentData.existingCustomerId) {
    payloadBody.customer = appointmentData.existingCustomerId
  } else if (appointmentData.newCustomer) {
    payloadBody.newCustomerName = appointmentData.newCustomer.name
    payloadBody.newCustomerPhone = appointmentData.newCustomer.phone
    if (appointmentData.newCustomer.email) {
      payloadBody.newCustomerEmail = appointmentData.newCustomer.email
    }
  }

  // --- 3. API Request ---
  const apiUrl = `${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'}/api/appointments` // Use env var

  console.log('Sending appointment data:', JSON.stringify(payloadBody, null, 2)) // Log payload for debugging

  try {
    //   const response = await fetch(apiUrl, {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       // Add Authorization header if needed for your endpoint access control
    //       // 'Authorization': `Bearer YOUR_AUTH_TOKEN`,
    //     },
    //     body: JSON.stringify(payloadBody),
    //   });

    const response = await payload.create({
      collection: 'appointments',
      data: payloadBody,
    })

    // --- 4. Handle Response ---
    if (!response.id) {
      let errorData: PayloadErrorResponse | { message: string } | null = null
      errorData = { message: 'Unknown error occurred. Please try again.' }
      // try {
      //   // Try to parse Payload's specific error format
      //   errorData = await response.json();
      // } catch (e) {
      //   // If parsing fails, use status text
      //   errorData = { message: response.statusText };
      // }

      console.error('API Error Response:', errorData)
      // const errorMessage = (errorData as PayloadErrorResponse)?.errors?.[0]?.message
      //                    || (errorData as { message: string })?.message
      //                    || `API request failed with status ${response.status}`;
      throw new Error(errorData?.message)
    }

    // Success - parse the response JSON
    const result = response
    // console.log("Appointment created successfully:", result);
    return result
  } catch (error: any) {
    console.error('Error creating appointment:', error)
    // Re-throw the error so the calling code can handle it (e.g., show UI message)
    throw new Error(`Failed to create appointment: ${error.message}`)
  }
}
