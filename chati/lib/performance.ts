// Performance monitoring utilities for tracking Core Web Vitals

export interface PerformanceMetric {
  name: string
  value: number
  rating: "good" | "needs-improvement" | "poor"
  delta: number
  id: string
}

// Core Web Vitals thresholds
const THRESHOLDS = {
  LCP: { good: 2500, poor: 4000 },
  FID: { good: 100, poor: 300 },
  CLS: { good: 0.1, poor: 0.25 },
  FCP: { good: 1800, poor: 3000 },
  TTFB: { good: 800, poor: 1800 },
  INP: { good: 200, poor: 500 },
}

function getRating(name: string, value: number): "good" | "needs-improvement" | "poor" {
  const threshold = THRESHOLDS[name as keyof typeof THRESHOLDS]
  if (!threshold) return "good"

  if (value <= threshold.good) return "good"
  if (value <= threshold.poor) return "needs-improvement"
  return "poor"
}

export function reportWebVitals(metric: PerformanceMetric) {
  // Log to console in development
  if (process.env.NODE_ENV === "development") {
    console.log("[Performance]", {
      name: metric.name,
      value: Math.round(metric.value),
      rating: metric.rating,
    })
  }

  // Send to analytics in production
  if (process.env.NODE_ENV === "production") {
    // Send to your analytics service
    // Example: Google Analytics, Vercel Analytics, etc.
    if (window.gtag) {
      window.gtag("event", metric.name, {
        value: Math.round(metric.value),
        metric_rating: metric.rating,
        metric_delta: Math.round(metric.delta),
        metric_id: metric.id,
      })
    }
  }
}

// Monitor long tasks that block the main thread
export function observeLongTasks() {
  if (typeof window === "undefined") return

  try {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.duration > 50) {
          console.warn("[Long Task]", {
            duration: Math.round(entry.duration),
            startTime: Math.round(entry.startTime),
          })
        }
      }
    })

    observer.observe({ entryTypes: ["longtask"] })
  } catch (e) {
    // PerformanceObserver not supported
  }
}

// Measure component render time
export function measureRender(componentName: string, callback: () => void) {
  const startTime = performance.now()
  callback()
  const endTime = performance.now()
  const duration = endTime - startTime

  if (duration > 16) {
    console.warn(`[Slow Render] ${componentName}: ${Math.round(duration)}ms`)
  }
}

declare global {
  interface Window {
    gtag?: (...args: any[]) => void
  }
}
