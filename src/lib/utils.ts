import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getUrlWhatsappMessage = (
  services: ({
    name: string;
  } | null)[]
) => {
  const start = "Hi, I would like the following:\n";
  const servicesString = `${services
    .map((service) => service && `${service.name}, `)
    .join("\n")}`;
  const end = "\n\nwhen are you available?";

  return encodeURI(start + servicesString + end);
};
