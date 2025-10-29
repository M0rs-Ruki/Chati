import Link from "next/link"
import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, User } from "lucide-react"

// Demo blog posts data
const blogPosts: Record<
  string,
  {
    id: number
    title: string
    author: string
    date: string
    category: string
    readTime: string
    image: string
    content: string
  }
> = {
  "1": {
    id: 1,
    title: "10 WhatsApp Marketing Strategies That Drive 3x More Engagement",
    author: "Sarah Johnson",
    date: "2024-10-25",
    category: "Marketing",
    readTime: "8 min read",
    image: "/whatsapp-marketing-strategy.jpg",
    content: `
      <h2>Introduction</h2>
      <p>WhatsApp has become one of the most powerful marketing channels available today. With over 2 billion users worldwide, the platform offers unprecedented opportunities for businesses to connect with their customers directly and personally.</p>
      
      <h2>1. Segment Your Audience</h2>
      <p>The first step to effective WhatsApp marketing is understanding your audience. Segment your contacts based on demographics, purchase history, and engagement levels. This allows you to send highly targeted messages that resonate with each group.</p>
      
      <h2>2. Use Personalization</h2>
      <p>Generic messages don't work on WhatsApp. Use customer names, reference their past purchases, and tailor your messages to their specific needs. Personalized messages have a 40% higher engagement rate.</p>
      
      <h2>3. Timing is Everything</h2>
      <p>Send messages at the right time when your customers are most likely to engage. Use analytics to identify peak engagement times for your audience.</p>
      
      <h2>4. Create Compelling CTAs</h2>
      <p>Your call-to-action should be clear, concise, and compelling. Use action-oriented language that encourages immediate response.</p>
      
      <h2>5. Leverage Multimedia</h2>
      <p>WhatsApp supports images, videos, and documents. Use multimedia content to make your messages more engaging and memorable.</p>
      
      <h2>6. Automate Responses</h2>
      <p>Use chatbots to provide instant responses to common questions. This improves customer satisfaction and frees up your team for more complex inquiries.</p>
      
      <h2>7. Build Community</h2>
      <p>Create WhatsApp groups for your most engaged customers. Use these groups to share exclusive offers, updates, and build a sense of community.</p>
      
      <h2>8. A/B Test Everything</h2>
      <p>Test different message formats, CTAs, and sending times to see what works best for your audience.</p>
      
      <h2>9. Respect Privacy</h2>
      <p>Always get explicit consent before adding customers to your WhatsApp marketing list. Respect their preferences and provide easy opt-out options.</p>
      
      <h2>10. Measure and Optimize</h2>
      <p>Track key metrics like open rates, click-through rates, and conversion rates. Use these insights to continuously improve your strategy.</p>
      
      <h2>Conclusion</h2>
      <p>WhatsApp marketing is not just about sending messages—it's about building meaningful relationships with your customers. By implementing these strategies, you can significantly increase engagement and drive business growth.</p>
    `,
  },
  "2": {
    id: 2,
    title: "How to Build Effective WhatsApp Chatbots Without Coding",
    author: "Mike Chen",
    date: "2024-10-20",
    category: "Automation",
    readTime: "6 min read",
    image: "/chatbot-automation.jpg",
    content: `
      <h2>What is a WhatsApp Chatbot?</h2>
      <p>A WhatsApp chatbot is an AI-powered tool that automatically responds to customer messages. It can handle common inquiries, provide information, and even process transactions—all without human intervention.</p>
      
      <h2>Why You Need a Chatbot</h2>
      <p>Chatbots provide 24/7 customer support, reduce response times, and free up your team to focus on complex issues. They can handle thousands of conversations simultaneously.</p>
      
      <h2>Getting Started with Chati AI</h2>
      <p>Chati AI's no-code chatbot builder makes it easy to create sophisticated chatbots without any technical knowledge. Here's how to get started:</p>
      
      <h2>Step 1: Define Your Goals</h2>
      <p>What do you want your chatbot to do? Handle customer support? Process orders? Collect feedback? Be clear about your objectives.</p>
      
      <h2>Step 2: Map Out Conversations</h2>
      <p>Think about the common questions your customers ask and how you want your chatbot to respond. Create a conversation flow that feels natural.</p>
      
      <h2>Step 3: Build Your Chatbot</h2>
      <p>Use Chati AI's drag-and-drop builder to create your chatbot. Add responses, set up conditions, and integrate with your systems.</p>
      
      <h2>Step 4: Test and Refine</h2>
      <p>Test your chatbot thoroughly before launching. Gather feedback and make improvements based on real conversations.</p>
      
      <h2>Best Practices</h2>
      <p>Keep responses concise and friendly. Always provide an option to escalate to a human agent. Monitor conversations and update your chatbot regularly.</p>
      
      <h2>Conclusion</h2>
      <p>Building a WhatsApp chatbot doesn't require coding skills. With Chati AI, you can create a powerful customer service tool in minutes.</p>
    `,
  },
  "3": {
    id: 3,
    title: "WhatsApp Business API: Complete Guide for E-commerce Businesses",
    author: "Emily Rodriguez",
    date: "2024-10-15",
    category: "E-commerce",
    readTime: "10 min read",
    image: "/ecommerce-whatsapp.jpg",
    content: `
      <h2>Introduction</h2>
      <p>The WhatsApp Business API is a game-changer for e-commerce businesses. It allows you to send order updates, payment reminders, and personalized recommendations directly to your customers.</p>
      
      <h2>Key Features for E-commerce</h2>
      <p>The WhatsApp Business API offers several features specifically designed for e-commerce: order notifications, payment processing, product catalogs, and customer support.</p>
      
      <h2>Getting Started</h2>
      <p>To use the WhatsApp Business API, you need to be a Meta Business Partner. Chati AI handles all the technical setup for you.</p>
      
      <h2>Use Case 1: Order Notifications</h2>
      <p>Send real-time order confirmations, shipping updates, and delivery notifications. Customers appreciate the transparency and it reduces support inquiries.</p>
      
      <h2>Use Case 2: Payment Reminders</h2>
      <p>Send payment reminders for abandoned carts. A simple reminder can recover up to 30% of abandoned orders.</p>
      
      <h2>Use Case 3: Product Recommendations</h2>
      <p>Use customer purchase history to send personalized product recommendations. This increases average order value and customer satisfaction.</p>
      
      <h2>Use Case 4: Customer Support</h2>
      <p>Provide instant customer support through WhatsApp. Customers prefer messaging over phone calls and emails.</p>
      
      <h2>Best Practices</h2>
      <p>Always get customer consent before sending messages. Keep messages concise and actionable. Use rich media to showcase products.</p>
      
      <h2>Conclusion</h2>
      <p>The WhatsApp Business API is essential for modern e-commerce businesses. It improves customer experience, increases sales, and reduces support costs.</p>
    `,
  },
  "4": {
    id: 4,
    title: "Personalization at Scale: Using AI to Tailor WhatsApp Messages",
    author: "David Kumar",
    date: "2024-10-10",
    category: "AI & Analytics",
    readTime: "7 min read",
    image: "/ai-personalization.jpg",
    content: `
      <h2>The Power of Personalization</h2>
      <p>Personalized messages have a 40% higher engagement rate than generic messages. But personalizing messages at scale is challenging—until now.</p>
      
      <h2>How AI Enables Personalization</h2>
      <p>AI can analyze customer data and automatically generate personalized messages. This includes customer names, purchase history, preferences, and behavior patterns.</p>
      
      <h2>Dynamic Content</h2>
      <p>Use dynamic content blocks to insert customer-specific information into your messages. This creates a personalized experience without manual effort.</p>
      
      <h2>Behavioral Triggers</h2>
      <p>Set up automated messages triggered by customer behavior. For example, send a discount offer when a customer abandons their cart.</p>
      
      <h2>Predictive Analytics</h2>
      <p>Use AI to predict which customers are most likely to convert and send them targeted messages at the right time.</p>
      
      <h2>A/B Testing at Scale</h2>
      <p>AI can automatically test different message variations and optimize for the best performance.</p>
      
      <h2>Privacy and Compliance</h2>
      <p>Personalization must be done responsibly. Always comply with privacy regulations and give customers control over their data.</p>
      
      <h2>Conclusion</h2>
      <p>AI-powered personalization is the future of WhatsApp marketing. It allows you to deliver the right message to the right person at the right time.</p>
    `,
  },
  "5": {
    id: 5,
    title: "GDPR Compliance in WhatsApp Marketing: What You Need to Know",
    author: "Lisa Thompson",
    date: "2024-10-05",
    category: "Compliance",
    readTime: "9 min read",
    image: "/gdpr-compliance.jpg",
    content: `
      <h2>Understanding GDPR</h2>
      <p>The General Data Protection Regulation (GDPR) is a European regulation that protects personal data. It applies to any business that processes data of EU residents.</p>
      
      <h2>Key GDPR Requirements</h2>
      <p>GDPR requires explicit consent before sending marketing messages. You must also provide easy opt-out options and respect customer preferences.</p>
      
      <h2>Consent Management</h2>
      <p>Implement a robust consent management system. Document when and how you obtained consent from each customer.</p>
      
      <h2>Data Security</h2>
      <p>Protect customer data with encryption and secure storage. Implement access controls and regular security audits.</p>
      
      <h2>Right to Be Forgotten</h2>
      <p>Customers have the right to request deletion of their data. Implement processes to handle these requests promptly.</p>
      
      <h2>Data Processing Agreements</h2>
      <p>If you use third-party tools like Chati AI, ensure you have proper data processing agreements in place.</p>
      
      <h2>Penalties for Non-Compliance</h2>
      <p>GDPR violations can result in fines up to €20 million or 4% of annual revenue. Compliance is not optional.</p>
      
      <h2>Conclusion</h2>
      <p>GDPR compliance is essential for WhatsApp marketing. By following these guidelines, you can build trust with your customers and avoid costly penalties.</p>
    `,
  },
  "6": {
    id: 6,
    title: "Case Study: How XYZ Company Increased Sales by 150% with WhatsApp",
    author: "James Wilson",
    date: "2024-09-30",
    category: "Case Studies",
    readTime: "5 min read",
    image: "/case-study-success.jpg",
    content: `
      <h2>The Challenge</h2>
      <p>XYZ Company, a mid-sized e-commerce business, was struggling with low customer engagement and high cart abandonment rates. Their email marketing was underperforming, and they needed a new channel to reach customers.</p>
      
      <h2>The Solution</h2>
      <p>They decided to implement WhatsApp marketing using Chati AI. They started with order notifications and gradually expanded to personalized recommendations and promotional campaigns.</p>
      
      <h2>Implementation</h2>
      <p>The team set up automated workflows for order confirmations, shipping updates, and abandoned cart reminders. They also created a chatbot to handle customer inquiries.</p>
      
      <h2>Results</h2>
      <p>Within three months, they saw remarkable results: 150% increase in sales, 45% reduction in cart abandonment, 85% message open rate, and 35% improvement in customer satisfaction.</p>
      
      <h2>Key Success Factors</h2>
      <p>1. Personalization: They tailored messages to each customer's preferences and purchase history.</p>
      <p>2. Timing: They sent messages at optimal times when customers were most likely to engage.</p>
      <p>3. Automation: They automated repetitive tasks to save time and ensure consistency.</p>
      <p>4. Testing: They continuously tested and optimized their campaigns.</p>
      
      <h2>Lessons Learned</h2>
      <p>WhatsApp marketing is not a one-size-fits-all solution. Success requires careful planning, continuous optimization, and a customer-centric approach.</p>
      
      <h2>Conclusion</h2>
      <p>This case study demonstrates the power of WhatsApp marketing when implemented correctly. If you're looking to boost sales and customer engagement, WhatsApp is definitely worth exploring.</p>
    `,
  },
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const post = blogPosts[params.id]
  if (!post) {
    return {
      title: "Blog Post Not Found",
    }
  }
  return {
    title: `${post.title} - Chati AI Blog`,
    description: post.title,
    openGraph: {
      title: post.title,
      description: post.title,
      type: "article",
    },
  }
}

export default function BlogPost({ params }: { params: { id: string } }) {
  const post = blogPosts[params.id]

  if (!post) {
    return (
      <main className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-bold mb-4">Blog Post Not Found</h1>
          <p className="text-muted-foreground mb-8">The blog post you're looking for doesn't exist.</p>
          <Button asChild>
            <Link href="/blog">Back to Blog</Link>
          </Button>
        </div>
      </main>
    )
  }

  return (
    <main>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-primary/5 py-12 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/blog" className="inline-flex items-center gap-2 text-primary hover:gap-3 transition-all mb-6">
            <ArrowLeft size={16} />
            Back to Blog
          </Link>
          <div className="max-w-3xl">
            <div className="inline-block mb-4 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
              {post.category}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">{post.title}</h1>
            <div className="flex flex-wrap gap-6 text-muted-foreground">
              <div className="flex items-center gap-2">
                <User size={16} />
                {post.author}
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
              <span>{post.readTime}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative h-96 md:h-[500px] rounded-lg overflow-hidden bg-muted">
            <img src={post.image || "/placeholder.svg"} alt={post.title} className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="md:col-span-2">
              <article className="prose prose-invert max-w-none">
                <div
                  className="text-lg text-muted-foreground leading-relaxed space-y-6"
                  dangerouslySetInnerHTML={{
                    __html: post.content
                      .split("\n")
                      .map((line) => {
                        if (line.startsWith("<h2>")) {
                          return `<h2 class="text-2xl font-bold mt-8 mb-4 text-foreground">${line.slice(4, -5)}</h2>`
                        }
                        if (line.startsWith("<p>")) {
                          return `<p class="mb-4">${line.slice(3, -4)}</p>`
                        }
                        return line
                      })
                      .join(""),
                  }}
                />
              </article>

              {/* Share Section */}
              <div className="mt-12 pt-8 border-t border-border">
                <div className="flex items-center gap-4">
                  <span className="font-medium">Share this article:</span>
                  <div className="flex gap-3">
                    <Button variant="outline" size="sm" asChild>
                      <a
                        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Twitter
                      </a>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <a
                        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        LinkedIn
                      </a>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <a
                        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Facebook
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="md:col-span-1">
              {/* CTA Box */}
              <div className="bg-primary text-primary-foreground rounded-lg p-8 sticky top-24">
                <h3 className="text-xl font-bold mb-3">Ready to Transform Your Marketing?</h3>
                <p className="mb-6 opacity-90">
                  Start using Chati AI today and see the difference WhatsApp marketing can make.
                </p>
                <Button variant="secondary" className="w-full" asChild>
                  <Link href="/contact">Get Started Free</Link>
                </Button>
              </div>

              {/* Related Posts */}
              <div className="mt-8 bg-card border border-border rounded-lg p-6">
                <h4 className="font-bold mb-4">More Articles</h4>
                <div className="space-y-3">
                  {Object.values(blogPosts)
                    .filter((p) => p.id !== post.id)
                    .slice(0, 3)
                    .map((relatedPost) => (
                      <Link
                        key={relatedPost.id}
                        href={`/blog/${relatedPost.id}`}
                        className="block text-sm hover:text-primary transition-colors line-clamp-2"
                      >
                        {relatedPost.title}
                      </Link>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of businesses already using Chati AI to drive growth through WhatsApp marketing.
          </p>
          <Button size="lg" asChild>
            <Link href="/contact">Start Your Free Trial</Link>
          </Button>
        </div>
      </section>
    </main>
  )
}
