interface Feature {
  icon?: string
  title: string
  description: string
}

interface Theme {
  primaryColor?: string
  secondaryColor?: string
  accentColor?: string
}

interface FeaturesSectionProps {
  data: {
    title?: string
    subtitle?: string
    features?: Feature[]
  }
  theme?: Theme | null
}

export default function FeaturesSection({ data, theme }: FeaturesSectionProps) {
  const { title, subtitle, features = [] } = data
  const primaryColor = theme?.primaryColor || '#3B82F6'
  const secondaryColor = theme?.secondaryColor || '#8B5CF6'
  const accentColor = theme?.accentColor || '#10B981'

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {title && (
          <div className="text-center mb-12">
            <h2 
              className="text-4xl font-bold mb-4"
              style={{ color: secondaryColor }}
            >
              {title}
            </h2>
            {subtitle && (
              <p className="text-xl text-gray-600">{subtitle}</p>
            )}
          </div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition border-t-4"
              style={{ borderTopColor: accentColor }}
            >
              {feature.icon && (
                <div 
                  className="text-4xl mb-4"
                  style={{ color: primaryColor }}
                >
                  {feature.icon}
                </div>
              )}
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
