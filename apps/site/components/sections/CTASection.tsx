interface Theme {
  primaryColor?: string;
  secondaryColor?: string;
  accentColor?: string;
}

interface CTASectionProps {
  data: {
    title?: string;
    description?: string;
    buttonText?: string;
    buttonLink?: string;
  };
  theme?: Theme | null;
}

export default function CTASection({ data, theme }: CTASectionProps) {
  const { title, description, buttonText, buttonLink } = data;
  const primaryColor = theme?.primaryColor || "#3B82F6";
  const secondaryColor = theme?.secondaryColor || "#8B5CF6";


  return (
    <section
      className="py-16 text-white"
      style={{ backgroundColor: secondaryColor }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {title && <h2 className="text-4xl font-bold mb-4">{title}</h2>}
        {description && (
          <p className="text-xl mb-8 opacity-90">{description}</p>
        )}
        {buttonText && buttonLink && (
          <a
            href={buttonLink}
            className="inline-block bg-white px-8 py-3 rounded-lg font-semibold transition"
            style={{ color: secondaryColor }}
          >
            {buttonText}
          </a>
        )}
      </div>
    </section>
  );
}
