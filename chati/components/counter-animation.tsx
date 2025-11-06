"use client"

import { useEffect, useRef, useState } from "react"

interface CounterAnimationProps {
  end: number
  start?: number
  duration?: number
  suffix?: string
  className?: string
}

export function CounterAnimation({
  end,
  start = 0,
  duration = 2000,
  suffix = "",
  className = "",
}: CounterAnimationProps) {
  const [count, setCount] = useState(start)
  const [isVisible, setIsVisible] = useState(false)
  const counterRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (counterRef.current) {
      observer.observe(counterRef.current)
    }

    return () => {
      if (counterRef.current) {
        observer.unobserve(counterRef.current)
      }
    }
  }, [isVisible])

  useEffect(() => {
    if (!isVisible) return

    const startTime = Date.now()
    const range = end - start

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const currentCount = Math.floor(start + range * easeOutQuart)

      setCount(currentCount)

      if (progress === 1) {
        clearInterval(timer)
      }
    }, 16) // ~60fps

    return () => clearInterval(timer)
  }, [isVisible, start, end, duration])

  return (
    <div ref={counterRef} className={className}>
      {count.toLocaleString()}
      {suffix}
    </div>
  )
}
