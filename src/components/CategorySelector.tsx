'use client'
import { Button } from '@/components/ui/button'
import { motion } from 'motion/react'
import { getIcon } from './Services'
export interface Category {
  id: string
  title: string
  description: string
  image: string
  icon: string
  features: string[]
}

interface CategorySelectorProps {
  categories: Category[]
  onSelectCategory: (categoryId: string) => void
}

export function CategorySelector({ categories, onSelectCategory }: CategorySelectorProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {categories.map((category) => (
        <motion.div
          key={category.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-background rounded-lg border border-border p-6 hover:border-primary/50 transition-colors"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-primary/10 text-primary p-3 rounded-full">
              {getIcon(category.icon)}
            </div>
            <h3 className="text-xl font-semibold">{category.title}</h3>
          </div>

          {/* <p className="text-muted-foreground mb-6 line-clamp-3">
            {category.description}
          </p> */}

          <ul className="space-y-2 mb-6">
            {category.features.map((feature, index) => (
              <li key={index} className="flex items-center text-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-primary mr-2"></span>
                {feature}
              </li>
            ))}
          </ul>

          <Button className="w-full" onClick={() => onSelectCategory(category.id)}>
            Select {category.title}
          </Button>
        </motion.div>
      ))}
    </div>
  )
}
