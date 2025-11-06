"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, ChevronDown } from "lucide-react"
import { useState } from "react"

const megaMenuItems = {
  Features: {
    sections: [
      {
        title: "Core Features",
        items: [
          { name: "AI Automation", href: "/features#automation", description: "Automate repetitive tasks" },
          { name: "Analytics", href: "/features#analytics", description: "Real-time insights" },
          { name: "Integrations", href: "/features#integrations", description: "Connect your tools" },
        ],
      },
      {
        title: "Advanced",
        items: [
          { name: "Custom Models", href: "/features#models", description: "Train your own AI" },
          { name: "API Access", href: "/features#api", description: "Developer-friendly APIs" },
          { name: "Workflows", href: "/features#workflows", description: "Build custom flows" },
        ],
      },
    ],
  },
  Industries: {
    sections: [
      {
        title: "By Industry",
        items: [
          { name: "Healthcare", href: "/industries/healthcare", description: "HIPAA-compliant solutions" },
          { name: "Finance", href: "/industries/finance", description: "Secure financial AI" },
          { name: "Retail", href: "/industries/retail", description: "Customer experience" },
          { name: "Manufacturing", href: "/industries/manufacturing", description: "Process optimization" },
        ],
      },
    ],
  },
  Resources: {
    sections: [
      {
        title: "Learn",
        items: [
          { name: "Documentation", href: "/resources/docs", description: "Complete guides" },
          { name: "Case Studies", href: "/resources/case-studies", description: "Success stories" },
          { name: "Webinars", href: "/resources/webinars", description: "Live training" },
        ],
      },
      {
        title: "Support",
        items: [
          { name: "Help Center", href: "/support", description: "Get assistance" },
          { name: "API Reference", href: "/api", description: "Technical docs" },
          { name: "Community", href: "/community", description: "Join discussions" },
        ],
      },
    ],
  },
}

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  return (
    <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-primary/60" />
            <span className="text-xl font-bold">Chati</span>
          </Link>

          {/* Desktop Navigation with Mega Menu */}
          <div className="hidden items-center gap-6 md:flex">
            {Object.entries(megaMenuItems).map(([key, value]) => (
              <div
                key={key}
                className="relative"
                onMouseEnter={() => setActiveDropdown(key)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary">
                  {key}
                  <ChevronDown className="h-4 w-4" />
                </button>

                {/* Mega Menu Dropdown */}
                {activeDropdown === key && (
                  <div className="absolute left-0 top-full pt-2">
                    <div className="w-[600px] rounded-lg border bg-background p-6 shadow-lg">
                      <div className="grid gap-6 md:grid-cols-2">
                        {value.sections.map((section) => (
                          <div key={section.title}>
                            <h3 className="mb-3 text-sm font-semibold text-muted-foreground">{section.title}</h3>
                            <div className="space-y-2">
                              {section.items.map((item) => (
                                <Link
                                  key={item.name}
                                  href={item.href}
                                  className="block rounded-md p-2 transition-colors hover:bg-muted"
                                >
                                  <div className="font-medium">{item.name}</div>
                                  <div className="text-sm text-muted-foreground">{item.description}</div>
                                </Link>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}

            <Link href="/pricing" className="text-sm font-medium transition-colors hover:text-primary">
              Pricing
            </Link>
            <Link href="/blog" className="text-sm font-medium transition-colors hover:text-primary">
              Blog
            </Link>
            <Link href="/contact" className="text-sm font-medium transition-colors hover:text-primary">
              Contact
            </Link>
          </div>

          {/* CTA Buttons */}
          <div className="hidden items-center gap-4 md:flex">
            <Button variant="ghost" asChild>
              <Link href="/login">Sign In</Link>
            </Button>
            <Button asChild>
              <Link href="/demo">Get Started</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="border-t py-4 md:hidden">
            <div className="flex flex-col gap-4">
              {Object.entries(megaMenuItems).map(([key, value]) => (
                <div key={key} className="relative">
                  <button className="flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary">
                    {key}
                    <ChevronDown className="h-4 w-4" />
                  </button>

                  {/* Mobile Mega Menu Dropdown */}
                  <div className="absolute left-0 top-full pt-2">
                    <div className="w-[600px] rounded-lg border bg-background p-6 shadow-lg">
                      <div className="grid gap-6 md:grid-cols-2">
                        {value.sections.map((section) => (
                          <div key={section.title}>
                            <h3 className="mb-3 text-sm font-semibold text-muted-foreground">{section.title}</h3>
                            <div className="space-y-2">
                              {section.items.map((item) => (
                                <Link
                                  key={item.name}
                                  href={item.href}
                                  className="block rounded-md p-2 transition-colors hover:bg-muted"
                                >
                                  <div className="font-medium">{item.name}</div>
                                  <div className="text-sm text-muted-foreground">{item.description}</div>
                                </Link>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <Link
                href="/pricing"
                className="text-sm font-medium transition-colors hover:text-primary"
                onClick={() => setMobileMenuOpen(false)}
              >
                Pricing
              </Link>
              <Link
                href="/blog"
                className="text-sm font-medium transition-colors hover:text-primary"
                onClick={() => setMobileMenuOpen(false)}
              >
                Blog
              </Link>
              <Link
                href="/contact"
                className="text-sm font-medium transition-colors hover:text-primary"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <div className="flex flex-col gap-2 pt-4">
                <Button variant="outline" asChild className="w-full bg-transparent">
                  <Link href="/login">Sign In</Link>
                </Button>
                <Button asChild className="w-full">
                  <Link href="/demo">Get Started</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
