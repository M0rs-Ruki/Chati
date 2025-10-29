interface Theme {
  primaryColor?: string
  secondaryColor?: string
  accentColor?: string
}

interface HeroSectionProps {
  data: {
    title?: string
    subtitle?: string
    ctaText?: string
    ctaLink?: string
    backgroundImage?: string
  }
  theme?: Theme | null
}

export default function HeroSection({ data, theme }: HeroSectionProps) {
  const { title, subtitle, ctaText, ctaLink, backgroundImage } = data
  const primaryColor = theme?.primaryColor || '#ffffffff'
  const secondaryColor = theme?.secondaryColor || '#8B5CF6'
  const accentColor = theme?.accentColor || '#000000ff'

  return (
    <section
      className="relative text-white py-24"
      style={
        backgroundImage
          ? {
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }
          : {
              background: `linear-gradient(to right, ${primaryColor}, ${secondaryColor})`,
            }
      }
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {title && (
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-black">{title}</h1>
        )}
        {subtitle && (
          <p className="text-xl md:text-2xl mb-8 opacity-90 text-black">{subtitle}</p>
        )}
        {ctaText && ctaLink && (
          <a
            href={ctaLink}
            className="inline-block bg-white px-8 py-3 rounded-lg font-semibold transition"
            style={{ color: secondaryColor }}
          >
            {ctaText}
          </a>
        )}
      </div>
    </section>
  )
}
