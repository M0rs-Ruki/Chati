import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <Link
              href="/"
              className="flex items-center gap-2 font-bold text-xl"
            >
              <Image
                src="https://chati.ai/wp-content/uploads/2023/10/smal-cht.png"
                alt="Chati logo"
                width={32}
                height={32}
                className="h-10 w-10 rounded object-contain"
                priority
              />
            </Link>
            <p className="text-sm text-muted-foreground">
              The ultimate WhatsApp Business API platform for customer
              engagement and marketing automation.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/product"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="/industries"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Industries
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/about"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/resources"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Resources
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/privacy"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/docs"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Documentation
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © 2025 Chati AI. All rights reserved. Meta Business Partner.
          </p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Twitter
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Facebook
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
