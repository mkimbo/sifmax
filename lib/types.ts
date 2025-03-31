declare type CreateAppointmentSlotParams = {
  booking_intent: string;
  start_date: string;
  end_date: string;
  status: string;
  note: string | undefined;
  user_name: string;
  user_email?: string;
  user_phone: string;
};
