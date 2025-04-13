'use client'

import { useState } from 'react'
import { Check, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { motion } from 'motion/react'
import { Service } from './Services'
import { cn } from '@/utilities/ui'

interface ServicesListProps {
  services: Service[]
  onSelectService: (service: Service) => void
  singleSelection?: boolean
}

export function ServicesList({
  services,
  onSelectService,
  singleSelection = false,
}: ServicesListProps) {
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null)

  const handleServiceSelect = (service: Service) => {
    setSelectedServiceId(service.id)
    onSelectService(service)
  }

  if (services.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No services found for this category.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Object.entries(
        services.reduce((acc: Record<string, Service[]>, service) => {
          const category = service.subCategory || service.category
          if (!acc[category]) {
            acc[category] = []
          }
          acc[category].push(service)
          return acc
        }, {}),
      )
        .sort(([, servicesA], [, servicesB]) => servicesB.length - servicesA.length)
        .map(([category, services], index, array) => (
          <div
            key={category}
            className="w-full bg-primary/10 dark:bg-primary/5 p-3 md:p-6 rounded-lg mb-4"
          >
            {array.length > 1 && (
              <h4 className="font-medium text-lg text-center mb-3">{category}</h4>
            )}
            {services.map((service) => {
              const isSelected = service.id === selectedServiceId

              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={cn(
                    'bg-background rounded-lg border p-2 transition-colors flex flex-col mb-3 md:mb-6',
                    isSelected
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/30',
                  )}
                >
                  <div className="flex justify-between items-start mb-2 text-sm md:text-base">
                    <h4 className="font-medium text-muted-foreground">{service.name}</h4>
                    <div className="flex flex-col items-end min-w-fit">
                      <span className="font-semibold text-primary text-xs ">{service.price}</span>
                      <span className="text-xs text-muted-foreground flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {service.duration >= 60
                          ? `${Math.floor(service.duration / 60)}h ${service.duration % 60 > 0 ? `${service.duration % 60}min` : ''}`
                          : `${service.duration}min`}
                      </span>
                    </div>
                  </div>

                  <Button
                    size="sm"
                    variant={isSelected ? 'default' : 'outline'}
                    className="w-full mt-auto"
                    onClick={() => handleServiceSelect(service)}
                  >
                    {isSelected ? (
                      <>
                        <Check className="h-4 w-4 mr-2" />
                        Selected
                      </>
                    ) : (
                      'Book Service'
                    )}
                  </Button>
                </motion.div>
              )
            })}
          </div>
        ))}
    </div>
  )
}
