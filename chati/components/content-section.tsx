"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { AnimatedChatBox } from "@/components/animated-chat-box"

interface ContentSectionProps {
  title: string
  description: string
  features: string[]
  imageSrc?: string
  imageAlt?: string
  imagePosition?: "left" | "right"
  ctaText?: string
  ctaLink?: string
  gradient?: string
  useAnimatedChat?: boolean
}

export function ContentSection({
  title,
  description,
  features,
  imageSrc,
  imageAlt,
  imagePosition = "left",
  ctaText,
  ctaLink,
  gradient = "from-blue-50/30 to-green-50/30",
  useAnimatedChat = false,
}: ContentSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -100px 0px",
      },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  return (
    <section ref={sectionRef} className={`relative overflow-hidden bg-gradient-to-br ${gradient} py-16 md:py-24`}>
      <div className="container mx-auto px-4">
        <div
          className={`grid gap-8 lg:gap-12 items-center ${
            imagePosition === "right" ? "lg:grid-cols-[1fr,1fr]" : "lg:grid-cols-[1fr,1fr]"
          }`}
        >
          {/* Image Side */}
          <div
            className={`${imagePosition === "right" ? "lg:order-2" : "lg:order-1"} transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : imagePosition === "left"
                  ? "opacity-0 -translate-x-12"
                  : "opacity-0 translate-x-12"
            }`}
          >
            {useAnimatedChat ? (
              <div className="relative aspect-square rounded-2xl overflow-hidden">
                <AnimatedChatBox />
              </div>
            ) : (
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border-2 border-white/50">
                <div className="absolute inset-0 bg-gradient-to-br from-green-400/10 via-blue-400/10 to-pink-400/10 blur-xl" />
                <img
                  src={imageSrc || "/placeholder.svg"}
                  alt={imageAlt || "Feature illustration"}
                  className="relative z-10 w-full h-full object-cover"
                />
              </div>
            )}
          </div>

          {/* Content Side */}
          <div
            className={`${imagePosition === "right" ? "lg:order-1" : "lg:order-2"} transition-all duration-1000 delay-300 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-balance leading-tight">{title}</h2>
            <p className="text-lg text-muted-foreground mb-6 text-pretty leading-relaxed">{description}</p>

            <div className="space-y-3 mb-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`flex gap-3 items-start transition-all duration-500 ${
                    isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                  }`}
                  style={{ transitionDelay: `${400 + index * 100}ms` }}
                >
                  <CheckCircle2 className="h-6 w-6 shrink-0 text-green-600 mt-0.5" />
                  <span className="text-base text-foreground">{feature}</span>
                </div>
              ))}
            </div>

            {ctaText && ctaLink && (
              <Button
                size="lg"
                className="bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl transition-all"
                asChild
              >
                <Link href={ctaLink}>
                  {ctaText}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
