// Import your generated types
import { CollectionBeforeChangeHook } from 'payload'

export const beforeAppointmentChange: CollectionBeforeChangeHook = async ({
  data, // Incoming data for the appointment
  req, // Full express request
  operation, // 'create' or 'update'
  originalDoc, // Original document for 'update' operations
}) => {
  const { payload } = req // Get Payload API instance

  // --- Handle only on create operations ---
  if (operation === 'create') {
    // Check if an existing customer relationship ID was provided
    if (data.customer && typeof data.customer === 'string') {
      // Existing customer selected, nothing more to do here for customer creation
      // Clear any potentially leftover new customer fields just in case
      delete data.newCustomerName
      delete data.newCustomerPhone
      delete data.newCustomerEmail
      console.log(`Existing customer ${data.customer} selected.`)
      return data // Return data as is (or cleared)
    }

    // Check if new customer details were provided
    if (data.newCustomerName && data.newCustomerPhone) {
      const name = data.newCustomerName
      const phone = data.newCustomerPhone // Consider normalizing phone format here
      const email = data.newCustomerEmail

      console.log(`Attempting to find/create new customer: ${name}, ${phone}`)

      try {
        // 1. Check if customer already exists (e.g., by phone number)
        const { docs: existingCustomers } = await payload.find({
          collection: 'customers',
          where: {
            phone: { equals: phone }, // Match based on phone
          },
          limit: 1,
          depth: 0, // Don't need related data
        })

        let customerId: string

        if (existingCustomers && existingCustomers.length > 0 && existingCustomers[0]?.id) {
          // Customer found! Use their ID.
          customerId = existingCustomers[0]?.id
          console.log(`Found existing customer by phone: ${customerId}`)
        } else {
          // Customer not found, create a new one
          console.log(`Creating new customer: ${name}`)
          const newCustomer = await payload.create({
            collection: 'customers',
            data: {
              name: name,
              phone: phone,
              email: email || undefined, // Only add email if provided
            },
          })
          customerId = newCustomer.id
          console.log(`Created new customer: ${customerId}`)
        }

        // 2. Assign the found/created customer ID to the appointment's relationship field
        data.customer = customerId

        // 3. IMPORTANT: Clear the temporary fields so they don't get saved
        delete data.newCustomerName
        delete data.newCustomerPhone
        delete data.newCustomerEmail
      } catch (error: any) {
        payload.logger.error(
          `Error finding/creating customer in beforeAppointmentChange: ${error.message}`,
        )
        // Throw an error to prevent the appointment from being created without a valid customer link
        throw new Error(`Failed to process customer details: ${error.message}`)
      }
    } else if (!data.customer) {
      // If we are here, it means neither an existing customer ID nor
      // sufficient new customer details were provided. Throw an error.
      payload.logger.error(
        'Appointment creation failed: Missing customer ID or new customer details.',
      )
      throw new Error(
        'Please select an existing customer or provide new customer name and phone number.',
      )
    }
  }

  // Return the potentially modified data object for Payload to save
  return data
}
