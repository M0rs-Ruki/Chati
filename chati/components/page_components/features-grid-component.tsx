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

interface FeatureItem {
  icon: string;
  iconColor: string;
  iconBgGradient: string;
  title: string;
  description: string;
}

interface FeaturesGridData {
  // Header
  title: string;
  description: string;

  // Features (cards)
  features: FeatureItem[];

  // Layout
  columns: "2" | "3" | "4";

  // Background
  backgroundColor: string;
}

interface FeaturesGridComponentProps {
  data: FeaturesGridData;
  onChange: (data: FeaturesGridData) => void;
}

export function FeaturesGridComponent({
  data,
  onChange,
}: FeaturesGridComponentProps) {
  const addFeature = () => {
    onChange({
      ...data,
      features: [
        ...data.features,
        {
          icon: "MessageSquare",
          iconColor: "blue",
          iconBgGradient: "cyan-blue",
          title: "New Feature",
          description: "Feature description goes here...",
        },
      ],
    });
  };

  const removeFeature = (index: number) => {
    if (data.features.length <= 3) {
      alert("Minimum 3 features required");
      return;
    }
    onChange({
      ...data,
      features: data.features.filter((_, i) => i !== index),
    });
  };

  const updateFeature = (
    index: number,
    field: keyof FeatureItem,
    value: string
  ) => {
    const newFeatures = [...data.features];
    newFeatures[index] = { ...newFeatures[index], [field]: value };
    onChange({ ...data, features: newFeatures });
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
            placeholder="Complete Travel Solution"
          />
        </div>
        <div className="space-y-2">
          <Label>Description</Label>
          <Textarea
            value={data.description}
            onChange={(e) => onChange({ ...data, description: e.target.value })}
            rows={2}
            placeholder="Everything you need to enhance..."
          />
        </div>
      </div>

      {/* Layout Settings */}
      <div className="space-y-3 p-4 border rounded-lg">
        <h4 className="font-semibold text-sm">Layout</h4>
        <div className="space-y-2">
          <Label>Number of Columns</Label>
          <Select
            value={data.columns}
            onValueChange={(value: any) =>
              onChange({ ...data, columns: value })
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2">2 Columns</SelectItem>
              <SelectItem value="3">3 Columns</SelectItem>
              <SelectItem value="4">4 Columns</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Background Color</Label>
          <Select
            value={data.backgroundColor}
            onValueChange={(value) =>
              onChange({ ...data, backgroundColor: value })
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="white">White</SelectItem>
              <SelectItem value="gray">Light Gray</SelectItem>
              <SelectItem value="blue">Light Blue</SelectItem>
              <SelectItem value="green">Light Green</SelectItem>
              <SelectItem value="purple">Light Purple</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Features List */}
      <div className="space-y-3 p-4 border rounded-lg">
        <div className="flex items-center justify-between">
          <h4 className="font-semibold text-sm">
            Features ({data.features.length})
          </h4>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={addFeature}
          >
            <Plus className="h-3 w-3 mr-1" />
            Add Feature
          </Button>
        </div>

        <div className="space-y-4">
          {data.features.map((feature, index) => (
            <div
              key={index}
              className="space-y-3 p-4 border rounded bg-gray-50"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Feature {index + 1}</span>
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  onClick={() => removeFeature(index)}
                  disabled={data.features.length <= 3}
                >
                  <Trash2 className="h-4 w-4 text-red-600" />
                </Button>
              </div>

              {/* FIXED: mobile responsive */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label>Icon Name</Label>
                  <Input
                    placeholder="MessageSquare"
                    value={feature.icon}
                    onChange={(e) =>
                      updateFeature(index, "icon", e.target.value)
                    }
                  />
                  <p className="text-xs text-gray-500">
                    Use Lucide icon names: MessageSquare, Zap, Shield, Users,
                    etc.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>Icon Color</Label>
                  <Select
                    value={feature.iconColor}
                    onValueChange={(value) =>
                      updateFeature(index, "iconColor", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="blue">Blue</SelectItem>
                      <SelectItem value="cyan">Cyan</SelectItem>
                      <SelectItem value="green">Green</SelectItem>
                      <SelectItem value="purple">Purple</SelectItem>
                      <SelectItem value="pink">Pink</SelectItem>
                      <SelectItem value="orange">Orange</SelectItem>
                      <SelectItem value="red">Red</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Icon Background Gradient</Label>
                <Select
                  value={feature.iconBgGradient}
                  onValueChange={(value) =>
                    updateFeature(index, "iconBgGradient", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cyan-blue">Cyan to Blue</SelectItem>
                    <SelectItem value="green-teal">Green to Teal</SelectItem>
                    <SelectItem value="purple-pink">Purple to Pink</SelectItem>
                    <SelectItem value="orange-red">Orange to Red</SelectItem>
                    <SelectItem value="blue-indigo">Blue to Indigo</SelectItem>
                    <SelectItem value="pink-rose">Pink to Rose</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Feature Title</Label>
                <Input
                  placeholder="Feature title"
                  value={feature.title}
                  onChange={(e) =>
                    updateFeature(index, "title", e.target.value)
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Feature Description</Label>
                <Textarea
                  placeholder="Feature description"
                  value={feature.description}
                  onChange={(e) =>
                    updateFeature(index, "description", e.target.value)
                  }
                  rows={2}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export const featuresGridDefaults: FeaturesGridData = {
  title: "Complete Travel Solution",
  description:
    "Everything you need to enhance guest experiences and streamline travel communication",
  features: [
    {
      icon: "MessageSquare",
      iconColor: "cyan",
      iconBgGradient: "cyan-blue",
      title: "Multi-Channel Messaging",
      description:
        "Connect with guests via WhatsApp, SMS, email, and in-app messaging from one unified platform.",
    },
    {
      icon: "Zap",
      iconColor: "blue",
      iconBgGradient: "blue-indigo",
      title: "Instant Notifications",
      description:
        "Send real-time booking confirmations, itinerary updates, and travel alerts to guests instantly.",
    },
    {
      icon: "Users",
      iconColor: "purple",
      iconBgGradient: "purple-pink",
      title: "Guest Segmentation",
      description:
        "Target specific guest groups with personalized messages based on booking history and preferences.",
    },
    {
      icon: "Shield",
      iconColor: "green",
      iconBgGradient: "green-teal",
      title: "Secure & Compliant",
      description:
        "Enterprise-grade security with GDPR compliance and encrypted messaging for all communications.",
    },
    {
      icon: "BarChart3",
      iconColor: "orange",
      iconBgGradient: "orange-red",
      title: "Analytics Dashboard",
      description:
        "Track message delivery, engagement rates, and guest satisfaction with detailed analytics.",
    },
    {
      icon: "Clock",
      iconColor: "pink",
      iconBgGradient: "pink-rose",
      title: "Automated Workflows",
      description:
        "Set up automated messages for check-ins, check-outs, and post-stay follow-ups to save time.",
    },
  ],
  columns: "3",
  backgroundColor: "white",
};
