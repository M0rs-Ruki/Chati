import Link from "next/link"
import {
  Facebook,
  Twitter,
  Linkedin,
  FileText,
  Package,
  MessageSquare,
  Monitor,
  TrendingUp,
  Shield,
  Lock,
  ShieldCheck,
  Heart,
} from "lucide-react"

export function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 border-t border-slate-800">
      {/* Subtle decorative gradient accents */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950/20 via-transparent to-slate-950/20 pointer-events-none" />

      <div className="container mx-auto px-4 py-12 md:py-16 relative z-10">
        <div className="grid gap-10 md:gap-12 lg:grid-cols-[2fr_1fr_1fr_1fr_1fr]">
          {/* Company Info with Logo */}
          <div className="lg:pr-8">
            <div className="mb-4">
              <img
                src="/chati-logo-full.png"
                alt="Chati - WhatsApp Business API Platform"
                className="h-12 w-auto mb-3"
              />
              <p className="text-sm text-slate-400 flex items-center gap-1.5">
                Made with <Heart className="h-3.5 w-3.5 text-red-500 fill-red-500 inline" /> in India
              </p>
            </div>

            <p className="text-sm text-slate-400 mb-6 max-w-sm leading-relaxed">
              Transform your business communication with AI-powered WhatsApp Business API, multi-channel messaging, and
              intelligent automation.
            </p>

            <div className="flex gap-3">
              <Link
                href="https://facebook.com"
                target="_blank"
                className="h-9 w-9 rounded-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center transition-all hover:scale-110 shadow-lg"
              >
                <Facebook className="h-4 w-4 text-white" />
              </Link>
              <Link
                href="https://twitter.com"
                target="_blank"
                className="h-9 w-9 rounded-full bg-sky-500 hover:bg-sky-600 flex items-center justify-center transition-all hover:scale-110 shadow-lg"
              >
                <Twitter className="h-4 w-4 text-white" />
              </Link>
              <Link
                href="https://linkedin.com"
                target="_blank"
                className="h-9 w-9 rounded-full bg-blue-700 hover:bg-blue-800 flex items-center justify-center transition-all hover:scale-110 shadow-lg"
              >
                <Linkedin className="h-4 w-4 text-white" />
              </Link>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold text-white mb-5 text-base">Company</h3>
            <ul className="space-y-3.5">
              <li>
                <Link
                  href="/about"
                  className="text-sm text-slate-400 hover:text-green-400 transition-colors flex items-center gap-2.5 group"
                >
                  <FileText className="h-4 w-4 text-green-500 group-hover:text-green-400 transition-colors" />
                  <span>About</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/product"
                  className="text-sm text-slate-400 hover:text-green-400 transition-colors flex items-center gap-2.5 group"
                >
                  <Package className="h-4 w-4 text-green-500 group-hover:text-green-400 transition-colors" />
                  <span>Product</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-slate-400 hover:text-green-400 transition-colors flex items-center gap-2.5 group"
                >
                  <MessageSquare className="h-4 w-4 text-green-500 group-hover:text-green-400 transition-colors" />
                  <span>Contact</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="font-semibold text-white mb-5 text-base">Product</h3>
            <ul className="space-y-3.5">
              <li>
                <Link
                  href="/features"
                  className="text-sm text-slate-400 hover:text-green-400 transition-colors flex items-center gap-2.5 group"
                >
                  <Monitor className="h-4 w-4 text-green-500 group-hover:text-green-400 transition-colors" />
                  <span>Features</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="text-sm text-slate-400 hover:text-green-400 transition-colors flex items-center gap-2.5 group"
                >
                  <TrendingUp className="h-4 w-4 text-green-500 group-hover:text-green-400 transition-colors" />
                  <span>Pricing</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-semibold text-white mb-5 text-base">Legal</h3>
            <ul className="space-y-3.5">
              <li>
                <Link
                  href="/terms"
                  className="text-sm text-slate-400 hover:text-green-400 transition-colors flex items-center gap-2.5 group"
                >
                  <Shield className="h-4 w-4 text-green-500 group-hover:text-green-400 transition-colors" />
                  <span>Terms of Use</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-slate-400 hover:text-green-400 transition-colors flex items-center gap-2.5 group"
                >
                  <Lock className="h-4 w-4 text-green-500 group-hover:text-green-400 transition-colors" />
                  <span>Privacy Policy</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/refund"
                  className="text-sm text-slate-400 hover:text-green-400 transition-colors flex items-center gap-2.5 group"
                >
                  <ShieldCheck className="h-4 w-4 text-green-500 group-hover:text-green-400 transition-colors" />
                  <span>Refund Policy</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Follow Us Links */}
          <div>
            <h3 className="font-semibold text-white mb-5 text-base">Follow Us</h3>
            <ul className="space-y-3.5">
              <li>
                <Link
                  href="https://facebook.com"
                  target="_blank"
                  className="text-sm text-slate-400 hover:text-green-400 transition-colors flex items-center gap-2.5 group"
                >
                  <Facebook className="h-4 w-4 text-green-500 group-hover:text-green-400 transition-colors" />
                  <span>Facebook</span>
                </Link>
              </li>
              <li>
                <Link
                  href="https://twitter.com"
                  target="_blank"
                  className="text-sm text-slate-400 hover:text-green-400 transition-colors flex items-center gap-2.5 group"
                >
                  <Twitter className="h-4 w-4 text-green-500 group-hover:text-green-400 transition-colors" />
                  <span>Twitter</span>
                </Link>
              </li>
              <li>
                <Link
                  href="https://linkedin.com"
                  target="_blank"
                  className="text-sm text-slate-400 hover:text-green-400 transition-colors flex items-center gap-2.5 group"
                >
                  <Linkedin className="h-4 w-4 text-green-500 group-hover:text-green-400 transition-colors" />
                  <span>LinkedIn</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-12 pt-8 border-t border-slate-800 text-center">
          <p className="text-sm text-slate-400">
            © {new Date().getFullYear()} · <span className="text-white font-medium">Chati</span> ·{" "}
            <span className="text-green-400">WhatsApp Chat-Bot Solution</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
