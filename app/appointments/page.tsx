import { Suspense } from "react";

import AppointmentsPage from "@/components/AppointmentsPage";

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="animate-pulse container mx-auto py-5 px-2">
          <div className="mb-3">
            <div className="flex items-center gap-2 mb-3">
              {/* Arrow skeleton */}
              <div className="h-5 w-5 md:h-7 md:w-7 rounded-full bg-muted"></div>

              {/* Heading skeleton */}
              <div className="h-7 md:h-9 w-64 bg-muted rounded-md"></div>
            </div>

            {/* Paragraph skeleton */}
            <div className="h-5 w-full max-w-md bg-muted rounded-md"></div>
          </div>

          {/* CategorySelector skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {/* Generate 5 skeleton cards */}
            {Array(5)
              .fill(0)
              .map((_, index) => (
                <div
                  key={index}
                  className="bg-background  rounded-lg border border-border p-6 h-[320px]"
                >
                  <div className="flex items-center gap-4 mb-4">
                    {/* Icon skeleton */}
                    <div className="h-12 w-12 rounded-full bg-muted"></div>
                    {/* Title skeleton */}
                    <div className="h-6 w-32 bg-muted rounded-md"></div>
                  </div>

                  {/* Description skeleton */}
                  {/* <div className="space-y-2 mb-6">
                    <div className="h-4 w-full bg-muted rounded-md"></div>
                    <div className="h-4 w-full bg-muted rounded-md"></div>
                    <div className="h-4 w-3/4 bg-muted rounded-md"></div>
                  </div> */}

                  {/* Features skeleton */}
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center">
                      <div className="h-3 w-3 rounded-full bg-muted mr-2"></div>
                      <div className="h-4 w-32 bg-muted rounded-md"></div>
                    </div>
                    <div className="flex items-center">
                      <div className="h-3 w-3 rounded-full bg-muted mr-2"></div>
                      <div className="h-4 w-40 bg-muted rounded-md"></div>
                    </div>
                    <div className="flex items-center">
                      <div className="h-3 w-3 rounded-full bg-muted mr-2"></div>
                      <div className="h-4 w-36 bg-muted rounded-md"></div>
                    </div>
                  </div>

                  {/* Button skeleton */}
                  <div className="h-10 w-full bg-muted rounded-md mt-auto"></div>
                </div>
              ))}
          </div>
        </div>
      }
    >
      <AppointmentsPage />
    </Suspense>
  );
}
