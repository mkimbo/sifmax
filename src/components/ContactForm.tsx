'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Loader2, CheckCircle } from 'lucide-react'

// Define the form schema with Zod
const contactFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  phone: z
    .string()
    .min(10, { message: 'Please enter a valid phone number' })
    .max(15, { message: 'Phone number is too long' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  message: z.string().optional(),
})

// Infer the type from the schema
type ContactFormValues = z.infer<typeof contactFormSchema>

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  // Initialize React Hook Form with Zod validation
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      message: '',
    },
  })

  // Form submission handler
  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true)

    try {
      // Simulate API call
      // await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log('Form submitted:', data)
      setIsSubmitted(true)
      reset()
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-background p-6 rounded-lg shadow-sm border border-border">
      <h3 className="font-semibold text-lg mb-4">Send Us A Message</h3>

      {isSubmitted ? (
        <div className="text-center py-8">
          <CheckCircle className="h-12 w-12 text-primary mx-auto mb-4" />
          <h4 className="text-xl font-medium mb-2">Thank You!</h4>
          <p className="text-muted-foreground mb-6">
            Your message has been sent successfully. We&apos;ll get back to you soon.
          </p>
          <Button onClick={() => setIsSubmitted(false)}>Send Another Message</Button>
        </div>
      ) : (
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="Your name"
                {...register('name')}
              />
              {errors.name && (
                <p className="text-destructive text-sm mt-1">{errors.name.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <label htmlFor="phone" className="text-sm font-medium">
                Phone Number
              </label>
              <input
                id="phone"
                type="tel"
                className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="Your phone number"
                {...register('phone')}
              />
              {errors.phone && (
                <p className="text-destructive text-sm mt-1">{errors.phone.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
              placeholder="Your email"
              {...register('email')}
            />
            {errors.email && (
              <p className="text-destructive text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium">
              Your Message
            </label>
            <textarea
              id="message"
              className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 min-h-[100px]"
              placeholder="Any special requests or questions?"
              {...register('message')}
            />
            {errors.message && (
              <p className="text-destructive text-sm mt-1">{errors.message.message}</p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              'Submit'
            )}
          </Button>
        </form>
      )}
    </div>
  )
}
