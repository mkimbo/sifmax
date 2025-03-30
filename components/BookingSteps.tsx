"use client";
import React, { useState } from "react";

import { ServiceBookingForm } from "./ServiceBookingForm";
import { useServiceContext } from "@/context/service-context";
import ChooseCategory from "./ChooseCategory";
import ChooseService from "./ChooseService";
import { getIcon } from "./Services";
import { sifmaxServiceCategories } from "@/lib/serviceBook";
import { title } from "process";

type Props = {
  category: string;
};

function BookingSteps({ category }: Props) {
  const {
    selectedServices,
    addService,
    removeService,
    bookingStep,
    isServiceSelected,
    clearServices,
  } = useServiceContext();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [step, setStep] = useState(0);

  const headerData = [
    ...sifmaxServiceCategories.map((category) => ({
      title: category.title,
      description: category.description,
      id: category.id,
      icon: category.icon,
    })),

    {
      title: "Select Appointment Date",
      description: "Choose your preferred date for your appointment",
      id: "0",
      icon: "none",
    },
    {
      title: "Select Time Slot",
      description: "Available time slots for",
      id: "1",
      icon: "none",
    },
    {
      title: "Your Name",
      description: "Please enter your full name",
      id: "2",
      icon: "none",
    },
    {
      title: "Contact Information",
      description: "How can we reach you regarding your appointment?",
      id: "3",
      icon: "none",
    },
    {
      title: "Special Requests",
      description:
        "Any special requests or notes for your appointment? (Optional)",
      id: "4",
      icon: "none",
    },
  ];

  const getCategoryData = (): {
    title: string;
    description: string;
    id: string;
    icon: string;
  } => {
    console.log("category", category, "bookingStep", bookingStep);

    switch (true) {
      case !category:
        return {
          title: "Book Your Appointment",
          description: "Which service would you like to book?",
          id: "none",
          icon: "none",
        };
      case category && selectedServices.length === 0:
        return headerData.find((cat) => cat.id === category)!;
      case category && selectedServices.length > 0:
        return headerData.find((cat) => cat.id === bookingStep.toString())!;
      default:
        return {
          title: "Book Your Appointment",
          description: "Which service would you like to book?",
          id: "none",
          icon: "none",
        };
    }
  };
  const categoryData = getCategoryData();

  return (
    <section id="booking" className="p-2">
      <div className="container mx-auto">
        <div className="max-w-5xl mx-auto">
          <div className="mb-2 md:mb-6 sticky top-16 bg-background py-2">
            <h3 className="text-2xl font-bold mb-2 flex items-center">
              {/* <span className="bg-primary/10 text-primary p-2 rounded-full mr-3">
                {categoryData?.icon == "none"
                  ? "📅"
                  : getIcon(categoryData.icon)}
              </span> */}
              {categoryData?.title}
            </h3>
            <p className="text-muted-foreground text-left">
              {categoryData?.description}
            </p>
          </div>
          {category == "" && <ChooseCategory setStep={setStep} />}
          {category != "" && <ChooseService category={category} />}
        </div>
      </div>
    </section>
  );
}

export default BookingSteps;
