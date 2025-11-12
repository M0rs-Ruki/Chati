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

interface UseCaseItem {
  icon: string;
  iconGradient: string;
  title: string;
  description: string;
}

interface UseCasesData {
  // Header
  title: string;
  description: string;

  // Use Cases
  useCases: UseCaseItem[];

  // Layout
  columns: "2" | "3" | "4";

  // Background
  backgroundColor: string;
}

interface UseCasesComponentProps {
  data: UseCasesData;
  onChange: (data: UseCasesData) => void;
}

export function UseCasesComponent({ data, onChange }: UseCasesComponentProps) {
  const addUseCase = () => {
    onChange({
      ...data,
      useCases: [
        ...data.useCases,
        {
          icon: "MessageSquare",
          iconGradient: "cyan-blue",
          title: "New Use Case",
          description: "Use case description goes here...",
        },
      ],
    });
  };

  const removeUseCase = (index: number) => {
    if (data.useCases.length <= 3) {
      alert("Minimum 3 use cases required");
      return;
    }
    onChange({
      ...data,
      useCases: data.useCases.filter((_, i) => i !== index),
    });
  };

  const updateUseCase = (
    index: number,
    field: keyof UseCaseItem,
    value: string
  ) => {
    const newUseCases = [...data.useCases];
    newUseCases[index] = { ...newUseCases[index], [field]: value };
    onChange({ ...data, useCases: newUseCases });
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
            placeholder="Travel & Hospitality Use Cases"
          />
        </div>
        <div className="space-y-2">
          <Label>Description</Label>
          <Textarea
            value={data.description}
            onChange={(e) => onChange({ ...data, description: e.target.value })}
            rows={2}
            placeholder="Discover how travel companies use..."
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

      {/* Use Cases List */}
      <div className="space-y-3 p-4 border rounded-lg">
        <div className="flex items-center justify-between">
          <h4 className="font-semibold text-sm">
            Use Cases ({data.useCases.length})
          </h4>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={addUseCase}
          >
            <Plus className="h-3 w-3 mr-1" />
            Add Use Case
          </Button>
        </div>

        <div className="space-y-4">
          {data.useCases.map((useCase, index) => (
            <div
              key={index}
              className="space-y-3 p-4 border rounded bg-gray-50"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">
                  Use Case {index + 1}
                </span>
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  onClick={() => removeUseCase(index)}
                  disabled={data.useCases.length <= 3}
                >
                  <Trash2 className="h-4 w-4 text-red-600" />
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label>Icon Name</Label>
                  <Input
                    placeholder="MessageSquare"
                    value={useCase.icon}
                    onChange={(e) =>
                      updateUseCase(index, "icon", e.target.value)
                    }
                  />
                  <p className="text-xs text-gray-500">Use Lucide icon names</p>
                </div>
                <div className="space-y-2">
                  <Label>Icon Gradient</Label>
                  <Select
                    value={useCase.iconGradient}
                    onValueChange={(value) =>
                      updateUseCase(index, "iconGradient", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cyan-blue">Cyan to Blue</SelectItem>
                      <SelectItem value="green-teal">Green to Teal</SelectItem>
                      <SelectItem value="purple-pink">
                        Purple to Pink
                      </SelectItem>
                      <SelectItem value="orange-red">Orange to Red</SelectItem>
                      <SelectItem value="blue-indigo">
                        Blue to Indigo
                      </SelectItem>
                      <SelectItem value="pink-rose">Pink to Rose</SelectItem>
                      <SelectItem value="yellow-orange">
                        Yellow to Orange
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Title</Label>
                <Input
                  placeholder="Use case title"
                  value={useCase.title}
                  onChange={(e) =>
                    updateUseCase(index, "title", e.target.value)
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  placeholder="Use case description"
                  value={useCase.description}
                  onChange={(e) =>
                    updateUseCase(index, "description", e.target.value)
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

export const useCasesDefaults: UseCasesData = {
  title: "Travel & Hospitality Use Cases",
  description:
    "Discover how travel companies use WhatsApp to improve guest satisfaction",
  useCases: [
    {
      icon: "Calendar",
      iconGradient: "cyan-blue",
      title: "Booking Confirmations",
      description:
        "Send instant booking confirmations with itinerary details, payment receipts, and check-in instructions via WhatsApp.",
    },
    {
      icon: "Bell",
      iconGradient: "green-teal",
      title: "Travel Alerts & Updates",
      description:
        "Notify guests about flight delays, gate changes, weather updates, and important travel advisories in real-time.",
    },
    {
      icon: "MapPin",
      iconGradient: "purple-pink",
      title: "Local Recommendations",
      description:
        "Share personalized recommendations for restaurants, attractions, and activities based on guest preferences and location.",
    },
    {
      icon: "MessageCircle",
      iconGradient: "orange-red",
      title: "24/7 Guest Support",
      description:
        "Provide round-the-clock customer support for booking changes, special requests, and emergency assistance.",
    },
    {
      icon: "Star",
      iconGradient: "blue-indigo",
      title: "Post-Stay Feedback",
      description:
        "Collect valuable feedback and reviews from guests after their stay to improve service quality and build social proof.",
    },
    {
      icon: "Gift",
      iconGradient: "pink-rose",
      title: "Loyalty & Promotions",
      description:
        "Send exclusive offers, loyalty rewards, and early-bird promotions to returning guests and frequent travelers.",
    },
  ],
  columns: "3",
  backgroundColor: "white",
};
