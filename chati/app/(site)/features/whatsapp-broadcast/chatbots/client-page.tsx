"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { BrandSlider } from "@/components/brand-slider";
import {
  Bot,
  Brain,
  MessageSquare,
  Zap,
  Globe,
  Clock,
  TrendingUp,
  Users,
  Target,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  ShoppingCart,
  HeadphonesIcon,
  GraduationCap,
  Building2,
  Languages,
  BarChart3,
  Smile,
  Lightbulb,
  Workflow,
  Database,
  Settings,
  MessageCircle,
  Send,
  ThumbsUp,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

const FloatingAIIcons = () => {
  return (
    <>
      {/* Brain Icon */}
      <div className="absolute top-[15%] left-[10%] w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl animate-float z-20">
        <Brain className="w-7 h-7 text-white" />
      </div>

      {/* Bot Icon */}
      <div className="absolute top-[25%] right-[15%] w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-2xl animate-float-delayed z-20">
        <Bot className="w-6 h-6 text-white" />
      </div>

      {/* Sparkles Icon */}
      <div className="absolute bottom-[30%] left-[5%] w-16 h-16 bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-2xl animate-float z-20">
        <Sparkles className="w-8 h-8 text-white" />
      </div>

      {/* MessageSquare Icon */}
      <div className="absolute bottom-[15%] right-[10%] w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-2xl animate-float-delayed z-20">
        <MessageSquare className="w-7 h-7 text-white" />
      </div>

      {/* Zap Icon */}
      <div className="absolute top-[45%] right-[5%] w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-xl flex items-center justify-center shadow-2xl animate-float z-20">
        <Zap className="w-6 h-6 text-white" />
      </div>
    </>
  );
};

export default function ChatbotsAIPage() {
  const { ref: heroRef, isVisible: heroInView } = useIntersectionObserver({
    threshold: 0.1,
  });
  const { ref: aiPowerRef, isVisible: aiPowerInView } = useIntersectionObserver(
    { threshold: 0.1 }
  );
  const { ref: conversationalRef, isVisible: conversationalInView } =
    useIntersectionObserver({ threshold: 0.1 });
  const { ref: intelligentRef, isVisible: intelligentInView } =
    useIntersectionObserver({ threshold: 0.1 });
  const { ref: featuresRef, isVisible: featuresInView } =
    useIntersectionObserver({ threshold: 0.1 });
  const { ref: benefitsRef, isVisible: benefitsInView } =
    useIntersectionObserver({ threshold: 0.1 });
  const { ref: useCasesRef, isVisible: useCasesInView } =
    useIntersectionObserver({ threshold: 0.1 });
  const { ref: faqRef, isVisible: faqInView } = useIntersectionObserver({
    threshold: 0.1,
  });

  const features = [
    {
      icon: Brain,
      title: "Natural Language Processing",
      description:
        "Advanced NLP understands customer intent, context, and sentiment to provide accurate, human-like responses.",
    },
    {
      icon: Lightbulb,
      title: "Machine Learning",
      description:
        "AI chatbots learn from every conversation, continuously improving responses and accuracy over time.",
    },
    {
      icon: Languages,
      title: "Multi-Language Support",
      description:
        "Communicate with customers in 100+ languages with automatic translation and localization.",
    },
    {
      icon: Smile,
      title: "Sentiment Analysis",
      description:
        "Detect customer emotions and sentiment to route urgent issues to human agents and personalize responses.",
    },
    {
      icon: Workflow,
      title: "Conversation Flows",
      description:
        "Design complex conversation flows with branching logic, conditions, and dynamic responses for any scenario.",
    },
    {
      icon: Database,
      title: "Knowledge Base Integration",
      description:
        "Connect your knowledge base, FAQs, and documentation for instant, accurate answers to customer questions.",
    },
    {
      icon: Settings,
      title: "Custom Training",
      description:
        "Train AI chatbots on your specific business data, products, and services for personalized support.",
    },
    {
      icon: BarChart3,
      title: "Analytics & Insights",
      description:
        "Track chatbot performance, conversation metrics, and customer satisfaction with detailed analytics dashboards.",
    },
  ];

  const benefits = [
    {
      icon: Clock,
      title: "24/7 Availability",
      description:
        "AI chatbots provide instant support around the clock, ensuring customers get help whenever they need it.",
    },
    {
      icon: TrendingUp,
      title: "Increase Conversions",
      description:
        "Engage visitors instantly, answer questions, and guide them through the buying process to boost conversions by up to 40%.",
    },
    {
      icon: Users,
      title: "Scale Support",
      description:
        "Handle thousands of conversations simultaneously without increasing team size or support costs.",
    },
    {
      icon: Target,
      title: "Personalized Experiences",
      description:
        "Deliver personalized recommendations and responses based on customer history, preferences, and behavior.",
    },
  ];

  const useCases = [
    {
      title: "E-commerce Support",
      description:
        "Answer product questions, provide recommendations, track orders, and handle returns automatically with AI chatbots.",
      icon: ShoppingCart,
    },
    {
      title: "Customer Service",
      description:
        "Resolve common support queries, troubleshoot issues, and escalate complex cases to human agents seamlessly.",
      icon: HeadphonesIcon,
    },
    {
      title: "Lead Qualification",
      description:
        "Engage website visitors, qualify leads with intelligent questions, and route hot leads to sales teams instantly.",
      icon: Target,
    },
    {
      title: "Appointment Booking",
      description:
        "Let customers book appointments, schedule meetings, and manage reservations through conversational AI.",
      icon: Clock,
    },
    {
      title: "Education & Training",
      description:
        "Provide interactive learning experiences, answer student questions, and deliver personalized course recommendations.",
      icon: GraduationCap,
    },
    {
      title: "Internal Support",
      description:
        "Help employees find information, submit IT tickets, and access HR resources through internal AI chatbots.",
      icon: Building2,
    },
  ];

  const faqsColumn1 = [
    {
      question: "What is an AI chatbot?",
      answer:
        "An AI chatbot is an intelligent conversational agent powered by artificial intelligence, natural language processing (NLP), and machine learning. Unlike rule-based chatbots, AI chatbots understand context, learn from conversations, and provide human-like responses. They can handle complex queries, detect sentiment, and continuously improve their accuracy over time.",
    },
    {
      question: "How does conversational AI work?",
      answer:
        "Conversational AI uses natural language processing (NLP) to understand customer messages, machine learning to learn from interactions, and natural language generation (NLG) to create human-like responses. The AI analyzes intent, context, and sentiment to provide accurate, personalized answers across multiple channels like WhatsApp, RCS, Instagram, and Facebook Messenger.",
    },
    {
      question: "Can AI chatbots handle multiple languages?",
      answer:
        "Yes! Our AI chatbots support 100+ languages with automatic translation and localization. The AI understands customer messages in any language and responds in the same language, making it perfect for global businesses serving diverse customer bases.",
    },
  ];

  const faqsColumn2 = [
    {
      question: "How accurate are AI chatbot responses?",
      answer:
        "Our AI chatbots achieve 90%+ accuracy rates through advanced NLP and machine learning. The accuracy improves over time as the AI learns from conversations. You can also train the chatbot on your specific business data, FAQs, and knowledge base to ensure highly accurate, relevant responses for your customers.",
    },
    {
      question: "Can AI chatbots escalate to human agents?",
      answer:
        "AI chatbots intelligently detect when a conversation requires human intervention based on complexity, sentiment, or customer request. They seamlessly transfer the conversation to a human agent with full context, ensuring smooth handoffs and excellent customer experiences.",
    },
    {
      question: "Which platforms support AI chatbots?",
      answer:
        "Our AI chatbots work across all major messaging platforms including WhatsApp Business API, RCS (Rich Communication Services), Instagram Direct Messages, Facebook Messenger, website live chat, and mobile apps. Deploy once and engage customers everywhere they are.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-50 via-white to-blue-50/30">
        {/* Decorative Gradients */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-br from-purple-400/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-gradient-to-tr from-blue-400/15 to-transparent rounded-full blur-3xl" />

        <div
          ref={heroRef}
          className="container relative mx-auto px-4 py-12 md:py-14 lg:py-16 z-10"
        >
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            {/* LEFT CONTENT */}
            <div
              className={`flex flex-col justify-center transition-all duration-1000 ${
                heroInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <Badge
                variant="secondary"
                className="mb-4 bg-purple-100 text-purple-700 hover:bg-purple-200 w-fit shadow-sm"
              >
                <Bot className="w-3.5 h-3.5 mr-1.5" />
                AI Chatbots & Conversational AI
              </Badge>

              <h1 className="mb-4 leading-tight tracking-tight text-balance">
                <span className="block text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
                  Intelligent AI Chatbots
                </span>
                <span className="block text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 bg-clip-text text-transparent">
                  That Understand & Engage
                </span>
              </h1>

              <p className="mb-6 text-base md:text-lg text-muted-foreground max-w-xl leading-relaxed">
                Deploy AI-powered chatbots with advanced NLP & ML to automate
                customer support, offer instant responses 24/7, and engage
                across WhatsApp, RCS, Instagram & Facebook Messenger.
              </p>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <Button
                  size="lg"
                  className="bg-purple-600 hover:bg-purple-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all group"
                >
                  Start Building AI Chatbot
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

              {/* FEATURES — NOW RESPONSIVE */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-gray-200">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-2">
                    <Brain className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="text-xs text-muted-foreground text-center">
                    AI-Powered
                  </div>
                </div>

                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-2">
                    <Clock className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="text-xs text-muted-foreground text-center">
                    24/7 Support
                  </div>
                </div>

                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mb-2">
                    <Globe className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="text-xs text-muted-foreground text-center">
                    100+ Languages
                  </div>
                </div>

                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center mb-2">
                    <Sparkles className="w-5 h-5 text-pink-600" />
                  </div>
                  <div className="text-xs text-muted-foreground text-center">
                    Smart Learning
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT IMAGE */}
            <div
              className={`relative flex items-center justify-center lg:justify-end transition-all duration-1000 delay-300 ${
                heroInView
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-8"
              }`}
            >
              <div className="relative w-full max-w-md sm:max-w-lg">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 via-blue-400/15 to-pink-400/20 blur-3xl rounded-full scale-110" />
                <FloatingAIIcons />
                <Image
                  src="/ai-chatbot-interface-showing-conversational-ai-wit.jpg"
                  alt="AI Chatbot Interface"
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

      <BrandSlider />

      {/* AI-Powered Intelligence Section */}
      <section
        ref={aiPowerRef}
        className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50/30 py-14 sm:py-16 md:py-20"
      >
        {/* Background Gradient */}
        <div className="absolute top-0 right-0 w-[350px] sm:w-[450px] md:w-[600px] h-[350px] sm:h-[450px] md:h-[600px] bg-gradient-to-bl from-blue-400/10 to-transparent rounded-full blur-3xl" />

        <div className="container relative mx-auto px-4 z-10">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-12 items-center">
            {/* IMAGE — fully responsive */}
            <div
              className={`relative transition-all duration-1000 ${
                aiPowerInView
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-8"
              }`}
            >
              <Image
                src="/ai-brain-neural-network-showing-machine-learning-a.jpg"
                alt="AI brain neural network visualization"
                width={600}
                height={600}
                className="w-full h-auto max-w-md sm:max-w-lg mx-auto object-contain rounded-2xl shadow-2xl"
              />
            </div>

            {/* CONTENT */}
            <div
              className={`transition-all duration-1000 delay-200 ${
                aiPowerInView
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-8"
              }`}
            >
              <Badge
                variant="secondary"
                className="mb-4 bg-blue-100 text-blue-700 hover:bg-blue-200 w-fit shadow-sm"
              >
                <Brain className="w-3.5 h-3.5 mr-1.5" />
                AI-Powered Intelligence
              </Badge>

              <h2 className="mb-4 text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                <span className="block text-foreground mb-1">
                  Advanced Natural Language
                </span>
                <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Processing & Machine Learning
                </span>
              </h2>

              <p className="mb-6 text-base sm:text-lg text-muted-foreground leading-relaxed">
                Our AI chatbots use cutting-edge NLP and machine learning to
                understand customer intent, context, and sentiment. Unlike basic
                rule-based bots, they learn from every interaction—improving
                accuracy and delivering human-like responses that increase
                satisfaction and conversions.
              </p>

              {/* FEATURES */}
              <div className="space-y-5">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Brain className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">
                      Context-Aware Conversations
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      AI remembers history and context to deliver relevant,
                      personalized replies.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Lightbulb className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">
                      Intent Recognition
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Understands slang, typos, and complex phrasing with high
                      accuracy.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-5 h-5 text-pink-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">
                      Continuous Learning
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Learns from conversations to improve response accuracy
                      automatically.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Conversational AI Across Platforms Section */}
      <section
        ref={conversationalRef}
        className="relative overflow-hidden bg-gradient-to-br from-white via-green-50/30 to-blue-50/20 py-14 sm:py-16 md:py-20"
      >
        {/* Background Blob */}
        <div className="absolute bottom-0 left-0 w-[350px] sm:w-[450px] md:w-[600px] h-[350px] sm:h-[450px] md:h-[600px] bg-gradient-to-tr from-green-400/10 to-transparent rounded-full blur-3xl" />

        <div className="container relative mx-auto px-4 z-10">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-12 items-center">
            {/* CONTENT */}
            <div
              className={`order-2 lg:order-1 transition-all duration-1000 ${
                conversationalInView
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-8"
              }`}
            >
              <Badge
                variant="secondary"
                className="mb-4 bg-green-100 text-green-700 hover:bg-green-200 w-fit shadow-sm"
              >
                <Globe className="w-3.5 h-3.5 mr-1.5" />
                Multi-Platform Support
              </Badge>

              <h2 className="mb-4 text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                <span className="block text-foreground mb-1">
                  Deploy AI Chatbots
                </span>
                <span className="block bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Across All Channels
                </span>
              </h2>

              <p className="mb-6 text-base sm:text-lg text-muted-foreground leading-relaxed">
                Meet customers where they are with AI chatbots that work
                seamlessly across WhatsApp, RCS, Instagram DM, Facebook
                Messenger, website live chat, and mobile apps. One AI chatbot,
                unlimited reach—consistent, intelligent automation with unified
                management & analytics.
              </p>

              {/* CARDS GRID */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <Card className="p-4 bg-white border-2 border-green-100 hover:border-green-300 transition-all">
                  <MessageSquare className="w-8 h-8 text-green-600 mb-2" />
                  <div className="font-semibold text-foreground mb-1">
                    WhatsApp Business
                  </div>
                  <p className="text-xs text-muted-foreground">
                    2B+ active users worldwide
                  </p>
                </Card>

                <Card className="p-4 bg-white border-2 border-blue-100 hover:border-blue-300 transition-all">
                  <MessageCircle className="w-8 h-8 text-blue-600 mb-2" />
                  <div className="font-semibold text-foreground mb-1">
                    RCS Messaging
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Rich interactive experiences
                  </p>
                </Card>

                <Card className="p-4 bg-white border-2 border-pink-100 hover:border-pink-300 transition-all">
                  <Send className="w-8 h-8 text-pink-600 mb-2" />
                  <div className="font-semibold text-foreground mb-1">
                    Instagram DM
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Visual-first engagement
                  </p>
                </Card>

                <Card className="p-4 bg-white border-2 border-purple-100 hover:border-purple-300 transition-all">
                  <ThumbsUp className="w-8 h-8 text-purple-600 mb-2" />
                  <div className="font-semibold text-foreground mb-1">
                    Facebook Messenger
                  </div>
                  <p className="text-xs text-muted-foreground">
                    1.3B+ monthly users
                  </p>
                </Card>
              </div>

              <Button
                size="lg"
                className="bg-green-600 hover:bg-green-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all group"
              >
                Explore Integrations
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>

            {/* IMAGE */}
            <div
              className={`order-1 lg:order-2 relative transition-all duration-1000 delay-300 ${
                conversationalInView
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-8"
              }`}
            >
              <Image
                src="/multi-platform-chatbot-interface-showing-whatsapp-.jpg"
                alt="Multi-platform AI chatbot interface"
                width={600}
                height={600}
                className="w-full h-auto object-contain max-w-md sm:max-w-lg mx-auto rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Intelligent Automation Section */}
      <section
        ref={intelligentRef}
        className="relative overflow-hidden bg-gradient-to-br from-purple-50/40 via-white to-blue-50/30 py-14 sm:py-16 md:py-20"
      >
        {/* Background blob */}
        <div className="absolute top-0 left-0 w-[350px] sm:w-[450px] md:w-[600px] h-[350px] sm:h-[450px] md:h-[600px] bg-gradient-to-br from-purple-400/10 to-transparent rounded-full blur-3xl" />

        <div className="container relative mx-auto px-4 z-10">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-12 items-center">
            {/* Image */}
            <div
              className={`relative transition-all duration-1000 ${
                intelligentInView
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-8"
              }`}
            >
              <Image
                src="/ai-chatbot-conversation-flow-showing-automated-res.jpg"
                alt="AI chatbot conversation flow diagram showing automated responses, sentiment analysis, and intelligent routing to human agents"
                width={600}
                height={600}
                className="w-full max-w-md sm:max-w-lg mx-auto h-auto object-contain rounded-2xl shadow-2xl"
              />
            </div>

            {/* Content */}
            <div
              className={`transition-all duration-1000 delay-300 ${
                intelligentInView
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-8"
              }`}
            >
              <Badge
                variant="secondary"
                className="mb-4 bg-purple-100 text-purple-700 hover:bg-purple-200 w-fit shadow-sm"
              >
                <Zap className="w-3.5 h-3.5 mr-1.5" />
                Intelligent Automation
              </Badge>

              <h2 className="mb-4 text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                <span className="block text-foreground mb-1">
                  Automate Customer Support
                </span>
                <span className="block bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 bg-clip-text text-transparent">
                  With Human-Like Intelligence
                </span>
              </h2>

              <p className="mb-6 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl">
                Transform customer support with AI chatbots that handle routine
                queries automatically while seamlessly escalating complex issues
                to human agents. Combine AI efficiency with human empathy to
                reduce support costs by up to 60% while improving customer
                satisfaction.
              </p>

              <div className="space-y-4">
                {/* Feature 1 */}
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">
                      Instant Response Times
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Respond to customer queries in milliseconds, 24/7 — zero
                      wait time and maximum satisfaction.
                    </p>
                  </div>
                </div>

                {/* Feature 2 */}
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Smile className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">
                      Sentiment-Based Routing
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Detect frustration and escalate to human agents with full
                      conversation context.
                    </p>
                  </div>
                </div>

                {/* Feature 3 */}
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Target className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">
                      Personalized Recommendations
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Use AI + customer data to deliver tailored product
                      suggestions and contextual solutions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section
        ref={featuresRef}
        className="py-12 md:py-14 bg-gradient-to-b from-white via-purple-50/20 to-white"
      >
        <div className="container mx-auto px-4">
          <div
            className={`text-center mb-12 transition-all duration-700 ${
              featuresInView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <Badge
              className="mb-4 bg-purple-100 text-purple-700 border-purple-200"
              variant="outline"
            >
              <Sparkles className="w-3.5 h-3.5 mr-1.5" />
              AI Capabilities
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Powerful AI Chatbot Features
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Advanced conversational AI capabilities that deliver exceptional
              customer experiences
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card
                key={index}
                className={`p-6 hover:shadow-lg transition-all duration-300 border-gray-200 ${
                  featuresInView
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section
        ref={benefitsRef}
        className="py-12 md:py-14 bg-gradient-to-br from-blue-50/40 via-white to-purple-50/30"
      >
        <div className="container mx-auto px-4">
          <div
            className={`text-center mb-12 transition-all duration-700 ${
              benefitsInView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose AI Chatbots?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Transform customer engagement with intelligent automation that
              works around the clock
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className={`text-center transition-all duration-700 ${
                  benefitsInView
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
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
      <section
        ref={useCasesRef}
        className="py-12 md:py-14 bg-gradient-to-br from-white via-green-50/20 to-blue-50/10"
      >
        <div className="container mx-auto px-4">
          <div
            className={`text-center mb-12 transition-all duration-700 ${
              useCasesInView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              AI Chatbot Use Cases
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              See how businesses leverage AI chatbots to automate support and
              drive growth
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {useCases.map((useCase, index) => (
              <Card
                key={index}
                className={`p-6 hover:shadow-lg transition-all duration-300 border-gray-200 group ${
                  useCasesInView
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <useCase.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">
                      {useCase.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {useCase.description}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section
        ref={faqRef}
        className="py-12 md:py-14 bg-gradient-to-br from-gray-50 to-white"
      >
        <div className="container mx-auto px-4">
          <div
            className={`text-center mb-10 transition-all duration-700 ${
              faqInView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              Frequently Asked Questions
            </h2>
            <p className="text-base text-gray-600 max-w-2xl mx-auto">
              Everything you need to know about AI chatbots and conversational
              AI
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div
                className={`transition-all duration-700 ${
                  faqInView
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
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
                      <AccordionContent className="text-gray-600 pb-4 leading-relaxed">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>

              <div
                className={`transition-all duration-700 delay-200 ${
                  faqInView
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
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
                      <AccordionContent className="text-gray-600 pb-4 leading-relaxed">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-14 bg-gradient-to-br from-purple-600 to-blue-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Deploy AI Chatbots?
          </h2>
          <p className="text-lg text-purple-100 mb-8 max-w-2xl mx-auto">
            Start automating customer support with intelligent AI chatbots
            powered by conversational AI
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="secondary"
              className="bg-white text-purple-600 hover:bg-gray-100"
            >
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
  );
}
