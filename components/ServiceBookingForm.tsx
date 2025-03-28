"use client";

import type React from "react";

import { useEffect, useState } from "react";
import {
  CalendarIcon,
  ArrowLeft,
  X,
  ArrowRight,
  Loader2,
  Check,
} from "lucide-react";
import { format } from "date-fns";
import {
  Modal,
  ModalTrigger,
  ModalBody,
  ModalContent,
  ModalFooter,
} from "./ui/animated-modal";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useServiceContext } from "@/context/service-context";
import { cn } from "@/lib/utils";
import {
  BookingFormValues,
  formSchema,
  MultiStepBookingForm,
} from "./MultiStepForm";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

type ServiceBookingFormProps = {
  onBack: () => void;
};

const timeSlots = [
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "01:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM",
  "06:00 PM",
  "07:00 PM",
  "08:00 PM",
];

export function ServiceBookingForm({ onBack }: ServiceBookingFormProps) {
  const { selectedServices, clearServices, removeService } =
    useServiceContext();

  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<BookingFormValues | null>(null);

  const [isCompleted, setIsCompleted] = useState(false);

  const methods = useForm<BookingFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: undefined,
      timeSlot: "",
      name: "",
      phone: "",
      email: "",
      notes: "",
    },
    mode: "onChange",
  });
  const { formState, watch, trigger } = methods;
  const handleComplete = () => {
    setIsCompleted(true);
  };

  if (isCompleted) {
    return (
      <div className="text-center py-8">
        <Button onClick={onBack} variant="outline" className="mt-6">
          Return to Services
        </Button>
      </div>
    );
  }

  const totalSteps = 5;

  const [date, setDate] = useState<Date>();
  const [timeSlot, setTimeSlot] = useState<string>("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  // const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      // Clear selected services after successful booking
      clearServices();
    }, 1500);
  };

  // Check if current step is valid
  const isCurrentStepValid = () => {
    switch (currentStep) {
      case 0: // Date step
        return !!watch("date");
      case 1: // Time slot step
        return !!watch("timeSlot");
      case 2: // Name step
        return !!watch("name") && !formState.errors.name;
      case 3: // Contact step
        return !!watch("phone") && !formState.errors.phone;
      case 4: // Special requests step
        return true; // Always valid as it's optional
      default:
        return false;
    }
  };

  const goToNextStep = async () => {
    const isValid = await trigger(
      currentStep === 0
        ? "date"
        : currentStep === 1
        ? "timeSlot"
        : currentStep === 2
        ? "name"
        : currentStep === 3
        ? "phone"
        : "notes"
    );

    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
    }
  };

  const goToPreviousStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  useEffect(() => {
    if (selectedServices.length === 0) {
      onBack();
    }
  }, [selectedServices]);

  if (isSubmitted) {
    return (
      <ModalContent>
        <div className="text-center py-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 text-primary mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          </div>
          <h3 className="text-2xl font-bold mb-2">Booking Confirmed!</h3>
          <p className="text-muted-foreground mb-6">
            Your appointment has been scheduled for{" "}
            {date ? format(date, "EEEE, MMMM d, yyyy") : ""} at {timeSlot}.
          </p>
          <p className="text-sm text-muted-foreground mb-6">
            A confirmation has been sent to your email. We look forward to
            seeing you!
          </p>
          <Button onClick={onBack}>Return to Services</Button>
        </div>
      </ModalContent>
    );
  }

  return (
    <FormProvider {...methods}>
      <ModalContent className="p-4">
        <div>
          <div className="mb-2 md:mb-6">
            <button
              onClick={onBack}
              className="text-primary flex items-center text-sm mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to services
            </button>

            <h3 className="text-base font-bold mb-4">
              Book Your Appointment for {` ${selectedServices[0].title}`}
            </h3>
          </div>

          <MultiStepBookingForm
            selectedServices={selectedServices}
            removeService={removeService}
            onComplete={handleComplete}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            isSubmitting={isSubmitting}
            setIsSubmitting={setIsSubmitting}
            formData={formData}
            setFormData={setFormData}
          />
        </div>
      </ModalContent>
      <ModalFooter>
        <div className="flex justify-between w-full">
          <div className="flex flex-row gap-1">
            {currentStep < totalSteps && (
              <Button
                type="button"
                variant="outline"
                onClick={goToPreviousStep}
                disabled={currentStep === 0}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
            )}

            {/* <Button type="button" variant="outline" onClick={onBack}>
              Cancel
            </Button> */}
          </div>

          {currentStep < totalSteps && (
            <div className="flex flex-row gap-1">
              {/* <Button
              type="button"
              variant="outline"
              onClick={goToPreviousStep}
              disabled={currentStep === 0}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button> */}

              {currentStep < totalSteps - 1 ? (
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
              )}
            </div>
          )}
        </div>
      </ModalFooter>
    </FormProvider>
  );
}
