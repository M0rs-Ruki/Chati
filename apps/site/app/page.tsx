import Link from "next/link"
import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { CheckCircle2, BarChart3, Zap, Shield } from "lucide-react"

export const metadata: Metadata = {
  title: "Chati AI - WhatsApp Marketing Platform | Official WhatsApp Business API",
  description:
    "Power up your marketing momentum with Chati AI, the ultimate WhatsApp Business API platform for customer engagement and automation. 97% open rates, 10-65% ROI increase.",
  openGraph: {
    title: "Chati AI - WhatsApp Marketing Platform",
    description: "Power up your marketing momentum with Chati AI, the ultimate WhatsApp Business API platform.",
    type: "website",
  },
}

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-primary/5 py-20 md:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block mb-4 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                Powered by Official WhatsApp Business API
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Chati AI: The Ultimate <span className="text-primary">WhatsApp</span> Marketing Platform.
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Power up your marketing momentum with dashboard-driven tools to grow presence and influence across the
                WhatsApp realm.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild>
                  <Link href="/contact">Get Started for FREE</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/contact">Book a Live Demo Today</Link>
                </Button>
              </div>
            </div>
            <div className="relative h-96 bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg flex items-center justify-center">
              <img
                src="/woman-with-phone-whatsapp-marketing.jpg"
                alt="WhatsApp Marketing Dashboard"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm font-medium text-muted-foreground mb-8">
            Trusted by innovative businesses driving growth in emerging markets.
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {["Snowflake", "Cactus", "Bureau", "Blossom"].map((brand) => (
              <div
                key={brand}
                className="h-12 bg-muted rounded flex items-center justify-center px-6 text-sm font-medium text-muted-foreground"
              >
                {brand}
              </div>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-6 mt-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-primary" />
              Works in 36 languages
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-primary" />
              GDPR & CCPA-compliant
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-primary" />
              Free to try
            </div>
          </div>
        </div>
      </section>

      {/* Value Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Engaging Prospects Amplified: The Edge of <span className="text-primary">WhatsApp Business API</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Boost prospect engagement with the WhatsApp Business API. Build meaningful connections that drive
                unmatched growth through enhanced customer interactions. Step into the future of marketing with Chati
                AI—today.
              </p>
              <ul className="space-y-4">
                {[
                  "Grow your business with confidence, knowing that the dashboard can accommodate increased marketing demands.",
                  "Seamlessly integrate your WhatsApp marketing efforts with other channels, creating a unified customer experience.",
                  "Monitor the bulk whatsapp conversion journey of customers, identifying key touch points for optimization.",
                ].map((item, i) => (
                  <li key={i} className="flex gap-3">
                    <CheckCircle2 size={20} className="text-primary flex-shrink-0 mt-1" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative h-96 bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg flex items-center justify-center">
              <img
                src="/dashboard-analytics-whatsapp.jpg"
                alt="Dashboard Analytics"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-6 mb-20">
            <div className="bg-card border border-border rounded-lg p-8 text-center">
              <div className="text-4xl font-bold text-primary mb-2">2M+</div>
              <p className="text-muted-foreground">Active Users</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-8 text-center">
              <div className="text-4xl font-bold text-primary mb-2">97%</div>
              <p className="text-muted-foreground">Open Rates</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-8 text-center">
              <div className="text-4xl font-bold text-primary mb-2">10-65%</div>
              <p className="text-muted-foreground">Increase ROI</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Preview */}
      <section className="py-20 md:py-32 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Why Choose Chati AI</h2>
          <p className="text-center text-lg text-muted-foreground mb-16 max-w-2xl mx-auto">
            Navigate your digital journey confidently with WhatsApp, where valuable updates and reliable support
            converge seamlessly.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Zap, title: "Team Inbox", desc: "Multi-agent support with smart routing" },
              { icon: BarChart3, title: "Analytics", desc: "Advanced campaign performance tracking" },
              { icon: Shield, title: "Automation", desc: "No-code workflow builders & chatbots" },
              { icon: CheckCircle2, title: "Templates", desc: "Pre-approved, localized messaging" },
            ].map((feature, i) => {
              const Icon = feature.icon
              return (
                <div key={i} className="bg-card border border-border rounded-lg p-6">
                  <Icon size={32} className="text-primary mb-4" />
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Engage customers 3× more with Bulk WhatsApp</h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Supercharge your business growth with trusted, Meta-approved messaging automation. Chati AI's Verified
            WhatsApp Business API boosts engagement and is tailored for high-impact customer journeys.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/contact">Start Your Free Trial</Link>
          </Button>
        </div>
      </section>
    </main>
  )
}
