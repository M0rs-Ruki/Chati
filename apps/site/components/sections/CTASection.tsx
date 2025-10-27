interface CTASectionProps {
  data: {
    title?: string
    description?: string
    buttonText?: string
    buttonLink?: string
  }
}

export default function CTASection({ data }: CTASectionProps) {
  const { title, description, buttonText, buttonLink } = data

  return (
    <section className="py-16 bg-blue-600 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {title && (
          <h2 className="text-4xl font-bold mb-4">{title}</h2>
        )}
        {description && (
          <p className="text-xl mb-8 text-blue-100">{description}</p>
        )}
        {buttonText && buttonLink && (
          <a
            href={buttonLink}
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition"
          >
            {buttonText}
          </a>
        )}
      </div>
    </section>
  )
}
