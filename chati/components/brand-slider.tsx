"use client";

import { useEffect, useRef, useState } from "react";
import { CheckCircle2 } from "lucide-react";

interface LogoItem {
  name: string;
  url: string;
}

interface Brand {
  name: string;
  logos: LogoItem[];
  tagline?: string;
}

interface BrandSliderProps {
  dataSource?: "demo" | "real" | "both" | "real-first";
  customBrands?: Brand[];
  maxBrands?: number;
}

// Demo Data
const demoBrands: Brand[] = [
  {
    name: "UTKAL BUILDERS",
    tagline: "BUILDING TRUST",
    logos: [{ name: "default", url: "/utkal-builders-logo.png" }],
  },
  {
    name: "SnapShot",
    logos: [{ name: "default", url: "/logo-blue-2015-Transparent.png" }],
  },
  {
    name: "26 prelude",
    tagline: "A SAP Creative Media House",
    logos: [{ name: "default", url: "/26-prelude-logo.png" }],
  },
  {
    name: "MiCT",
    tagline: "GROUP OF INSTITUTIONS",
    logos: [{ name: "default", url: "/MICT-LOGO-new-10.png" }],
  },
  {
    name: "University",
    logos: [{ name: "default", url: "/university-crest-logo.png" }],
  },
];

export function BrandSlider({
  dataSource = "both",
  customBrands,
  maxBrands = 0,
}: BrandSliderProps = {}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [brands, setBrands] = useState<Brand[]>(customBrands || demoBrands);
  const [isLoading, setIsLoading] = useState(dataSource !== "demo");

  // fetch brands
  useEffect(() => {
    if (customBrands) {
      setBrands(customBrands);
      setIsLoading(false);
      return;
    }

    if (dataSource === "demo") {
      setBrands(demoBrands);
      setIsLoading(false);
      return;
    }

    const load = async () => {
      try {
        setIsLoading(true);
        const res = await fetch("/api/public/brands");
        const json = await res.json();

        let apiBrands: Brand[] = [];

        if (res.ok && json.data) {
          apiBrands = json.data.map((b: any) => ({
            name: b.name,
            tagline: b.tagline || undefined,
            logos:
              Array.isArray(b.logoUrl) && b.logoUrl.length > 0
                ? b.logoUrl.map((item: any) => ({
                    name: item.name || b.name,
                    url: item.url,
                  }))
                : [{ name: b.name, url: "/placeholder.svg" }],
          }));
        }

        let finalList: Brand[] = [];

        if (dataSource === "real") {
          finalList = apiBrands.length ? apiBrands : demoBrands;
        } else if (dataSource === "real-first") {
          finalList = apiBrands.length ? apiBrands : demoBrands;
        } else if (dataSource === "both") {
          const map = new Map<string, Brand>();

          demoBrands.forEach((b) => map.set(b.name.toLowerCase(), b));
          apiBrands.forEach((b) => map.set(b.name.toLowerCase(), b));

          finalList = Array.from(map.values());
        }

        if (maxBrands > 0) finalList = finalList.slice(0, maxBrands);

        setBrands(finalList.length ? finalList : demoBrands);
      } catch {
        setBrands(demoBrands);
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, [dataSource, customBrands, maxBrands]);

  // Infinite scroll
  useEffect(() => {
    const root = scrollRef.current;
    if (!root || brands.length === 0) return;

    let frame: number;
    let pos = 0;

    const tick = () => {
      if (!isPaused) {
        pos += 0.4;
        if (pos >= root.scrollWidth / 2) pos = 0;
        root.scrollLeft = pos;
      }
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frame);
  }, [brands, isPaused]);

  // logo rotation timer
  useEffect(() => {
    const timers: number[] = [];

    brands.forEach((brand, idx) => {
      if (brand.logos.length <= 1) return;

      const rotate = () => {
        setBrands((prev) => {
          const copy = [...prev];
          const item = { ...copy[idx] };
          item.logos = [...item.logos.slice(1), item.logos[0]];
          copy[idx] = item;
          return copy;
        });
      };

      const id = window.setInterval(rotate, 3000);
      timers.push(id);
    });

    return () => timers.forEach(clearInterval);
  }, [brands.length]);

  return (
    <section className="border-b bg-white py-12 md:py-14">
      <div className="container mx-auto px-4">
        {/* Title */}
        <div className="mb-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold">
            Trusted by{" "}
            <span className="relative inline-block">
              <span className="relative z-10 text-green-600">
                Leading Brands
              </span>
              <span className="absolute inset-x-0 bottom-1 h-3 bg-yellow-300/60 -z-0" />
            </span>
          </h2>
        </div>

        {/* Slider */}
        <div
          ref={scrollRef}
          className="overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing mb-10"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {isLoading ? (
            <div className="py-8 text-center text-gray-500">Loading...</div>
          ) : brands.length === 0 ? (
            <div className="py-8 text-center text-gray-500">
              No brands available
            </div>
          ) : (
            <div className="flex gap-12 md:gap-16 min-w-max px-4">
              {[...brands, ...brands].map((brand, i) => (
                <div
                  key={brand.name + i}
                  className="flex flex-col items-center text-center min-w-[140px] grayscale hover:grayscale-0 transition-all"
                >
                  <img
                    src={brand.logos[0]?.url || "/placeholder.svg"}
                    alt={brand.name}
                    className="h-12 md:h-16 object-contain mb-2"
                    onError={(e) => {
                      const t = e.target as HTMLImageElement;
                      t.src = "/placeholder.svg";
                    }}
                  />

                  {brand.tagline && (
                    <p className="text-xs text-gray-600">{brand.tagline}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Badges */}
        <div className="flex flex-wrap justify-center gap-8">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-green-600" />
            <span className="text-sm">Works in 36 languages</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-green-600" />
            <span className="text-sm">GDPR & CCPA-compliant</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-green-600" />
            <span className="text-sm">Free to try</span>
          </div>
        </div>
      </div>
    </section>
  );
}
