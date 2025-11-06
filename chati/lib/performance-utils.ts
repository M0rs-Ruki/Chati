export function throttle<T extends (...args: any[]) => any>(func: T, limit: number): (...args: Parameters<T>) => void {
  let inThrottle: boolean
  return function (this: any, ...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

export function debounce<T extends (...args: any[]) => any>(func: T, wait: number): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null
  return function (this: any, ...args: Parameters<T>) {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func.apply(this, args), wait)
  }
}

// Lazy load images when they enter viewport
export function lazyLoadImage(img: HTMLImageElement) {
  const src = img.dataset.src
  if (!src) return

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        img.src = src
        img.removeAttribute("data-src")
        observer.unobserve(img)
      }
    })
  })

  observer.observe(img)
}

// Preload critical resources
export function preloadCriticalResources() {
  if (typeof window === "undefined") return

  const criticalImages = ["/hero-woman-thinking.webp", "/images/design-mode/Frame%2028493.webp"]

  criticalImages.forEach((src) => {
    const link = document.createElement("link")
    link.rel = "preload"
    link.as = "image"
    link.href = src
    document.head.appendChild(link)
  })
}
