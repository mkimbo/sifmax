declare type CreateAppointmentSlotParams = {
  booking_intent: string
  start_date: string
  end_date: string
  status: string
  note: string | undefined
  user_name: string
  user_email?: string
  user_phone: string
}

// Example types (adjust based on your actual payload-types.ts if available)
interface NewCustomerInput {
  name: string
  phone: string
  email?: string
}

interface AppointmentInputData {
  appointmentDateTime: string // ISO 8601 format string (e.g., new Date().toISOString())
  serviceIds: string[] // Array of selected Service document IDs
  notes?: string // Optional appointment notes
  source: 'website' | 'admin' // | 'phone' | 'walk_in' // Source of the booking
  duration?: number // Optional duration in minutes (if needed)
  // Provide one of the following:
  appointmentEndTime?: string // ISO 8601 format string for endTime
  existingCustomerId?: string | null
  newCustomer?: NewCustomerInput | null
}

// Example structure of a successful response from Payload POST
interface PayloadAppointmentResponse {
  message: string
  doc: {
    id: string
    customer?: string | { id: string; name: string /* ... other customer fields */ } // Depends on depth
    appointmentDateTime: string
    services: string[] | { id: string; name: string /* ... */ }[] // Depends on depth
    status: 'booked' | 'confirmed' | 'completed' | 'cancelled' | 'noShow'
    source: string
    googleCalendarEventId?: string | null
    createdAt: string
    updatedAt: string
    // ... other fields returned by Payload
  }
}

// Example structure for Payload error response
interface PayloadErrorResponse {
  errors: {
    message: string
    field?: string
  }[]
}
