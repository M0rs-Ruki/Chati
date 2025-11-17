// components/enterprise-hero-block.tsx
"use client";

import React, { useState } from "react";
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
import { Plus, Trash2, ImageIcon } from "lucide-react";
import {
  Shield,
  Gauge,
  Users,
  Lock,
  Headphones,
  ArrowRight,
} from "lucide-react";
import { MediaPicker } from "@/components/media-picker";
import {Badge} from "@/components/ui/badge";
import {Card} from "@/components/ui/card";
import Link from "next/link";

/* ----------------------------- TYPES & UTILS ---------------------------- */

export type FloatingStat = {
  id: string;
  icon: string;
  label: string;
  value: string;
  bgFrom: string;
  bgTo: string;
  position: "top-right" | "bottom-left";
};

export type StatCard = {
  id?: string;
  number: string;
  label: string;
  color: "blue" | "green" | "purple" | "orange" | string;
};

export type FeatureItem = {
  id: string;
  icon: string;
  bg: string;
  iconColor: string;
  text: string;
};

export type EnterpriseHeroData = {
  // background & orbs
  backgroundFrom: string;
  backgroundVia?: string;
  backgroundTo?: string;
  orb1GradientFrom?: string;
  orb2GradientFrom?: string;

  // badge & title
  badgeText: string;
  badgeBg: string;
  badgeTextColor: string;

  titleLine1: string;
  titleLine2: string;
  titleGradientFrom?: string;
  titleGradientVia?: string;
  titleGradientTo?: string;

  // content
  description: string;

  // image
  imageSrc: string;
  imageAlt: string;

  // floating stats
  floatingStats: FloatingStat[];

  // stats cards
  statsCards: StatCard[];

  // features
  features: FeatureItem[];

  // buttons
  primaryText: string;
  primaryLink: string;
  primaryBg?: string;
  secondaryText: string;
  secondaryLink: string;

  // toggles
  showFloatingStats?: boolean;
};

/* ------------------------------ DEFAULTS -------------------------------- */

function uid(prefix = "") {
  return prefix + Math.random().toString(36).slice(2, 9);
}

export const enterpriseHeroDefaults: EnterpriseHeroData = {
  backgroundFrom: "slate-50",
  backgroundVia: "white",
  backgroundTo: "blue-50/20",
  orb1GradientFrom: "slate-400/10",
  orb2GradientFrom: "blue-400/10",

  badgeText: "Enterprise-Grade",
  badgeBg: "slate-100",
  badgeTextColor: "slate-700",

  titleLine1: "Scale Your Automation",
  titleLine2: "To Enterprise Level",
  titleGradientFrom: "slate-700",
  titleGradientVia: "blue-600",
  titleGradientTo: "purple-600",

  description:
    "Built for businesses that need reliability, security, and scale. Our enterprise automation platform handles millions of messages daily with 99.9% uptime, advanced security features, team collaboration tools, and dedicated support.",

  imageSrc: "/automation-workflow-builder-showing-triggers-del.jpg",
  imageAlt:
    "Enterprise automation dashboard showing scalable workflows, team collaboration, and analytics",

  floatingStats: [
    {
      id: uid("fs-"),
      icon: "Gauge",
      label: "Uptime",
      value: "99.9%",
      bgFrom: "purple-500",
      bgTo: "purple-600",
      position: "top-right",
    },
    {
      id: uid("fs-"),
      icon: "Users",
      label: "Messages/Day",
      value: "1M+",
      bgFrom: "green-500",
      bgTo: "green-600",
      position: "bottom-left",
    },
  ],

  statsCards: [
    {
      id: uid("sc-"),
      number: "99.9%",
      label: "Platform Uptime",
      color: "blue",
    },
    {
      id: uid("sc-"),
      number: "1M+",
      label: "Messages Per Day",
      color: "green",
    },
    {
      id: uid("sc-"),
      number: "24/7",
      label: "Enterprise Support",
      color: "purple",
    },
    { id: uid("sc-"), number: "SOC 2", label: "Compliant", color: "orange" },
  ],

  features: [
    {
      id: uid("f-"),
      icon: "Lock",
      bg: "blue-100",
      iconColor: "blue-600",
      text: "Advanced security with SSO, 2FA, and role-based access control",
    },
    {
      id: uid("f-"),
      icon: "Users",
      bg: "green-100",
      iconColor: "green-600",
      text: "Team collaboration with workflow sharing and approvals",
    },
    {
      id: uid("f-"),
      icon: "Headphones",
      bg: "purple-100",
      iconColor: "purple-600",
      text: "Dedicated account manager and priority support",
    },
  ],

  primaryText: "Contact Sales",
  primaryLink: "/contact",
  primaryBg: "slate-900",
  secondaryText: "Learn More",
  secondaryLink: "/enterprise",

  showFloatingStats: true,
};

/* --------------------------- EDITOR COMPONENT ---------------------------- */

interface EnterpriseHeroEditorProps {
  data: EnterpriseHeroData;
  onChange: (d: EnterpriseHeroData) => void;
}

export function EnterpriseHeroEditor({
  data,
  onChange,
}: EnterpriseHeroEditorProps) {
  const [mediaOpen, setMediaOpen] = useState(false);
  const [selectedFloatingIndex, setSelectedFloatingIndex] = useState<
    number | null
  >(null);

  // floating stats helpers
  const addFloating = () => {
    const n: FloatingStat = {
      id: uid("fs-"),
      icon: "Gauge",
      label: "New Stat",
      value: "Value",
      bgFrom: "purple-500",
      bgTo: "purple-600",
      position: "top-right",
    };
    onChange({ ...data, floatingStats: [...data.floatingStats, n] });
  };
  const updateFloating = (i: number, field: keyof FloatingStat, value: any) => {
    const next = [...data.floatingStats];
    next[i] = { ...next[i], [field]: value };
    onChange({ ...data, floatingStats: next });
  };
  const removeFloating = (i: number) => {
    const next = data.floatingStats.filter((_, idx) => idx !== i);
    onChange({ ...data, floatingStats: next });
  };

  // stats cards helpers
  const addStatCard = () => {
    onChange({
      ...data,
      statsCards: [
        ...data.statsCards,
        { id: uid("sc-"), number: "New", label: "Label", color: "blue" },
      ],
    });
  };
  const updateStatCard = (i: number, field: keyof StatCard, value: any) => {
    const next = [...data.statsCards];
    next[i] = { ...next[i], [field]: value };
    onChange({ ...data, statsCards: next });
  };
  const removeStatCard = (i: number) => {
    const next = data.statsCards.filter((_, idx) => idx !== i);
    onChange({ ...data, statsCards: next });
  };

  // features helpers
  const addFeature = () => {
    onChange({
      ...data,
      features: [
        ...data.features,
        {
          id: uid("f-"),
          icon: "Shield",
          bg: "slate-100",
          iconColor: "slate-700",
          text: "New feature text",
        },
      ],
    });
  };
  const updateFeature = (i: number, field: keyof FeatureItem, value: any) => {
    const next = [...data.features];
    next[i] = { ...next[i], [field]: value } as FeatureItem;
    onChange({ ...data, features: next });
  };
  const removeFeature = (i: number) => {
    onChange({
      ...data,
      features: data.features.filter((_, idx) => idx !== i),
    });
  };

  return (
    <div className="space-y-6">
      {/* Background & Orbs */}
      <div className="p-4 border rounded-lg space-y-3">
        <h4 className="font-semibold text-sm">Background & Orbs</h4>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <Label>From (bg)</Label>
            <Input
              value={data.backgroundFrom}
              onChange={(e) =>
                onChange({ ...data, backgroundFrom: e.target.value })
              }
            />
          </div>
          <div>
            <Label>Via (bg)</Label>
            <Input
              value={data.backgroundVia}
              onChange={(e) =>
                onChange({ ...data, backgroundVia: e.target.value })
              }
            />
          </div>
          <div>
            <Label>To (bg)</Label>
            <Input
              value={data.backgroundTo}
              onChange={(e) =>
                onChange({ ...data, backgroundTo: e.target.value })
              }
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
          <div>
            <Label>Orb 1 Gradient</Label>
            <Input
              value={data.orb1GradientFrom}
              onChange={(e) =>
                onChange({ ...data, orb1GradientFrom: e.target.value })
              }
            />
          </div>

          <div>
            <Label>Orb 2 Gradient</Label>
            <Input
              value={data.orb2GradientFrom}
              onChange={(e) =>
                onChange({ ...data, orb2GradientFrom: e.target.value })
              }
            />
          </div>
        </div>
      </div>

      {/* Badge & Title */}
      <div className="p-4 border rounded-lg space-y-3">
        <h4 className="font-semibold text-sm">Badge & Title</h4>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <Label>Badge Text</Label>
            <Input
              value={data.badgeText}
              onChange={(e) => onChange({ ...data, badgeText: e.target.value })}
            />
          </div>
          <div>
            <Label>Badge BG</Label>
            <Input
              value={data.badgeBg}
              onChange={(e) => onChange({ ...data, badgeBg: e.target.value })}
            />
          </div>
          <div>
            <Label>Badge Text Color</Label>
            <Input
              value={data.badgeTextColor}
              onChange={(e) =>
                onChange({ ...data, badgeTextColor: e.target.value })
              }
            />
          </div>
        </div>

        <div className="space-y-2 mt-3">
          <Label>Title Line 1</Label>
          <Input
            value={data.titleLine1}
            onChange={(e) => onChange({ ...data, titleLine1: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label>Title Line 2</Label>
          <Input
            value={data.titleLine2}
            onChange={(e) => onChange({ ...data, titleLine2: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-2">
          <div>
            <Label>Title Gradient From</Label>
            <Input
              value={data.titleGradientFrom}
              onChange={(e) =>
                onChange({ ...data, titleGradientFrom: e.target.value })
              }
            />
          </div>
          <div>
            <Label>Title Gradient Via</Label>
            <Input
              value={data.titleGradientVia}
              onChange={(e) =>
                onChange({ ...data, titleGradientVia: e.target.value })
              }
            />
          </div>
          <div>
            <Label>Title Gradient To</Label>
            <Input
              value={data.titleGradientTo}
              onChange={(e) =>
                onChange({ ...data, titleGradientTo: e.target.value })
              }
            />
          </div>
        </div>

        <div className="space-y-2 mt-3">
          <Label>Description</Label>
          <Textarea
            value={data.description}
            onChange={(e) => onChange({ ...data, description: e.target.value })}
            rows={3}
          />
        </div>
      </div>

      {/* Image */}
      <div className="p-4 border rounded-lg space-y-3">
        <h4 className="font-semibold text-sm">Image</h4>
        <div className="flex gap-2">
          <Input
            value={data.imageSrc}
            onChange={(e) => onChange({ ...data, imageSrc: e.target.value })}
          />
          <Button
            size="icon"
            variant="outline"
            onClick={() => setMediaOpen(true)}
            title="Choose image"
          >
            <ImageIcon className="h-4 w-4" />
          </Button>
        </div>
        <div>
          <Label>Image Alt</Label>
          <Input
            value={data.imageAlt}
            onChange={(e) => onChange({ ...data, imageAlt: e.target.value })}
          />
        </div>
      </div>

      {/* Floating Stats */}
      <div className="p-4 border rounded-lg space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="font-semibold text-sm">Floating Stats</h4>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline" onClick={addFloating}>
              <Plus className="h-3 w-3 mr-1" /> Add
            </Button>
          </div>
        </div>

        <div className="space-y-3">
          {data.floatingStats.map((fs, i) => (
            <div
              key={fs.id}
              className="p-3 border rounded bg-gray-50 space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{fs.label}</span>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => removeFloating(i)}
                >
                  <Trash2 className="h-4 w-4 text-red-600" />
                </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <div>
                  <Label>Label</Label>
                  <Input
                    value={fs.label}
                    onChange={(e) => updateFloating(i, "label", e.target.value)}
                  />
                </div>
                <div>
                  <Label>Value</Label>
                  <Input
                    value={fs.value}
                    onChange={(e) => updateFloating(i, "value", e.target.value)}
                  />
                </div>
                <div>
                  <Label>Position</Label>
                  <Select
                    value={fs.position}
                    onValueChange={(v) =>
                      updateFloating(i, "position", v as any)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="top-right">Top Right</SelectItem>
                      <SelectItem value="bottom-left">Bottom Left</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                <div>
                  <Label>BG From</Label>
                  <Input
                    value={fs.bgFrom}
                    onChange={(e) =>
                      updateFloating(i, "bgFrom", e.target.value)
                    }
                  />
                </div>
                <div>
                  <Label>BG To</Label>
                  <Input
                    value={fs.bgTo}
                    onChange={(e) => updateFloating(i, "bgTo", e.target.value)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="p-4 border rounded-lg space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="font-semibold text-sm">Stats Cards</h4>
          <Button size="sm" variant="outline" onClick={addStatCard}>
            <Plus className="h-3 w-3 mr-1" /> Add
          </Button>
        </div>

        <div className="space-y-3">
          {data.statsCards.map((sc, i) => (
            <div key={sc.id || i} className="p-3 border rounded bg-gray-50">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{sc.label}</span>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => removeStatCard(i)}
                >
                  <Trash2 className="h-4 w-4 text-red-600" />
                </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-2">
                <div>
                  <Label>Number</Label>
                  <Input
                    value={sc.number}
                    onChange={(e) =>
                      updateStatCard(i, "number", e.target.value)
                    }
                  />
                </div>
                <div>
                  <Label>Label</Label>
                  <Input
                    value={sc.label}
                    onChange={(e) => updateStatCard(i, "label", e.target.value)}
                  />
                </div>
                <div>
                  <Label>Color</Label>
                  <Select
                    value={sc.color}
                    onValueChange={(v) => updateStatCard(i, "color", v as any)}
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
          ))}
        </div>
      </div>

      {/* Features */}
      <div className="p-4 border rounded-lg space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="font-semibold text-sm">Features</h4>
          <Button size="sm" variant="outline" onClick={addFeature}>
            <Plus className="h-3 w-3 mr-1" /> Add
          </Button>
        </div>

        <div className="space-y-3">
          {data.features.map((f, i) => (
            <div key={f.id} className="p-3 border rounded bg-gray-50">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{f.text}</span>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => removeFeature(i)}
                >
                  <Trash2 className="h-4 w-4 text-red-600" />
                </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-2">
                <div>
                  <Label>Icon</Label>
                  <Input
                    value={f.icon}
                    onChange={(e) => updateFeature(i, "icon", e.target.value)}
                  />
                </div>
                <div>
                  <Label>BG</Label>
                  <Input
                    value={f.bg}
                    onChange={(e) => updateFeature(i, "bg", e.target.value)}
                  />
                </div>
                <div>
                  <Label>Icon Color</Label>
                  <Input
                    value={f.iconColor}
                    onChange={(e) =>
                      updateFeature(i, "iconColor", e.target.value)
                    }
                  />
                </div>
              </div>

              <div className="mt-2">
                <Label>Text</Label>
                <Textarea
                  value={f.text}
                  onChange={(e) => updateFeature(i, "text", e.target.value)}
                  rows={2}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Buttons */}
      <div className="p-4 border rounded-lg space-y-3">
        <h4 className="font-semibold text-sm">Buttons</h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <Label>Primary Text</Label>
            <Input
              value={data.primaryText}
              onChange={(e) =>
                onChange({ ...data, primaryText: e.target.value })
              }
            />
          </div>
          <div>
            <Label>Primary Link</Label>
            <Input
              value={data.primaryLink}
              onChange={(e) =>
                onChange({ ...data, primaryLink: e.target.value })
              }
            />
          </div>

          <div>
            <Label>Secondary Text</Label>
            <Input
              value={data.secondaryText}
              onChange={(e) =>
                onChange({ ...data, secondaryText: e.target.value })
              }
            />
          </div>
          <div>
            <Label>Secondary Link</Label>
            <Input
              value={data.secondaryLink}
              onChange={(e) =>
                onChange({ ...data, secondaryLink: e.target.value })
              }
            />
          </div>
        </div>
      </div>

      {/* Media Picker */}
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

/* ---------------------------- RENDERER ---------------------------------- */

interface EnterpriseHeroSectionProps {
  data?: Partial<EnterpriseHeroData>;
  heroRef?: React.RefObject<HTMLElement>;
  // optional bool to control reveal; keep simple and let CSS handle
}

export function EnterpriseHeroSection({
  data,
  heroRef,
}: EnterpriseHeroSectionProps) {
  const safe: EnterpriseHeroData = {
    ...enterpriseHeroDefaults,
    ...(data ?? {}),
  };

  // compose gradient tailwind class (best-effort)
  const gradientClass = `bg-gradient-to-br from-${safe.backgroundFrom} ${
    safe.backgroundVia ? "via-" + safe.backgroundVia : ""
  } to-${safe.backgroundTo}`;

  // helper to map color names to actual css for inline backgrounds
  const colorMap: Record<string, string> = {
    "purple-500": "linear-gradient(180deg,#7c3aed,#6d28d9)",
    "purple-600": "linear-gradient(180deg,#6d28d9,#5b21b6)",
    "green-500": "linear-gradient(180deg,#10b981,#059669)",
    "green-600": "linear-gradient(180deg,#059669,#047857)",
    "slate-400/10": "rgba(148,163,184,0.08)",
    "blue-400/10": "rgba(59,130,246,0.06)",
  };

  const getOrbStyle = (key?: string) => {
    if (!key) return {};
    // allow either rgba-ish keys or actual gradient keys from colorMap
    return { background: colorMap[key] ?? key };
  };

  return (
    <section
      ref={heroRef}
      className={`relative overflow-hidden py-16 md:py-20 ${
        /* tailwind can't accept dynamic class parts reliably for 'via-' inside template, keep base */ ""
      }`}
    >
      {/* Orbs */}
      <div
        className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-3xl"
        style={{
          background: safe.orb1GradientFrom
            ? safe.orb1GradientFrom
            : "rgba(148,163,184,0.06)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full blur-3xl"
        style={{
          background: safe.orb2GradientFrom
            ? safe.orb2GradientFrom
            : "rgba(59,130,246,0.06)",
        }}
      />

      <div className="container relative mx-auto px-4 z-10">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
          {/* Image */}
          <div className="relative order-2 lg:order-1 transition-all duration-1000 delay-300 opacity-100 translate-x-0">
            <div className="relative w-full max-w-lg mx-auto lg:mx-0">
              <div className="absolute inset-0 bg-gradient-to-br from-slate-400/20 via-blue-400/15 to-purple-400/20 blur-3xl rounded-full transform scale-110" />
              <img
                src={safe.imageSrc}
                alt={safe.imageAlt}
                width={600}
                height={700}
                className="relative z-10 w-full h-auto object-contain rounded-2xl shadow-2xl"
                loading="lazy"
              />

              {/* Floating Stats Cards (conditionally shown) */}
              {safe.showFloatingStats &&
                safe.floatingStats.map((fs) => {
                  const isTopRight = fs.position === "top-right";
                  const posClass = isTopRight
                    ? "absolute -top-4 -right-4"
                    : "absolute -bottom-4 -left-4";
                  const bgStyle = {
                    background: `linear-gradient(180deg, ${fs.bgFrom}, ${fs.bgTo})`,
                  };
                  return (
                    <div
                      key={fs.id}
                      className={`${posClass} bg-white rounded-xl shadow-xl p-4 animate-float z-20 hidden md:block`}
                      style={{ transform: "translateZ(0)" }}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center"
                          style={bgStyle}
                        >
                          {fs.icon === "Gauge" ? (
                            <Gauge className="w-5 h-5 text-white" />
                          ) : fs.icon === "Users" ? (
                            <Users className="w-5 h-5 text-white" />
                          ) : (
                            <span className="text-white">●</span>
                          )}
                        </div>
                        <div>
                          <div className="text-xs text-gray-500">
                            {fs.label}
                          </div>
                          <div className="text-lg font-bold text-gray-900">
                            {fs.value}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2 transition-all duration-1000 opacity-100 translate-x-0">
            <Badge
              variant="secondary"
              className="mb-4 bg-slate-100 text-slate-700 w-fit shadow-sm"
            >
              <Shield className="w-3.5 h-3.5 mr-1.5" />
              {safe.badgeText}
            </Badge>

            <h2 className="mb-4">
              <span className="block text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-2">
                {safe.titleLine1}
              </span>
              <span
                className="block text-3xl md:text-4xl lg:text-5xl font-bold bg-clip-text text-transparent"
                style={{
                  background: `linear-gradient(90deg, ${safe.titleGradientFrom}, ${safe.titleGradientVia}, ${safe.titleGradientTo})`,
                }}
              >
                {safe.titleLine2}
              </span>
            </h2>

            <p className="mb-6 text-base md:text-lg text-muted-foreground leading-relaxed">
              {safe.description}
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              {safe.statsCards.map((sc, idx) => (
                <Card
                  key={sc.id || idx}
                  className="p-4 bg-white border-2 border-gray-100 hover:border-blue-200 transition-colors"
                >
                  <div
                    className={`text-3xl font-bold ${
                      sc.color === "blue"
                        ? "text-blue-600"
                        : sc.color === "green"
                        ? "text-green-600"
                        : sc.color === "purple"
                        ? "text-purple-600"
                        : sc.color === "orange"
                        ? "text-orange-600"
                        : "text-gray-900"
                    } mb-1`}
                  >
                    {sc.number}
                  </div>
                  <div className="text-sm text-gray-600">{sc.label}</div>
                </Card>
              ))}
            </div>

            {/* Features */}
            <div className="space-y-3 mb-6">
              {safe.features.map((f) => (
                <div key={f.id} className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: f.bg }}
                  >
                    {f.icon === "Lock" ? (
                      <Lock className="w-4 h-4" />
                    ) : f.icon === "Users" ? (
                      <Users className="w-4 h-4" />
                    ) : f.icon === "Headphones" ? (
                      <Headphones className="w-4 h-4" />
                    ) : (
                      <span className="text-sm">●</span>
                    )}
                  </div>
                  <span className="text-sm font-medium text-foreground">
                    {f.text}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                size="lg"
                className="bg-slate-900 hover:bg-slate-800 text-white font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                <Link href={safe.primaryLink || "#"}>
                  {safe.primaryText}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="border-2 bg-white hover:bg-gray-50 font-medium shadow-sm"
                asChild
              >
                <Link href={safe.secondaryLink || "#"}>
                  {safe.secondaryText}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        section :global(.blur-3xl) {
          filter: blur(48px);
        }
        /* floating animations */
        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-6px);
          }
          100% {
            transform: translateY(0px);
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float 7s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
