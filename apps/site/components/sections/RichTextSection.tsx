"use client";

interface Theme {
  primaryColor?: string;
  secondaryColor?: string;
  accentColor?: string;
}

interface RichTextSectionProps {
  data: {
    content?: string;
    backgroundColor?: string;
  };
  theme?: Theme | null;
}

export default function RichTextSection({ data, theme }: RichTextSectionProps) {
  const { content, backgroundColor } = data;
  const primaryColor = theme?.primaryColor || "#3B82F6";
  const secondaryColor = theme?.secondaryColor || "#8B5CF6";
  const accentColor = theme?.accentColor || "#10B981";

  return (
    <section
      className="py-16"
      style={{ backgroundColor: backgroundColor || "transparent" }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <style jsx>{`
          .rich-text-content :global(h1),
          .rich-text-content :global(h2),
          .rich-text-content :global(h3) {
            color: ${secondaryColor};
          }
          .rich-text-content :global(a) {
            color: ${accentColor};
          }
          .rich-text-content :global(a:hover) {
            color: ${primaryColor};
          }
        `}</style>
        <div
          className="prose prose-lg max-w-none rich-text-content"
          dangerouslySetInnerHTML={{ __html: content || "" }}
        />
      </div>
    </section>
  );
}
