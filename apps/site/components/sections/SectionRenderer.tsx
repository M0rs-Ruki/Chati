import HeroSection from "./HeroSection";
import RichTextSection from "./RichTextSection";
import FeaturesSection from "./FeaturesSection";
import CTASection from "./CTASection";

interface Section {
  id: string;
  kind: string;
  data: any;
}

interface SectionRendererProps {
  sections: Section[];
}

export default function SectionRenderer({ sections }: SectionRendererProps) {
  return (
    <>
      {sections.map((section) => {
        switch (section.kind) {
          case "HERO":
            return <HeroSection key={section.id} data={section.data} />;

          case "RICH_TEXT":
            return <RichTextSection key={section.id} data={section.data} />;

          case "FEATURES":
            return <FeaturesSection key={section.id} data={section.data} />;

          case "CTA":
            return <CTASection key={section.id} data={section.data} />;

          default:
            return null;
        }
      })}
    </>
  );
}
