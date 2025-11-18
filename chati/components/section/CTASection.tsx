// components/CTASection.tsx
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Bell } from "lucide-react";

interface CTASectionProps {
  // Colors
  gradientFrom?: string;
  gradientVia?: string;
  gradientTo?: string;

  // Content
  title: string;
  description: string;
  footerText?: string;

  // Primary Button
  primaryButtonText: string;
  primaryButtonLink: string;
  primaryButtonIcon?: React.ReactNode;
  primaryButtonBgColor?: string;
  primaryButtonTextColor?: string;
  primaryButtonHoverBg?: string;

  // Secondary Button
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  secondaryButtonIcon?: React.ReactNode;
  showSecondaryButton?: boolean;
}

export default function CTASection({
  gradientFrom = "from-blue-600",
  gradientVia = "via-green-600",
  gradientTo = "to-blue-700",
  title,
  description,
  footerText = "No credit card required • Free 14-day trial • Cancel anytime",
  primaryButtonText,
  primaryButtonLink,
  primaryButtonIcon = (
    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
  ),
  primaryButtonBgColor = "bg-white",
  primaryButtonTextColor = "text-green-600",
  primaryButtonHoverBg = "hover:bg-gray-50",
  secondaryButtonText = "Talk to Sales",
  secondaryButtonLink = "",
  secondaryButtonIcon = <Bell className="mr-2 h-4 w-4" />,
  showSecondaryButton = true,
}: CTASectionProps) {
  return (
    <section
      className={`relative overflow-hidden bg-gradient-to-br ${gradientFrom} ${gradientVia} ${gradientTo} py-6 md:py-6`}
    >
      {/* Decorative elements for depth */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 text-balance">
            {title}
          </h2>

          <p className="text-base md:text-lg text-white/90 mb-5 max-w-2xl mx-auto text-pretty leading-relaxed">
            {description}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <Button
              size="default"
              className={`${primaryButtonBgColor} ${primaryButtonTextColor} ${primaryButtonHoverBg} font-semibold shadow-xl hover:shadow-2xl transition-all px-6 group`}
              asChild
            >
              <Link href={primaryButtonLink}>
                {primaryButtonText}
                {primaryButtonIcon}
              </Link>
            </Button>

            {showSecondaryButton && secondaryButtonLink && (
              <Button
                size="default"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white/10 font-medium shadow-lg backdrop-blur-sm px-6 bg-transparent"
                asChild
              >
                <Link href={secondaryButtonLink}>
                  {secondaryButtonIcon}
                  {secondaryButtonText}
                </Link>
              </Button>
            )}
          </div>

          {footerText && (
            <p className="mt-4 text-xs text-white/80">{footerText}</p>
          )}
        </div>
      </div>
    </section>
  );
}
