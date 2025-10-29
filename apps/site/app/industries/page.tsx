import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle2, ShoppingCart, Briefcase, Heart, GraduationCap, Home, Zap } from "lucide-react"

export const metadata: Metadata = {
  title: "Industries - Chati AI | WhatsApp Solutions for Every Sector",
  description:
    "Discover how Chati AI serves e-commerce, healthcare, real estate, education, hospitality, and utilities with tailored WhatsApp solutions.",
  openGraph: {
    title: "Industries - Chati AI",
    description: "Solutions for every industry with Chati AI.",
    type: "website",
  },
}

export default function IndustriesPage() {
  const industries = [
    {
      icon: ShoppingCart,
      name: "E-commerce",
      description: "Drive sales and customer loyalty with personalized WhatsApp marketing",
      benefits: [
        "Order updates and tracking",
        "Personalized product recommendations",
        "Flash sale notifications",
        "Customer support automation",
        "Review requests and feedback",
      ],
    },
    {
      icon: Heart,
      name: "Healthcare",
      description: "Improve patient engagement and appointment management",
      benefits: [
        "Appointment reminders",
        "Prescription updates",
        "Health tips and wellness content",
        "Telemedicine notifications",
        "Patient follow-ups",
      ],
    },
    {
      icon: Briefcase,
      name: "Real Estate",
      description: "Streamline property inquiries and lead management",
      benefits: [
        "Property listings and updates",
        "Appointment scheduling",
        "Virtual tour notifications",
        "Lead qualification",
        "Document sharing",
      ],
    },
    {
      icon: GraduationCap,
      name: "Education",
      description: "Enhance student engagement and institutional communication",
      benefits: [
        "Admission updates",
        "Class schedules and reminders",
        "Assignment notifications",
        "Exam results",
        "Parent communication",
      ],
    },
    {
      icon: Home,
      name: "Hospitality",
      description: "Elevate guest experience and booking management",
      benefits: [
        "Booking confirmations",
        "Check-in reminders",
        "Service requests",
        "Guest feedback collection",
        "Loyalty program updates",
      ],
    },
    {
      icon: Zap,
      name: "Utilities & Services",
      description: "Streamline customer communication and support",
      benefits: [
        "Bill notifications",
        "Service updates",
        "Outage alerts",
        "Support ticket tracking",
        "Payment reminders",
      ],
    },
  ]

  return (
    <main>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-primary/5 py-20 md:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Solutions for Every <span className="text-primary">Industry</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Discover how Chati AI is transforming customer engagement across industries worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* Industries Grid */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {industries.map((industry, i) => {
              const Icon = industry.icon
              return (
                <div key={i} className="bg-card border border-border rounded-lg p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary/10">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold">{industry.name}</h3>
                  </div>
                  <p className="text-muted-foreground mb-6">{industry.description}</p>
                  <ul className="space-y-3">
                    {industry.benefits.map((benefit, j) => (
                      <li key={j} className="flex items-center gap-3">
                        <CheckCircle2 size={18} className="text-primary flex-shrink-0" />
                        <span className="text-sm">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Case Studies Preview */}
      <section className="py-20 md:py-32 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Success Stories</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                company: "TechStore India",
                industry: "E-commerce",
                result: "3x increase in repeat purchases",
                quote:
                  "Chati AI helped us reach customers at the right time with personalized offers. Our repeat purchase rate increased by 300%.",
              },
              {
                company: "HealthPlus Clinics",
                industry: "Healthcare",
                result: "85% appointment show-up rate",
                quote:
                  "Automated appointment reminders reduced no-shows significantly. Our operational efficiency improved dramatically.",
              },
              {
                company: "Prime Properties",
                industry: "Real Estate",
                result: "50% faster lead conversion",
                quote:
                  "WhatsApp automation helped us qualify leads faster and close deals quicker. Our sales cycle reduced by 50%.",
              },
            ].map((study, i) => (
              <div key={i} className="bg-card border border-border rounded-lg p-8">
                <div className="mb-4">
                  <p className="text-sm text-primary font-semibold">{study.industry}</p>
                  <h3 className="text-xl font-bold mt-2">{study.company}</h3>
                </div>
                <p className="text-lg font-semibold text-primary mb-4">{study.result}</p>
                <p className="text-muted-foreground italic">"{study.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">See How Chati AI Can Transform Your Industry</h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Get a personalized demo tailored to your industry's specific needs and challenges.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/contact">Book a Demo</Link>
          </Button>
        </div>
      </section>
    </main>
  )
}
