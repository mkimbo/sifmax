"use client";

import { Service } from "@/components/Services";
import { createContext, useContext, useState, type ReactNode } from "react";

type ServiceContextType = {
  selectedServices: Service[];
  addService: (service: Service) => void;
  removeService: (serviceId: string) => void;
  clearServices: () => void;
  isServiceSelected: (serviceId: string) => boolean;
};

const ServiceContext = createContext<ServiceContextType | undefined>(undefined);

export function ServiceProvider({ children }: { children: ReactNode }) {
  const [selectedServices, setSelectedServices] = useState<Service[]>([]);

  const addService = (service: Service) => {
    setSelectedServices((prev) => [...prev, service]);
  };

  const removeService = (serviceId: string) => {
    setSelectedServices((prev) =>
      prev.filter((service) => service.serviceId !== serviceId)
    );
  };

  const clearServices = () => {
    setSelectedServices([]);
  };

  const isServiceSelected = (serviceId: string) => {
    return selectedServices.some((service) => service.serviceId === serviceId);
  };

  return (
    <ServiceContext.Provider
      value={{
        selectedServices,
        addService,
        removeService,
        clearServices,
        isServiceSelected,
      }}
    >
      {children}
    </ServiceContext.Provider>
  );
}

export function useServiceContext() {
  const context = useContext(ServiceContext);
  if (!context) {
    throw new Error("useServiceContext must be used within a ServiceProvider");
  }
  return context;
}
