"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import FAQSection from "@/components/section/FAQSection";
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

  const faqsColumnFAQSection1 = [
    {
      question: "What is an AI chatbot?",
      answer:
        "An AI chatbot is an intelligent virtual assistant powered by artificial intelligence and natural language processing (NLP). It can understand and respond to customer questions in real-time, learn from conversations, and provide human-like interactions 24/7 without requiring human intervention.",
    },
    {
      question: "How does conversational AI work?",
      answer:
        "Conversational AI uses natural language processing (NLP) and machine learning to understand user intent, analyze context, and generate appropriate responses. It learns from millions of conversations, recognizes patterns, and continuously improves its accuracy to deliver more natural and helpful interactions.",
    },
    {
      question: "Can the chatbot handle multiple languages?",
      answer:
        "Yes, our AI chatbot supports 120+ languages with automatic language detection. It can seamlessly switch between languages during conversations and maintain context, making it perfect for global businesses serving customers across different regions.",
    },
    {
      question: "How accurate are AI chatbot responses?",
      answer:
        "Our chatbot is trained on billions of conversations and achieves 95%+ accuracy in understanding user intent. It continuously learns from interactions and improves over time. For complex queries it can't handle, it seamlessly transfers the conversation to a human agent.",
    },
  ];

  const faqsColumnFAQSection2 = [
    {
      question: "Can I customize the chatbot's personality and responses?",
      answer:
        "Absolutely! You can fully customize your chatbot's tone, personality, brand voice, and conversation flows. Define specific responses, create custom workflows, and train it on your business data to ensure it perfectly represents your brand and handles industry-specific queries.",
    },
    {
      question: "How long does it take to set up an AI chatbot?",
      answer:
        "With our platform, you can launch a basic AI chatbot in minutes by uploading your FAQs, knowledge base articles, or website URLs. For more advanced chatbots with custom integrations and workflows, setup typically takes 1-2 weeks depending on complexity.",
    },
    {
      question: "What happens when the chatbot doesn't understand a question?",
      answer:
        "When the chatbot encounters a question it can't confidently answer, it will either ask clarifying questions, offer related topics, or seamlessly transfer the conversation to a human agent. All unresolved queries are logged so you can train the AI to handle them in the future.",
    },
    {
      question: "Can the chatbot integrate with my existing tools?",
      answer:
        "Yes, our AI chatbot integrates with popular CRM systems, help desks, e-commerce platforms, payment gateways, and business tools through APIs and webhooks. It can access customer data, create tickets, process orders, and sync conversations across your entire tech stack.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-50 via-white to-blue-50/30">
        {/* Background Glow Elements */}
        <div className="absolute top-0 right-0 w-[300px] sm:w-[420px] h-[300px] sm:h-[420px] bg-gradient-to-br from-purple-400/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[240px] sm:w-[340px] h-[240px] sm:h-[340px] bg-gradient-to-tr from-blue-400/15 to-transparent rounded-full blur-3xl" />

        <div
          ref={heroRef}
          className="container relative mx-auto px-4 py-12 sm:py-14 lg:py-20 z-10"
        >
          <div className="grid gap-10 lg:grid-cols-2 items-center">
            {/* LEFT SIDE */}
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

              <h1 className="leading-tight tracking-tight mb-4">
                <span className="block text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-2">
                  Intelligent AI Chatbots
                </span>
                <span className="block text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 bg-clip-text text-transparent">
                  That Understand & Engage
                </span>
              </h1>

              <p className="mb-6 text-base md:text-lg text-muted-foreground max-w-xl leading-relaxed">
                Deploy AI-powered chatbots with advanced understanding to
                automate support, provide instant responses, and engage
                customers across WhatsApp, Instagram, RCS, and Messenger.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mb-6 w-full sm:w-auto">
                <Button
                  size="lg"
                  className="bg-purple-600 hover:bg-purple-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all group w-full sm:w-auto"
                >
                  Start Building AI Chatbot
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 bg-white text-gray-800 hover:bg-green-50 hover:border-green-500 hover:text-green-600 font-medium shadow-sm transition-all w-full sm:w-auto"
                  asChild
                >
                  <Link href="/pricing">View Pricing</Link>
                </Button>
              </div>

              {/* Features */}
              <div className="grid grid-cols-4 gap-4 pt-4 border-t border-gray-200">
                {[
                  {
                    icon: Brain,
                    label: "AI-Powered",
                    bg: "bg-purple-100",
                    text: "text-purple-600",
                  },
                  {
                    icon: Clock,
                    label: "24/7 Support",
                    bg: "bg-blue-100",
                    text: "text-blue-600",
                  },
                  {
                    icon: Globe,
                    label: "100+ Languages",
                    bg: "bg-green-100",
                    text: "text-green-600",
                  },
                  {
                    icon: Sparkles,
                    label: "Smart Learning",
                    bg: "bg-pink-100",
                    text: "text-pink-600",
                  },
                ].map((f, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <div
                      className={`w-10 h-10 ${f.bg} rounded-lg flex items-center justify-center mb-2`}
                    >
                      <f.icon className={`w-5 h-5 ${f.text}`} />
                    </div>
                    <div className="text-xs text-muted-foreground text-center">
                      {f.label}
                    </div>
                  </div>
                ))}
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
              <div className="relative w-full max-w-md sm:max-w-lg lg:max-w-xl">
                {/* Soft Gradient Halo */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 via-blue-400/15 to-pink-400/20 blur-2xl rounded-full scale-110" />

                <FloatingAIIcons />

                <Image
                  src="/ai-chatbot-interface-showing-conversational-ai-wit.jpg"
                  alt="AI chatbot interface showing conversational AI"
                  width={550}
                  height={650}
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
        className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50/30 py-10 sm:py-12 md:py-16 lg:py-20"
      >
        <div className="absolute top-0 right-0 w-[400px] h-[400px] sm:w-[600px] sm:h-[600px] bg-gradient-to-bl from-blue-400/10 to-transparent rounded-full blur-3xl" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid gap-6 lg:gap-8 xl:gap-12 lg:grid-cols-2 items-center">
            {/* Left Side - Image */}
            <div
              className={`order-1 lg:order-1 relative transition-all duration-1000 ${
                aiPowerInView
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-8"
              }`}
            >
              <div className="relative w-full max-w-xl sm:max-w-2xl lg:max-w-3xl mx-auto lg:mx-0">
                <div className="relative z-10 w-full aspect-square">
                  <Image
                    src="/ai-brain-neural-network-showing-machine-learning-a.jpg"
                    alt="AI brain neural network visualization showing machine learning and natural language processing capabilities for intelligent chatbot responses"
                    fill
                    sizes="(max-width: 640px) 95vw, (max-width: 1024px) 85vw, 50vw"
                    className="object-contain rounded-2xl shadow-2xl"
                  />
                </div>
              </div>
            </div>

            {/* Right Side - Content */}
            <div
              className={`order-2 lg:order-2 transition-all duration-1000 delay-300 ${
                aiPowerInView
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-8"
              }`}
            >
              <Badge
                variant="secondary"
                className="mb-3 md:mb-4 bg-blue-100 text-blue-700 hover:bg-blue-200 w-fit shadow-sm"
              >
                <Brain className="w-3 h-3 md:w-3.5 md:h-3.5 mr-1.5" />
                AI-Powered Intelligence
              </Badge>

              <h2 className="mb-4 md:mb-5 text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl font-bold leading-tight">
                <span className="block text-foreground mb-2">
                  Advanced Natural Language
                </span>
                <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Processing & Machine Learning
                </span>
              </h2>

              <p className="mb-6 md:mb-8 text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed">
                Our AI chatbots leverage cutting-edge natural language
                processing (NLP) and machine learning algorithms to understand
                customer intent, context, and sentiment. Unlike basic rule-based
                bots, our conversational AI learns from every interaction,
                continuously improving accuracy and providing increasingly
                sophisticated, human-like responses that delight customers and
                drive business results.
              </p>

              <div className="space-y-4 md:space-y-5">
                <div className="flex items-start gap-3 md:gap-4">
                  <div className="w-9 h-9 md:w-10 md:h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Brain className="w-4 h-4 md:w-5 md:h-5 text-purple-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground mb-1 text-sm md:text-base">
                      Context-Aware Conversations
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      AI remembers conversation history and context to provide
                      relevant, personalized responses throughout the customer
                      journey.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 md:gap-4">
                  <div className="w-9 h-9 md:w-10 md:h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Lightbulb className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground mb-1 text-sm md:text-base">
                      Intent Recognition
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      Advanced NLP identifies customer intent even with typos,
                      slang, or complex phrasing to deliver accurate answers.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 md:gap-4">
                  <div className="w-9 h-9 md:w-10 md:h-10 bg-pink-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-pink-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground mb-1 text-sm md:text-base">
                      Continuous Learning
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      Machine learning algorithms analyze conversations to
                      improve response quality and accuracy over time
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
        className="relative overflow-hidden bg-gradient-to-br from-white via-green-50/30 to-blue-50/20 py-10 sm:py-12 md:py-16 lg:py-20"
      >
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] sm:w-[600px] sm:h-[600px] bg-gradient-to-tr from-green-400/10 to-transparent rounded-full blur-3xl" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid gap-6 lg:gap-8 xl:gap-10 lg:grid-cols-2 items-center">
            {/* Left Side - Content */}
            <div
              className={`order-2 lg:order-1 transition-all duration-1000 ${
                conversationalInView
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-8"
              }`}
            >
              <Badge
                variant="secondary"
                className="mb-3 md:mb-4 bg-green-100 text-green-700 hover:bg-green-200 w-fit shadow-sm"
              >
                <Globe className="w-3 h-3 md:w-3.5 md:h-3.5 mr-1.5" />
                Multi-Platform Support
              </Badge>

              <h2 className="mb-4 md:mb-5 text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl font-bold leading-tight">
                <span className="block text-foreground mb-2">
                  Deploy AI Chatbots
                </span>
                <span className="block bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Across All Channels
                </span>
              </h2>

              <p className="mb-6 md:mb-8 text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed">
                Meet customers where they are with AI chatbots that work
                seamlessly across WhatsApp Business API, RCS (Rich Communication
                Services), Instagram Direct Messages, Facebook Messenger,
                website live chat, and mobile apps. One AI chatbot, unlimited
                reach—provide consistent, intelligent automated support across
                every customer touchpoint with unified conversation management
                and analytics.
              </p>

              <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6 md:mb-8">
                <Card className="p-3 sm:p-4 bg-white border-2 border-green-100 hover:border-green-300 transition-colors">
                  <MessageSquare className="w-6 h-6 sm:w-8 sm:h-8 text-green-600 mb-2" />
                  <div className="font-semibold text-foreground mb-1 text-sm sm:text-base">
                    WhatsApp Business
                  </div>
                  <p className="text-xs text-muted-foreground">
                    2B+ active users worldwide
                  </p>
                </Card>

                <Card className="p-3 sm:p-4 bg-white border-2 border-blue-100 hover:border-blue-300 transition-colors">
                  <MessageCircle className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 mb-2" />
                  <div className="font-semibold text-foreground mb-1 text-sm sm:text-base">
                    RCS Messaging
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Rich interactive experiences
                  </p>
                </Card>

                <Card className="p-3 sm:p-4 bg-white border-2 border-pink-100 hover:border-pink-300 transition-colors">
                  <Send className="w-6 h-6 sm:w-8 sm:h-8 text-pink-600 mb-2" />
                  <div className="font-semibold text-foreground mb-1 text-sm sm:text-base">
                    Instagram DM
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Visual-first engagement
                  </p>
                </Card>

                <Card className="p-3 sm:p-4 bg-white border-2 border-purple-100 hover:border-purple-300 transition-colors">
                  <ThumbsUp className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600 mb-2" />
                  <div className="font-semibold text-foreground mb-1 text-sm sm:text-base">
                    Facebook Messenger
                  </div>
                  <p className="text-xs text-muted-foreground">
                    1.3B+ monthly users
                  </p>
                </Card>
              </div>

              <Button
                size="lg"
                className="bg-green-600 hover:bg-green-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all group text-sm sm:text-base"
              >
                Explore Integrations
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>

            {/* Right Side - Image */}
            <div
              className={`order-1 lg:order-2 relative transition-all duration-1000 delay-300 ${
                conversationalInView
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-8"
              }`}
            >
              <div className="relative w-full max-w-xl sm:max-w-2xl lg:max-w-3xl mx-auto lg:mx-0">
                <div className="relative z-10 w-full aspect-square">
                  <Image
                    src="/multi-platform-chatbot-interface-showing-whatsapp-.jpg"
                    alt="Multi-platform AI chatbot interface showing unified conversations across WhatsApp, Instagram, Facebook Messenger, and RCS messaging"
                    fill
                    sizes="(max-width: 640px) 95vw, (max-width: 1024px) 85vw, 50vw"
                    className="object-contain rounded-2xl shadow-2xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Intelligent Automation Section */}
      <section
        ref={intelligentRef}
        className="relative overflow-hidden bg-gradient-to-br from-purple-50/40 via-white to-blue-50/30 py-10 sm:py-12 md:py-16 lg:py-20"
      >
        <div className="absolute top-0 left-0 w-[400px] h-[400px] sm:w-[600px] sm:h-[600px] bg-gradient-to-br from-purple-400/10 to-transparent rounded-full blur-3xl" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid gap-6 lg:gap-8 xl:gap-10 lg:grid-cols-2 items-center">
            {/* Left Side - Image */}
            <div
              className={`order-1 lg:order-1 relative transition-all duration-1000 ${
                intelligentInView
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-8"
              }`}
            >
              <div className="relative w-full max-w-xl sm:max-w-2xl lg:max-w-3xl mx-auto lg:mx-0">
                <div className="relative z-10 w-full aspect-square">
                  <Image
                    src="/ai-chatbot-conversation-flow-showing-automated-res.jpg"
                    alt="AI chatbot conversation flow diagram showing automated responses, sentiment analysis, and intelligent routing to human agents"
                    fill
                    sizes="(max-width: 640px) 95vw, (max-width: 1024px) 85vw, 50vw"
                    className="object-contain rounded-2xl shadow-2xl"
                  />
                </div>
              </div>
            </div>

            {/* Right Side - Content */}
            <div
              className={`order-2 lg:order-2 transition-all duration-1000 delay-300 ${
                intelligentInView
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-8"
              }`}
            >
              <Badge
                variant="secondary"
                className="mb-3 md:mb-4 bg-purple-100 text-purple-700 hover:bg-purple-200 w-fit shadow-sm"
              >
                <Zap className="w-3 h-3 md:w-3.5 md:h-3.5 mr-1.5" />
                Intelligent Automation
              </Badge>

              <h2 className="mb-4 md:mb-5 text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl font-bold leading-tight">
                <span className="block text-foreground mb-2">
                  Automate Customer Support
                </span>
                <span className="block bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 bg-clip-text text-transparent">
                  With Human-Like Intelligence
                </span>
              </h2>

              <p className="mb-6 md:mb-8 text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed">
                Transform customer support with AI chatbots that handle routine
                queries automatically while seamlessly escalating complex issues
                to human agents. Our intelligent automation combines the
                efficiency of AI with the empathy of human support, delivering
                exceptional customer experiences at scale while reducing support
                costs by up to 60%.
              </p>

              <div className="space-y-4 md:space-y-5">
                <div className="flex items-start gap-3 md:gap-4">
                  <div className="w-9 h-9 md:w-10 md:h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-green-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground mb-1 text-sm md:text-base">
                      Instant Response Times
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      Respond to customer queries in milliseconds, 24/7,
                      eliminating wait times and improving satisfaction.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 md:gap-4">
                  <div className="w-9 h-9 md:w-10 md:h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Smile className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground mb-1 text-sm md:text-base">
                      Sentiment-Based Routing
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      Detect frustrated customers and automatically escalate to
                      human agents with full conversation context.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 md:gap-4">
                  <div className="w-9 h-9 md:w-10 md:h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Target className="w-4 h-4 md:w-5 md:h-5 text-purple-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground mb-1 text-sm md:text-base">
                      Personalized Recommendations
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      Leverage customer data and AI to provide personalized
                      product recommendations and solutions.
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
      <FAQSection
        badgeText="Common Questions"
        title="Frequently Asked Questions"
        description="Everything you need to know about AI chatbots and conversational AI"
        faqsColumn1={faqsColumnFAQSection1}
        faqsColumn2={faqsColumnFAQSection2}
      />

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
