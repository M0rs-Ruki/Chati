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

  const addStat = () => {
    onChange({
      ...data,
      stats: [...data.stats, { value: "0", label: "New Stat", color: "green" }],
    });
  };

  const removeStat = (index: number) => {
    onChange({
      ...data,
      stats: data.stats.filter((_, i) => i !== index),
    });
  };

  const updateStat = (index: number, field: keyof StatItem, value: string) => {
    const newStats = [...data.stats];
    newStats[index] = { ...newStats[index], [field]: value };
    onChange({ ...data, stats: newStats });
  };

  const addIcon = () => {
    onChange({
      ...data,
      icons: [
        ...data.icons,
        { icon: "MessageSquare", label: "New Channel", color: "blue" },
      ],
    });
  };

  const removeIcon = (index: number) => {
    onChange({
      ...data,
      icons: data.icons.filter((_, i) => i !== index),
    });
  };

  const updateIcon = (
    index: number,
    field: keyof BottomItem,
    value: string
  ) => {
    const newIcons = [...data.icons];
    newIcons[index] = { ...newIcons[index], [field]: value };
    onChange({ ...data, icons: newIcons });
  };

  return (
    <div className="space-y-6">
      {/* Badge Section */}
      <div className="space-y-3 p-4 border rounded-lg">
        <h4 className="font-semibold text-sm">Badge</h4>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <Label>Badge Text</Label>
            <Input
              value={data.badgeText}
              onChange={(e) => onChange({ ...data, badgeText: e.target.value })}
              placeholder="WhatsApp Broadcast"
            />
          </div>
          <div className="space-y-2">
            <Label>Badge Icon</Label>
            <Input
              value={data.badgeIcon}
              onChange={(e) => onChange({ ...data, badgeIcon: e.target.value })}
              placeholder="Radio"
            />
          </div>
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
          <Label>Title Part 1 (Regular)</Label>
          <Input
            value={data.titlePart1}
            onChange={(e) => onChange({ ...data, titlePart1: e.target.value })}
            placeholder="Reach Thousands of Customers"
          />
        </div>
        <div className="space-y-2">
          <Label>Title Part 2 (Gradient)</Label>
          <Input
            value={data.titlePart2}
            onChange={(e) => onChange({ ...data, titlePart2: e.target.value })}
            placeholder="With One Click"
          />
        </div>
        <div className="space-y-2">
          <Label>Title Part 2 Gradient Color</Label>
          <Select
            value={data.titlePart2Color}
            onValueChange={(value) =>
              onChange({ ...data, titlePart2Color: value })
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
          value={data.description}
          onChange={(e) => onChange({ ...data, description: e.target.value })}
          rows={3}
          placeholder="Enter description text..."
        />
      </div>

      {/* Buttons */}
      <div className="space-y-3 p-4 border rounded-lg">
        <h4 className="font-semibold text-sm">Buttons</h4>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <Label>Button 1 Text</Label>
            <Input
              value={data.button1Text}
              onChange={(e) =>
                onChange({ ...data, button1Text: e.target.value })
              }
              placeholder="Start Free"
            />
          </div>
          <div className="space-y-2">
            <Label>Button 1 Link</Label>
            <Input
              value={data.button1Link}
              onChange={(e) =>
                onChange({ ...data, button1Link: e.target.value })
              }
              placeholder="#"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label>Button 1 Color</Label>
          <Select
            value={data.button1Color}
            onValueChange={(value) =>
              onChange({ ...data, button1Color: value })
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

        <div className="grid grid-cols-2 gap-3 mt-4">
          <div className="space-y-2">
            <Label>Button 2 Text</Label>
            <Input
              value={data.button2Text}
              onChange={(e) =>
                onChange({ ...data, button2Text: e.target.value })
              }
              placeholder="Learn More"
            />
          </div>
          <div className="space-y-2">
            <Label>Button 2 Link</Label>
            <Input
              value={data.button2Link}
              onChange={(e) =>
                onChange({ ...data, button2Link: e.target.value })
              }
              placeholder="#"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label>Button 2 Variant</Label>
          <Select
            value={data.button2Variant}
            onValueChange={(value: any) =>
              onChange({ ...data, button2Variant: value })
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

      {/* Bottom Section (Stats or Icons) */}
      <div className="space-y-3 p-4 border rounded-lg">
        <h4 className="font-semibold text-sm">Bottom Section</h4>
        <div className="space-y-2">
          <Label>Type</Label>
          <Select
            value={data.bottomType}
            onValueChange={(value: any) =>
              onChange({ ...data, bottomType: value })
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="stats">Stats (98%, 10K+, etc)</SelectItem>
              <SelectItem value="icons">Channel Icons</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {data.bottomType === "stats" && (
          <div className="space-y-3 mt-4">
            <div className="flex items-center justify-between">
              <Label>Stats</Label>
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={addStat}
              >
                <Plus className="h-3 w-3 mr-1" />
                Add Stat
              </Button>
            </div>
            {data.stats.map((stat, index) => (
              <div
                key={index}
                className="grid grid-cols-3 gap-2 p-2 border rounded"
              >
                <Input
                  placeholder="98%"
                  value={stat.value}
                  onChange={(e) => updateStat(index, "value", e.target.value)}
                />
                <Input
                  placeholder="Open Rate"
                  value={stat.label}
                  onChange={(e) => updateStat(index, "label", e.target.value)}
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
                    type="button"
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
          <div className="space-y-3 mt-4">
            <div className="flex items-center justify-between">
              <Label>Icons</Label>
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={addIcon}
              >
                <Plus className="h-3 w-3 mr-1" />
                Add Icon
              </Button>
            </div>
            {data.icons.map((icon, index) => (
              <div
                key={index}
                className="grid grid-cols-3 gap-2 p-2 border rounded"
              >
                <Input
                  placeholder="MessageSquare"
                  value={icon.icon}
                  onChange={(e) => updateIcon(index, "icon", e.target.value)}
                />
                <Input
                  placeholder="WhatsApp"
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
                    type="button"
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

      {/* Image Settings */}
      <div className="space-y-3 p-4 border rounded-lg">
        <h4 className="font-semibold text-sm">Image Settings</h4>
        <div className="space-y-2">
          <Label>Image URL</Label>
          <div className="flex gap-2">
            <Input
              value={data.imageSrc}
              onChange={(e) => onChange({ ...data, imageSrc: e.target.value })}
              placeholder="https://example.com/image.jpg"
            />
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => setMediaPickerOpen(true)}
              title="Select from media library"
            >
              <ImageIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="space-y-2">
          <Label>Image Alt Text</Label>
          <Input
            value={data.imageAlt}
            onChange={(e) => onChange({ ...data, imageAlt: e.target.value })}
            placeholder="Image description"
          />
        </div>
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
              <SelectItem value="left">Left</SelectItem>
              <SelectItem value="right">Right</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            checked={data.showFloatingIcons}
            onCheckedChange={(checked) =>
              onChange({ ...data, showFloatingIcons: checked })
            }
          />
          <Label>Show Floating Icons Around Image</Label>
        </div>
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
              <SelectItem value="blue-green">Blue to Green</SelectItem>
              <SelectItem value="blue-purple">Blue to Purple</SelectItem>
              <SelectItem value="pink-orange">Pink to Orange</SelectItem>
              <SelectItem value="green-teal">Green to Teal</SelectItem>
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
                <SelectItem value="green">Green</SelectItem>
                <SelectItem value="blue">Blue</SelectItem>
                <SelectItem value="purple">Purple</SelectItem>
                <SelectItem value="pink">Pink</SelectItem>
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
                <SelectItem value="orange">Orange</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Media Picker Dialog */}
      <MediaPicker
        open={mediaPickerOpen}
        onOpenChange={setMediaPickerOpen}
        onSelect={(url, alt) => {
          onChange({ ...data, imageSrc: url, imageAlt: alt || data.imageAlt });
        }}
      />
    </div>
  );
}

export const textImageDefaults: TextImageData = {
  badgeText: "WhatsApp Broadcast Messaging",
  badgeIcon: "Radio",
  badgeColor: "green",
  titlePart1: "Reach Thousands of Customers",
  titlePart2: "With One Click",
  titlePart2Color: "green",
  description:
    "Send personalized WhatsApp broadcasts to your entire customer base instantly. Schedule campaigns, segment audiences, and track engagement.",
  button1Text: "Start Broadcasting Free",
  button1Link: "#",
  button1Color: "green",
  button2Text: "Calculate Costs",
  button2Link: "/pricing",
  button2Variant: "outline",
  bottomType: "stats",
  stats: [
    { value: "98%", label: "Open Rate", color: "green" },
    { value: "10K+", label: "Messages/Min", color: "blue" },
    { value: "24/7", label: "Automation", color: "purple" },
  ],
  icons: [
    { icon: "MessageSquare", label: "WhatsApp", color: "green" },
    { icon: "Smartphone", label: "RCS", color: "indigo" },
    { icon: "Instagram", label: "Instagram", color: "pink" },
    { icon: "Facebook", label: "Facebook", color: "blue" },
  ],
  imageSrc: "/wp-broadcast.webp",
  imageAlt: "WhatsApp broadcast messaging interface",
  imagePosition: "right",
  showFloatingIcons: false,
  backgroundGradient: "blue-green",
  decorOrbColor1: "green",
  decorOrbColor2: "blue",
};
