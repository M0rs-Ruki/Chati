'use client'

import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'

interface NavItem {
  id: string
  label: string
  url: string
}

interface HeaderProps {
  navigation?: NavItem[]
}

export default function Header({ navigation = [] }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Filter out invalid items
  const validNavigation = navigation.filter(
    (item) => item && item.id && item.label && item.url
  )

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-gray-900">
              MyWebsite
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {validNavigation.map((item) => (
              <Link
                key={item.id}
                href={item.url}
                className="text-gray-700 hover:text-gray-900 font-medium"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-700 hover:text-gray-900"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && validNavigation.length > 0 && (
          <div className="md:hidden pb-4">
            {validNavigation.map((item) => (
              <Link
                key={item.id}
                href={item.url}
                className="block py-2 text-gray-700 hover:text-gray-900 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </header>
  )
}
