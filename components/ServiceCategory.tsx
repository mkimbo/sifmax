import { ChevronDown } from "lucide-react";
import Image from "next/image";
import React, { JSX } from "react";

type Props = {
  icon: JSX.Element;
  id: string;
  title: string;
  description: string;
  image: string;
  alt: string;
  features: string[];
  onSelect: () => void;
};

function ServiceCategory({
  icon,
  id,
  title,
  description,
  image,
  alt,
  features,
  onSelect,
}: Props) {
  return (
    <div
      key={id}
      className="group bg-background rounded-lg shadow-sm overflow-hidden border border-border hover:border-primary/50 transition-colors"
    >
      <div className="aspect-video relative overflow-hidden">
        <Image
          src={image || "/placeholder.svg"}
          alt={`${title} Services at Sifmax Beauty Parlour`}
          fill
          className="object-cover transition-transform group-hover:scale-105"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 flex items-center">
          <span className="bg-primary/10 text-primary p-2 rounded-full mr-3">
            {icon}
          </span>
          {title}
        </h3>
        <p className="text-muted-foreground mb-4">{description}</p>
        <ul className="space-y-2 mb-6">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center text-sm">
              <ChevronDown className="h-4 w-4 text-primary mr-2" />
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ServiceCategory;
