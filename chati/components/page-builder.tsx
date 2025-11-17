"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Plus,
  GripVertical,
  Trash2,
  LayoutGrid,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Blocks,
  Megaphone,
  Grid3x3,
  Images,
  Briefcase,
} from "lucide-react";
import {
  TextImageComponent,
  textImageDefaults,
  FeatureBlockComponent,
  featureBlockDefaults,
  FeaturesGridComponent,
  featuresGridDefaults,
  UseCasesComponent,
  useCasesDefaults,
  BrandSliderComponent,
  brandSliderDefaults,
  FAQComponent,
  faqDefaults,
  CTAComponent,
  ctaDefaults,
} from "./page_components";
import { CDPEditor, cdpDefaults } from "./page_components/cdp-block";

interface Component {
  id: string;
  type: string;
  data: any;
}

interface PageBuilderProps {
  content: Component[];
  onChange: (content: Component[]) => void;
}

export default function PageBuilder({ content, onChange }: PageBuilderProps) {
  const [selectedComponent, setSelectedComponent] = useState<string | null>(
    null
  );

  const componentTypes = [
    { type: "text-image", label: "Text + Image Hero", icon: LayoutGrid },
    { type: "feature-block", label: "Feature Block", icon: Blocks },
    { type: "features-grid", label: "Features Grid", icon: Grid3x3 },
    { type: "use-cases", label: "Use Cases", icon: Briefcase },
    { type: "brand-slider", label: "Brand Slider", icon: Images },
    { type: "cdp-block", label: "CDP Section", icon: Blocks },
    { type: "faq", label: "FAQ Section", icon: HelpCircle },
    { type: "cta", label: "CTA Section", icon: Megaphone },
  ];

  const addComponent = (type: string) => {
    const newComponent: Component = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      data: getDefaultData(type),
    };
    onChange([...content, newComponent]);
    setSelectedComponent(newComponent.id);
  };

  const getDefaultData = (type: string) => {
    switch (type) {
      case "text-image":
        return textImageDefaults;
      case "feature-block":
        return featureBlockDefaults;
      case "features-grid":
        return featuresGridDefaults;
      case "use-cases":
        return useCasesDefaults;
      case "brand-slider":
        return brandSliderDefaults;
      case "cdp-block":
        return cdpDefaults;
      case "faq":
        return faqDefaults;
      case "cta":
        return ctaDefaults;
      default:
        return {};
    }
  };

  const updateComponent = (id: string, data: any) => {
    onChange(
      content.map((comp) => (comp.id === id ? { ...comp, data } : comp))
    );
  };

  const deleteComponent = (id: string) => {
    onChange(content.filter((comp) => comp.id !== id));
    if (selectedComponent === id) {
      setSelectedComponent(null);
    }
  };

  const moveComponent = (index: number, direction: "up" | "down") => {
    const newContent = [...content];
    const newIndex = direction === "up" ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= newContent.length) return;
    [newContent[index], newContent[newIndex]] = [
      newContent[newIndex],
      newContent[index],
    ];
    onChange(newContent);
  };

  const renderComponentEditor = (component: Component) => {
    const handleChange = (data: any) => updateComponent(component.id, data);

    switch (component.type) {
      case "text-image":
        return (
          <TextImageComponent data={component.data} onChange={handleChange} />
        );
      case "feature-block":
        return (
          <FeatureBlockComponent
            data={component.data}
            onChange={handleChange}
          />
        );
      case "features-grid":
        return (
          <FeaturesGridComponent
            data={component.data}
            onChange={handleChange}
          />
        );
      case "use-cases":
        return (
          <UseCasesComponent data={component.data} onChange={handleChange} />
        );
      case "brand-slider":
        return (
          <BrandSliderComponent data={component.data} onChange={handleChange} />
        );
      case "cdp-block":
        return <CDPEditor data={component.data} onChange={handleChange} />;
      case "faq":
        return <FAQComponent data={component.data} onChange={handleChange} />;
      case "cta":
        return <CTAComponent data={component.data} onChange={handleChange} />;
      default:
        return <div className="text-muted-foreground">No editor available</div>;
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Component Palette */}
      <div className="lg:col-span-1">
        <Card className="bg-secondary border-border sticky top-4">
          <CardContent className="p-4">
            <h3 className="font-semibold mb-4 text-foreground">Components</h3>
            <div className="space-y-2">
              {componentTypes.map((comp) => {
                const Icon = comp.icon;
                return (
                  <Button
                    key={comp.type}
                    variant="outline"
                    className="w-full justify-start bg-transparent hover:bg-gray-100"
                    onClick={() => addComponent(comp.type)}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {comp.label}
                  </Button>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Canvas */}
      <div className="lg:col-span-2 space-y-4">
        {content.length === 0 ? (
          <Card className="bg-secondary border-border border-dashed">
            <CardContent className="py-12 text-center">
              <Plus className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">
                Add components from the left to start building your page
              </p>
            </CardContent>
          </Card>
        ) : (
          content.map((component, index) => (
            <Card
              key={component.id}
              className={`bg-card border-border cursor-pointer transition-colors ${
                selectedComponent === component.id ? "ring-2 ring-primary" : ""
              }`}
              onClick={() => setSelectedComponent(component.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <GripVertical className="h-5 w-5 text-muted-foreground mt-1 cursor-grab" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-medium text-sm text-foreground capitalize">
                        {component.type.replace("-", " ")}
                      </span>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={(e) => {
                            e.stopPropagation();
                            moveComponent(index, "up");
                          }}
                          disabled={index === 0}
                        >
                          <ChevronUp className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={(e) => {
                            e.stopPropagation();
                            moveComponent(index, "down");
                          }}
                          disabled={index === content.length - 1}
                        >
                          <ChevronDown className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteComponent(component.id);
                          }}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </div>
                    {selectedComponent === component.id && (
                      <div className="mt-4 pt-4 border-t border-border max-h-[600px] overflow-y-auto">
                        {renderComponentEditor(component)}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
