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
  title: string;
  description: string;
}

interface FeatureBlockData {
  // Layout
  imagePosition: "left" | "right";

  // Badge
  badgeText: string;
  badgeColor: string;

  // Title & Description
  title: string;
  description: string;

  // Image
  imageSrc: string;
  imageAlt: string;

  // Features List
  features: FeatureItem[];

  // Background & Colors
  backgroundGradient: string;
  decorOrbColor1: string;
  decorOrbColor2: string;
}

interface FeatureBlockComponentProps {
  data: FeatureBlockData;
  onChange: (data: FeatureBlockData) => void;
}

export function FeatureBlockComponent({
  data,
  onChange,
}: FeatureBlockComponentProps) {
  const addFeature = () => {
    onChange({
      ...data,
      features: [
        ...data.features,
        {
          icon: "MessageSquare",
          iconColor: "blue",
          title: "New Feature",
          description: "Feature description goes here...",
        },
      ],
    });
  };

  const removeFeature = (index: number) => {
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
      {/* Layout */}
      <div className="space-y-2 p-4 border rounded-lg">
        <h4 className="font-semibold text-sm">Layout</h4>
        <div className="space-y-2">
          <Label>Image Position</Label>
          <Select
            value={data.imagePosition}
            onValueChange={(value: any) =>
              onChange({ ...data, imagePosition: value })
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="left">
                Left (Image Left, Content Right)
              </SelectItem>
              <SelectItem value="right">
                Right (Content Left, Image Right)
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Badge */}
      <div className="space-y-3 p-4 border rounded-lg">
        <h4 className="font-semibold text-sm">Badge</h4>
        <div className="space-y-2">
          <Label>Badge Text</Label>
          <Input
            value={data.badgeText}
            onChange={(e) => onChange({ ...data, badgeText: e.target.value })}
            placeholder="Unified Omnion Inbox"
          />
        </div>
        <div className="space-y-2">
          <Label>Badge Color</Label>
          <Select
            value={data.badgeColor}
            onValueChange={(value) => onChange({ ...data, badgeColor: value })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="blue">Blue</SelectItem>
              <SelectItem value="green">Green</SelectItem>
              <SelectItem value="purple">Purple</SelectItem>
              <SelectItem value="pink">Pink</SelectItem>
              <SelectItem value="orange">Orange</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Title & Description */}
      <div className="space-y-3 p-4 border rounded-lg">
        <h4 className="font-semibold text-sm">Title & Description</h4>
        <div className="space-y-2">
          <Label>Title</Label>
          <Input
            value={data.title}
            onChange={(e) => onChange({ ...data, title: e.target.value })}
            placeholder="All Your Conversations in One Place"
          />
        </div>
        <div className="space-y-2">
          <Label>Description</Label>
          <Textarea
            value={data.description}
            onChange={(e) => onChange({ ...data, description: e.target.value })}
            rows={3}
            placeholder="Enter description text..."
          />
        </div>
      </div>

      {/* Image */}
      <div className="space-y-3 p-4 border rounded-lg">
        <h4 className="font-semibold text-sm">Image</h4>
        <div className="space-y-2">
          <Label>Image URL</Label>
          <Input
            value={data.imageSrc}
            onChange={(e) => onChange({ ...data, imageSrc: e.target.value })}
            placeholder="https://example.com/image.jpg"
          />
        </div>
        <div className="space-y-2">
          <Label>Image Alt Text</Label>
          <Input
            value={data.imageAlt}
            onChange={(e) => onChange({ ...data, imageAlt: e.target.value })}
            placeholder="Image description"
          />
        </div>
      </div>

      {/* Features List */}
      <div className="space-y-3 p-4 border rounded-lg">
        <div className="flex items-center justify-between">
          <h4 className="font-semibold text-sm">Features List</h4>
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

        {data.features.map((feature, index) => (
          <div key={index} className="space-y-3 p-3 border rounded bg-gray-50">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Feature {index + 1}</span>
              <Button
                type="button"
                size="icon"
                variant="ghost"
                onClick={() => removeFeature(index)}
              >
                <Trash2 className="h-4 w-4 text-red-600" />
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label>Icon Name</Label>
                <Input
                  placeholder="MessageSquare"
                  value={feature.icon}
                  onChange={(e) => updateFeature(index, "icon", e.target.value)}
                />
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
                    <SelectItem value="green">Green</SelectItem>
                    <SelectItem value="blue">Blue</SelectItem>
                    <SelectItem value="purple">Purple</SelectItem>
                    <SelectItem value="pink">Pink</SelectItem>
                    <SelectItem value="indigo">Indigo</SelectItem>
                    <SelectItem value="orange">Orange</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Feature Title</Label>
              <Input
                placeholder="Feature title"
                value={feature.title}
                onChange={(e) => updateFeature(index, "title", e.target.value)}
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

      {/* Background & Colors */}
      <div className="space-y-3 p-4 border rounded-lg">
        <h4 className="font-semibold text-sm">Background & Decorations</h4>
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
              <SelectItem value="blue-purple-pink">
                Blue to Purple to Pink
              </SelectItem>
              <SelectItem value="green-white-blue">
                Green to White to Blue
              </SelectItem>
              <SelectItem value="purple-white-orange">
                Purple to White to Orange
              </SelectItem>
              <SelectItem value="pink-white-yellow">
                Pink to White to Yellow
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <Label>Decor Orb 1 Color</Label>
            <Select
              value={data.decorOrbColor1}
              onValueChange={(value) =>
                onChange({ ...data, decorOrbColor1: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="purple">Purple</SelectItem>
                <SelectItem value="green">Green</SelectItem>
                <SelectItem value="blue">Blue</SelectItem>
                <SelectItem value="pink">Pink</SelectItem>
                <SelectItem value="orange">Orange</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Decor Orb 2 Color</Label>
            <Select
              value={data.decorOrbColor2}
              onValueChange={(value) =>
                onChange({ ...data, decorOrbColor2: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="blue">Blue</SelectItem>
                <SelectItem value="green">Green</SelectItem>
                <SelectItem value="purple">Purple</SelectItem>
                <SelectItem value="pink">Pink</SelectItem>
                <SelectItem value="orange">Orange</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
}

export const featureBlockDefaults: FeatureBlockData = {
  imagePosition: "left",
  badgeText: "Unified Omnion Inbox",
  badgeColor: "blue",
  title: "All Your Conversations in One Place",
  description:
    "Stop switching between multiple apps and platforms. Our Omnion channel inbox brings together all customer conversations from WhatsApp, RCS, Instagram Direct Messages, and Facebook Messenger into one powerful, unified dashboard.",
  imageSrc: "/unified-omnion-inbox-showing-whatsapp-rcs-insta.jpg",
  imageAlt: "Unified inbox showing multiple messaging channels",
  features: [
    {
      icon: "MessageSquare",
      iconColor: "green",
      title: "WhatsApp Business Integration",
      description:
        "Connect your WhatsApp Business API and manage all WhatsApp conversations with full message history, media support, and real-time synchronization.",
    },
    {
      icon: "Smartphone",
      iconColor: "indigo",
      title: "RCS Messaging Support",
      description:
        "Support Rich Communication Services (RCS) with rich media, interactive buttons, and enhanced messaging features for Android users.",
    },
    {
      icon: "Instagram",
      iconColor: "pink",
      title: "Instagram & Facebook Messenger",
      description:
        "Respond to Instagram Direct Messages and Facebook Messenger conversations alongside your other channels with unified contact profiles.",
    },
  ],
  backgroundGradient: "blue-purple-pink",
  decorOrbColor1: "purple",
  decorOrbColor2: "blue",
};
