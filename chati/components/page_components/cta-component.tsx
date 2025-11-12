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

interface CTAData {
  // Title & Description
  title: string;
  description: string;

  // Button 1 (Primary)
  button1Text: string;
  button1Link: string;
  button1Variant: "default" | "secondary" | "outline";
  button1Color: string;

  // Button 2 (Secondary)
  button2Text: string;
  button2Link: string;
  button2Variant: "default" | "secondary" | "outline";

  // Background Gradient
  backgroundGradient: string;
  textColor: string;
}

interface CTAComponentProps {
  data: CTAData;
  onChange: (data: CTAData) => void;
}

export function CTAComponent({ data, onChange }: CTAComponentProps) {
  return (
    <div className="space-y-6">
      {/* Title & Description */}
      <div className="space-y-3 p-4 border rounded-lg">
        <h4 className="font-semibold text-sm">Content</h4>
        <div className="space-y-2">
          <Label>Title</Label>
          <Input
            value={data.title}
            onChange={(e) => onChange({ ...data, title: e.target.value })}
            placeholder="Ready to Transform Your Customer Support?"
          />
        </div>
        <div className="space-y-2">
          <Label>Description</Label>
          <Textarea
            value={data.description}
            onChange={(e) => onChange({ ...data, description: e.target.value })}
            rows={2}
            placeholder="Start managing all your customer conversations..."
          />
        </div>
      </div>

      {/* Button 1 */}
      <div className="space-y-3 p-4 border rounded-lg">
        <h4 className="font-semibold text-sm">Primary Button</h4>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <Label>Button Text</Label>
            <Input
              value={data.button1Text}
              onChange={(e) =>
                onChange({ ...data, button1Text: e.target.value })
              }
              placeholder="Start Free Trial"
            />
          </div>
          <div className="space-y-2">
            <Label>Button Link</Label>
            <Input
              value={data.button1Link}
              onChange={(e) =>
                onChange({ ...data, button1Link: e.target.value })
              }
              placeholder="/signup"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <Label>Button Style</Label>
            <Select
              value={data.button1Variant}
              onValueChange={(value: any) =>
                onChange({ ...data, button1Variant: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Default (Solid)</SelectItem>
                <SelectItem value="secondary">Secondary</SelectItem>
                <SelectItem value="outline">Outline</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Button Color</Label>
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
                <SelectItem value="white">White</SelectItem>
                <SelectItem value="green">Green</SelectItem>
                <SelectItem value="blue">Blue</SelectItem>
                <SelectItem value="purple">Purple</SelectItem>
                <SelectItem value="orange">Orange</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Button 2 */}
      <div className="space-y-3 p-4 border rounded-lg">
        <h4 className="font-semibold text-sm">Secondary Button</h4>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <Label>Button Text</Label>
            <Input
              value={data.button2Text}
              onChange={(e) =>
                onChange({ ...data, button2Text: e.target.value })
              }
              placeholder="View Pricing Plans"
            />
          </div>
          <div className="space-y-2">
            <Label>Button Link</Label>
            <Input
              value={data.button2Link}
              onChange={(e) =>
                onChange({ ...data, button2Link: e.target.value })
              }
              placeholder="/pricing"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label>Button Style</Label>
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
              <SelectItem value="default">Default (Solid)</SelectItem>
              <SelectItem value="secondary">Secondary</SelectItem>
              <SelectItem value="outline">Outline</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Background & Colors */}
      <div className="space-y-3 p-4 border rounded-lg">
        <h4 className="font-semibold text-sm">Background & Colors</h4>
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
              <SelectItem value="blue-purple">Blue to Purple</SelectItem>
              <SelectItem value="green-teal">Green to Teal</SelectItem>
              <SelectItem value="purple-pink">Purple to Pink</SelectItem>
              <SelectItem value="orange-red">Orange to Red</SelectItem>
              <SelectItem value="indigo-blue">Indigo to Blue</SelectItem>
              <SelectItem value="gray-dark">Gray to Dark</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Text Color</Label>
          <Select
            value={data.textColor}
            onValueChange={(value) => onChange({ ...data, textColor: value })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="white">White</SelectItem>
              <SelectItem value="black">Black</SelectItem>
              <SelectItem value="gray">Gray</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}

export const ctaDefaults: CTAData = {
  title: "Ready to Transform Your Customer Support?",
  description:
    "Start managing all your customer conversations in one unified inbox today",
  button1Text: "Start Free Trial",
  button1Link: "/signup",
  button1Variant: "secondary",
  button1Color: "white",
  button2Text: "View Pricing Plans",
  button2Link: "/pricing",
  button2Variant: "outline",
  backgroundGradient: "blue-purple",
  textColor: "white",
};
