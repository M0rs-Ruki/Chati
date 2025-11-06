"use client"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { BrandSlider } from "@/components/brand-slider"
import {
  MessageSquare,
  Users,
  Zap,
  Tag,
  FolderOpen,
  BarChart3,
  Clock,
  Bell,
  ArrowRight,
  CheckCircle2,
  Inbox,
  UserPlus,
  MessageCircle,
  Instagram,
  Facebook,
  Smartphone,
  Shield,
  Sparkles,
  TrendingUp,
  Target,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useIntersectionObserver } from "@/hooks/use-intersection-observer"

const FloatingChatIcons = () => {
  return (
    <>
      {/* WhatsApp Icon */}
      <div className="absolute top-[15%] left-[10%] w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-2xl animate-float z-20">
        <MessageSquare className="w-7 h-7 text-white" />
      </div>

      {/* Instagram Icon */}
      <div className="absolute top-[25%] right-[15%] w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl flex items-center justify-center shadow-2xl animate-float-delayed z-20">
        <Instagram className="w-6 h-6 text-white" />
      </div>

      {/* Facebook Icon */}
      <div className="absolute bottom-[30%] left-[5%] w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-2xl animate-float z-20">
        <Facebook className="w-8 h-8 text-white" />
      </div>

      {/* RCS Icon */}
      <div className="absolute bottom-[15%] right-[10%] w-14 h-14 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-2xl animate-float-delayed z-20">
        <Smartphone className="w-7 h-7 text-white" />
      </div>

      {/* Inbox Icon */}
      <div className="absolute top-[45%] right-[5%] w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-2xl animate-float z-20">
        <Inbox className="w-6 h-6 text-white" />
      </div>
    </>
  )
}

export default function LiveChatPage() {
  const { ref: heroRef, isVisible: heroInView } = useIntersectionObserver({ threshold: 0.1 })
  const { ref: block1Ref, isVisible: block1InView } = useIntersectionObserver({ threshold: 0.1 })
  const { ref: block2Ref, isVisible: block2InView } = useIntersectionObserver({ threshold: 0.1 })
  const { ref: block3Ref, isVisible: block3InView } = useIntersectionObserver({ threshold: 0.1 })
  const { ref: featuresRef, isVisible: featuresInView } = useIntersectionObserver({ threshold: 0.1 })
  const { ref: benefitsRef, isVisible: benefitsInView } = useIntersectionObserver({ threshold: 0.1 })
  const { ref: useCasesRef, isVisible: useCasesInView } = useIntersectionObserver({ threshold: 0.1 })
  const { ref: faqRef, isVisible: faqInView } = useIntersectionObserver({ threshold: 0.1 })

  const features = [
    {
      icon: Inbox,
      title: "Unified Omnion Inbox",
      description:
        "Manage all conversations from WhatsApp, RCS, Instagram, and Facebook Messenger in one centralized inbox.",
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description:
        "Assign conversations to team members, add internal notes, and collaborate seamlessly on customer support.",
    },
    {
      icon: Tag,
      title: "Smart Tags & Labels",
      description:
        "Organize conversations with custom tags, labels, and categories for efficient conversation management.",
    },
    {
      icon: FolderOpen,
      title: "Source Tracking",
      description:
        "Track conversation sources and channels to understand where your customers are coming from and optimize engagement.",
    },
    {
      icon: BarChart3,
      title: "Real-time Analytics",
      description:
        "Monitor response times, resolution rates, customer satisfaction, and team performance with comprehensive analytics.",
    },
    {
      icon: Zap,
      title: "Instant Responses",
      description:
        "Respond to customers instantly across all channels with real-time notifications and quick reply templates.",
    },
    {
      icon: Bell,
      title: "Smart Notifications",
      description:
        "Get notified instantly when customers message you across any channel with customizable notification preferences.",
    },
    {
      icon: Clock,
      title: "24/7 Availability",
      description:
        "Provide round-the-clock support with automated responses, chatbots, and team scheduling across time zones.",
    },
  ]

  const benefits = [
    {
      icon: MessageCircle,
      title: "Multi-Channel Support",
      description:
        "Support customers on WhatsApp, RCS, Instagram DM, and Facebook Messenger from a single unified platform.",
    },
    {
      icon: TrendingUp,
      title: "Faster Response Times",
      description:
        "Reduce response times by 70% with unified inbox, quick replies, and automated routing to available agents.",
    },
    {
      icon: Users,
      title: "Better Team Collaboration",
      description:
        "Improve team efficiency with conversation assignment, internal notes, and real-time collaboration tools.",
    },
    {
      icon: Shield,
      title: "Secure & Compliant",
      description:
        "Enterprise-grade security with end-to-end encryption, GDPR compliance, and data protection standards.",
    },
  ]

  const useCases = [
    {
      title: "Customer Support",
      description: "Provide instant support across all messaging channels with unified inbox and team collaboration.",
      icon: MessageSquare,
    },
    {
      title: "Sales Conversations",
      description: "Engage prospects and close deals faster with real-time messaging across multiple platforms.",
      icon: Target,
    },
    {
      title: "Order Management",
      description: "Handle order inquiries, updates, and support requests efficiently from one centralized dashboard.",
      icon: CheckCircle2,
    },
    {
      title: "Lead Qualification",
      description: "Qualify leads in real-time with instant responses and automated routing to sales teams.",
      icon: UserPlus,
    },
    {
      title: "Appointment Booking",
      description: "Schedule appointments and send reminders across all messaging channels with automated workflows.",
      icon: Clock,
    },
    {
      title: "Feedback Collection",
      description: "Gather customer feedback and reviews through conversational messaging on their preferred platform.",
      icon: Sparkles,
    },
  ]

  const faqsColumn1 = [
    {
      question: "What is a unified Omnion channel inbox?",
      answer:
        "An Omnion channel inbox consolidates all your customer conversations from WhatsApp, RCS, Instagram Direct Messages, and Facebook Messenger into one centralized dashboard. This allows your team to manage all customer interactions from a single interface without switching between multiple apps.",
    },
    {
      question: "Which messaging channels are supported?",
      answer:
        "We support WhatsApp Business API, RCS (Rich Communication Services), Instagram Direct Messages, and Facebook Messenger. All conversations from these channels appear in your unified inbox with channel-specific indicators.",
    },
    {
      question: "How does team collaboration work?",
      answer:
        "You can assign conversations to specific team members, add internal notes visible only to your team, set conversation statuses, and collaborate in real-time. Team members receive notifications when assigned to conversations or mentioned in internal notes.",
    },
  ]

  const faqsColumn2 = [
    {
      question: "What are attributes, tags, and sources?",
      answer:
        "Attributes are custom fields you can add to contacts (like VIP status, location, or purchase history). Tags help categorize conversations (like 'urgent', 'sales', or 'support'). Sources track where conversations originated (like website, QR code, or social media) for better analytics.",
    },
    {
      question: "Can I automate responses across all channels?",
      answer:
        "Yes, you can set up automated responses, chatbots, and workflows that work across all supported channels. Create channel-specific or universal automation rules to handle common inquiries instantly.",
    },
    {
      question: "How are response times tracked?",
      answer:
        "Our analytics dashboard tracks first response time, average response time, and resolution time for each channel and team member. You can set SLA targets and receive alerts when response times exceed thresholds.",
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50/30">
        {/* Decorative gradient orbs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-purple-400/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-blue-400/15 to-transparent rounded-full blur-3xl" />

        <div ref={heroRef} className="container relative mx-auto px-4 pr-0 md:pr-4 py-12 md:py-14 lg:py-16 z-10">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-10 items-center">
            {/* Left Content */}
            <div
              className={`flex flex-col justify-center transition-all duration-1000 ${
                heroInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <Badge variant="secondary" className="mb-4 bg-blue-100 text-blue-700 hover:bg-blue-200 w-fit shadow-sm">
                <MessageSquare className="w-3.5 h-3.5 mr-1.5" />
                Multi-Channel Live Chat
              </Badge>

              <h1 className="mb-4 text-balance leading-tight tracking-tight">
                <span className="block text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-2">
                  Manage All Customer Chats
                </span>
                <span className="block text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  In One Unified Inbox
                </span>
              </h1>

              <p className="mb-6 text-base text-muted-foreground md:text-lg max-w-xl leading-relaxed">
                Support customers across WhatsApp, RCS, Instagram DM, and Facebook Messenger from a single Omnion
                channel inbox. Collaborate with your team, organize conversations with tags and attributes, and deliver
                exceptional customer experiences.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all group"
                >
                  Start Free Trial
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 bg-white hover:bg-gray-50 font-medium shadow-sm"
                  asChild
                >
                  <Link href="/pricing">View Pricing</Link>
                </Button>
              </div>

              {/* Supported Channels */}
              <div className="grid grid-cols-4 gap-4 pt-4 border-t border-gray-200">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mb-2">
                    <MessageSquare className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="text-xs text-muted-foreground text-center">WhatsApp</div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center mb-2">
                    <Smartphone className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div className="text-xs text-muted-foreground text-center">RCS</div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center mb-2">
                    <Instagram className="w-5 h-5 text-pink-600" />
                  </div>
                  <div className="text-xs text-muted-foreground text-center">Instagram</div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-2">
                    <Facebook className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="text-xs text-muted-foreground text-center">Facebook</div>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div
              className={`relative flex items-center justify-center lg:justify-end transition-all duration-1000 delay-300 ${
                heroInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
              }`}
            >
              <div className="relative w-full max-w-lg">
                {/* Decorative gradient blob behind image */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 via-purple-400/15 to-pink-400/20 blur-3xl rounded-full transform scale-110" />

                {/* Floating channel icons */}
                <FloatingChatIcons />

                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/omini%20channel%20inbox-hfzkqKY66U3gLqXvC7VBg1FO8eBEfM.webp"
                  alt="Omnichannel inbox showing woman managing customer conversations across WhatsApp, Instagram, Facebook Messenger, and other channels with business growth analytics"
                  width={600}
                  height={700}
                  className="relative z-10 w-full h-auto object-contain rounded-2xl shadow-2xl"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BrandSlider component */}
      <BrandSlider />

      {/* Block 1: Image Left, Content Right - Unified Omnion Inbox */}
      <section
        ref={block1Ref}
        className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50/40 to-pink-50/30 py-12 md:py-14"
      >
        <div className="absolute top-10 right-20 w-96 h-96 bg-gradient-to-br from-purple-400/15 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-20 w-96 h-96 bg-gradient-to-tr from-blue-400/15 to-transparent rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid gap-8 lg:grid-cols-[55%_45%] items-center">
            {/* Left Side - Image */}
            <div
              className={`flex items-center justify-center lg:justify-start transition-all duration-1000 ${
                block1InView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
              }`}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 via-purple-400/15 to-pink-400/20 blur-2xl rounded-3xl transform scale-105" />
                <Image
                  src="/unified-omnion-inbox-showing-whatsapp-rcs-insta.jpg"
                  alt="Unified Omnion channel inbox consolidating WhatsApp, RCS, Instagram DM, and Facebook Messenger conversations with smart filtering and organization"
                  width={800}
                  height={600}
                  className="relative z-10 w-full h-auto max-w-2xl object-contain drop-shadow-2xl hover:scale-[1.02] transition-transform duration-500"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Right Side - Content */}
            <div
              className={`transition-all duration-1000 delay-300 ${
                block1InView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <Badge className="mb-3 shadow-sm bg-blue-100 text-blue-700 border-blue-200" variant="outline">
                Unified Omnion Inbox
              </Badge>
              <h2 className="mb-4 text-balance text-3xl font-bold md:text-4xl lg:text-5xl">
                All Your Conversations in One Place
              </h2>
              <p className="mb-6 text-pretty text-muted-foreground text-base md:text-lg leading-relaxed">
                Stop switching between multiple apps and platforms. Our Omnion channel inbox brings together all
                customer conversations from WhatsApp, RCS, Instagram Direct Messages, and Facebook Messenger into one
                powerful, unified dashboard where your team can collaborate and respond efficiently.
              </p>

              <div className="space-y-4">
                <div className="flex gap-3 items-start group">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-green-100 to-green-50 group-hover:from-green-200 group-hover:to-green-100 transition-all shadow-sm">
                    <MessageSquare className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1 text-base">WhatsApp Business Integration</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Connect your WhatsApp Business API and manage all WhatsApp conversations with full message
                      history, media support, and real-time synchronization.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 items-start group">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-100 to-indigo-50 group-hover:from-indigo-200 group-hover:to-indigo-100 transition-all shadow-sm">
                    <Smartphone className="h-5 w-5 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1 text-base">RCS Messaging Support</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Support Rich Communication Services (RCS) with rich media, interactive buttons, and enhanced
                      messaging features for Android users directly from your inbox.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 items-start group">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-pink-100 to-pink-50 group-hover:from-pink-200 group-hover:to-pink-100 transition-all shadow-sm">
                    <Instagram className="h-5 w-5 text-pink-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1 text-base">Instagram & Facebook Messenger</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Respond to Instagram Direct Messages and Facebook Messenger conversations alongside your other
                      channels with unified contact profiles and conversation history.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Block 2: Image Right, Content Left - Team Collaboration */}
      <section
        ref={block2Ref}
        className="relative overflow-hidden bg-gradient-to-br from-green-50/30 via-white to-blue-50/40 py-12 md:py-14"
      >
        <div className="absolute top-10 left-20 w-96 h-96 bg-gradient-to-br from-green-400/15 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-20 w-96 h-96 bg-gradient-to-tr from-blue-400/15 to-transparent rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid gap-8 lg:grid-cols-[45%_55%] items-center">
            {/* Left Side - Content */}
            <div
              className={`transition-all duration-1000 ${
                block2InView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <Badge className="mb-3 shadow-sm bg-green-100 text-green-700 border-green-200" variant="outline">
                Team Collaboration
              </Badge>
              <h2 className="mb-4 text-balance text-3xl font-bold md:text-4xl lg:text-5xl">
                Collaborate Seamlessly with Your Team
              </h2>
              <p className="mb-6 text-pretty text-muted-foreground text-base md:text-lg leading-relaxed">
                Empower your support and sales teams with powerful collaboration tools. Assign conversations, add
                internal notes, track conversation status, and work together to deliver exceptional customer experiences
                across all messaging channels.
              </p>

              <div className="space-y-4">
                <div className="flex gap-3 items-start group">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-100 to-blue-50 group-hover:from-blue-200 group-hover:to-blue-100 transition-all shadow-sm">
                    <Users className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1 text-base">Smart Conversation Assignment</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Automatically route conversations to the right team members based on skills, availability, and
                      workload. Manually assign or reassign conversations as needed with one click.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 items-start group">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-purple-100 to-purple-50 group-hover:from-purple-200 group-hover:to-purple-100 transition-all shadow-sm">
                    <MessageCircle className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1 text-base">Internal Notes & Mentions</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Add private internal notes to conversations, mention team members for collaboration, and maintain
                      context without cluttering customer-facing messages.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 items-start group">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-green-100 to-green-50 group-hover:from-green-200 group-hover:to-green-100 transition-all shadow-sm">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1 text-base">Status Tracking & Workflows</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Track conversation status (open, pending, resolved) and create custom workflows to ensure no
                      customer inquiry falls through the cracks.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Image */}
            <div
              className={`flex items-center justify-center lg:justify-end transition-all duration-1000 delay-300 ${
                block2InView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
              }`}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 via-blue-400/15 to-purple-400/20 blur-2xl rounded-3xl transform scale-105" />
                <Image
                  src="/team-collaboration-dashboard-showing-conversation.jpg"
                  alt="Team collaboration dashboard showing conversation assignment, internal notes, status tracking, and team member activity across all messaging channels"
                  width={800}
                  height={600}
                  className="relative z-10 w-full h-auto max-w-2xl object-contain drop-shadow-2xl hover:scale-[1.02] transition-transform duration-500"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Block 3: Image Left, Content Right - Tags, Attributes & Sources */}
      <section
        ref={block3Ref}
        className="relative overflow-hidden bg-gradient-to-br from-purple-50/40 via-white to-blue-50/30 py-12 md:py-14"
      >
        <div className="absolute top-10 right-20 w-96 h-96 bg-gradient-to-br from-blue-400/15 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-20 w-96 h-96 bg-gradient-to-tr from-purple-400/15 to-transparent rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid gap-8 lg:grid-cols-[55%_45%] items-center">
            {/* Left Side - Image */}
            <div
              className={`flex items-center justify-center lg:justify-start transition-all duration-1000 ${
                block3InView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
              }`}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 via-blue-400/15 to-pink-400/20 blur-2xl rounded-3xl transform scale-105" />
                <Image
                  src="/conversation-management-showing-tags-attributes.jpg"
                  alt="Conversation management interface showing custom tags, contact attributes, source tracking, and smart filtering for organized customer communication"
                  width={800}
                  height={600}
                  className="relative z-10 w-full h-auto max-w-2xl object-contain drop-shadow-2xl hover:scale-[1.02] transition-transform duration-500"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Right Side - Content */}
            <div
              className={`transition-all duration-1000 delay-300 ${
                block3InView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <Badge className="mb-3 shadow-sm bg-purple-100 text-purple-700 border-purple-200" variant="outline">
                Smart Organization
              </Badge>
              <h2 className="mb-4 text-balance text-3xl font-bold md:text-4xl lg:text-5xl">
                Organize with Tags, Attributes & Sources
              </h2>
              <p className="mb-6 text-pretty text-muted-foreground text-base md:text-lg leading-relaxed">
                Keep your conversations organized and actionable with powerful tagging, custom attributes, and source
                tracking. Filter, search, and segment conversations to find exactly what you need and deliver
                personalized experiences at scale.
              </p>

              <div className="space-y-4">
                <div className="flex gap-3 items-start group">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-purple-100 to-purple-50 group-hover:from-purple-200 group-hover:to-purple-100 transition-all shadow-sm">
                    <Tag className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1 text-base">Custom Tags & Labels</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Create unlimited custom tags to categorize conversations by topic, priority, department, or any
                      criteria. Apply multiple tags and filter conversations instantly.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 items-start group">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-100 to-blue-50 group-hover:from-blue-200 group-hover:to-blue-100 transition-all shadow-sm">
                    <UserPlus className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1 text-base">Contact Attributes</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Store custom contact information like VIP status, purchase history, preferences, and more. Use
                      attributes to personalize conversations and segment your audience.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 items-start group">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-green-100 to-green-50 group-hover:from-green-200 group-hover:to-green-100 transition-all shadow-sm">
                    <FolderOpen className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1 text-base">Source Tracking</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Track where conversations originated—website chat widget, QR code, social media, or direct
                      message. Analyze which sources drive the most engagement and conversions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section ref={featuresRef} className="py-12 md:py-14 bg-gradient-to-b from-white via-blue-50/20 to-white">
        <div className="container mx-auto px-4">
          <div
            className={`text-center mb-12 transition-all duration-700 ${
              featuresInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Live Chat Features</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Everything you need to deliver exceptional customer support across all messaging channels
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card
                key={index}
                className={`p-6 hover:shadow-lg transition-all duration-300 border-gray-200 ${
                  featuresInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section ref={benefitsRef} className="py-12 md:py-14 bg-gradient-to-br from-blue-50/40 via-white to-purple-50/30">
        <div className="container mx-auto px-4">
          <div
            className={`text-center mb-12 transition-all duration-700 ${
              benefitsInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Our Live Chat Platform?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Deliver faster, more personalized support across all your customer's favorite messaging channels
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className={`text-center transition-all duration-700 ${
                  benefitsInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <benefit.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section ref={useCasesRef} className="py-12 md:py-14 bg-gradient-to-br from-white via-purple-50/20 to-blue-50/10">
        <div className="container mx-auto px-4">
          <div
            className={`text-center mb-12 transition-all duration-700 ${
              useCasesInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Live Chat Use Cases</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              See how businesses use multi-channel live chat to improve customer satisfaction and drive growth
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {useCases.map((useCase, index) => (
              <Card
                key={index}
                className={`p-6 hover:shadow-lg transition-all duration-300 border-gray-200 group ${
                  useCasesInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <useCase.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{useCase.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{useCase.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section ref={faqRef} className="py-12 md:py-14 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div
            className={`text-center mb-10 transition-all duration-700 ${
              faqInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-3">Frequently Asked Questions</h2>
            <p className="text-base text-gray-600 max-w-2xl mx-auto">
              Everything you need to know about multi-channel live chat and unified inbox
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {/* Left Column - 3 FAQs */}
              <div
                className={`transition-all duration-700 ${
                  faqInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                <Accordion type="single" collapsible className="space-y-3">
                  {faqsColumn1.map((faq, index) => (
                    <AccordionItem
                      key={index}
                      value={`item-${index}`}
                      className="bg-white border border-gray-200 rounded-lg px-6 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <AccordionTrigger className="text-left font-semibold hover:no-underline py-4">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-600 pb-4 leading-relaxed">{faq.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>

              {/* Right Column - 3 FAQs */}
              <div
                className={`transition-all duration-700 delay-200 ${
                  faqInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                <Accordion type="single" collapsible className="space-y-3">
                  {faqsColumn2.map((faq, index) => (
                    <AccordionItem
                      key={index}
                      value={`item-${index + 3}`}
                      className="bg-white border border-gray-200 rounded-lg px-6 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <AccordionTrigger className="text-left font-semibold hover:no-underline py-4">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-600 pb-4 leading-relaxed">{faq.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-14 bg-gradient-to-br from-blue-600 to-purple-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Customer Support?</h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            Start managing all your customer conversations in one unified inbox today
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
              Start Free Trial
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10 bg-transparent"
              asChild
            >
              <Link href="/pricing">View Pricing Plans</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
