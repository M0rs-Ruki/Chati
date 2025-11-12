import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQData {
  // Header
  title: string;
  description: string;

  // FAQs (max 9)
  faqs: FAQItem[];

  // Background
  backgroundGradient: string;
}

interface FAQComponentProps {
  data: FAQData;
  onChange: (data: FAQData) => void;
}

export function FAQComponent({ data, onChange }: FAQComponentProps) {
  const addFAQ = () => {
    if (data.faqs.length >= 9) {
      alert("Maximum 9 FAQs allowed");
      return;
    }
    onChange({
      ...data,
      faqs: [
        ...data.faqs,
        { question: "New Question?", answer: "Answer goes here..." },
      ],
    });
  };

  const removeFAQ = (index: number) => {
    if (data.faqs.length <= 2) {
      alert("Minimum 2 FAQs required");
      return;
    }
    onChange({
      ...data,
      faqs: data.faqs.filter((_, i) => i !== index),
    });
  };

  const updateFAQ = (index: number, field: keyof FAQItem, value: string) => {
    const newFAQs = [...data.faqs];
    newFAQs[index] = { ...newFAQs[index], [field]: value };
    onChange({ ...data, faqs: newFAQs });
  };

  // Ensure even number of FAQs (2, 4, 6, 8)
  const ensureEvenFAQs = () => {
    if (data.faqs.length % 2 !== 0 && data.faqs.length < 9) {
      onChange({
        ...data,
        faqs: [
          ...data.faqs,
          { question: "New Question?", answer: "Answer goes here..." },
        ],
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="space-y-3 p-4 border rounded-lg">
        <h4 className="font-semibold text-sm">Header</h4>
        <div className="space-y-2">
          <Label>Title</Label>
          <Input
            value={data.title}
            onChange={(e) => onChange({ ...data, title: e.target.value })}
            placeholder="Frequently Asked Questions"
          />
        </div>
        <div className="space-y-2">
          <Label>Description</Label>
          <Textarea
            value={data.description}
            onChange={(e) => onChange({ ...data, description: e.target.value })}
            rows={2}
            placeholder="Everything you need to know..."
          />
        </div>
      </div>

      {/* FAQ Count Info */}
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          <strong>Current FAQs: {data.faqs.length}</strong>
          <br />
          You can have 2-9 FAQs. For best 2-column layout, use even numbers (2,
          4, 6, 8).
        </AlertDescription>
      </Alert>

      {/* FAQs List */}
      <div className="space-y-3 p-4 border rounded-lg">
        <div className="flex items-center justify-between">
          <h4 className="font-semibold text-sm">
            FAQ Items ({data.faqs.length}/9)
          </h4>
          <div className="flex gap-2">
            {data.faqs.length % 2 !== 0 && data.faqs.length < 9 && (
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={ensureEvenFAQs}
              >
                Make Even
              </Button>
            )}
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={addFAQ}
              disabled={data.faqs.length >= 9}
            >
              <Plus className="h-3 w-3 mr-1" />
              Add FAQ
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          {data.faqs.map((faq, index) => (
            <div
              key={index}
              className="space-y-3 p-4 border rounded bg-gray-50"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">
                  FAQ {index + 1}{" "}
                  {index % 2 === 0 ? "(Left Column)" : "(Right Column)"}
                </span>
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  onClick={() => removeFAQ(index)}
                  disabled={data.faqs.length <= 2}
                >
                  <Trash2 className="h-4 w-4 text-red-600" />
                </Button>
              </div>

              <div className="space-y-2">
                <Label>Question</Label>
                <Input
                  placeholder="What is your question?"
                  value={faq.question}
                  onChange={(e) => updateFAQ(index, "question", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Answer</Label>
                <Textarea
                  placeholder="Answer goes here..."
                  value={faq.answer}
                  onChange={(e) => updateFAQ(index, "answer", e.target.value)}
                  rows={3}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Background */}
      <div className="space-y-3 p-4 border rounded-lg">
        <h4 className="font-semibold text-sm">Background</h4>
        <div className="space-y-2">
          <Label>Background Gradient</Label>
          <Select
            value={data.backgroundGradient}
            onValueChange={(value) =>
              onChange({ ...data, backgroundGradient: value })
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="gray-white">Gray to White</SelectItem>
              <SelectItem value="blue-white">Blue to White</SelectItem>
              <SelectItem value="green-white">Green to White</SelectItem>
              <SelectItem value="purple-white">Purple to White</SelectItem>
              <SelectItem value="white">White Only</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Preview Layout Helper */}
      <div className="p-4 border rounded-lg bg-blue-50">
        <h4 className="font-semibold text-sm mb-2">2-Column Layout Preview</h4>
        <div className="grid grid-cols-2 gap-4 text-xs">
          <div>
            <p className="font-medium mb-1">Left Column:</p>
            {data.faqs
              .filter((_, i) => i % 2 === 0)
              .map((faq, i) => (
                <p key={i} className="text-gray-600 truncate">
                  {i * 2 + 1}. {faq.question}
                </p>
              ))}
          </div>
          <div>
            <p className="font-medium mb-1">Right Column:</p>
            {data.faqs
              .filter((_, i) => i % 2 !== 0)
              .map((faq, i) => (
                <p key={i} className="text-gray-600 truncate">
                  {i * 2 + 2}. {faq.question}
                </p>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export const faqDefaults: FAQData = {
  title: "Frequently Asked Questions",
  description:
    "Everything you need to know about multi-channel live chat and unified inbox",
  faqs: [
    {
      question: "What messaging channels are supported?",
      answer:
        "We support WhatsApp Business API, RCS (Rich Communication Services), Instagram Direct Messages, and Facebook Messenger all in one unified inbox.",
    },
    {
      question: "Can multiple team members use the same inbox?",
      answer:
        "Yes! Our platform supports unlimited team members with role-based permissions, conversation assignment, and collaboration features.",
    },
    {
      question: "Is there a free trial available?",
      answer:
        "Yes, we offer a 14-day free trial with full access to all features. No credit card required to start your trial.",
    },
    {
      question: "How does pricing work?",
      answer:
        "Our pricing is based on the number of conversations per month and active team members. Volume discounts are available for larger teams.",
    },
    {
      question: "Can I integrate with my existing CRM?",
      answer:
        "Yes, we offer integrations with popular CRMs like Salesforce, HubSpot, and Zoho. Custom integrations via API are also available.",
    },
    {
      question: "What kind of support do you provide?",
      answer:
        "We provide 24/7 email and chat support for all plans. Enterprise plans include dedicated account managers and phone support.",
    },
  ],
  backgroundGradient: "gray-white",
};
