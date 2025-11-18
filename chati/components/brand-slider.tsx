"use client";

import { useEffect, useState } from "react";
import { CheckCircle2 } from "lucide-react";

interface LogoItem {
  url: string;
  name: string;
  theme?: "DARK" | "COLOR";
}

interface Brand {
  id: string;
  name: string;
  url: string;
  tagline?: string;
  logoUrl: LogoItem[];
}

export function BrandSlider() {
  const [brands, setBrands] = useState<LogoItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch actual data
  useEffect(() => {
    async function fetchBrands() {
      try {
        const res = await fetch("/api/public/brands");
        const json = await res.json();

        const brandData = json.data[0];
        setBrands(
          brandData.logoUrl.map((logo: LogoItem) => ({
            ...logo,
            theme: brandData.theme,
          }))
        );
      } catch (error) {
        console.error("Error fetching brands:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchBrands();
  }, []);

  if (loading) {
    return (
      <div className="py-20 text-center text-gray-500">Loading brands...</div>
    );
  }

  if (!brands.length) {
    return (
      <div className="py-20 text-center text-gray-500">No brands found.</div>
    );
  }

  return (
    <section className="w-full border-b bg-white py-12 md:py-8">
      <div className="container mx-auto px-4">
        {/* Title */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold">
            Trusted by{" "}
            <span className="relative inline-block">
              <span className="relative z-10 text-green-600">
                Leading Brands
              </span>
              <span className="absolute inset-x-0 bottom-1 h-3 bg-yellow-300/60 -z-0" />
            </span>
          </h2>
        </div>

        {/* Infinite Scroll Section */}
        <div className="relative mb-12 overflow-hidden">
          {/* Gradient Sides */}
          <div className="absolute left-0 top-0 bottom-0 w-24 md:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 md:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          <div className="flex animate-scroll-brands">
            {/* Render 3 loops for seamless scrolling */}
            {[1, 2, 3].map((setIndex) => (
              <div key={setIndex} className="flex">
                {brands.map((brand, index) => (
                  <div
                    key={`${setIndex}-${index}`}
                    className="flex flex-col items-center justify-center mx-8 md:mx-12 min-w-[140px] md:min-w-[180px]"
                  >
                    <div
                      className={`h-16 md:h-20 w-full flex items-center justify-center mb-3 transition-all duration-300 hover:scale-110
                      ${
                        brand.theme === "DARK"
                          ? "grayscale hover:grayscale-0"
                          : ""
                      }
                      `}
                    >
                      <img
                        src={brand.url}
                        alt={brand.name}
                        className="max-h-14 md:max-h-16 max-w-full object-contain aspect-auto"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = "none";
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-green-600" />
            <span className="text-sm font-medium text-gray-700">
              Works in 36 languages
            </span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-green-600" />
            <span className="text-sm font-medium text-gray-700">
              GDPR & CCPA compliant
            </span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-green-600" />
            <span className="text-sm font-medium text-gray-700">
              Free to try
            </span>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll-brands {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-100% / 3));
          }
        }

        .animate-scroll-brands {
          animation: scroll-brands 40s linear infinite;
          display: flex;
          width: max-content;
        }

        .animate-scroll-brands:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
