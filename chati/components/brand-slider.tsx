"use client"

import { useEffect, useRef, useState } from "react"
import { CheckCircle2 } from "lucide-react"

const brands = [
  {
    name: "UTKAL BUILDERS",
    tagline: "BUILDING TRUST",
    logo: "/utkal-builders-logo.jpg",
  },
  {
    name: "SnapShot",
    logo: "/snapshot-logo.jpg",
  },
  {
    name: "26 prelude",
    tagline: "A SAP Creative Media House",
    logo: "/26-prelude-logo.jpg",
  },
  {
    name: "MiCT",
    tagline: "GROUP OF INSTITUTIONS",
    logo: "/mict-logo.jpg",
  },
  {
    name: "University",
    logo: "/university-crest-logo.jpg",
  },
]

export function BrandSlider() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    const scrollContainer = scrollRef.current
    if (!scrollContainer) return

    let animationId: number
    let scrollPosition = 0

    const scroll = () => {
      if (!isPaused && scrollContainer) {
        scrollPosition += 0.5
        if (scrollPosition >= scrollContainer.scrollWidth / 2) {
          scrollPosition = 0
        }
        scrollContainer.scrollLeft = scrollPosition
      }
      animationId = requestAnimationFrame(scroll)
    }

    animationId = requestAnimationFrame(scroll)

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [isPaused])

  return (
    <section className="border-b bg-white py-12 md:py-14">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-balance leading-tight">
            Trusted by{" "}
            <span className="relative inline-block">
              <span className="relative z-10 text-green-600">Leading Brands</span>
              <span className="absolute inset-x-0 bottom-1 h-3 bg-yellow-300/60 -z-0" />
            </span>{" "}
            Using WhatsApp Business API
          </h2>
        </div>

        <div
          ref={scrollRef}
          className="overflow-x-auto scrollbar-hide mb-10 cursor-grab active:cursor-grabbing"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          <div className="flex gap-12 md:gap-16 items-center justify-start min-w-max px-4">
            {[...brands, ...brands].map((brand, index) => (
              <div
                key={`${brand.name}-${index}`}
                className="flex flex-col items-center justify-center text-center min-w-[140px] grayscale hover:grayscale-0 transition-all duration-300"
              >
                <img
                  src={brand.logo || "/placeholder.svg"}
                  alt={brand.name}
                  className="h-12 md:h-16 w-auto object-contain mb-2"
                />
                {brand.tagline && <p className="text-xs text-muted-foreground">{brand.tagline}</p>}
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-green-600" />
            <span className="text-sm md:text-base text-muted-foreground">Works in 36 languages</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-green-600" />
            <span className="text-sm md:text-base text-muted-foreground">GDPR & CCPA-compliant</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-green-600" />
            <span className="text-sm md:text-base text-muted-foreground">Free to try</span>
          </div>
        </div>
      </div>
    </section>
  )
}
