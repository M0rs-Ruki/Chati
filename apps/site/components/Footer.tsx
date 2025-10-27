import Link from 'next/link'

interface NavItem {
  id: string
  label: string
  url: string
}

interface FooterProps {
  navigation?: NavItem[]
}

export default function Footer({ navigation = [] }: FooterProps) {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold mb-4">MyWebsite</h3>
            <p className="text-gray-400">
              Your trusted source for amazing content.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {navigation.map((item) => (
                <li key={item.id}>
                  <Link
                    href={item.url}
                    className="text-gray-400 hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <p className="text-gray-400">
              Email: hello@mywebsite.com<br />
              Phone: +1 234 567 890
            </p>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>© {new Date().getFullYear()} MyWebsite. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
