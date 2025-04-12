import type React from 'react'
import Image from 'next/image'

const BeforeLogin: React.FC = () => {
  return (
    <div className="flex flex-col items-center p-6 md:p-8 bg-gradient-to-br from-background to-muted/30 rounded-lg border border-border/50 shadow-sm max-w-md w-full mx-auto text-center">
      {/* Logo */}

      {/* Divider with decorative element */}
      <div className="w-full flex items-center justify-center mb-6">
        <div className="h-px bg-border flex-1"></div>
        <div className="mx-4 text-primary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-sparkles"
          >
            <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
            <path d="M5 3v4" />
            <path d="M19 17v4" />
            <path d="M3 5h4" />
            <path d="M17 19h4" />
          </svg>
        </div>
        <div className="h-px bg-border flex-1"></div>
      </div>

      {/* Welcome message */}
      <h2 className="text-2xl font-bold mb-3 text-white">Welcome to Sifmax Admin</h2>
      {/* <p className="text-muted-foreground mb-6">
        This secure portal allows authorized personnel to manage the Sifmax Beauty Parlour website,
        including services, appointments, and content. Please log in with your credentials to
        continue.
      </p> */}

      {/* Security note */}
      <div className="bg-primary/10 p-4 rounded-md text-sm text-foreground/80 w-full">
        <p className="flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2 text-primary"
          >
            <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          This area is restricted to authorized staff only
        </p>
      </div>
    </div>
  )
}

export default BeforeLogin
