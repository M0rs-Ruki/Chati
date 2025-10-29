"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Phone, Mail, MapPin, Clock } from "lucide-react"

export default function ContactClientPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    message: "",
  })

  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the form data to your backend
    console.log("Form submitted:", formData)
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({ name: "", email: "", company: "", phone: "", message: "" })
    }, 3000)
  }

  return (
    <main>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-primary/5 py-20 md:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Get in <span className="text-primary">Touch</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {/* Contact Info */}
            <div className="md:col-span-1">
              <div className="space-y-8">
                {/* Phone */}
                <div className="flex gap-4">
                  <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary/10 flex-shrink-0">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Phone</h3>
                    <p className="text-muted-foreground">+91-9583-000-772</p>
                    <p className="text-sm text-muted-foreground">Mon-Fri, 9am-6pm IST</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex gap-4">
                  <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary/10 flex-shrink-0">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <p className="text-muted-foreground">support@chatiAI.com</p>
                    <p className="text-sm text-muted-foreground">We'll respond within 24 hours</p>
                  </div>
                </div>

                {/* Address */}
                <div className="flex gap-4">
                  <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary/10 flex-shrink-0">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Office</h3>
                    <p className="text-muted-foreground">Bangalore, India</p>
                    <p className="text-sm text-muted-foreground">Tech Hub, MG Road</p>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex gap-4">
                  <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary/10 flex-shrink-0">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Hours</h3>
                    <p className="text-muted-foreground">Monday - Friday</p>
                    <p className="text-sm text-muted-foreground">9:00 AM - 6:00 PM IST</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="md:col-span-2">
              <div className="bg-card border border-border rounded-lg p-8">
                {submitted ? (
                  <div className="text-center py-12">
                    <div className="inline-block mb-4 px-4 py-2 bg-primary/10 text-primary rounded-full">
                      ✓ Message Sent
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Thank you for reaching out!</h3>
                    <p className="text-muted-foreground">We've received your message and will get back to you soon.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium mb-2">Name</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                          placeholder="Your name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Email</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium mb-2">Company</label>
                        <input
                          type="text"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                          placeholder="Your company"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Phone</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                          placeholder="+91-XXXX-XXXX-XXX"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Message</label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                        placeholder="Tell us how we can help..."
                      />
                    </div>

                    <Button type="submit" size="lg" className="w-full">
                      Send Message
                    </Button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 md:py-32 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Quick Answers</h2>

          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                q: "What's the best way to reach your support team?",
                a: "You can reach us via phone at +91-9583-000-772, email at support@chatiAI.com, or use the contact form above. We typically respond within 24 hours.",
              },
              {
                q: "Do you offer phone support?",
                a: "Yes, we offer phone support for all customers. Enterprise customers get 24/7 phone support with a dedicated account manager.",
              },
              {
                q: "How quickly will I hear back?",
                a: "We aim to respond to all inquiries within 24 hours during business hours. Enterprise customers receive priority support.",
              },
              {
                q: "Can I schedule a demo?",
                a: "Use the contact form to request a demo, and our team will get back to you with available time slots.",
              },
            ].map((item, i) => (
              <div key={i} className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-semibold mb-2">{item.q}</h3>
                <p className="text-muted-foreground text-sm">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
