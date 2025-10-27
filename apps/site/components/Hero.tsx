import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Welcome to Our Amazing Website
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            Discover content that matters. Built with Next.js and powered by our custom CMS.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/blog"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition flex items-center justify-center gap-2"
            >
              Explore Blog
              <ArrowRight size={20} />
            </Link>
            <Link
              href="/about"
              className="bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-800 transition"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
