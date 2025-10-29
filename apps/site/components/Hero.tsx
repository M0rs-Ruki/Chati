import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

interface Theme {
  primaryColor?: string
  secondaryColor?: string
  accentColor?: string
}

interface HeroProps {
  theme?: Theme | null
}

export default function Hero({ theme }: HeroProps) {
  const primaryColor = theme?.primaryColor || '#3B82F6'
  const secondaryColor = theme?.secondaryColor || '#8B5CF6'
  const accentColor = theme?.accentColor || '#10B981'

  return (
    <section 
      className="text-white"
      style={{
        background: `linear-gradient(to right, ${primaryColor}, ${secondaryColor})`
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-black">
            Welcome to Our Amazing Website
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 text-black">
            Discover content that matters. Built with Next.js and powered by our custom CMS.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center ">
            <Link
              href="/blog"
              className="px-8 py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2"
              style={{
                backgroundColor: secondaryColor,
                color: primaryColor,
              }}
            >
              Explore Blog
              <ArrowRight size={20} />
            </Link>
            <Link
              href="/about"
              className="px-8 py-3 rounded-lg font-semibold transition"
              style={{
                backgroundColor: secondaryColor,
                color: primaryColor,
              }}
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
