import HeroSection from "./HeroSection";
import RichTextSection from "./RichTextSection";
import FeaturesSection from "./FeaturesSection";
import CTASection from "./CTASection";

interface Section {
  id: string;
  kind: string;
  data: any;
}

interface Theme {
  primaryColor?: string;
  secondaryColor?: string;
  accentColor?: string;
}

interface SectionRendererProps {
  sections: Section[];
  theme?: Theme | null;
}

export default function SectionRenderer({
  sections,
  theme,
}: SectionRendererProps) {
  return (
    <>
      {sections.map((section) => {
        switch (section.kind) {
          case "HERO":
            return (
              <HeroSection key={section.id} data={section.data} theme={theme} />
            );

          case "RICH_TEXT":
            return (
              <RichTextSection
                key={section.id}
                data={section.data}
                theme={theme}
              />
            );

          case "FEATURES":
            return (
              <FeaturesSection
                key={section.id}
                data={section.data}
                theme={theme}
              />
            );

          case "CTA":
            return (
              <CTASection key={section.id} data={section.data} theme={theme} />
            );

          default:
            return null;
        }
      })}
    </>
  );
}
