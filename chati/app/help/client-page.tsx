"use client"

import type React from "react"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Search,
  HelpCircle,
  MessageSquare,
  Mail,
  Phone,
  BookOpen,
  Settings,
  CreditCard,
  AlertCircle,
  Rocket,
  Shield,
  Users,
  Zap,
  ChevronRight,
  ExternalLink,
  CheckCircle2,
  Send,
} from "lucide-react"
import Link from "next/link"

const helpCategories = [
  {
    id: "getting-started",
    title: "Getting Started",
    icon: Rocket,
    description: "Learn the basics and set up your account",
    color: "blue",
    articleCount: 12,
  },
  {
    id: "account-management",
    title: "Account & Settings",
    icon: Settings,
    description: "Manage your account, profile, and preferences",
    color: "purple",
    articleCount: 8,
  },
  {
    id: "billing",
    title: "Billing & Pricing",
    icon: CreditCard,
    description: "Understand pricing, invoices, and payments",
    color: "green",
    articleCount: 10,
  },
  {
    id: "technical",
    title: "Technical Issues",
    icon: AlertCircle,
    description: "Troubleshoot common technical problems",
    color: "red",
    articleCount: 15,
  },
  {
    id: "integration",
    title: "Integration & API",
    icon: Zap,
    description: "Connect with third-party tools and APIs",
    color: "yellow",
    articleCount: 18,
  },
  {
    id: "security",
    title: "Security & Privacy",
    icon: Shield,
    description: "Data protection and security best practices",
    color: "indigo",
    articleCount: 7,
  },
]

const faqs = [
  {
    category: "getting-started",
    question: "How do I create a WhatsApp Business API account?",
    answer:
      "To create a WhatsApp Business API account, you need to first sign up on our platform, verify your business details, and submit your application for WhatsApp approval. The process typically takes 1-3 business days. You'll need a verified business phone number, business documentation, and a Facebook Business Manager account.",
  },
  {
    category: "getting-started",
    question: "What are the requirements for using WhatsApp Business API?",
    answer:
      "You need: 1) A verified business phone number (not currently used on WhatsApp), 2) A Facebook Business Manager account, 3) Valid business documentation, 4) A website or app for your business, and 5) Compliance with WhatsApp's Commerce and Business Policies.",
  },
  {
    category: "getting-started",
    question: "How long does the approval process take?",
    answer:
      "The WhatsApp Business API approval process typically takes 1-3 business days. However, it can take up to 7 days in some cases. You'll receive email notifications about your application status. Make sure all your business information is accurate to avoid delays.",
  },
  {
    category: "billing",
    question: "What payment methods do you accept?",
    answer:
      "We accept major credit cards (Visa, Mastercard, American Express), debit cards, and bank transfers for enterprise plans. All payments are processed securely through our payment partners. You can manage your payment methods in the Billing section of your account.",
  },
  {
    category: "billing",
    question: "How does WhatsApp Business API pricing work?",
    answer:
      "WhatsApp charges per conversation, not per message. A conversation is a 24-hour session that starts when you send a message or when a customer messages you. Business-initiated conversations and user-initiated conversations have different rates. Check our pricing page for detailed information.",
  },
  {
    category: "billing",
    question: "Can I upgrade or downgrade my plan?",
    answer:
      "Yes, you can upgrade or downgrade your plan at any time from your account settings. Upgrades take effect immediately, while downgrades take effect at the start of your next billing cycle. Any unused credits will be prorated.",
  },
  {
    category: "technical",
    question: "Why are my messages not being delivered?",
    answer:
      "Messages may not be delivered due to: 1) Invalid phone numbers, 2) Users blocking your number, 3) Rate limiting (sending too many messages), 4) Template message not approved, or 5) Account suspension. Check your message logs and ensure you're following WhatsApp's messaging policies.",
  },
  {
    category: "technical",
    question: "How do I troubleshoot webhook issues?",
    answer:
      "For webhook issues: 1) Verify your webhook URL is publicly accessible, 2) Check that your server returns a 200 status code, 3) Ensure your webhook verification token matches, 4) Review webhook logs for errors, and 5) Test with webhook testing tools. Contact support if issues persist.",
  },
  {
    category: "technical",
    question: "What should I do if my API calls are failing?",
    answer:
      "If API calls are failing: 1) Check your API credentials and access token, 2) Verify the endpoint URL is correct, 3) Review error messages in the response, 4) Check rate limits, 5) Ensure request format matches API documentation. Use our API testing tools to diagnose issues.",
  },
  {
    category: "integration",
    question: "How do I integrate with my CRM system?",
    answer:
      "We offer native integrations with popular CRMs like Salesforce, HubSpot, and Zoho. You can also use our REST API or webhooks for custom integrations. Check our Integration Hub for step-by-step guides, or contact our integration team for assistance with custom setups.",
  },
  {
    category: "integration",
    question: "Can I use WhatsApp Business API with multiple phone numbers?",
    answer:
      "Yes, you can manage multiple phone numbers under a single account. Each phone number requires separate WhatsApp approval and has its own message templates and settings. This is useful for managing different departments, regions, or brands.",
  },
  {
    category: "integration",
    question: "How do I set up automated responses?",
    answer:
      "Set up automated responses using our chatbot builder or automation workflows. You can create rule-based responses, AI-powered chatbots, or integrate with your existing automation tools. Visit the Automation section in your dashboard to get started.",
  },
  {
    category: "security",
    question: "How is my data protected?",
    answer:
      "We use industry-standard encryption (TLS 1.2+) for data in transit and AES-256 encryption for data at rest. All data is stored in secure, SOC 2 compliant data centers. We never share your data with third parties without your explicit consent and comply with GDPR, CCPA, and other privacy regulations.",
  },
  {
    category: "security",
    question: "How do I enable two-factor authentication?",
    answer:
      "Enable 2FA in your account security settings. You can use authenticator apps (Google Authenticator, Authy) or SMS-based verification. We strongly recommend enabling 2FA for all team members to protect your account from unauthorized access.",
  },
  {
    category: "account-management",
    question: "How do I add team members to my account?",
    answer:
      "Go to Settings > Team Management and click 'Invite Team Member'. Enter their email address and assign a role (Admin, Manager, or Agent). They'll receive an invitation email to join your account. You can manage permissions and access levels for each team member.",
  },
  {
    category: "account-management",
    question: "Can I transfer my account to another owner?",
    answer:
      "Yes, account ownership can be transferred. Contact our support team with details about the current and new owner. Both parties will need to verify the transfer for security purposes. Note that billing information and payment methods will need to be updated by the new owner.",
  },
]

const quickLinks = [
  { title: "API Documentation", href: "/docs", icon: BookOpen },
  { title: "Video Tutorials", href: "/tutorials", icon: BookOpen },
  { title: "Community Forum", href: "/community", icon: Users },
  { title: "Status Page", href: "/status", icon: CheckCircle2 },
]

export default function HelpCenterPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    category: "",
    message: "",
  })

  const filteredFaqs = useMemo(() => {
    let filtered = faqs

    if (selectedCategory) {
      filtered = filtered.filter((faq) => faq.category === selectedCategory)
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (faq) => faq.question.toLowerCase().includes(query) || faq.answer.toLowerCase().includes(query),
      )
    }

    return filtered
  }, [searchQuery, selectedCategory])

  const leftColumnFaqs = filteredFaqs.filter((_, index) => index % 2 === 0)
  const rightColumnFaqs = filteredFaqs.filter((_, index) => index % 2 === 1)

  const selectedCategoryData = helpCategories.find((cat) => cat.id === selectedCategory)

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Contact form submitted:", contactForm)
    setIsContactModalOpen(false)
    setContactForm({
      name: "",
      email: "",
      subject: "",
      category: "",
      message: "",
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-green-50/30 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600 text-white py-16 md:py-24">
        <div className="absolute inset-0 bg-grid-white/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-green-600/50 to-transparent" />

        <div className="container relative mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-white/20 text-white border-white/30 hover:bg-white/30">
              <HelpCircle className="w-3.5 h-3.5 mr-1.5" />
              Help Center
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance">How can we help you?</h1>
            <p className="text-xl text-green-100 mb-10 max-w-3xl mx-auto leading-relaxed">
              Search our knowledge base for answers, guides, and troubleshooting tips
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search for help articles, FAQs, guides..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-6 text-lg bg-white text-gray-900 border-0 shadow-xl rounded-xl focus-visible:ring-2 focus-visible:ring-white"
                />
              </div>
              {searchQuery && (
                <p className="text-sm text-green-100 mt-3">
                  Found {filteredFaqs.length} {filteredFaqs.length === 1 ? "result" : "results"}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-8 border-b bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {quickLinks.map((link) => (
              <Button key={link.title} variant="outline" className="gap-2 bg-transparent" asChild>
                <Link href={link.href}>
                  <link.icon className="w-4 h-4" />
                  {link.title}
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          {/* Categories Grid */}
          {!searchQuery && !selectedCategory && (
            <div className="mb-16">
              <h2 className="text-3xl font-bold mb-8 text-center">Browse by Topic</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {helpCategories.map((category) => {
                  const Icon = category.icon
                  const colorClasses = {
                    blue: "from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700",
                    purple: "from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700",
                    green: "from-green-500 to-green-600 hover:from-green-600 hover:to-green-700",
                    red: "from-red-500 to-red-600 hover:from-red-600 hover:to-red-700",
                    yellow: "from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700",
                    indigo: "from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700",
                  }

                  return (
                    <Card
                      key={category.id}
                      className="group cursor-pointer overflow-hidden hover:shadow-xl transition-all duration-300 border-0"
                      onClick={() => setSelectedCategory(category.id)}
                    >
                      <div
                        className={`h-2 bg-gradient-to-r ${colorClasses[category.color as keyof typeof colorClasses]}`}
                      />
                      <div className="p-6">
                        <div className="w-14 h-14 bg-gradient-to-br from-gray-100 to-gray-50 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                          <Icon className="w-7 h-7 text-gray-700" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2 group-hover:text-green-600 transition-colors">
                          {category.title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-4">{category.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">{category.articleCount} articles</span>
                          <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-green-600 group-hover:translate-x-1 transition-all" />
                        </div>
                      </div>
                    </Card>
                  )
                })}
              </div>
            </div>
          )}

          {!searchQuery && selectedCategory && (
            <div className="mb-8 flex flex-wrap gap-2 justify-center">
              <Button variant="outline" size="sm" onClick={() => setSelectedCategory(null)} className="bg-white">
                All Topics
              </Button>
              {helpCategories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className={selectedCategory === category.id ? "bg-green-600 hover:bg-green-700" : "bg-white"}
                >
                  {category.title}
                </Button>
              ))}
            </div>
          )}

          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold mb-2">
                  {selectedCategory ? selectedCategoryData?.title : "Frequently Asked Questions"}
                </h2>
                {selectedCategory && <p className="text-gray-600">{selectedCategoryData?.description}</p>}
              </div>
              {selectedCategory && (
                <Button variant="ghost" onClick={() => setSelectedCategory(null)}>
                  View All
                </Button>
              )}
            </div>

            {filteredFaqs.length === 0 ? (
              <Card className="p-12 text-center">
                <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No results found</h3>
                <p className="text-gray-600 mb-6">
                  We couldn't find any articles matching your search. Try different keywords or browse by category.
                </p>
                <Button
                  onClick={() => {
                    setSearchQuery("")
                    setSelectedCategory(null)
                  }}
                >
                  Clear Search
                </Button>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-4">
                  <Accordion type="single" collapsible className="space-y-4">
                    {leftColumnFaqs.map((faq, index) => (
                      <AccordionItem
                        key={index * 2}
                        value={`item-${index * 2}`}
                        className="border rounded-lg px-6 bg-white shadow-sm hover:shadow-md transition-shadow"
                      >
                        <AccordionTrigger className="text-left hover:no-underline py-5">
                          <span className="font-semibold text-gray-900 pr-4">{faq.question}</span>
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-600 pb-5 leading-relaxed">{faq.answer}</AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>

                {/* Right Column */}
                <div className="space-y-4">
                  <Accordion type="single" collapsible className="space-y-4">
                    {rightColumnFaqs.map((faq, index) => (
                      <AccordionItem
                        key={index * 2 + 1}
                        value={`item-${index * 2 + 1}`}
                        className="border rounded-lg px-6 bg-white shadow-sm hover:shadow-md transition-shadow"
                      >
                        <AccordionTrigger className="text-left hover:no-underline py-5">
                          <span className="font-semibold text-gray-900 pr-4">{faq.question}</span>
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-600 pb-5 leading-relaxed">{faq.answer}</AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Still need help?</h2>
            <p className="text-lg text-gray-600">
              Our support team is available 24/7 to assist you with any questions or issues
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <Dialog open={isContactModalOpen} onOpenChange={setIsContactModalOpen}>
              <DialogTrigger asChild>
                <Card className="p-8 text-center hover:shadow-xl transition-all group cursor-pointer">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-600 transition-colors">
                    <MessageSquare className="w-8 h-8 text-green-600 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Contact Support</h3>
                  <p className="text-gray-600 mb-6">Fill out a form and we'll get back to you soon</p>
                  <Button className="w-full bg-green-600 hover:bg-green-700">Open Form</Button>
                </Card>
              </DialogTrigger>

              <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-2xl">Contact Support</DialogTitle>
                  <DialogDescription>
                    Fill out the form below and our support team will get back to you within 24 hours.
                  </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleContactSubmit} className="space-y-6 mt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name *</Label>
                      <Input
                        id="name"
                        placeholder="Your full name"
                        value={contactForm.name}
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <Select
                      value={contactForm.category}
                      onValueChange={(value) => setContactForm({ ...contactForm, category: value })}
                      required
                    >
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {helpCategories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject *</Label>
                    <Input
                      id="subject"
                      placeholder="Brief description of your issue"
                      value={contactForm.subject}
                      onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      placeholder="Please provide detailed information about your question or issue..."
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      rows={6}
                      required
                    />
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsContactModalOpen(false)}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                    <Button type="submit" className="flex-1 bg-green-600 hover:bg-green-700">
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>

            <Card className="p-8 text-center hover:shadow-xl transition-all group">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-600 transition-colors">
                <Mail className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Email Support</h3>
              <p className="text-gray-600 mb-6">Send us an email and we'll respond within 24 hours</p>
              <Button variant="outline" className="w-full bg-transparent" asChild>
                <Link href={`mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL || "support@chati.chat"}`}>Send Email</Link>
              </Button>
            </Card>

            <Card className="p-8 text-center hover:shadow-xl transition-all group">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-600 transition-colors">
                <Phone className="w-8 h-8 text-purple-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Phone Support</h3>
              <p className="text-gray-600 mb-6">Call us for urgent issues or technical support</p>
              <Button variant="outline" className="w-full bg-transparent" asChild>
                <Link href={`tel:${process.env.NEXT_PUBLIC_CONTACT_PHONE || ""}`}>Call Now</Link>
              </Button>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
