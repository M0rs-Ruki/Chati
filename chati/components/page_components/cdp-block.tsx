"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";
import { FloatingCDPElements } from "@/components/floating-cdp-elements";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, ImageIcon } from "lucide-react";
import { MediaPicker } from "@/components/media-picker";
import Link from "next/link";

export type CDPFeature = {
  icon?: string; // optional icon name (lucide)
  title: string;
  description: string;
  color?: string;
};

export type CDPData = {
  badgeText: string;
  badgeBgColor: string;
  badgeTextColor: string;
  title: string;
  description: string;
  features: CDPFeature[]; // dynamic
  btn1Text: string;
  btn1Link: string;
  btn2Text: string;
  btn2Link: string;
  backgroundGradient: string; // key for gradient
  orbColor1: string;
  orbColor2: string;
  imageSrc: string;
  imageAlt: string;
  showFloatingElements: boolean;
};

interface CDPEditorProps {
  data: CDPData;
  onChange: (next: CDPData) => void;
}

export function CDPEditor({ data, onChange }: CDPEditorProps) {
  const [mediaOpen, setMediaOpen] = useState(false);
  const [selectedFeatureIndex, setSelectedFeatureIndex] = useState<
    number | null
  >(null);

  // helpers
  const addFeature = () =>
    onChange({
      ...data,
      features: [
        ...data.features,
        {
          icon: "CheckCircle2",
          title: "New Feature",
          description: "Describe this feature...",
          color: "purple",
        },
      ],
    });

  const removeFeature = (i: number) =>
    onChange({
      ...data,
      features: data.features.filter((_, idx) => idx !== i),
    });

  const updateFeature = (i: number, field: keyof CDPFeature, value: string) => {
    const next = [...data.features];
    next[i] = { ...next[i], [field]: value };
    onChange({ ...data, features: next });
  };

  const gradientOptions: { value: string; label: string }[] = [
    { value: "blue-white-purple", label: "Blue → White → Purple" },
    { value: "green-white-blue", label: "Green → White → Blue" },
    { value: "pink-white-yellow", label: "Pink → White → Yellow" },
    { value: "blue-teal", label: "Blue → Teal" },
  ];

  return (
    <div className="space-y-6">
      {/* Badge & Title */}
      <div className="space-y-3 p-4 border rounded-lg">
        <h4 className="font-semibold text-sm">Badge & Title</h4>

        <div className="space-y-2">
          <Label>Badge Text</Label>
          <Input
            value={data.badgeText}
            onChange={(e) => onChange({ ...data, badgeText: e.target.value })}
            placeholder="Customer Data Platform"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-2">
            <Label>Badge Background Color</Label>
            <Select
              value={data.badgeBgColor}
              onValueChange={(v) => onChange({ ...data, badgeBgColor: v })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="purple-100">Purple</SelectItem>
                <SelectItem value="blue-100">Blue</SelectItem>
                <SelectItem value="green-100">Green</SelectItem>
                <SelectItem value="yellow-100">Yellow</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Badge Text Color</Label>
            <Select
              value={data.badgeTextColor}
              onValueChange={(v) => onChange({ ...data, badgeTextColor: v })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="purple-700">Purple</SelectItem>
                <SelectItem value="blue-700">Blue</SelectItem>
                <SelectItem value="green-700">Green</SelectItem>
                <SelectItem value="gray-800">Dark</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2 mt-3">
          <Label>Title</Label>
          <Input
            value={data.title}
            onChange={(e) => onChange({ ...data, title: e.target.value })}
            placeholder="Unify Customer Data for Smarter Campaigns"
          />
        </div>

        <div className="space-y-2">
          <Label>Description</Label>
          <Textarea
            value={data.description}
            onChange={(e) => onChange({ ...data, description: e.target.value })}
            rows={3}
            placeholder="Short supporting description..."
          />
        </div>
      </div>

      {/* Features */}
      <div className="space-y-3 p-4 border rounded-lg">
        <div className="flex items-center justify-between">
          <h4 className="font-semibold text-sm">Features</h4>
          <Button size="sm" variant="outline" onClick={addFeature}>
            <Plus className="h-3 w-3 mr-1" /> Add Feature
          </Button>
        </div>

        <div className="space-y-4">
          {data.features.map((f, idx) => (
            <div key={idx} className="p-3 border rounded bg-gray-50 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Feature {idx + 1}</span>
                <div className="flex items-center gap-2">
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => removeFeature(idx)}
                  >
                    <Trash2 className="h-4 w-4 text-red-600" />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label>Icon (optional)</Label>
                  <Input
                    placeholder="CheckCircle2"
                    value={f.icon || ""}
                    onChange={(e) => updateFeature(idx, "icon", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Color</Label>
                  <Select
                    value={f.color || "purple"}
                    onValueChange={(v) => updateFeature(idx, "color", v)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="purple">Purple</SelectItem>
                      <SelectItem value="blue">Blue</SelectItem>
                      <SelectItem value="green">Green</SelectItem>
                      <SelectItem value="teal">Teal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Feature Title</Label>
                <Input
                  placeholder="Unified Customer Profiles"
                  value={f.title}
                  onChange={(e) => updateFeature(idx, "title", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Feature Description</Label>
                <Textarea
                  placeholder="Short explanation..."
                  value={f.description}
                  onChange={(e) =>
                    updateFeature(idx, "description", e.target.value)
                  }
                  rows={2}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Buttons */}
      <div className="space-y-3 p-4 border rounded-lg">
        <h4 className="font-semibold text-sm">Buttons</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-2">
            <Label>Primary Button Text</Label>
            <Input
              value={data.btn1Text}
              onChange={(e) => onChange({ ...data, btn1Text: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label>Primary Button Link</Label>
            <Input
              value={data.btn1Link}
              onChange={(e) => onChange({ ...data, btn1Link: e.target.value })}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
          <div className="space-y-2">
            <Label>Secondary Button Text</Label>
            <Input
              value={data.btn2Text}
              onChange={(e) => onChange({ ...data, btn2Text: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label>Secondary Button Link</Label>
            <Input
              value={data.btn2Link}
              onChange={(e) => onChange({ ...data, btn2Link: e.target.value })}
            />
          </div>
        </div>
      </div>

      {/* Visuals */}
      <div className="space-y-3 p-4 border rounded-lg">
        <h4 className="font-semibold text-sm">Visuals & Background</h4>

        <div className="space-y-2">
          <Label>Background Gradient</Label>
          <Select
            value={data.backgroundGradient}
            onValueChange={(v) => onChange({ ...data, backgroundGradient: v })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {gradientOptions.map((g) => (
                <SelectItem key={g.value} value={g.value}>
                  {g.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
          <div className="space-y-2">
            <Label>Decor Orb 1 Color</Label>
            <Select
              value={data.orbColor1}
              onValueChange={(v) => onChange({ ...data, orbColor1: v })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="purple-400">Purple</SelectItem>
                <SelectItem value="blue-400">Blue</SelectItem>
                <SelectItem value="green-400">Green</SelectItem>
                <SelectItem value="pink-400">Pink</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Decor Orb 2 Color</Label>
            <Select
              value={data.orbColor2}
              onValueChange={(v) => onChange({ ...data, orbColor2: v })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="blue-400">Blue</SelectItem>
                <SelectItem value="purple-400">Purple</SelectItem>
                <SelectItem value="green-400">Green</SelectItem>
                <SelectItem value="orange-400">Orange</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2 mt-3">
          <Label>Right Image URL</Label>
          <div className="flex flex-col sm:flex-row gap-2">
            <Input
              value={data.imageSrc}
              onChange={(e) => onChange({ ...data, imageSrc: e.target.value })}
              placeholder="/cdp-marketing-chati.png"
            />
            <Button
              size="icon"
              variant="outline"
              onClick={() => {
                setMediaOpen(true);
                setSelectedFeatureIndex(null);
              }}
              title="Choose image"
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
          />
        </div>

        <div className="flex items-center gap-3 mt-2">
          <input
            id="floating"
            type="checkbox"
            checked={data.showFloatingElements}
            onChange={(e) =>
              onChange({ ...data, showFloatingElements: e.target.checked })
            }
            className="rounded"
          />
          <Label htmlFor="floating">Show Floating Elements</Label>
        </div>
      </div>

      <MediaPicker
        open={mediaOpen}
        onOpenChange={setMediaOpen}
        onSelect={(url) => {
          onChange({ ...data, imageSrc: url });
        }}
      />
    </div>
  );
}

/* ------------------------------ RENDERER ------------------------------ */

export function CDPSection({ data }: { data?: Partial<CDPData> }) {
  // use defaults for safety
  const safe: CDPData = { ...cdpDefaults, ...(data ?? {}) };

  // gradient map -> tailwind classes
  const gradientClass =
    safe.backgroundGradient === "green-white-blue"
      ? "bg-gradient-to-br from-green-50 via-white to-blue-50"
      : safe.backgroundGradient === "pink-white-yellow"
      ? "bg-gradient-to-br from-pink-50 via-white to-yellow-50"
      : safe.backgroundGradient === "blue-teal"
      ? "bg-gradient-to-br from-blue-50 via-white to-teal-50"
      : "bg-gradient-to-br from-blue-50 via-white to-purple-50/30";

  const badgeBg =
    safe.badgeBgColor === "blue-100"
      ? "bg-blue-100 text-blue-700 border-blue-200"
      : safe.badgeBgColor === "green-100"
      ? "bg-green-100 text-green-700 border-green-200"
      : safe.badgeBgColor === "yellow-100"
      ? "bg-yellow-100 text-yellow-700 border-yellow-200"
      : "bg-purple-100 text-purple-700 border-purple-200";

  return (
    <section className={`relative overflow-hidden ${gradientClass}`}>
      {/* Decorative gradient orbs */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-gradient-to-br from-purple-400/20 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-gradient-to-tr from-blue-400/15 to-transparent rounded-full blur-3xl" />

      <div className="container relative mx-auto px-4 py-8 md:py-10 z-10">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-8 items-center">
          {/* Left Content */}
          <div className="flex flex-col justify-center">
            <div
              className={`inline-block mb-3 px-3 py-1 rounded-full ${badgeBg} text-sm w-fit shadow-sm border`}
            >
              {safe.badgeText}
            </div>

            <h2 className="mb-3 text-balance text-2xl md:text-3xl lg:text-4xl font-bold leading-tight">
              {safe.title}
            </h2>

            <p className="mb-4 text-pretty text-muted-foreground text-sm md:text-base leading-relaxed max-w-xl">
              {safe.description}
            </p>

            <div className="space-y-2.5 mb-4">
              {safe.features.map((f, idx) => {
                const colorClasses =
                  f.color === "blue"
                    ? "from-blue-100 to-blue-50 group-hover:from-blue-200 group-hover:to-blue-100 text-blue-600"
                    : f.color === "green"
                    ? "from-green-100 to-green-50 group-hover:from-green-200 group-hover:to-green-100 text-green-600"
                    : f.color === "teal"
                    ? "from-teal-100 to-teal-50 group-hover:from-teal-200 group-hover:to-teal-100 text-teal-600"
                    : "from-purple-100 to-purple-50 group-hover:from-purple-200 group-hover:to-purple-100 text-purple-600";

                return (
                  <div key={idx} className="flex gap-2.5 items-start group">
                    <div
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${colorClasses} transition-all shadow-sm`}
                    >
                      <span className="text-sm font-bold">✓</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-0.5 text-sm">
                        {f.title}
                      </h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {f.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-col sm:flex-row gap-2.5">
              <Button
                size="default"
                className="bg-purple-600 hover:bg-purple-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all"
                asChild
              >
                <Link href={safe.btn1Link || "#"}>{safe.btn1Text}</Link>
              </Button>
              <Button
                size="default"
                variant="outline"
                className="border-2 bg-white hover:bg-gray-50 hover:border-purple-500 hover:text-purple-600 font-medium shadow-sm transition-all"
                asChild
              >
                <Link href={safe.btn2Link || "#"}>{safe.btn2Text}</Link>
              </Button>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative w-full max-w-[450px] lg:max-w-full">
            <div className="relative w-full max-w-[450px] lg:max-w-full">
              {/* Decorative gradient blob behind image */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 via-blue-400/15 to-pink-400/20 blur-3xl rounded-full transform scale-110" />

              {/* optional floating elements */}
              {safe.showFloatingElements && <FloatingCDPElements />}

              <Image
                src={safe.imageSrc}
                alt={safe.imageAlt}
                  width={500}
                  height={600}
                  className="relative z-10 h-auto w-full max-h-[380px] sm:max-h-[400px] lg:max-h-[450px] object-contain drop-shadow-2xl"
                  loading="lazy"
                  priority={false}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ DEFAULTS ------------------------------ */

export const cdpDefaults: CDPData = {
  badgeText: "Customer Data Platform",
  badgeBgColor: "purple-100",
  badgeTextColor: "purple-700",
  title: "Unify Customer Data for Smarter Campaigns",
  description:
    "Connect every touchpoint into one powerful platform. Deliver personalized WhatsApp, RCS, and Messenger campaigns powered by real-time insights and behavioral data.",
  features: [
    {
      icon: "CheckCircle2",
      title: "Unified Customer Profiles",
      description: "Aggregate CRM, e-commerce and analytics into one view.",
      color: "purple",
    },
    {
      icon: "CheckCircle2",
      title: "Smart Automation",
      description: "Trigger messages based on purchases, carts and engagement.",
      color: "blue",
    },
    {
      icon: "CheckCircle2",
      title: "Omnichannel Orchestration",
      description: "Design consistent experiences across channels.",
      color: "green",
    },
  ],
  btn1Text: "Explore CDP Features",
  btn1Link: "https://app.chati.chat",
  btn2Text: "Talk to Expert",
  btn2Link: "#",
  backgroundGradient: "blue-white-purple",
  orbColor1: "purple-400",
  orbColor2: "blue-400",
  imageSrc: "/cdp-marketing-chati.png",
  imageAlt: "CDP screenshot",
  showFloatingElements: true,
};

/* ------------------------------ UTIL ------------------------------ */

function getColorVar(colorKey: string) {
  // simple map of the few color keys we allowed in the editor -> CSS color
  switch (colorKey) {
    case "purple-400":
      return "rgba(139,92,246,0.18)";
    case "blue-400":
      return "rgba(59,130,246,0.14)";
    case "green-400":
      return "rgba(34,197,94,0.12)";
    case "pink-400":
      return "rgba(236,72,153,0.12)";
    case "orange-400":
      return "rgba(249,115,22,0.12)";
    default:
      return "rgba(139,92,246,0.12)";
  }
}
