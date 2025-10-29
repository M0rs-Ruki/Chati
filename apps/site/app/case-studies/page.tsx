import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "Case Studies - Chati AI | Real Success Stories",
  description:
    "See real results from businesses using Chati AI. Case studies showing 300% increase in repeat purchases, 85% appointment show-up rates, and more.",
  openGraph: {
    title: "Case Studies - Chati AI",
    description: "Real success stories from Chati AI customers.",
    type: "website",
  },
}

export default function CaseStudiesPage() {
  const caseStudies = [
    {
      id: 1,
      company: "TechStore India",
      industry: "E-commerce",
      challenge: "Low repeat purchase rate and customer engagement",
      solution: "Implemented Chati AI for personalized product recommendations and order updates via WhatsApp",
      results: [
        "300% increase in repeat purchases",
        "45% improvement in customer retention",
        "2.5x higher engagement rate",
        "₹2.5 Cr additional revenue in 6 months",
      ],
      testimonial:
        "Chati AI transformed how we engage with customers. The personalization and automation capabilities are unmatched.",
      author: "Rajesh Kumar, CEO",
    },
    {
      id: 2,
      company: "HealthPlus Clinics",
      industry: "Healthcare",
      challenge: "High appointment no-show rates and poor patient communication",
      solution: "Deployed automated appointment reminders and health tips via WhatsApp",
      results: [
        "85% appointment show-up rate (from 60%)",
        "40% reduction in operational costs",
        "Improved patient satisfaction scores",
        "Better patient compliance with follow-ups",
      ],
      testimonial:
        "The automated reminders alone saved us thousands in lost appointments. Patient satisfaction has never been better.",
      author: "Dr. Priya Sharma, Medical Director",
    },
    {
      id: 3,
      company: "Prime Properties",
      industry: "Real Estate",
      challenge: "Long sales cycles and inefficient lead management",
      solution: "Automated lead qualification and property updates through WhatsApp chatbots",
      results: [
        "50% faster lead conversion",
        "35% increase in qualified leads",
        "₹5 Cr in additional sales",
        "Reduced sales team workload by 30%",
      ],
      testimonial:
        "Chati AI's automation helped us close deals faster. Our sales team can now focus on high-value activities.",
      author: "Amit Patel, Sales Director",
    },
    {
      id: 4,
      company: "EduLearn Academy",
      industry: "Education",
      challenge: "Poor student engagement and communication gaps",
      solution: "Implemented WhatsApp for class updates, assignment reminders, and parent communication",
      results: [
        "60% improvement in assignment submission rates",
        "Better parent-teacher communication",
        "25% increase in student engagement",
        "Reduced administrative workload",
      ],
      testimonial: "Parents love the instant updates about their child's progress. It's made communication seamless.",
      author: "Ms. Neha Gupta, Principal",
    },
  ]

  return (
    <main>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-primary/5 py-20 md:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Real Results from Real <span className="text-primary">Businesses</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              See how companies across industries are using Chati AI to drive growth and improve customer engagement.
            </p>
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {caseStudies.map((study, i) => (
              <div key={i} className="bg-card border border-border rounded-lg overflow-hidden">
                <div className="grid md:grid-cols-2 gap-8 p-8">
                  <div>
                    <div className="mb-6">
                      <p className="text-sm text-primary font-semibold mb-2">{study.industry}</p>
                      <h2 className="text-3xl font-bold mb-4">{study.company}</h2>
                      <p className="text-muted-foreground mb-6">{study.challenge}</p>
                    </div>

                    <div className="mb-6">
                      <h3 className="font-semibold mb-3">Solution</h3>
                      <p className="text-muted-foreground">{study.solution}</p>
                    </div>

                    <div className="bg-primary/5 rounded-lg p-4 border border-primary/20">
                      <p className="text-sm italic mb-3">"{study.testimonial}"</p>
                      <p className="text-sm font-semibold">{study.author}</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-6">Results</h3>
                    <div className="space-y-4">
                      {study.results.map((result, j) => (
                        <div key={j} className="flex items-start gap-3">
                          <ArrowRight size={20} className="text-primary flex-shrink-0 mt-1" />
                          <span className="text-muted-foreground">{result}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 md:py-32 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Proven Impact</h2>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { stat: "500+", label: "Active Customers" },
              { stat: "2M+", label: "Messages Sent Daily" },
              { stat: "97%", label: "Average Open Rate" },
              { stat: "10-65%", label: "Average ROI Increase" },
            ].map((item, i) => (
              <div key={i} className="bg-card border border-border rounded-lg p-8 text-center">
                <div className="text-4xl font-bold text-primary mb-2">{item.stat}</div>
                <p className="text-muted-foreground">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Write Your Success Story?</h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Join hundreds of businesses achieving remarkable results with Chati AI. Start your free trial today.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/contact">Start Free Trial</Link>
          </Button>
        </div>
      </section>
    </main>
  )
}
