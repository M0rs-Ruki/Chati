"use client";

import { useState } from "react";
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
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, ImageIcon } from "lucide-react";
import { MediaPicker } from "@/components/media-picker";

interface StatItem {
  value: string;
  label: string;
  color: string;
}

interface BottomItem {
  icon: string;
  label: string;
  color: string;
}

interface TextImageData {
  badgeText: string;
  badgeIcon: string;
  badgeColor: string;
  titlePart1: string;
  titlePart2: string;
  titlePart2Color: string;
  description: string;
  button1Text: string;
  button1Link: string;
  button1Color: string;
  button2Text: string;
  button2Link: string;
  button2Variant: "outline" | "default";
  bottomType: "stats" | "icons";
  stats: StatItem[];
  icons: BottomItem[];
  imageSrc: string;
  imageAlt: string;
  imagePosition: "left" | "right";
  showFloatingIcons: boolean;
  backgroundGradient: string;
  decorOrbColor1: string;
  decorOrbColor2: string;
}

interface TextImageComponentProps {
  data: TextImageData;
  onChange: (data: TextImageData) => void;
}

export function TextImageComponent({
  data,
  onChange,
}: TextImageComponentProps) {
  const [mediaPickerOpen, setMediaPickerOpen] = useState(false);

  // Ensure data has all required properties with defaults
  const safeData: TextImageData = {
    badgeText: data?.badgeText ?? "",
    badgeIcon: data?.badgeIcon ?? "Radio",
    badgeColor: data?.badgeColor ?? "green",
    titlePart1: data?.titlePart1 ?? "",
    titlePart2: data?.titlePart2 ?? "",
    titlePart2Color: data?.titlePart2Color ?? "green",
    description: data?.description ?? "",
    button1Text: data?.button1Text ?? "",
    button1Link: data?.button1Link ?? "#",
    button1Color: data?.button1Color ?? "green",
    button2Text: data?.button2Text ?? "",
    button2Link: data?.button2Link ?? "#",
    button2Variant: data?.button2Variant ?? "outline",
    bottomType: data?.bottomType ?? "stats",
    stats: data?.stats ?? [],
    icons: data?.icons ?? [],
    imageSrc: data?.imageSrc ?? "/placeholder.svg",
    imageAlt: data?.imageAlt ?? "",
    imagePosition: data?.imagePosition ?? "right",
    showFloatingIcons: data?.showFloatingIcons ?? true,
    backgroundGradient: data?.backgroundGradient ?? "green",
    decorOrbColor1: data?.decorOrbColor1 ?? "green",
    decorOrbColor2: data?.decorOrbColor2 ?? "blue",
  };

  const addStat = () => {
    onChange({
      ...safeData,
      stats: [...safeData.stats, { value: "0", label: "New Stat", color: "green" }],
    });
  };

  const removeStat = (index: number) => {
    onChange({
      ...safeData,
      stats: safeData.stats.filter((_, i) => i !== index),
    });
  };

  const updateStat = (index: number, field: keyof StatItem, value: string) => {
    const newStats = [...safeData.stats];
    newStats[index] = { ...newStats[index], [field]: value };
    onChange({ ...safeData, stats: newStats });
  };

  const addIcon = () => {
    onChange({
      ...safeData,
      icons: [
        ...safeData.icons,
        { icon: "MessageSquare", label: "New Channel", color: "blue" },
      ],
    });
  };

  const removeIcon = (index: number) => {
    onChange({
      ...safeData,
      icons: safeData.icons.filter((_, i) => i !== index),
    });
  };

  const updateIcon = (
    index: number,
    field: keyof BottomItem,
    value: string
  ) => {
    const newIcons = [...safeData.icons];
    newIcons[index] = { ...newIcons[index], [field]: value };
    onChange({ ...safeData, icons: newIcons });
  };

  return (
    <div className="space-y-6">
      {/* Badge Section */}
      <div className="space-y-3 p-4 border rounded-lg">
        <h4 className="font-semibold text-sm">Badge</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-2">
            <Label>Badge Text</Label>
            <Input
              value={safeData.badgeText}
              onChange={(e) => onChange({ ...safeData, badgeText: e.target.value })}
              placeholder="WhatsApp Broadcast"
            />
          </div>
          <div className="space-y-2">
            <Label>Badge Icon</Label>
            <Input
              value={safeData.badgeIcon}
              onChange={(e) => onChange({ ...safeData, badgeIcon: e.target.value })}
              placeholder="Radio"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Badge Color</Label>
          <Select
            value={safeData.badgeColor}
            onValueChange={(value) => onChange({ ...safeData, badgeColor: value })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="green">Green</SelectItem>
              <SelectItem value="blue">Blue</SelectItem>
              <SelectItem value="purple">Purple</SelectItem>
              <SelectItem value="red">Red</SelectItem>
              <SelectItem value="yellow">Yellow</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Title Section */}
      <div className="space-y-3 p-4 border rounded-lg">
        <h4 className="font-semibold text-sm">Title (2 Parts)</h4>

        <div className="space-y-2">
          <Label>Title Part 1</Label>
          <Input
            value={safeData.titlePart1}
            onChange={(e) => onChange({ ...safeData, titlePart1: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label>Title Part 2</Label>
          <Input
            value={safeData.titlePart2}
            onChange={(e) => onChange({ ...safeData, titlePart2: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label>Gradient Color</Label>
          <Select
            value={safeData.titlePart2Color}
            onValueChange={(value) =>
              onChange({ ...safeData, titlePart2Color: value })
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
              <SelectItem value="orange">Orange</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label>Description</Label>
        <Textarea
          value={safeData.description}
          onChange={(e) => onChange({ ...safeData, description: e.target.value })}
          rows={3}
        />
      </div>

      {/* Buttons Section */}
      <div className="space-y-3 p-4 border rounded-lg">
        <h4 className="font-semibold text-sm">Buttons</h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-2">
            <Label>Button 1 Text</Label>
            <Input
              value={safeData.button1Text}
              onChange={(e) =>
                onChange({ ...safeData, button1Text: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <Label>Button 1 Link</Label>
            <Input
              value={safeData.button1Link}
              onChange={(e) =>
                onChange({ ...safeData, button1Link: e.target.value })
              }
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Button 1 Color</Label>
          <Select
            value={safeData.button1Color}
            onValueChange={(value) =>
              onChange({ ...safeData, button1Color: value })
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="green">Green</SelectItem>
              <SelectItem value="blue">Blue</SelectItem>
              <SelectItem value="purple">Purple</SelectItem>
              <SelectItem value="red">Red</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
          <div className="space-y-2">
            <Label>Button 2 Text</Label>
            <Input
              value={safeData.button2Text}
              onChange={(e) =>
                onChange({ ...safeData, button2Text: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <Label>Button 2 Link</Label>
            <Input
              value={safeData.button2Link}
              onChange={(e) =>
                onChange({ ...safeData, button2Link: e.target.value })
              }
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Variant</Label>
          <Select
            value={safeData.button2Variant}
            onValueChange={(value: any) =>
              onChange({ ...safeData, button2Variant: value })
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="outline">Outline</SelectItem>
              <SelectItem value="default">Default</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Stats / Icons Section */}
      <div className="space-y-3 p-4 border rounded-lg">
        <h4 className="font-semibold text-sm">Bottom Section</h4>

        <div className="space-y-2">
          <Label>Type</Label>
          <Select
            value={safeData.bottomType}
            onValueChange={(value: any) =>
              onChange({ ...safeData, bottomType: value })
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="stats">Stats</SelectItem>
              <SelectItem value="icons">Icons</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {data.bottomType === "stats" && (
          <div className="space-y-3 mt-3">
            <div className="flex items-center justify-between">
              <Label>Stats</Label>
              <Button size="sm" variant="outline" onClick={addStat}>
                <Plus className="h-3 w-3 mr-1" />
                Add
              </Button>
            </div>

            {safeData.stats.map((stat, index) => (
              <div
                key={index}
                className="grid grid-cols-1 sm:grid-cols-3 gap-2 p-2 border rounded"
              >
                <Input
                  value={stat.value}
                  onChange={(e) => updateStat(index, "value", e.target.value)}
                  placeholder="98%"
                />

                <Input
                  value={stat.label}
                  onChange={(e) => updateStat(index, "label", e.target.value)}
                  placeholder="Open Rate"
                />

                <div className="flex gap-1">
                  <Select
                    value={stat.color}
                    onValueChange={(value) => updateStat(index, "color", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="green">Green</SelectItem>
                      <SelectItem value="blue">Blue</SelectItem>
                      <SelectItem value="purple">Purple</SelectItem>
                      <SelectItem value="red">Red</SelectItem>
                    </SelectContent>
                  </Select>

                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => removeStat(index)}
                  >
                    <Trash2 className="h-4 w-4 text-red-600" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {data.bottomType === "icons" && (
          <div className="space-y-3 mt-3">
            <div className="flex items-center justify-between">
              <Label>Icons</Label>
              <Button size="sm" variant="outline" onClick={addIcon}>
                <Plus className="h-3 w-3 mr-1" />
                Add
              </Button>
            </div>

            {safeData.icons.map((icon, index) => (
              <div
                key={index}
                className="grid grid-cols-1 sm:grid-cols-3 gap-2 p-2 border rounded"
              >
                <Input
                  value={icon.icon}
                  onChange={(e) => updateIcon(index, "icon", e.target.value)}
                />

                <Input
                  value={icon.label}
                  onChange={(e) => updateIcon(index, "label", e.target.value)}
                />

                <div className="flex gap-1">
                  <Select
                    value={icon.color}
                    onValueChange={(value) => updateIcon(index, "color", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="green">Green</SelectItem>
                      <SelectItem value="blue">Blue</SelectItem>
                      <SelectItem value="indigo">Indigo</SelectItem>
                      <SelectItem value="pink">Pink</SelectItem>
                    </SelectContent>
                  </Select>

                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => removeIcon(index)}
                  >
                    <Trash2 className="h-4 w-4 text-red-600" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Image Section */}
      <div className="space-y-3 p-4 border rounded-lg">
        <h4 className="font-semibold text-sm">Image Settings</h4>

        <div className="space-y-2">
          <Label>Image URL</Label>

          <div className="flex gap-2 flex-col sm:flex-row">
            <Input
              value={safeData.imageSrc}
              onChange={(e) => onChange({ ...safeData, imageSrc: e.target.value })}
            />
            <Button
              variant="outline"
              size="icon"
              onClick={() => setMediaPickerOpen(true)}
            >
              <ImageIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Alt Text</Label>
          <Input
            value={safeData.imageAlt}
            onChange={(e) => onChange({ ...safeData, imageAlt: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label>Position</Label>
          <Select
            value={safeData.imagePosition}
            onValueChange={(value: any) =>
              onChange({ ...safeData, imagePosition: value })
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="left">Left</SelectItem>
              <SelectItem value="right">Right</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            checked={safeData.showFloatingIcons}
            onCheckedChange={(v) => onChange({ ...safeData, showFloatingIcons: v })}
          />
          <Label>Show Floating Icons</Label>
        </div>
      </div>

      {/* Background */}
      <div className="space-y-3 p-4 border rounded-lg">
        <h4 className="font-semibold text-sm">Background & Decoration</h4>

        <div className="space-y-2">
          <Label>Background Gradient</Label>
          <Select
            value={safeData.backgroundGradient}
            onValueChange={(value) =>
              onChange({ ...safeData, backgroundGradient: value })
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="blue-green">Blue → Green</SelectItem>
              <SelectItem value="blue-purple">Blue → Purple</SelectItem>
              <SelectItem value="pink-orange">Pink → Orange</SelectItem>
              <SelectItem value="green-teal">Green → Teal</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-2">
            <Label>Decor Orb 1</Label>
            <Select
              value={safeData.decorOrbColor1}
              onValueChange={(value) =>
                onChange({ ...safeData, decorOrbColor1: value })
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
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Decor Orb 2</Label>
            <Select
              value={safeData.decorOrbColor2}
              onValueChange={(value) =>
                onChange({ ...safeData, decorOrbColor2: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="blue">Blue</SelectItem>
                <SelectItem value="green">Green</SelectItem>
                <SelectItem value="purple">Purple</SelectItem>
                <SelectItem value="orange">Orange</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <MediaPicker
        open={mediaPickerOpen}
        onOpenChange={setMediaPickerOpen}
        onSelect={(url, alt) =>
          onChange({ ...safeData, imageSrc: url, imageAlt: alt || data.imageAlt })
        }
      />
    </div>
  );
}

export const textImageDefaults: TextImageData = {
  badgeText: "WhatsApp Broadcast",
  badgeIcon: "Radio",
  badgeColor: "green",
  titlePart1: "Reach Thousands Instantly with",
  titlePart2: "Bulk WhatsApp Messages",
  titlePart2Color: "green",
  description:
    "Send personalized messages to unlimited contacts in seconds. Perfect for announcements, promotions, and updates.",
  button1Text: "Start Free Trial",
  button1Link: "#",
  button1Color: "green",
  button2Text: "View Pricing",
  button2Link: "/pricing",
  button2Variant: "outline",
  bottomType: "stats",
  stats: [
    { value: "10K+", label: "Active Users", color: "green" },
    { value: "99.9%", label: "Uptime", color: "blue" },
    { value: "24/7", label: "Support", color: "purple" },
  ],
  icons: [
    { icon: "MessageSquare", label: "WhatsApp", color: "green" },
    { icon: "Mail", label: "Email", color: "blue" },
    { icon: "Send", label: "SMS", color: "purple" },
  ],
  imageSrc: "/placeholder.svg",
  imageAlt: "WhatsApp Broadcast Feature",
  imagePosition: "right",
  showFloatingIcons: true,
  backgroundGradient: "green",
  decorOrbColor1: "green",
  decorOrbColor2: "blue",
};
