interface HeroSectionProps {
  data: {
    title?: string;
    subtitle?: string;
    ctaText?: string;
    ctaLink?: string;
    backgroundImage?: string;
  };
}

export default function HeroSection({ data }: HeroSectionProps) {
  const { title, subtitle, ctaText, ctaLink, backgroundImage } = data;

  return (
    <section
      className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white py-24"
      style={
        backgroundImage
          ? {
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }
          : {}
      }
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {title && (
          <h1 className="text-5xl md:text-6xl font-bold mb-6">{title}</h1>
        )}
        {subtitle && (
          <p className="text-xl md:text-2xl mb-8 text-blue-100">{subtitle}</p>
        )}
        {ctaText && ctaLink && (
          <a
            href={ctaLink}
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition"
          >
            {ctaText}
          </a>
        )}
      </div>
    </section>
  );
}
