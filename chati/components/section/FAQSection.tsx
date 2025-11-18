// components/FAQSection.tsx
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQ {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  badgeText?: string;
  title?: string;
  description?: string;
  faqsColumn1: FAQ[];
  faqsColumn2: FAQ[];
  faqRef?: React.RefObject<HTMLElement>;
  faqInView?: boolean;
}

export default function FAQSection({
  badgeText = "FAQ",
  title = "Frequently Asked Questions",
  description = "Quick answers to common questions about our messaging platform",
  faqsColumn1,
  faqsColumn2,
  faqRef,
  faqInView = true,
}: FAQSectionProps) {
  return (
    <section
      ref={faqRef}
      className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-blue-50/20 py-12 md:py-14"
    >
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div
            className={`mb-10 text-center transition-all duration-700 ${
              faqInView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <Badge className="mb-3 shadow-sm" variant="outline">
              {badgeText}
            </Badge>
            <h2 className="mb-3 text-balance text-3xl font-bold md:text-4xl">
              {title}
            </h2>
            <p className="text-muted-foreground text-base">{description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {/* Left Column */}
            <div
              className={`space-y-3 transition-all duration-700 ${
                faqInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <Accordion type="single" collapsible className="w-full space-y-3">
                {faqsColumn1.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className="border rounded-lg px-6 bg-white shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    <AccordionTrigger className="text-left font-semibold hover:no-underline py-4">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed pb-4 animate-in fade-in slide-in-from-top-2 duration-300">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            {/* Right Column */}
            <div
              className={`space-y-3 transition-all duration-700 delay-200 ${
                faqInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <Accordion type="single" collapsible className="w-full space-y-3">
                {faqsColumn2.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index + faqsColumn1.length}`}
                    className="border rounded-lg px-6 bg-white shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    <AccordionTrigger className="text-left font-semibold hover:no-underline py-4">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed pb-4 animate-in fade-in slide-in-from-top-2 duration-300">
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
  );
}
