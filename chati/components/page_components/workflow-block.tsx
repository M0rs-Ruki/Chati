// components/workflow-block.tsx
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
  Play,
  MessageSquare,
  Smartphone,
  Mail,
  Clock,
  Facebook,
  CheckCircle2,
  GitBranch,
  Repeat,
  Sparkles,
} from "lucide-react";
import { MediaPicker } from "@/components/media-picker";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import Link from "next/link";

//
// TYPES
//
export type WorkflowStep = {
  id: string;
  stepLabel?: string; // e.g. "Step 1: Trigger"
  title: string;
  description: string;
  color: string; // base color name e.g. "blue", "green"
  icon?: string; // lucide icon name (informational)
  rightIcon?: string; // faint right-side icon name
  border?: string; // border color key
  delayMs?: number; // optional animation delay value (ms)
};

export type WorkflowDelay = {
  id: string;
  label: string; // "Wait 2 hours"
  color?: string;
};

export type WorkflowFeature = {
  id: string;
  icon?: string;
  title: string;
  text: string;
  color?: string;
};

export type WorkflowData = {
  // header
  badgeText: string;
  badgeBg: string;
  badgeTextColor: string;
  headerTitle: string;
  headerDescription: string;
  // steps (ordered)
  steps: WorkflowStep[];
  // delays placed between steps (indexes correspond to gaps)
  delays: WorkflowDelay[];
  // final success
  finalEnabled: boolean;
  finalText: string;
  finalIcon?: string;
  finalColor?: string;
  // features below
  features: WorkflowFeature[];
  // visuals
  backgroundGradient: string;
  orb1Color: string;
  orb2Color: string;
  // animation toggle
  animationsEnabled: boolean;
};

//
// DEFAULTS
//
function uid(prefix = "") {
  return `${prefix}${Math.random().toString(36).slice(2, 9)}`;
}

export const workflowDefaults: WorkflowData = {
  badgeText: "How It Works",
  badgeBg: "purple-100",
  badgeTextColor: "purple-700",
  headerTitle: "Visual Workflow Automation",
  headerDescription:
    "See how automation workflows trigger multi-channel campaigns with intelligent delays, conditions, and personalized messaging.",
  steps: [
    {
      id: uid("step-"),
      stepLabel: "Step 1: Trigger",
      title: "Facebook Lead Captured",
      description:
        "When a new lead submits your Facebook Lead Ad form, the workflow starts automatically.",
      color: "blue",
      icon: "Play",
      rightIcon: "Facebook",
      border: "blue-200",
      delayMs: 0,
    },
    {
      id: uid("step-"),
      stepLabel: "Step 2: Immediate Action",
      title: "Send WhatsApp Welcome Message",
      description:
        "“Hi {name}, thanks for your interest! Here's what you need to know…”",
      color: "green",
      icon: "MessageSquare",
      rightIcon: "MessageSquare",
      border: "green-200",
      delayMs: 150,
    },
    {
      id: uid("step-"),
      stepLabel: "Step 3: Follow-up",
      title: "Send RCS Message with Rich Media",
      description:
        "Deliver an interactive message with product images and action buttons.",
      color: "indigo",
      icon: "Smartphone",
      rightIcon: "Smartphone",
      border: "indigo-200",
      delayMs: 300,
    },
    {
      id: uid("step-"),
      stepLabel: "Step 4: Final Step",
      title: "Send Email with Offer",
      description:
        "Share case studies, testimonials, and a personalized offer to close the deal.",
      color: "pink",
      icon: "Mail",
      rightIcon: "Mail",
      border: "pink-200",
      delayMs: 500,
    },
  ],
  delays: [
    { id: uid("delay-"), label: "Wait 2 hours", color: "purple" },
    { id: uid("delay-"), label: "Wait 1 day", color: "orange" },
  ],
  finalEnabled: true,
  finalText: "Workflow Complete — Lead Nurtured Successfully!",
  finalIcon: "CheckCircle2",
  finalColor: "green",
  features: [
    {
      id: uid("feat-"),
      icon: "GitBranch",
      title: "Conditional Logic",
      text: "Add branching workflows based on user behavior.",
      color: "purple",
    },
    {
      id: uid("feat-"),
      icon: "Clock",
      title: "Flexible Delays",
      text: "Send messages at the perfect moment.",
      color: "blue",
    },
    {
      id: uid("feat-"),
      icon: "Repeat",
      title: "Multi-Step Sequences",
      text: "Design complete customer journeys with many steps.",
      color: "green",
    },
  ],
  backgroundGradient: "white-violet-blue",
  orb1Color: "purple-400",
  orb2Color: "blue-400",
  animationsEnabled: true,
};

//
// EDITOR COMPONENT
//
interface WorkflowEditorProps {
  data: WorkflowData;
  onChange: (next: WorkflowData) => void;
}

export function WorkflowEditor({ data, onChange }: WorkflowEditorProps) {
  const [mediaOpen, setMediaOpen] = useState(false);
  const [selectedStepIndex, setSelectedStepIndex] = useState<number | null>(
    null
  );

  // STEP helpers
  const addStep = () => {
    const s: WorkflowStep = {
      id: uid("step-"),
      stepLabel: `Step ${data.steps.length + 1}`,
      title: "New Step",
      description: "Describe step...",
      color: "blue",
      icon: "Play",
      rightIcon: "",
      border: "blue-200",
      delayMs: 0,
    };
    onChange({ ...data, steps: [...data.steps, s] });
  };

  const updateStep = (i: number, field: keyof WorkflowStep, value: any) => {
    const next = [...data.steps];
    next[i] = { ...next[i], [field]: value };
    onChange({ ...data, steps: next });
  };

  const removeStep = (i: number) => {
    if (data.steps.length <= 1) return;
    const next = data.steps.filter((_, idx) => idx !== i);
    onChange({ ...data, steps: next });
  };

  // DELAY helpers
  const addDelay = (pos = data.delays.length) => {
    const d: WorkflowDelay = {
      id: uid("delay-"),
      label: "Wait 1 hour",
      color: "purple",
    };
    const next = [...data.delays];
    next.splice(pos, 0, d);
    onChange({ ...data, delays: next });
  };
  const updateDelay = (i: number, field: keyof WorkflowDelay, value: any) => {
    const next = [...data.delays];
    next[i] = { ...next[i], [field]: value };
    onChange({ ...data, delays: next });
  };
  const removeDelay = (i: number) => {
    const next = data.delays.filter((_, idx) => idx !== i);
    onChange({ ...data, delays: next });
  };

  // FEATURES helpers
  const addFeature = () => {
    const f: WorkflowFeature = {
      id: uid("feat-"),
      icon: "GitBranch",
      title: "New Feature",
      text: "Description",
      color: "purple",
    };
    onChange({ ...data, features: [...data.features, f] });
  };
  const updateFeature = (
    i: number,
    field: keyof WorkflowFeature,
    value: any
  ) => {
    const next = [...data.features];
    next[i] = { ...next[i], [field]: value };
    onChange({ ...data, features: next });
  };
  const removeFeature = (i: number) => {
    const next = data.features.filter((_, idx) => idx !== i);
    onChange({ ...data, features: next });
  };

  const gradientOptions = [
    { value: "white-violet-blue", label: "White → Violet → Blue" },
    { value: "blue-50-to-green-50", label: "Blue → Green" },
    { value: "pink-50-to-orange-50", label: "Pink → Orange" },
    { value: "white-to-blue", label: "White → Blue" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-4 border rounded-lg space-y-3">
        <h4 className="font-semibold text-sm">Header</h4>

        <div className="space-y-2">
          <Label>Badge Text</Label>
          <Input
            value={data.badgeText}
            onChange={(e) => onChange({ ...data, badgeText: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-2">
            <Label>Badge Background</Label>
            <Select
              value={data.badgeBg}
              onValueChange={(v) => onChange({ ...data, badgeBg: v })}
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
            value={data.headerTitle}
            onChange={(e) => onChange({ ...data, headerTitle: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label>Description</Label>
          <Textarea
            value={data.headerDescription}
            onChange={(e) =>
              onChange({ ...data, headerDescription: e.target.value })
            }
            rows={3}
          />
        </div>
      </div>

      {/* Steps */}
      <div className="p-4 border rounded-lg space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="font-semibold text-sm">Steps</h4>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline" onClick={addStep}>
              <Plus className="h-3 w-3 mr-1" /> Add Step
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => {
                onChange({ ...data, steps: workflowDefaults.steps });
              }}
            >
              Reset Steps
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          {data.steps.map((s, i) => (
            <div key={s.id} className="p-3 border rounded bg-gray-50 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">
                  {s.stepLabel || `Step ${i + 1}`}
                </span>
                <div className="flex items-center gap-2">
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => removeStep(i)}
                  >
                    <Trash2 className="h-4 w-4 text-red-600" />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label>Step Label</Label>
                  <Input
                    value={s.stepLabel}
                    onChange={(e) => updateStep(i, "stepLabel", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Color</Label>
                  <Select
                    value={s.color}
                    onValueChange={(v) => updateStep(i, "color", v)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="blue">Blue</SelectItem>
                      <SelectItem value="green">Green</SelectItem>
                      <SelectItem value="indigo">Indigo</SelectItem>
                      <SelectItem value="pink">Pink</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Title</Label>
                <Input
                  value={s.title}
                  onChange={(e) => updateStep(i, "title", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  value={s.description}
                  onChange={(e) => updateStep(i, "description", e.target.value)}
                  rows={2}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <Label>Right-side Icon (name)</Label>
                  <Input
                    value={s.rightIcon || ""}
                    onChange={(e) => updateStep(i, "rightIcon", e.target.value)}
                    placeholder="Facebook"
                  />
                </div>
                <div>
                  <Label>Border key</Label>
                  <Input
                    value={s.border || ""}
                    onChange={(e) => updateStep(i, "border", e.target.value)}
                    placeholder="blue-200"
                  />
                </div>
                <div>
                  <Label>Animation Delay (ms)</Label>
                  <Input
                    type="number"
                    value={String(s.delayMs ?? 0)}
                    onChange={(e) =>
                      updateStep(i, "delayMs", Number(e.target.value))
                    }
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Delays */}
      <div className="p-4 border rounded-lg space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="font-semibold text-sm">Delays (Between Steps)</h4>
          <Button size="sm" variant="outline" onClick={() => addDelay()}>
            <Plus className="h-3 w-3 mr-1" /> Add Delay
          </Button>
        </div>

        <div className="space-y-3">
          {data.delays.map((d, i) => (
            <div key={d.id} className="flex gap-2 items-center">
              <Input
                value={d.label}
                onChange={(e) => updateDelay(i, "label", e.target.value)}
              />
              <Select
                value={d.color}
                onValueChange={(v) => updateDelay(i, "color", v)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="purple">Purple</SelectItem>
                  <SelectItem value="orange">Orange</SelectItem>
                  <SelectItem value="green">Green</SelectItem>
                </SelectContent>
              </Select>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => removeDelay(i)}
              >
                <Trash2 className="h-4 w-4 text-red-600" />
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Final success */}
      <div className="p-4 border rounded-lg space-y-2">
        <h4 className="font-semibold text-sm">Final Success Card</h4>
        <div className="flex items-center gap-3">
          <input
            id="final-enabled"
            type="checkbox"
            checked={data.finalEnabled}
            onChange={(e) =>
              onChange({ ...data, finalEnabled: e.target.checked })
            }
          />
          <Label htmlFor="final-enabled">Show final success card</Label>
        </div>
        <div className="space-y-2 mt-2">
          <Label>Text</Label>
          <Input
            value={data.finalText}
            onChange={(e) => onChange({ ...data, finalText: e.target.value })}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
          <div>
            <Label>Icon name</Label>
            <Input
              value={data.finalIcon || ""}
              onChange={(e) => onChange({ ...data, finalIcon: e.target.value })}
            />
          </div>
          <div>
            <Label>Color</Label>
            <Select
              value={data.finalColor}
              onValueChange={(v) => onChange({ ...data, finalColor: v })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="green">Green</SelectItem>
                <SelectItem value="blue">Blue</SelectItem>
                <SelectItem value="purple">Purple</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Features below */}
      <div className="p-4 border rounded-lg space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="font-semibold text-sm">Features (bottom)</h4>
          <Button size="sm" variant="outline" onClick={addFeature}>
            <Plus className="h-3 w-3 mr-1" /> Add Feature
          </Button>
        </div>

        <div className="space-y-3">
          {data.features.map((f, i) => (
            <div key={f.id} className="p-3 border rounded bg-gray-50 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{f.title}</span>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => removeFeature(i)}
                >
                  <Trash2 className="h-4 w-4 text-red-600" />
                </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <Label>Title</Label>
                  <Input
                    value={f.title}
                    onChange={(e) => updateFeature(i, "title", e.target.value)}
                  />
                </div>
                <div>
                  <Label>Icon name</Label>
                  <Input
                    value={f.icon || ""}
                    onChange={(e) => updateFeature(i, "icon", e.target.value)}
                  />
                </div>
              </div>
              <div>
                <Label>Text</Label>
                <Textarea
                  value={f.text}
                  onChange={(e) => updateFeature(i, "text", e.target.value)}
                  rows={2}
                />
              </div>
              <div>
                <Label>Color</Label>
                <Select
                  value={f.color}
                  onValueChange={(v) => updateFeature(i, "color", v)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="purple">Purple</SelectItem>
                    <SelectItem value="blue">Blue</SelectItem>
                    <SelectItem value="green">Green</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Visuals */}
      <div className="p-4 border rounded-lg space-y-3">
        <h4 className="font-semibold text-sm">Visuals & Background</h4>

        <div>
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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <Label>Orb 1 Color</Label>
            <Select
              value={data.orb1Color}
              onValueChange={(v) => onChange({ ...data, orb1Color: v })}
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

          <div>
            <Label>Orb 2 Color</Label>
            <Select
              value={data.orb2Color}
              onValueChange={(v) => onChange({ ...data, orb2Color: v })}
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
          <Label>Animations Enabled</Label>
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={data.animationsEnabled}
              onChange={(e) =>
                onChange({ ...data, animationsEnabled: e.target.checked })
              }
            />
            <span className="text-sm text-gray-600">
              Toggle reveal/translate animations
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

//
// RENDERER
//
export function WorkflowSection({ data }: { data?: Partial<WorkflowData> }) {
  const safe: WorkflowData = { ...workflowDefaults, ...(data ?? {}) };

  const gradientClass =
    safe.backgroundGradient === "blue-50-to-green-50"
      ? "bg-gradient-to-br from-blue-50 to-green-50"
      : safe.backgroundGradient === "pink-50-to-orange-50"
      ? "bg-gradient-to-br from-pink-50 to-orange-50"
      : safe.backgroundGradient === "white-to-blue"
      ? "bg-gradient-to-br from-white to-blue-50"
      : "bg-gradient-to-br from-white via-purple-50/30 to-blue-50/20";

  // helper for inline orb CSS
  function getColorVar(key: string) {
    switch (key) {
      case "purple-400":
        return "rgba(139,92,246,0.16)";
      case "blue-400":
        return "rgba(59,130,246,0.12)";
      case "green-400":
        return "rgba(34,197,94,0.10)";
      case "pink-400":
        return "rgba(236,72,153,0.10)";
      case "orange-400":
        return "rgba(249,115,22,0.10)";
      default:
        return "rgba(139,92,246,0.12)";
    }
  }

  // small renderer helper to pick icon components
  const pickRightIcon = (name?: string) => {
    switch ((name || "").toLowerCase()) {
      case "facebook":
        return (
          <Facebook className="w-10 h-10 text-blue-600 opacity-40 hidden md:block" />
        );
      case "plays":
      case "play":
      case "playcircle":
      case "play":
        return (
          <Play className="w-10 h-10 text-blue-600 opacity-40 hidden md:block" />
        );
      case "messagesquare":
        return (
          <MessageSquare className="w-10 h-10 text-green-600 opacity-40 hidden md:block" />
        );
      case "smartphone":
        return (
          <Smartphone className="w-10 h-10 text-indigo-600 opacity-40 hidden md:block" />
        );
      case "mail":
        return (
          <Mail className="w-10 h-10 text-pink-600 opacity-40 hidden md:block" />
        );
      default:
        return null;
    }
  };

  const renderStepIcon = (color: string) => {
    switch (color) {
      case "blue":
        return <Play className="w-7 h-7 text-white" />;
      case "green":
        return <MessageSquare className="w-7 h-7 text-white" />;
      case "indigo":
        return <Smartphone className="w-7 h-7 text-white" />;
      case "pink":
        return <Mail className="w-7 h-7 text-white" />;
      default:
        return <Play className="w-7 h-7 text-white" />;
    }
  };

  return (
    <section
      className={`relative overflow-hidden py-16 md:py-20 ${gradientClass}`}
    >
      {/* orbs */}
      <div
        className="absolute top-0 left-0 w-[480px] h-[480px] rounded-full blur-3xl"
        style={{
          background: `radial-gradient(circle at 20% 20%, ${getColorVar(
            safe.orb1Color
          )}, transparent 40%)`,
        }}
      />
      <div
        className="absolute bottom-0 right-0 w-[380px] h-[380px] rounded-full blur-3xl"
        style={{
          background: `radial-gradient(circle at 80% 80%, ${getColorVar(
            safe.orb2Color
          )}, transparent 45%)`,
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* header */}
        <div
          className={`text-center mb-12 transition-all duration-700 ${
            safe.animationsEnabled ? "opacity-100 translate-y-0" : ""
          }`}
        >
          <Badge
            className={`mb-4 ${badgeBgClass(safe.badgeBg)} text-sm`}
            variant="outline"
          >
            <Sparkles className="w-3.5 h-3.5 mr-1.5 inline-block" />
            {safe.badgeText}
          </Badge>

          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3">
            {safe.headerTitle}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {safe.headerDescription}
          </p>
        </div>

        {/* steps container */}
        <div className="max-w-4xl mx-auto">
          <div className="space-y-10 md:space-y-12 relative">
            {safe.steps.map((s, idx) => {
              const leftTransition = safe.animationsEnabled
                ? s.delayMs
                  ? `transition-all duration-700 delay-[${s.delayMs}ms]`
                  : "transition-all duration-700"
                : "";
              const inClass = safe.animationsEnabled
                ? "opacity-100 translate-x-0"
                : "opacity-100 translate-x-0";
              const outClassLeft = safe.animationsEnabled
                ? "opacity-0 -translate-x-6"
                : "";

              return (
                <React.Fragment key={s.id}>
                  <div className={`${leftTransition} ${inClass}`}>
                    <Card
                      className={`p-5 md:p-6 bg-gradient-to-r from-${s.color}-50 to-${s.color}-100/50 border border-${s.color}-200 shadow-md hover:shadow-xl transition-all`}
                    >
                      <div className="flex flex-col md:flex-row md:items-center gap-4">
                        <div
                          className={`w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-${s.color}-500 to-${s.color}-600 rounded-2xl flex items-center justify-center shadow-md`}
                        >
                          {renderStepIcon(s.color)}
                        </div>

                        <div className="flex-1">
                          <Badge
                            className={`bg-${s.color}-600 text-white mb-1`}
                          >
                            {s.stepLabel}
                          </Badge>
                          <h3 className="text-xl font-bold">{s.title}</h3>
                          <p className="text-gray-600 text-sm md:text-base">
                            {s.description}
                          </p>
                        </div>

                        <div className="hidden md:block">
                          {pickRightIcon(s.rightIcon)}
                        </div>
                      </div>
                    </Card>
                  </div>

                  {/* line or delay after step (if not last) */}
                  {idx < safe.delays.length && (
                    <div className="flex justify-center">
                      <div
                        className={`w-1 h-10 bg-gradient-to-b from-${safe.delays[idx].color}-400 to-${safe.delays[idx].color}-500 rounded-full animate-pulse`}
                      />
                    </div>
                  )}

                  {/* Delay card may be shown between step idx and idx+1 if matching delay exists */}
                  {idx < safe.delays.length && (
                    <div className="flex justify-center items-center gap-2 md:gap-3">
                      <div
                        className={`w-1 h-6 bg-gradient-to-b from-${safe.delays[idx].color}-400 to-${safe.delays[idx].color}-500 rounded-full`}
                      />
                      <Card
                        className={`px-4 py-2 bg-${safe.delays[idx].color}-50 border border-${safe.delays[idx].color}-200`}
                      >
                        <div className="flex items-center gap-2">
                          <Clock className="w-5 h-5 text-current" />
                          <span
                            className={`font-semibold text-${safe.delays[idx].color}-700 text-sm`}
                          >
                            {safe.delays[idx].label}
                          </span>
                        </div>
                      </Card>
                      <div
                        className={`w-1 h-6 bg-gradient-to-b from-${safe.delays[idx].color}-400 to-${safe.delays[idx].color}-500 rounded-full`}
                      />
                    </div>
                  )}
                </React.Fragment>
              );
            })}

            {/* final success */}
            {safe.finalEnabled && (
              <div className="flex justify-center pt-4">
                <Card className="px-6 py-4 bg-gradient-to-r from-green-500 to-green-600 shadow-lg border-0">
                  <div className="flex items-center gap-3 text-white">
                    <CheckCircle2 className="w-6 h-6" />
                    <span className="font-bold text-lg">{safe.finalText}</span>
                  </div>
                </Card>
              </div>
            )}
          </div>
        </div>

        {/* features below */}
        <div
          className={`mt-14 grid grid-cols-1 md:grid-cols-3 gap-6 transition-all duration-700 ${
            safe.animationsEnabled ? "opacity-100 translate-y-0" : ""
          }`}
        >
          {safe.features.map((f, i) => (
            <Card
              key={f.id}
              className="p-6 text-center hover:shadow-lg transition-all"
            >
              <div
                className={`w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4`}
                style={{ background: getFeatureGradient(f.color) }}
              >
                {/* fallback icon */}
                <Sparkles className="w-6 h-6 text-white" />
              </div>

              <h3 className="font-bold text-lg mb-2">{f.title}</h3>
              <p className="text-gray-600 text-sm">{f.text}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* inline orb style */}
      <style jsx>{`
        section :global(.blur-3xl) {
          filter: blur(48px);
        }
      `}</style>
    </section>
  );
}

//
// HELPERS
//
function badgeBgClass(key: string) {
  switch (key) {
    case "blue-100":
      return "bg-blue-100 text-blue-700";
    case "green-100":
      return "bg-green-100 text-green-700";
    case "yellow-100":
      return "bg-yellow-100 text-yellow-700";
    default:
      return "bg-purple-100 text-purple-700";
  }
}

function getFeatureGradient(color?: string) {
  switch (color) {
    case "blue":
      return "linear-gradient(180deg,#3b82f6,#1e40af)";
    case "green":
      return "linear-gradient(180deg,#10b981,#059669)";
    case "purple":
      return "linear-gradient(180deg,#8b5cf6,#6d28d9)";
    default:
      return "linear-gradient(180deg,#8b5cf6,#6d28d9)";
  }
}
