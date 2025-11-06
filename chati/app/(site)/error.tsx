"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="text-6xl font-bold">500</h1>
      <h2 className="mt-4 text-2xl">Something went wrong</h2>
      <p className="mt-2 text-muted-foreground">{"We're sorry for the inconvenience. Please try again."}</p>
      <Button onClick={reset} className="mt-8">
        Try Again
      </Button>
    </div>
  )
}
