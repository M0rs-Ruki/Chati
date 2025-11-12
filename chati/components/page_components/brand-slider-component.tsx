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

interface Brand {
  name: string;
  logo: string;
  tagline?: string;
}

interface TrustBadge {
  icon: string;
  text: string;
}

interface BrandSliderData {
  // Title
  title: string;
  titleHighlight: string; // The highlighted word
  highlightColor: string;
  highlightBgColor: string;

  // Brands (logos)
  brands: Brand[];

  // Trust Badges
  trustBadges: TrustBadge[];

  // Settings
  backgroundColor: string;
  showBorder: boolean;
}

interface BrandSliderComponentProps {
  data: BrandSliderData;
  onChange: (data: BrandSliderData) => void;
}

export function BrandSliderComponent({
  data,
  onChange,
}: BrandSliderComponentProps) {
  const addBrand = () => {
    onChange({
      ...data,
      brands: [
        ...data.brands,
        {
          name: "New Brand",
          logo: "/placeholder.svg",
          tagline: "",
        },
      ],
    });
  };

  const removeBrand = (index: number) => {
    if (data.brands.length <= 3) {
      alert("Minimum 3 brands required");
      return;
    }
    onChange({
      ...data,
      brands: data.brands.filter((_, i) => i !== index),
    });
  };

  const updateBrand = (index: number, field: keyof Brand, value: string) => {
    const newBrands = [...data.brands];
    newBrands[index] = { ...newBrands[index], [field]: value };
    onChange({ ...data, brands: newBrands });
  };

  const addTrustBadge = () => {
    onChange({
      ...data,
      trustBadges: [
        ...data.trustBadges,
        {
          icon: "CheckCircle2",
          text: "New Badge",
        },
      ],
    });
  };

  const removeTrustBadge = (index: number) => {
    onChange({
      ...data,
      trustBadges: data.trustBadges.filter((_, i) => i !== index),
    });
  };

  const updateTrustBadge = (
    index: number,
    field: keyof TrustBadge,
    value: string
  ) => {
    const newBadges = [...data.trustBadges];
    newBadges[index] = { ...newBadges[index], [field]: value };
    onChange({ ...data, trustBadges: newBadges });
  };

  return (
    <div className="space-y-6">
      {/* Title Section */}
      <div className="space-y-3 p-4 border rounded-lg">
        <h4 className="font-semibold text-sm">Title</h4>
        <div className="space-y-2">
          <Label>Main Title</Label>
          <Input
            value={data.title}
            onChange={(e) => onChange({ ...data, title: e.target.value })}
            placeholder="Trusted by"
          />
        </div>
        <div className="space-y-2">
          <Label>Highlighted Word</Label>
          <Input
            value={data.titleHighlight}
            onChange={(e) =>
              onChange({ ...data, titleHighlight: e.target.value })
            }
            placeholder="Leading Brands"
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <Label>Highlight Text Color</Label>
            <Select
              value={data.highlightColor}
              onValueChange={(value) =>
                onChange({ ...data, highlightColor: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="green">Green</SelectItem>
                <SelectItem value="blue">Blue</SelectItem>
                <SelectItem value="purple">Purple</SelectItem>
                <SelectItem value="orange">Orange</SelectItem>
                <SelectItem value="red">Red</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Highlight Background</Label>
            <Select
              value={data.highlightBgColor}
              onValueChange={(value) =>
                onChange({ ...data, highlightBgColor: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="yellow">Yellow</SelectItem>
                <SelectItem value="green">Green</SelectItem>
                <SelectItem value="blue">Blue</SelectItem>
                <SelectItem value="pink">Pink</SelectItem>
                <SelectItem value="orange">Orange</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Brands */}
      <div className="space-y-3 p-4 border rounded-lg">
        <div className="flex items-center justify-between">
          <h4 className="font-semibold text-sm">
            Brands ({data.brands.length})
          </h4>
          <Button type="button" size="sm" variant="outline" onClick={addBrand}>
            <Plus className="h-3 w-3 mr-1" />
            Add Brand
          </Button>
        </div>

        <div className="space-y-4">
          {data.brands.map((brand, index) => (
            <div
              key={index}
              className="space-y-3 p-4 border rounded bg-gray-50"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Brand {index + 1}</span>
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  onClick={() => removeBrand(index)}
                  disabled={data.brands.length <= 3}
                >
                  <Trash2 className="h-4 w-4 text-red-600" />
                </Button>
              </div>

              <div className="space-y-2">
                <Label>Brand Name</Label>
                <Input
                  placeholder="UTKAL BUILDERS"
                  value={brand.name}
                  onChange={(e) => updateBrand(index, "name", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Logo URL</Label>
                <Input
                  placeholder="https://example.com/logo.png"
                  value={brand.logo}
                  onChange={(e) => updateBrand(index, "logo", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Tagline (Optional)</Label>
                <Input
                  placeholder="BUILDING TRUST"
                  value={brand.tagline || ""}
                  onChange={(e) =>
                    updateBrand(index, "tagline", e.target.value)
                  }
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trust Badges */}
      <div className="space-y-3 p-4 border rounded-lg">
        <div className="flex items-center justify-between">
          <h4 className="font-semibold text-sm">
            Trust Badges ({data.trustBadges.length})
          </h4>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={addTrustBadge}
          >
            <Plus className="h-3 w-3 mr-1" />
            Add Badge
          </Button>
        </div>

        <div className="space-y-3">
          {data.trustBadges.map((badge, index) => (
            <div
              key={index}
              className="grid grid-cols-[1fr_2fr_auto] gap-2 p-2 border rounded"
            >
              <Input
                placeholder="CheckCircle2"
                value={badge.icon}
                onChange={(e) =>
                  updateTrustBadge(index, "icon", e.target.value)
                }
              />
              <Input
                placeholder="Works in 36 languages"
                value={badge.text}
                onChange={(e) =>
                  updateTrustBadge(index, "text", e.target.value)
                }
              />
              <Button
                type="button"
                size="icon"
                variant="ghost"
                onClick={() => removeTrustBadge(index)}
              >
                <Trash2 className="h-4 w-4 text-red-600" />
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Settings */}
      <div className="space-y-3 p-4 border rounded-lg">
        <h4 className="font-semibold text-sm">Settings</h4>
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
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="showBorder"
            checked={data.showBorder}
            onChange={(e) =>
              onChange({ ...data, showBorder: e.target.checked })
            }
            className="rounded"
          />
          <Label htmlFor="showBorder">Show Border</Label>
        </div>
      </div>
    </div>
  );
}

export const brandSliderDefaults: BrandSliderData = {
  title: "Trusted by",
  titleHighlight: "Leading Brands",
  highlightColor: "green",
  highlightBgColor: "yellow",
  brands: [
    {
      name: "UTKAL BUILDERS",
      logo: "/utkal-builders-logo.png",
      tagline: "BUILDING TRUST",
    },
    {
      name: "SnapShot",
      logo: "/logo-blue-2015-Transparent.png",
      tagline: "",
    },
    {
      name: "26 prelude",
      logo: "/26-prelude-logo.png",
      tagline: "A SAP Creative Media House",
    },
    {
      name: "MiCT",
      logo: "/MICT-LOGO-new-10.png",
      tagline: "GROUP OF INSTITUTIONS",
    },
    {
      name: "University",
      logo: "/university-crest-logo.png",
      tagline: "",
    },
  ],
  trustBadges: [
    { icon: "CheckCircle2", text: "Works in 36 languages" },
    { icon: "CheckCircle2", text: "GDPR & CCPA-compliant" },
    { icon: "CheckCircle2", text: "Free to try" },
  ],
  backgroundColor: "white",
  showBorder: true,
};
