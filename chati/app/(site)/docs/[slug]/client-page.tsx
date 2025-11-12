"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Calendar, Tag, ChevronRight, BookOpen, Copy, Check, ArrowLeft, ExternalLink } from "lucide-react"
import Link from "next/link"
import { type DocArticle, getAllArticles } from "@/lib/docs-data"

interface DocArticleClientProps {
  article: any // Can be DocArticle or database doc
}

export default function DocArticleClient({ article }: DocArticleClientProps) {
  const [copiedCode, setCopiedCode] = useState<string | null>(null)
  const [activeSection, setActiveSection] = useState<string>("")

  // Normalize article data (database or static)
  const normalizedArticle = {
    id: article.id,
    slug: article.slug,
    title: article.title,
    description: article.metadata?.description || article.description || 'No description available',
    category: article.metadata?.category || article.category || 'Uncategorized',
    tags: Array.isArray(article.metadata?.tags) ? article.metadata.tags : (Array.isArray(article.tags) ? article.tags : []),
    readTime: article.metadata?.readTime || article.readTime || '5 min read',
    lastUpdated: article.updatedAt || article.lastUpdated,
    content: article.content || {},
  }

  const relatedArticles = getAllArticles()
    .filter((a) => a.id !== normalizedArticle.id && a.category === normalizedArticle.category)
    .slice(0, 3)

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(id)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  // Render content from database
  const renderContent = () => {
    const content = normalizedArticle.content

    // If content is from database with html/markdown/blocks format
    if (content && typeof content === 'object') {
      if (content.html) {
        return (
          <div 
            className="prose prose-lg max-w-none" 
            dangerouslySetInnerHTML={{ __html: content.html }} 
          />
        )
      }
      
      if (content.markdown) {
        return (
          <div className="prose prose-lg max-w-none">
            <pre className="whitespace-pre-wrap bg-gray-50 p-6 rounded-lg">{content.markdown}</pre>
          </div>
        )
      }
      
      if (content.blocks && Array.isArray(content.blocks)) {
        return (
          <div className="prose prose-lg max-w-none space-y-4">
            {content.blocks.map((block: any, index: number) => {
              switch (block.type) {
                case 'paragraph':
                  return <p key={index}>{block.data.text}</p>
                case 'heading':
                  const level = block.data.level || 2
                  if (level === 1) return <h1 key={index}>{block.data.text}</h1>
                  if (level === 2) return <h2 key={index}>{block.data.text}</h2>
                  if (level === 3) return <h3 key={index}>{block.data.text}</h3>
                  if (level === 4) return <h4 key={index}>{block.data.text}</h4>
                  if (level === 5) return <h5 key={index}>{block.data.text}</h5>
                  return <h6 key={index}>{block.data.text}</h6>
                case 'list':
                  return block.data.style === 'ordered' ? (
                    <ol key={index}>
                      {block.data.items.map((item: string, i: number) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ol>
                  ) : (
                    <ul key={index}>
                      {block.data.items.map((item: string, i: number) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  )
                default:
                  return null
              }
            })}
          </div>
        )
      }
    }

    // If content is a string (HTML)
    if (typeof content === 'string') {
      return (
        <div 
          className="prose prose-lg max-w-none" 
          dangerouslySetInnerHTML={{ __html: content }} 
        />
      )
    }

    // Fallback to static detailed content
    return getDetailedContent()
  }

  // Get detailed content based on article slug (for static articles)
  const getDetailedContent = () => {
    switch (normalizedArticle.slug) {
      case "introduction":
        return (
          <div className="prose prose-lg max-w-none">
            <h2 id="overview">Overview</h2>
            <p>
              The WhatsApp Business API enables medium and large businesses to communicate with their customers at
              scale. It provides a powerful platform for sending notifications, providing customer support, and building
              conversational experiences.
            </p>

            <h3>Key Capabilities</h3>
            <ul>
              <li>
                <strong>Message Templates:</strong> Send pre-approved notification messages to customers
              </li>
              <li>
                <strong>Session Messages:</strong> Respond to customer inquiries within 24-hour windows
              </li>
              <li>
                <strong>Media Support:</strong> Share images, videos, documents, and audio files
              </li>
              <li>
                <strong>Interactive Messages:</strong> Create buttons, lists, and quick replies
              </li>
              <li>
                <strong>End-to-End Encryption:</strong> All messages are encrypted for security
              </li>
            </ul>

            <h2 id="use-cases">Common Use Cases</h2>
            <p>Businesses across industries use WhatsApp Business API for various purposes:</p>

            <h3>Customer Support</h3>
            <p>
              Provide real-time customer service through WhatsApp, reducing response times and improving customer
              satisfaction. Integrate with your CRM to access customer history and provide personalized support.
            </p>

            <h3>Transactional Notifications</h3>
            <p>
              Send order confirmations, shipping updates, appointment reminders, and payment receipts directly to
              customers' WhatsApp.
            </p>

            <h3>Marketing & Promotions</h3>
            <p>
              Share product launches, special offers, and personalized recommendations with customers who have opted in
              to receive marketing messages.
            </p>

            <h2 id="getting-started">Getting Started</h2>
            <p>To start using the WhatsApp Business API, you'll need:</p>
            <ol>
              <li>A Facebook Business Manager account</li>
              <li>A verified business phone number</li>
              <li>API credentials from a Business Solution Provider</li>
              <li>A webhook endpoint to receive messages</li>
            </ol>

            <Card className="p-6 bg-blue-50 border-blue-200 my-6">
              <div className="flex gap-3">
                <BookOpen className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-blue-900 mb-2">Next Steps</h4>
                  <p className="text-sm text-blue-800 mb-3">
                    Ready to get started? Follow our quick start guide to set up your first WhatsApp Business API
                    integration.
                  </p>
                  <Button size="sm" variant="default" asChild>
                    <Link href="/docs/quick-start">
                      Quick Start Guide
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Link>
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )

      case "quick-start":
        return (
          <div className="prose prose-lg max-w-none">
            <h2 id="prerequisites">Prerequisites</h2>
            <p>Before you begin, ensure you have:</p>
            <ul>
              <li>A Facebook Business Manager account</li>
              <li>A phone number that isn't already registered with WhatsApp</li>
              <li>Basic knowledge of REST APIs and webhooks</li>
              <li>A development environment with HTTPS support</li>
            </ul>

            <h2 id="step-1">Step 1: Create a Business Account</h2>
            <p>
              First, you'll need to create a WhatsApp Business Account through Facebook Business Manager. This account
              will be used to manage your API access and phone numbers.
            </p>

            <ol>
              <li>Go to Facebook Business Manager</li>
              <li>Navigate to Business Settings</li>
              <li>Click on "WhatsApp Accounts" under Accounts</li>
              <li>Click "Add" and follow the setup wizard</li>
            </ol>

            <h2 id="step-2">Step 2: Get API Credentials</h2>
            <p>Once your business account is set up, you'll need to obtain your API credentials:</p>

            <Card className="p-4 bg-gray-50 my-4">
              <div className="flex items-start justify-between gap-4">
                <pre className="flex-1 overflow-x-auto">
                  <code>{`{
  "phone_number_id": "1234567890",
  "business_account_id": "9876543210",
  "access_token": "your_access_token_here"
}`}</code>
                </pre>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() =>
                    copyToClipboard(
                      `{
  "phone_number_id": "1234567890",
  "business_account_id": "9876543210",
  "access_token": "your_access_token_here"
}`,
                      "credentials",
                    )
                  }
                >
                  {copiedCode === "credentials" ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>
            </Card>

            <h2 id="step-3">Step 3: Send Your First Message</h2>
            <p>Now you're ready to send your first message using the API:</p>

            <Card className="p-4 bg-gray-50 my-4">
              <div className="flex items-start justify-between gap-4">
                <pre className="flex-1 overflow-x-auto text-sm">
                  <code>{`curl -X POST 'https://graph.facebook.com/v18.0/PHONE_NUMBER_ID/messages' \\
-H 'Authorization: Bearer ACCESS_TOKEN' \\
-H 'Content-Type: application/json' \\
-d '{
  "messaging_product": "whatsapp",
  "to": "RECIPIENT_PHONE_NUMBER",
  "type": "text",
  "text": {
    "body": "Hello from WhatsApp Business API!"
  }
}'`}</code>
                </pre>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() =>
                    copyToClipboard(
                      `curl -X POST 'https://graph.facebook.com/v18.0/PHONE_NUMBER_ID/messages' \\
-H 'Authorization: Bearer ACCESS_TOKEN' \\
-H 'Content-Type: application/json' \\
-d '{
  "messaging_product": "whatsapp",
  "to": "RECIPIENT_PHONE_NUMBER",
  "type": "text",
  "text": {
    "body": "Hello from WhatsApp Business API!"
  }
}'`,
                      "first-message",
                    )
                  }
                >
                  {copiedCode === "first-message" ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>
            </Card>

            <h2 id="step-4">Step 4: Set Up Webhooks</h2>
            <p>
              To receive messages and delivery status updates, you need to configure webhooks. Your webhook endpoint
              must be publicly accessible and support HTTPS.
            </p>

            <Card className="p-6 bg-amber-50 border-amber-200 my-6">
              <div className="flex gap-3">
                <ExternalLink className="w-5 h-5 text-amber-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-amber-900 mb-2">Important</h4>
                  <p className="text-sm text-amber-800">
                    Your webhook URL must use HTTPS and return a 200 OK response within 5 seconds to verify the webhook.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        )

      case "message-templates":
        return (
          <div className="prose prose-lg max-w-none">
            <h2 id="overview">What are Message Templates?</h2>
            <p>
              Message templates are pre-approved message formats that businesses can use to send notifications to
              customers outside the 24-hour customer service window. All templates must be approved by WhatsApp before
              use.
            </p>

            <h2 id="template-types">Template Types</h2>

            <h3>Transactional Templates</h3>
            <p>Used for order updates, shipping notifications, appointment reminders, and account alerts.</p>

            <Card className="p-4 bg-gray-50 my-4">
              <div className="flex items-start justify-between gap-4">
                <pre className="flex-1 overflow-x-auto text-sm">
                  <code>{`{
  "name": "order_confirmation",
  "language": "en",
  "category": "TRANSACTIONAL",
  "components": [
    {
      "type": "BODY",
      "text": "Your order {{1}} has been confirmed. Expected delivery: {{2}}"
    },
    {
      "type": "FOOTER",
      "text": "Thank you for shopping with us!"
    }
  ]
}`}</code>
                </pre>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() =>
                    copyToClipboard(
                      `{
  "name": "order_confirmation",
  "language": "en",
  "category": "TRANSACTIONAL",
  "components": [
    {
      "type": "BODY",
      "text": "Your order {{1}} has been confirmed. Expected delivery: {{2}}"
    },
    {
      "type": "FOOTER",
      "text": "Thank you for shopping with us!"
    }
  ]
}`,
                      "transactional-template",
                    )
                  }
                >
                  {copiedCode === "transactional-template" ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </Card>

            <h3>Marketing Templates</h3>
            <p>Used for promotional messages, product launches, and special offers.</p>

            <h2 id="creating-templates">Creating Templates</h2>
            <p>To create a new message template:</p>
            <ol>
              <li>Go to WhatsApp Manager</li>
              <li>Select your WhatsApp Business Account</li>
              <li>Click on "Message Templates"</li>
              <li>Click "Create Template"</li>
              <li>Fill in the template details and submit for approval</li>
            </ol>

            <h2 id="template-guidelines">Template Guidelines</h2>
            <p>Follow these guidelines to ensure your templates get approved:</p>
            <ul>
              <li>Use clear, concise language</li>
              <li>Avoid promotional language in transactional templates</li>
              <li>Include opt-out instructions for marketing messages</li>
              <li>Use variables for personalization (e.g., customer name, order number)</li>
              <li>Keep messages under 1024 characters</li>
            </ul>

            <h2 id="sending-templates">Sending Template Messages</h2>
            <p>Once approved, you can send template messages using the API:</p>

            <Card className="p-4 bg-gray-50 my-4">
              <div className="flex items-start justify-between gap-4">
                <pre className="flex-1 overflow-x-auto text-sm">
                  <code>{`curl -X POST 'https://graph.facebook.com/v18.0/PHONE_NUMBER_ID/messages' \\
-H 'Authorization: Bearer ACCESS_TOKEN' \\
-H 'Content-Type: application/json' \\
-d '{
  "messaging_product": "whatsapp",
  "to": "RECIPIENT_PHONE_NUMBER",
  "type": "template",
  "template": {
    "name": "order_confirmation",
    "language": {
      "code": "en"
    },
    "components": [
      {
        "type": "body",
        "parameters": [
          {
            "type": "text",
            "text": "#12345"
          },
          {
            "type": "text",
            "text": "Dec 25, 2024"
          }
        ]
      }
    ]
  }
}'`}</code>
                </pre>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() =>
                    copyToClipboard(
                      `curl -X POST 'https://graph.facebook.com/v18.0/PHONE_NUMBER_ID/messages' \\
-H 'Authorization: Bearer ACCESS_TOKEN' \\
-H 'Content-Type: application/json' \\
-d '{
  "messaging_product": "whatsapp",
  "to": "RECIPIENT_PHONE_NUMBER",
  "type": "template",
  "template": {
    "name": "order_confirmation",
    "language": {
      "code": "en"
    },
    "components": [
      {
        "type": "body",
        "parameters": [
          {
            "type": "text",
            "text": "#12345"
          },
          {
            "type": "text",
            "text": "Dec 25, 2024"
          }
        ]
      }
    ]
  }
}'`,
                      "send-template",
                    )
                  }
                >
                  {copiedCode === "send-template" ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>
            </Card>
          </div>
        )

      case "automation":
        return (
          <div className="prose prose-lg max-w-none">
            <h2 id="overview">Automation Overview</h2>
            <p>
              Automate your WhatsApp conversations with AI-powered chatbots to handle common inquiries, qualify leads,
              and provide 24/7 customer support. Automation can significantly reduce response times and improve customer
              satisfaction.
            </p>

            <h2 id="chatbot-types">Types of Automation</h2>

            <h3>Rule-Based Chatbots</h3>
            <p>
              Simple automation using predefined rules and decision trees. Best for handling frequently asked questions
              and routing conversations.
            </p>

            <h3>AI-Powered Chatbots</h3>
            <p>
              Advanced automation using natural language processing (NLP) and machine learning to understand customer
              intent and provide intelligent responses.
            </p>

            <h2 id="building-chatbots">Building Your First Chatbot</h2>
            <p>Here's a simple example of a rule-based chatbot flow:</p>

            <Card className="p-4 bg-gray-50 my-4">
              <div className="flex items-start justify-between gap-4">
                <pre className="flex-1 overflow-x-auto text-sm">
                  <code>{`const handleIncomingMessage = async (message) => {
  const userMessage = message.text.body.toLowerCase();
  
  // Greeting
  if (userMessage.includes('hello') || userMessage.includes('hi')) {
    return sendMessage({
      to: message.from,
      text: "Hello! How can I help you today?",
      buttons: [
        { id: "1", title: "Track Order" },
        { id: "2", title: "Support" },
        { id: "3", title: "Products" }
      ]
    });
  }
  
  // Order tracking
  if (userMessage.includes('track') || userMessage.includes('order')) {
    return sendMessage({
      to: message.from,
      text: "Please provide your order number:"
    });
  }
  
  // Default response
  return sendMessage({
    to: message.from,
    text: "I'm not sure I understand. Would you like to speak with a human agent?"
  });
};`}</code>
                </pre>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() =>
                    copyToClipboard(
                      `const handleIncomingMessage = async (message) => {
  const userMessage = message.text.body.toLowerCase();
  
  // Greeting
  if (userMessage.includes('hello') || userMessage.includes('hi')) {
    return sendMessage({
      to: message.from,
      text: "Hello! How can I help you today?",
      buttons: [
        { id: "1", title: "Track Order" },
        { id: "2", title: "Support" },
        { id: "3", title: "Products" }
      ]
    });
  }
  
  // Order tracking
  if (userMessage.includes('track') || userMessage.includes('order')) {
    return sendMessage({
      to: message.from,
      text: "Please provide your order number:"
    });
  }
  
  // Default response
  return sendMessage({
    to: message.from,
    text: "I'm not sure I understand. Would you like to speak with a human agent?"
  });
};`,
                      "chatbot-example",
                    )
                  }
                >
                  {copiedCode === "chatbot-example" ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>
            </Card>

            <h2 id="best-practices">Automation Best Practices</h2>
            <ul>
              <li>
                <strong>Always provide an option to speak with a human:</strong> Don't trap users in automated loops
              </li>
              <li>
                <strong>Keep responses concise:</strong> Mobile users prefer short, clear messages
              </li>
              <li>
                <strong>Use interactive elements:</strong> Buttons and quick replies improve user experience
              </li>
              <li>
                <strong>Handle errors gracefully:</strong> Provide helpful fallback responses
              </li>
              <li>
                <strong>Test thoroughly:</strong> Ensure your bot handles edge cases and unexpected inputs
              </li>
            </ul>

            <h2 id="ai-integration">Integrating AI Services</h2>
            <p>You can integrate popular AI services like OpenAI, Dialogflow, or custom NLP models:</p>

            <Card className="p-4 bg-gray-50 my-4">
              <div className="flex items-start justify-between gap-4">
                <pre className="flex-1 overflow-x-auto text-sm">
                  <code>{`const handleWithAI = async (message) => {
  // Send message to AI service
  const aiResponse = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: "You are a helpful customer service assistant."
      },
      {
        role: "user",
        content: message.text.body
      }
    ]
  });
  
  // Send AI response back to user
  return sendMessage({
    to: message.from,
    text: aiResponse.choices[0].message.content
  });
};`}</code>
                </pre>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() =>
                    copyToClipboard(
                      `const handleWithAI = async (message) => {
  // Send message to AI service
  const aiResponse = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: "You are a helpful customer service assistant."
      },
      {
        role: "user",
        content: message.text.body
      }
    ]
  });
  
  // Send AI response back to user
  return sendMessage({
    to: message.from,
    text: aiResponse.choices[0].message.content
  });
};`,
                      "ai-integration",
                    )
                  }
                >
                  {copiedCode === "ai-integration" ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>
            </Card>
          </div>
        )

      case "security-overview":
        return (
          <div className="prose prose-lg max-w-none">
            <h2 id="encryption">End-to-End Encryption</h2>
            <p>
              All messages sent through WhatsApp Business API are protected by end-to-end encryption using the Signal
              Protocol. This means that only you and the recipient can read the messages - not even WhatsApp can access
              the content.
            </p>

            <h2 id="authentication">API Authentication</h2>
            <p>The WhatsApp Business API uses OAuth 2.0 for authentication. Always keep your access tokens secure:</p>

            <ul>
              <li>Never commit tokens to version control</li>
              <li>Use environment variables for storing credentials</li>
              <li>Rotate tokens regularly</li>
              <li>Implement token refresh mechanisms</li>
              <li>Use HTTPS for all API requests</li>
            </ul>

            <h2 id="webhook-security">Webhook Security</h2>
            <p>Secure your webhook endpoint to prevent unauthorized access:</p>

            <Card className="p-4 bg-gray-50 my-4">
              <div className="flex items-start justify-between gap-4">
                <pre className="flex-1 overflow-x-auto text-sm">
                  <code>{`const crypto = require('crypto');

// Verify webhook signature
function verifyWebhookSignature(payload, signature, secret) {
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');
    
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  );
}

// Webhook endpoint
app.post('/webhook', (req, res) => {
  const signature = req.headers['x-hub-signature-256'];
  const payload = JSON.stringify(req.body);
  
  if (!verifyWebhookSignature(payload, signature, WEBHOOK_SECRET)) {
    return res.status(401).send('Invalid signature');
  }
  
  // Process webhook
  res.status(200).send('OK');
});`}</code>
                </pre>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() =>
                    copyToClipboard(
                      `const crypto = require('crypto');

// Verify webhook signature
function verifyWebhookSignature(payload, signature, secret) {
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');
    
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  );
}

// Webhook endpoint
app.post('/webhook', (req, res) => {
  const signature = req.headers['x-hub-signature-256'];
  const payload = JSON.stringify(req.body);
  
  if (!verifyWebhookSignature(payload, signature, WEBHOOK_SECRET)) {
    return res.status(401).send('Invalid signature');
  }
  
  // Process webhook
  res.status(200).send('OK');
});`,
                      "webhook-security",
                    )
                  }
                >
                  {copiedCode === "webhook-security" ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>
            </Card>

            <h2 id="data-protection">Data Protection</h2>
            <p>Implement proper data protection measures:</p>
            <ul>
              <li>Encrypt sensitive data at rest and in transit</li>
              <li>Implement access controls and audit logs</li>
              <li>Regularly backup your data</li>
              <li>Follow data retention policies</li>
              <li>Comply with GDPR, CCPA, and other regulations</li>
            </ul>

            <h2 id="security-checklist">Security Checklist</h2>
            <Card className="p-6 bg-blue-50 border-blue-200 my-6">
              <h4 className="font-semibold text-blue-900 mb-4">Essential Security Measures</h4>
              <ul className="space-y-2 text-sm text-blue-800">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>Use HTTPS for all API requests and webhook endpoints</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>Verify webhook signatures to prevent spoofing</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>Store access tokens securely using environment variables</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>Implement rate limiting to prevent abuse</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>Monitor API usage and set up alerts for suspicious activity</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>Regularly update dependencies and patch vulnerabilities</span>
                </li>
              </ul>
            </Card>
          </div>
        )

      default:
        return (
          <div className="prose prose-lg max-w-none">
            <p>{article.description}</p>
            <p>Detailed content for this article is coming soon. Check back later for comprehensive documentation.</p>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50/30 to-white">
      {/* Breadcrumb */}
      <div className="border-b bg-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/docs" className="hover:text-blue-600 transition-colors">
              Documentation
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link href={`/docs?category=${normalizedArticle.category}`} className="hover:text-blue-600 transition-colors">
              {normalizedArticle.category}
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 font-medium">{normalizedArticle.title}</span>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <article className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Back Button */}
            <Button variant="ghost" size="sm" className="mb-6" asChild>
              <Link href="/docs">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Documentation
              </Link>
            </Button>

            {/* Article Header */}
            <div className="mb-8">
              <Badge className="mb-4">{normalizedArticle.category}</Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">{normalizedArticle.title}</h1>
              <p className="text-xl text-gray-600 mb-6">{normalizedArticle.description}</p>

              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>Updated {new Date(normalizedArticle.lastUpdated).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{normalizedArticle.readTime} read</span>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-4">
                {normalizedArticle.tags && normalizedArticle.tags.length > 0 ? (
                  normalizedArticle.tags.map((tag: string) => (
                    <span key={tag} className="inline-flex items-center gap-1 text-xs bg-gray-100 px-3 py-1 rounded-full">
                      <Tag className="w-3 h-3" />
                      {tag}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-gray-400">No tags</span>
                )}
              </div>
            </div>

            {/* Article Content */}
            <div className="article-content">{renderContent()}</div>

            {/* Related Articles */}
            {relatedArticles.length > 0 && (
              <div className="mt-16 pt-8 border-t">
                <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
                <div className="grid md:grid-cols-3 gap-4">
                  {relatedArticles.map((related) => (
                    <Card
                      key={related.id}
                      className="p-4 hover:shadow-lg transition-all cursor-pointer group"
                      onClick={() => (window.location.href = `/docs/${related.slug}`)}
                    >
                      <Badge variant="secondary" className="text-xs mb-2">
                        {related.category}
                      </Badge>
                      <h3 className="font-semibold mb-2 group-hover:text-blue-600 transition-colors">
                        {related.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{related.description}</p>
                      <div className="flex items-center text-sm text-blue-600 font-medium">
                        Read more
                        <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </article>

      {/* CTA Section */}
      <section className="py-12 bg-gradient-to-br from-blue-600 to-purple-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Still have questions?</h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            Our support team is here to help you get the most out of WhatsApp Business API
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100" asChild>
              <Link href="/contact">Contact Support</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10 bg-transparent"
              asChild
            >
              <Link href="/docs">Browse All Docs</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
