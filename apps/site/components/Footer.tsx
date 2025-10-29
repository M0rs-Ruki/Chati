import Link from 'next/link'

interface NavItem {
  id: string
  label: string
  url: string
}

interface Theme {
  primaryColor?: string
  secondaryColor?: string
  accentColor?: string
}

interface FooterProps {
  navigation?: NavItem[]
  theme?: Theme | null
}

export default function Footer({ navigation = [], theme }: FooterProps) {
  const validNavigation = navigation.filter(
    (item) => item && item.id && item.label && item.url
  )

  const bgColor = theme?.secondaryColor || '#111827'
  const textColor = '#000000ff'
  const accentColor = theme?.accentColor || '#60A5FA'

  return (
    <footer style={{ backgroundColor: bgColor, color: textColor }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">MyWebsite</h3>
            <p className="text-black">
              Your trusted source for amazing content.
            </p>
          </div>

          {validNavigation.length > 0 && (
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {validNavigation.map((item) => (
                  <li key={item.id}>
                    <Link
                      href={item.url}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <p className="text-black">
              Email: hello@mywebsite.com<br />
              Phone: +1 (234) 567-8900
            </p>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-black">
          <p>© {new Date().getFullYear()} MyWebsite. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
