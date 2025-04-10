'use client'

import { useState, useEffect } from 'react'
import { Search } from 'lucide-react'
import { cn } from '@/utilities/ui'

// Custom debounce hook
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])

  return debouncedValue
}

interface SearchBarProps {
  onSearch: (query: string) => void
  className?: string
  placeholder?: string
}

export function SearchBar({ onSearch, className, placeholder }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const debouncedSearchQuery = useDebounce(searchQuery, 300)

  useEffect(() => {
    onSearch(debouncedSearchQuery)
  }, [debouncedSearchQuery, onSearch])

  return (
    <div className={cn('relative w-full  mb-3', className)}>
      <div className="flex items-center bg-primary/10 dark:bg-primary/5 rounded-lg px-4 py-3 focus-within:bg-muted/70 transition-colors">
        <Search className="h-5 w-5 text-muted-foreground flex-shrink-0" />
        <input
          type="text"
          placeholder={
            placeholder ??
            'Search for hair styling, nail care, facials, or any other beauty service...'
          }
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-transparent border-none outline-none focus:outline-none focus:ring-0 pl-3 text-foreground placeholder:text-muted-foreground"
          aria-label="Search services"
        />
      </div>
    </div>
  )
}
