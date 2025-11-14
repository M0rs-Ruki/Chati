import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Home,
  Search,
  ArrowLeft,
  MessageCircle,
  BookOpen,
  FileText,
} from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-green-50/30 to-white">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-10 sm:top-20 left-5 sm:left-10 w-48 sm:w-72 h-48 sm:h-72 bg-green-400/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDuration: "4s" }}
        />
        <div
          className="absolute bottom-10 sm:bottom-20 right-5 sm:right-10 w-64 sm:w-96 h-64 sm:h-96 bg-emerald-400/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDuration: "6s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-gradient-to-r from-green-400/5 to-emerald-400/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDuration: "8s" }}
        />
      </div>

      <div className="relative flex min-h-screen flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto text-center w-full">
          {/* 404 Number with Gradient */}
          <div className="mb-6 sm:mb-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <h1 className="text-[100px] sm:text-[150px] md:text-[200px] lg:text-[250px] font-bold leading-none bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent drop-shadow-sm">
              404
            </h1>
          </div>

          {/* Error Message */}
          <div className="mb-6 sm:mb-8 space-y-3 sm:space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150 px-2">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
              Oops! Page Not Found
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              The page you're looking for seems to have wandered off into the
              digital wilderness. Don't worry though – we'll help you find your
              way back!
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-12 sm:mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300 px-2">
            <Button
              size="lg"
              className="w-full sm:w-auto bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              asChild
            >
              <Link href="/">
                <Home className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Back to Home
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto border-2 hover:bg-gray-50 hover:text-green-600 transition-all duration-300 hover:scale-105"
              asChild
            >
              <Link href="/blog">
                <Search className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Browse Blog
              </Link>
            </Button>
          </div>

          {/* Helpful Links */}
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500 px-2">
            <p className="text-xs sm:text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4 sm:mb-6">
              Or explore these popular pages
            </p>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto">
              <Link href="/docs" className="block">
                <Card className="p-4 sm:p-6 hover:shadow-lg transition-all duration-300 cursor-pointer group hover:-translate-y-1 border-2 hover:border-green-300 h-full">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-lg flex items-center justify-center mb-3 sm:mb-4 mx-auto group-hover:bg-green-600 transition-colors">
                    <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="font-semibold text-sm sm:text-base text-gray-900 mb-1 group-hover:text-green-600 transition-colors">
                    Documentation
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 hidden sm:block">
                    API guides & tutorials
                  </p>
                </Card>
              </Link>

              <Link href="/blog" className="block">
                <Card className="p-4 sm:p-6 hover:shadow-lg transition-all duration-300 cursor-pointer group hover:-translate-y-1 border-2 hover:border-emerald-300 h-full">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-3 sm:mb-4 mx-auto group-hover:bg-emerald-600 transition-colors">
                    <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="font-semibold text-sm sm:text-base text-gray-900 mb-1 group-hover:text-emerald-600 transition-colors">
                    Blog
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 hidden sm:block">
                    Latest insights & tips
                  </p>
                </Card>
              </Link>

              <Link href="/pricing" className="block">
                <Card className="p-4 sm:p-6 hover:shadow-lg transition-all duration-300 cursor-pointer group hover:-translate-y-1 border-2 hover:border-teal-300 h-full">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-3 sm:mb-4 mx-auto group-hover:bg-teal-600 transition-colors">
                    <svg
                      className="w-5 h-5 sm:w-6 sm:h-6 text-teal-600 group-hover:text-white transition-colors"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                      />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-sm sm:text-base text-gray-900 mb-1 group-hover:text-teal-600 transition-colors">
                    Pricing
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 hidden sm:block">
                    Plans & features
                  </p>
                </Card>
              </Link>

              <Link href="/contact" className="block">
                <Card className="p-4 sm:p-6 hover:shadow-lg transition-all duration-300 cursor-pointer group hover:-translate-y-1 border-2 hover:border-green-300 h-full">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-lg flex items-center justify-center mb-3 sm:mb-4 mx-auto group-hover:bg-green-600 transition-colors">
                    <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="font-semibold text-sm sm:text-base text-gray-900 mb-1 group-hover:text-green-600 transition-colors">
                    Contact
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 hidden sm:block">
                    Get in touch
                  </p>
                </Card>
              </Link>
            </div>
          </div>

          {/* Help Text */}
          <div className="mt-8 sm:mt-12 animate-in fade-in duration-700 delay-700 px-2">
            <p className="text-xs sm:text-sm text-gray-500">
              Still can't find what you're looking for?{" "}
              <Link
                href="/contact"
                className="text-green-600 hover:text-green-700 font-medium underline underline-offset-4 hover:underline-offset-2 transition-all"
              >
                Contact our support team
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Bottom CTA Section */}
      <section className="py-12 sm:py-16 bg-gradient-to-br from-green-600 to-emerald-700 text-white relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute top-0 left-0 w-64 sm:w-96 h-64 sm:h-96 bg-white rounded-full blur-3xl animate-pulse"
            style={{ animationDuration: "3s" }}
          />
          <div
            className="absolute bottom-0 right-0 w-64 sm:w-96 h-64 sm:h-96 bg-green-300 rounded-full blur-3xl animate-pulse"
            style={{ animationDuration: "4s" }}
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-base sm:text-lg text-green-100 mb-6 sm:mb-8 max-w-2xl mx-auto">
            Transform your customer communication with WhatsApp Business API
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center max-w-md sm:max-w-none mx-auto">
            <Button
              size="lg"
              variant="secondary"
              className="w-full sm:w-auto bg-white text-green-600 hover:bg-gray-100 font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
              asChild
            >
              <Link
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`}
              >
                Start Free Trial
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto border-2 border-white text-white hover:bg-white hover:text-green-600 bg-transparent font-semibold transition-all duration-300 hover:scale-105"
              asChild
            >
              <Link href="/pricing">View Pricing</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
