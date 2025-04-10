'use client'

import type React from 'react'

import { useState, useEffect } from 'react'
import { useForm, FormProvider, useFormContext, type SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { format } from 'date-fns'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight, Check, Loader2, X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { DayPicker } from 'react-day-picker'
import 'react-day-picker/style.css'

import { useServiceContext } from '@/context/service-context'
import { createAppointmentSlot, getFreeSlots } from '@/utilities/actions'

import calculateEndDateTime from '@/utilities/calculateEndDateTime'
import { Service } from '../Services'
import { cn } from '@/utilities/ui'

// Form schema with Zod
const formSchema = z.object({
  date: z.date({
    required_error: 'Please select a date',
  }),
  timeSlot: z.string({
    required_error: 'Please select a time slot',
  }),
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  phone: z.string().min(10, { message: 'Please enter a valid phone number' }),
  email: z.string().email({ message: 'Please enter a valid email' }).optional().or(z.literal('')),
  notes: z.string().optional(),
})

type BookingFormValues = z.infer<typeof formSchema>

function formatTime(isoString: string): string {
  const date = new Date(isoString)
  return date
    .toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    })
    .replace(' ', '')
}

// Mock function to fetch available time slots
const fetchAvailableTimeSlots = async (date: Date): Promise<string[]> => {
  const slots = await getFreeSlots({
    inputDate: format(date, 'yyyy-MM-dd'),
    serviceName: 'SOme servicce',
    approxDurationMinutes: 30,
    calendarId: process.env.SIFMAX_APPOINTMENT_CALENDAR_ID!,
  })
  return slots
}

const totalSteps = 5

// Step 1: Date Selection
const DateStep = () => {
  const { control, formState, setValue, watch, trigger } = useFormContext<BookingFormValues>()
  const { toggleLoadingSlots } = useServiceContext()
  const [isLoading, setIsLoading] = useState(false)
  const [noSlotsAvailable, setNoSlotsAvailable] = useState(false)
  const selectedDate = watch('date')

  const handleDateChange = async (date: Value) => {
    if (!date) return

    if (date instanceof Date) {
      setValue('date', date)
      setValue('timeSlot', '') // Reset time slot when date changes
      setNoSlotsAvailable(false)

      setIsLoading(true)
      toggleLoadingSlots(true)
      try {
        const slots = await fetchAvailableTimeSlots(date)
        if (slots.length === 0) {
          setNoSlotsAvailable(true)
        }
      } catch (error) {
        console.error('Error fetching time slots:', error)
        setNoSlotsAvailable(true)
      } finally {
        setIsLoading(false)
        toggleLoadingSlots(false)
      }

      await trigger('date')
    }
  }

  //scroll to top when rendered
  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, []);

  type ValuePiece = Date | null

  type Value = ValuePiece | [ValuePiece, ValuePiece]

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-4"
    >
      {/* <div className="text-center mb-3 md:mb-6">
        <h3 className="text-xl font-semibold mb-2">Select Appointment Date</h3>
        <p className="text-muted-foreground text-sm">
          Choose your preferred date for your appointment
        </p>
      </div> */}

      <div className="flex justify-center mb-4">
        {/* <Calendar
          required
          mode="single"
          selected={selectedDate}
          onSelect={handleDateChange}
          disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
          className="rounded-md border"
        /> */}
        <DayPicker
          required
          animate
          mode="single"
          disabled={[{ before: new Date() }]}
          selected={selectedDate}
          onSelect={handleDateChange}
        />
      </div>
      {/* 
      {isLoading && (
        <div className="flex justify-center items-center py-4">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
          <span className="ml-2">Checking available slots...</span>
        </div>
      )} */}

      {noSlotsAvailable && !isLoading && (
        <div className="bg-destructive/10 text-destructive p-3 rounded-md text-center">
          No time slots available for this date. Please select another date.
        </div>
      )}

      {formState.errors.date && (
        <p className="text-destructive text-sm">{formState.errors.date.message}</p>
      )}
    </motion.div>
  )
}

// Step 2: Time Slot Selection
const TimeSlotStep = () => {
  const { watch, setValue, formState, trigger } = useFormContext<BookingFormValues>()
  const [availableSlots, setAvailableSlots] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const selectedDate = watch('date')
  const selectedTimeSlot = watch('timeSlot')

  useEffect(() => {
    const loadTimeSlots = async () => {
      setIsLoading(true)
      try {
        const slots = await fetchAvailableTimeSlots(selectedDate)
        setAvailableSlots(slots)
      } catch (error) {
        console.error('Error fetching time slots:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadTimeSlots()
    window.scrollTo(0, 0)
  }, [selectedDate])

  const handleTimeSlotSelect = async (slot: string) => {
    setValue('timeSlot', slot)
    await trigger('timeSlot')
  }
  console.log('availableSlots', availableSlots[0])

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-4"
    >
      {/* <div className="text-center mb-6">
        <h3 className="text-xl font-semibold mb-2">Select Time Slot</h3>
        <p className="text-muted-foreground text-sm">
          Available time slots for {selectedDate ? format(selectedDate, 'EEEE, MMMM d, yyyy') : ''}
        </p>
      </div> */}

      {isLoading ? (
        <div className="flex justify-center items-center py-8">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
          <span className="ml-2">Loading available time slots...</span>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {availableSlots.map((slot) => (
            <Button
              key={slot}
              type="button"
              variant={selectedTimeSlot === slot ? 'default' : 'outline'}
              className={cn('h-12', selectedTimeSlot === slot && 'border-primary')}
              onClick={() => handleTimeSlotSelect(slot)}
            >
              {formatTime(slot)}
            </Button>
          ))}
        </div>
      )}

      {formState.errors.timeSlot && (
        <p className="text-destructive text-sm">{formState.errors.timeSlot.message}</p>
      )}
    </motion.div>
  )
}

// Step 3: Name Input
const NameStep = () => {
  const { register, formState, trigger, watch } = useFormContext<BookingFormValues>()
  const name = watch('name')

  const handleNameChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    await trigger('name')
  }

  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-4"
    >
      {/* <div className="text-center mb-6">
        <h3 className="text-xl font-semibold mb-2">Your Name</h3>
        <p className="text-muted-foreground text-sm">Please enter your full name</p>
      </div> */}

      <div className="space-y-2">
        <label htmlFor="name" className="text-sm font-medium">
          Full Name
        </label>
        <input
          id="name"
          type="text"
          {...register('name', { onChange: handleNameChange })}
          className="w-full text-black px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
          placeholder="Your name"
        />
        {formState.errors.name && (
          <p className="text-destructive text-sm">{formState.errors.name.message}</p>
        )}
      </div>
    </motion.div>
  )
}

// Step 4: Contact Information
const ContactStep = () => {
  const { register, formState, trigger } = useFormContext<BookingFormValues>()

  const handlePhoneChange = async () => {
    await trigger('phone')
  }

  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-4"
    >
      {/* <div className="text-center mb-6">
        <h3 className="text-xl font-semibold mb-2">Contact Information</h3>
        <p className="text-muted-foreground text-sm">
          How can we reach you regarding your appointment?
        </p>
      </div> */}

      <div className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="phone" className="text-sm font-medium">
            Phone Number <span className="text-destructive">*</span>
          </label>
          <input
            id="phone"
            type="tel"
            {...register('phone', { onChange: handlePhoneChange })}
            className="w-full px-3 text-black py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
            placeholder="Your phone number"
          />
          {formState.errors.phone && (
            <p className="text-destructive text-sm">{formState.errors.phone.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">
            Email (Optional)
          </label>
          <input
            id="email"
            type="email"
            {...register('email')}
            className="w-full px-3 py-2 text-black border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
            placeholder="Your email"
          />
          {formState.errors.email && (
            <p className="text-destructive text-sm">{formState.errors.email.message}</p>
          )}
        </div>
      </div>
    </motion.div>
  )
}

// Step 5: Special Requests
const SpecialRequestsStep = () => {
  const { register } = useFormContext<BookingFormValues>()
  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, []);
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-4"
    >
      {/* <div className="text-center mb-6">
        <h3 className="text-xl font-semibold mb-2">Special Requests</h3>
        <p className="text-muted-foreground text-sm">
          Any special requests or notes for your appointment? (Optional)
        </p>
      </div> */}

      <div className="space-y-2">
        <label htmlFor="notes" className="text-sm font-medium">
          Special Requests
        </label>
        <textarea
          id="notes"
          {...register('notes')}
          className="w-full px-3 text-black py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 min-h-[150px]"
          placeholder="Any special requests or notes for your appointment"
        />
      </div>
    </motion.div>
  )
}

// Success Step
const SuccessStep = ({ formData }: { formData: BookingFormValues }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="text-center py-8"
    >
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 text-primary mb-4">
        <Check className="h-8 w-8" />
      </div>
      <h3 className="text-2xl font-bold mb-2">Booking Confirmed!</h3>
      <p className="text-muted-foreground mb-6">
        Your appointment has been scheduled for{' '}
        {formData.date ? format(formData.date, 'EEEE, MMMM d, yyyy') : ''} at{' '}
        {formatTime(formData.timeSlot)}
      </p>
      <p className="text-sm text-muted-foreground mb-6">
        We will contact you to confirm the appointment. We look forward to seeing you!
      </p>

      <div className="bg-muted/30 p-4 rounded-lg text-left max-w-md mx-auto">
        <h4 className="font-medium mb-3">Appointment Details</h4>
        <ul className="space-y-2 text-sm">
          <li className="flex justify-between">
            <span className="text-muted-foreground">Date:</span>
            <span className="font-medium">
              {formData.date ? format(formData.date, 'MMMM d, yyyy') : ''}
            </span>
          </li>
          <li className="flex justify-between">
            <span className="text-muted-foreground">Time:</span>
            <span className="font-medium">{formatTime(formData.timeSlot)}</span>
          </li>
          <li className="flex justify-between">
            <span className="text-muted-foreground">Name:</span>
            <span className="font-medium">{formData.name}</span>
          </li>
          <li className="flex justify-between">
            <span className="text-muted-foreground">Phone:</span>
            <span className="font-medium">{formData.phone}</span>
          </li>
          {formData.email && (
            <li className="flex justify-between">
              <span className="text-muted-foreground">Email:</span>
              <span className="font-medium">{formData.email}</span>
            </li>
          )}
        </ul>
      </div>
    </motion.div>
  )
}

// Progress indicator
const ProgressIndicator = ({
  currentStep,
  totalSteps,
}: {
  currentStep: number
  totalSteps: number
}) => {
  return (
    <div className="flex items-center justify-center mb-8">
      {Array.from({ length: totalSteps }).map((_, index) => (
        <div key={index} className="flex items-center">
          <div
            className={cn(
              'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors',
              currentStep > index
                ? 'bg-primary text-primary-foreground'
                : currentStep === index
                  ? 'bg-primary/90 text-primary-foreground ring-2 ring-primary/30'
                  : 'bg-muted text-muted-foreground',
            )}
          >
            {index + 1}
          </div>
          {index < totalSteps - 1 && (
            <div className={cn('h-1 w-10 mx-1', currentStep > index ? 'bg-primary' : 'bg-muted')} />
          )}
        </div>
      ))}
    </div>
  )
}

const ProgressBar = ({
  currentStep,
  totalSteps,
  className,
}: {
  currentStep: number
  totalSteps: number
  className?: string
}) => {
  const [isPulsing, setIsPulsing] = useState(false)

  // Calculate progress percentage
  const progress = (currentStep / totalSteps) * 100

  // Toggle pulsing effect every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIsPulsing((prev) => !prev)
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className={cn('w-full mx-auto', className)}>
      <div className="relative h-1 bg-muted rounded-full overflow-hidden my-1">
        <div
          className={cn(
            'absolute top-0 left-0 h-full bg-primary rounded-full transition-all duration-700 ease-in-out',
            isPulsing && 'opacity-80 scale-y-90',
          )}
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Optional text indicator */}
      {/* <div className="mt-2 text-sm text-center text-muted-foreground">
        Step {currentStep} of {totalSteps}
      </div> */}
    </div>
  )
}

interface MultiStepBookingFormProps {
  selectedServices: Service[]
  removeService: (serviceId: string) => void
  onComplete: () => void
}

export function MultiStepBookingForm({
  selectedServices,
  removeService,
  onComplete,
}: MultiStepBookingFormProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<BookingFormValues | null>(null)
  const { loadingSlots } = useServiceContext()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [currentStep])

  const methods = useForm<BookingFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: undefined,
      timeSlot: '',
      name: '',
      phone: '',
      email: '',
      notes: '',
    },
    mode: 'onChange',
  })

  const { handleSubmit, trigger, watch, formState } = methods
  const selectedDate = watch('date')
  // Check if current step is valid
  const isCurrentStepValid = () => {
    switch (currentStep) {
      case 0: // Date step
        return !!watch('date')
      case 1: // Time slot step
        return !!watch('timeSlot')
      case 2: // Name step
        return !!watch('name') && !formState.errors.name
      case 3: // Contact step
        return !!watch('phone') && !formState.errors.phone
      case 4: // Special requests step
        return true // Always valid as it's optional
      default:
        return false
    }
  }

  const goToNextStep = async () => {
    const isValid = await trigger(
      currentStep === 0
        ? 'date'
        : currentStep === 1
          ? 'timeSlot'
          : currentStep === 2
            ? 'name'
            : currentStep === 3
              ? 'phone'
              : 'notes',
    )

    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, totalSteps))
      console.log('currentStep', Math.min(currentStep + 1, totalSteps))
    }
  }

  const goToPreviousStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0))
  }

  const onSubmit: SubmitHandler<BookingFormValues> = async (data) => {
    setIsSubmitting(true)

    try {
      // Simulate API call
      const res = await createAppointmentSlot({
        user_name: data.name,
        user_email: data.email,
        user_phone: data.phone,
        note: data.notes,
        start_date: data.timeSlot,
        end_date: calculateEndDateTime(data.timeSlot, 120) ?? data.timeSlot,
        status: 'new',
        booking_intent:
          selectedServices[0]?.title ??
          'Unknown Service' +
            `(${selectedServices[0]?.category})` +
            ' - ' +
            selectedServices[0]?.price +
            'for 30 mins',
      })
      // await new Promise((resolve) => setTimeout(resolve, 1500));

      // if (!res.success) {
      //   throw new Error("Failed to create appointment slot.");
      // }
      // Store form data for success step
      setFormData(data)
      console.log('Form submitted:', data)

      // Move to success step
      setCurrentStep(totalSteps)

      // Call onComplete callback
      //onComplete();
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Render the current step
  const renderStep = () => {
    if (currentStep === totalSteps) {
      return formData ? <SuccessStep formData={formData} /> : null
    }

    switch (currentStep) {
      case 0:
        return <DateStep />
      case 1:
        return <TimeSlotStep />
      case 2:
        return <NameStep />
      case 3:
        return <ContactStep />
      case 4:
        return <SpecialRequestsStep />
      default:
        return null
    }
  }

  const renderStepTitle = () => {
    if (currentStep === totalSteps) {
      return null
    }

    switch (currentStep) {
      case 0:
        return 'Choose your preferred date.'
      case 1:
        return `Choose the time for your appointment.`
      case 2:
        return 'Please enter your full name.'
      case 3:
        return 'How can we reach you regarding your appointment?'
      case 4:
        return 'Any special requests or notes? (Optional)'
      default:
        return null
    }
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Progress indicator */}
        {/* {currentStep < totalSteps && (
          <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
        )} */}
        <div className="sticky top-16 bg-background w-full z-10 py-2">
          {currentStep !== totalSteps && (
            <div className="text-left mb-3 md:mb-6">
              <p className="text-muted-foreground text-base">{renderStepTitle()}</p>
            </div>
          )}

          {/* Navigation buttons */}
          {currentStep < totalSteps && (
            <div className="flex justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  if (currentStep == 0) {
                    if (selectedServices.length > 0) {
                      removeService(selectedServices[0]!.serviceId)
                    }
                  } else {
                    goToPreviousStep()
                  }
                  // window.scrollTo(0, 0)
                }}
                // disabled={currentStep === 0}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              {currentStep != totalSteps - 1 && (
                <Button
                  type="button"
                  onClick={goToNextStep}
                  disabled={!isCurrentStepValid() || loadingSlots}
                >
                  Next
                  {loadingSlots ? (
                    <Loader2 className="ml2 h-4 w-4 animate-spin" />
                  ) : (
                    <ArrowRight className="ml-2 h-4 w-4" />
                  )}
                </Button>
              )}
              {currentStep == totalSteps - 1 && (
                <Button type="submit" disabled={isSubmitting || !isCurrentStepValid()}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      Book Appointment
                      <Check className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              )}

              {/* {currentStep != totalSteps - 1 ? (
              <Button
                type="button"
                onClick={goToNextStep}
                disabled={!isCurrentStepValid()}
              >
                Next
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button
                type="submit"
                disabled={isSubmitting || !isCurrentStepValid()}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    Book Appointment
                    <Check className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            )} */}
            </div>
          )}
        </div>
        {/* Selected services list */}
        {currentStep !== totalSteps && (
          <div className="bg-muted/30 px-4 py-2 rounded-lg mb-3 md::mb-6">
            {/* <h4 className="font-medium mb-3 text-sm md:text-base">Selected Service</h4> */}
            <ul className="space-y-2">
              {selectedServices.map((service) => (
                <li key={service.serviceId} className="flex justify-between items-center">
                  <div className="flex items-center text-muted-foreground text-sm md:text-base">
                    <div className="h-2 w-2 rounded-full bg-primary mr-2"></div>
                    <span>{service.title}</span>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="w-fit"
                    onClick={() => removeService(service.serviceId)}
                    type="button"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </li>
              ))}
            </ul>
            {/* <div className="border-t border-border mt-3 pt-3 flex justify-between items-center"></div> */}
            {currentStep < totalSteps && (
              <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
            )}
          </div>
        )}
        {/* Form steps */}
        <div className="min-h-fit ">
          <AnimatePresence mode="wait">{renderStep()}</AnimatePresence>
        </div>
      </form>
    </FormProvider>
  )
}
