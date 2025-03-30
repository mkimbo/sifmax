import { sifmaxServiceCategories } from "@/lib/serviceBook";
import React from "react";
import { getIcon } from "./Services";
import ServiceCategory from "./ServiceCategory";
import Link from "next/link";

type Props = {
  setStep: React.Dispatch<React.SetStateAction<number>>;
};

function ChooseCategory({ setStep }: Props) {
  const categories = sifmaxServiceCategories.map((category) => {
    return {
      ...category,
      icon: getIcon(category.icon),
    };
  });
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {categories.map((category) => (
        <Link
          href={`/appointments?category=${category.id}`}
          className="cursor-pointer"
          key={category.id}
        >
          <ServiceCategory onSelect={() => setStep(1)} {...category} />
        </Link>
      ))}
    </div>
  );
}

export default ChooseCategory;
