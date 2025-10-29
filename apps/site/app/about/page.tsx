import Link from "next/link"
import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Users, Lightbulb, Globe } from "lucide-react"

export const metadata: Metadata = {
  title: "About Chati AI - Our Story & Mission",
  description:
    "Learn about Chati AI's mission to revolutionize WhatsApp marketing. Meet our team and discover how we're empowering businesses worldwide.",
  openGraph: {
    title: "About Chati AI",
    description: "Learn about Chati AI's mission to revolutionize WhatsApp marketing.",
    type: "website",
  },
}

export default function About() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-primary/5 py-20 md:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              About <span className="text-primary">Chati AI</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Revolutionizing customer engagement through intelligent WhatsApp marketing automation
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Story</h2>
              <p className="text-lg text-muted-foreground mb-4">
                Chati AI was founded with a simple yet powerful vision: to democratize WhatsApp marketing for businesses
                of all sizes. We recognized that WhatsApp's 2 billion users represent an untapped goldmine for customer
                engagement.
              </p>
              <p className="text-lg text-muted-foreground mb-4">
                Our team of marketing technologists and AI experts came together to build a platform that makes WhatsApp
                marketing accessible, affordable, and incredibly effective. Today, we're proud to serve thousands of
                businesses across 50+ countries.
              </p>
              <p className="text-lg text-muted-foreground">
                We're not just building software—we're building relationships between businesses and their customers,
                one message at a time.
              </p>
            </div>
            <div className="relative h-96 bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg flex items-center justify-center">
              <img src="/team-collaboration-office.jpg" alt="Our Team" className="w-full h-full object-cover rounded-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-20 md:py-32 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">Our Mission & Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card border border-border rounded-lg p-8">
              <Lightbulb size={40} className="text-primary mb-4" />
              <h3 className="text-xl font-bold mb-3">Innovation First</h3>
              <p className="text-muted-foreground">
                We continuously push the boundaries of what's possible with WhatsApp marketing, leveraging AI and
                automation to deliver cutting-edge solutions.
              </p>
            </div>
            <div className="bg-card border border-border rounded-lg p-8">
              <Users size={40} className="text-primary mb-4" />
              <h3 className="text-xl font-bold mb-3">Customer Obsessed</h3>
              <p className="text-muted-foreground">
                Your success is our success. We're committed to providing exceptional support and continuously improving
                based on your feedback.
              </p>
            </div>
            <div className="bg-card border border-border rounded-lg p-8">
              <Globe size={40} className="text-primary mb-4" />
              <h3 className="text-xl font-bold mb-3">Global Impact</h3>
              <p className="text-muted-foreground">
                We're building a platform that empowers businesses worldwide to connect with their customers in
                meaningful, impactful ways.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">Meet Our Leadership</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Rajesh Kumar",
                role: "Founder & CEO",
                bio: "Former WhatsApp Business API specialist with 10+ years in marketing tech",
              },
              {
                name: "Priya Sharma",
                role: "CTO",
                bio: "AI/ML expert with background in enterprise automation and cloud infrastructure",
              },
              {
                name: "Amit Patel",
                role: "VP of Product",
                bio: "Product strategist who has scaled 3 SaaS companies to $100M+ ARR",
              },
            ].map((member, i) => (
              <div key={i} className="bg-card border border-border rounded-lg p-8 text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-primary/20 to-primary/5 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <img
                    src={`/professional-headshot-.jpg?height=96&width=96&query=professional-headshot-${i}`}
                    alt={member.name}
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                <p className="text-primary font-medium mb-3">{member.role}</p>
                <p className="text-muted-foreground">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 md:py-32 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Why Choose Chati AI</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {[
              "Official WhatsApp Business API Partner with Meta certification",
              "99.9% uptime guarantee with enterprise-grade infrastructure",
              "24/7 dedicated customer support in multiple languages",
              "GDPR, CCPA, and SOC 2 Type II compliant",
              "Transparent pricing with no hidden fees",
              "Free trial with full feature access",
            ].map((item, i) => (
              <div key={i} className="flex gap-3">
                <CheckCircle2 size={24} className="text-primary flex-shrink-0" />
                <span className="text-lg text-muted-foreground">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Customer Engagement?</h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of businesses already using Chati AI to drive growth and build lasting customer
            relationships.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/contact">Get Started Today</Link>
          </Button>
        </div>
      </section>
    </main>
  )
}
