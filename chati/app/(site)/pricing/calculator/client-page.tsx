"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  ArrowLeft,
  Download,
  MessageSquare,
  Globe,
  TrendingUp,
  Zap,
  Building2,
  Rocket,
  Info,
  AlertCircle,
} from "lucide-react"
import { cn } from "@/lib/utils"

const countryPricing = [
  { country: "India", marketing: 0.7846, utility: 0.115, authentication: 0.115, international: 2.3 },
  { country: "Argentina", marketing: 4.5293, utility: 1.9062, authentication: 1.9062, international: null },
  { country: "Brazil", marketing: 4.6308, utility: 0.5484, authentication: 0.5484, international: null },
  { country: "Chile", marketing: 6.5635, utility: 1.5154, authentication: 1.5154, international: null },
  { country: "Colombia", marketing: 0.9661, utility: 0.1088, authentication: 0.1088, international: null },
  { country: "Egypt", marketing: 7.9151, utility: 0.3139, authentication: 0.3139, international: 4.8168 },
  { country: "France", marketing: 10.5484, utility: 2.2494, authentication: 2.2494, international: null },
  { country: "Germany", marketing: 10.0573, utility: 4.0822, authentication: 4.0822, international: null },
  { country: "Indonesia", marketing: 3.0611, utility: 1.8816, authentication: 1.8816, international: 10.0138 },
  { country: "Israel", marketing: 2.6371, utility: 0.4385, authentication: 0.4385, international: null },
  { country: "Italy", marketing: 5.1114, utility: 2.2474, authentication: 2.2474, international: null },
  { country: "Malaysia", marketing: 6.3537, utility: 1.0762, authentication: 1.0762, international: 3.1139 },
  { country: "Mexico", marketing: 2.2857, utility: 0.6726, authentication: 0.6726, international: null },
  { country: "Netherlands", marketing: 11.7578, utility: 3.7156, authentication: 3.7156, international: null },
  { country: "Nigeria", marketing: 3.8351, utility: 0.5415, authentication: 0.5415, international: 5.5535 },
  { country: "Pakistan", marketing: 3.5183, utility: 0.446, authentication: 0.446, international: 5.5535 },
  { country: "Peru", marketing: 5.2036, utility: 1.5162, authentication: 1.5162, international: null },
  { country: "Russia", marketing: 5.9267, utility: 2.9811, authentication: 2.9811, international: null },
  { country: "Saudi Arabia", marketing: 3.3792, utility: 0.8334, authentication: 0.8334, international: 4.4371 },
  { country: "South Africa", marketing: 2.8321, utility: 0.6079, authentication: 0.6079, international: 1.5181 },
  { country: "Spain", marketing: 4.5544, utility: 1.5148, authentication: 1.5148, international: null },
  { country: "Turkey", marketing: 0.8489, utility: 0.4384, authentication: 0.4384, international: null },
  {
    country: "United Arab Emirates",
    marketing: 3.7113,
    utility: 1.2009,
    authentication: 1.2009,
    international: 3.7842,
  },
  { country: "United Kingdom", marketing: 3.9247, utility: 1.6622, authentication: 1.6622, international: null },
  { country: "United States", marketing: 1.8813, utility: 0.343, authentication: 0.343, international: null },
]

const platformPlans = [
  { name: "Starter", icon: Zap, monthlyFee: 999, yearlyFee: 9590, color: "from-blue-500 to-cyan-500" },
  { name: "Professional", icon: Building2, monthlyFee: 1999, yearlyFee: 19190, color: "from-green-500 to-emerald-500" },
  { name: "Enterprise", icon: Rocket, monthlyFee: 2999, yearlyFee: 28790, color: "from-purple-500 to-pink-500" },
]

const getSmartMargin = (volume: number): number => {
  if (volume <= 20000) return 0.04 // 4 paise
  if (volume <= 1000000) return 0.03 // 3 paise
  if (volume <= 5000000) return 0.02 // 2 paise
  return 0.01 // 1 paise for over 5 million
}

const presetVolumes = [
  { label: "1K", value: 1000 },
  { label: "10K", value: 10000 },
  { label: "50K", value: 50000 },
  { label: "100K", value: 100000 },
]

export default function CalculatorClientPage() {
  const [messageVolume, setMessageVolume] = useState(10000)
  const [customVolume, setCustomVolume] = useState("")
  const [selectedCountry, setSelectedCountry] = useState("India")
  const [selectedPlan, setSelectedPlan] = useState("Professional")
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly")
  const [categoryDistribution, setCategoryDistribution] = useState({
    marketing: 40,
    utility: 50,
    authentication: 10,
  })

  const calculatedCosts = useMemo(() => {
    const countryData = countryPricing.find((c) => c.country === selectedCountry)
    if (!countryData) return { messageCost: 0, platformFee: 0, totalCost: 0, savingsInfo: "" }

    const margin = getSmartMargin(messageVolume)

    let messageCost = 0

    Object.entries(categoryDistribution).forEach(([category, percentage]) => {
      const messages = (messageVolume * percentage) / 100
      const baseRate = countryData[category as keyof typeof countryData] as number
      if (baseRate) {
        const rateWithMargin = baseRate + margin
        messageCost += messages * rateWithMargin
      }
    })

    const plan = platformPlans.find((p) => p.name === selectedPlan)
    const platformFee = plan ? (billingCycle === "monthly" ? plan.monthlyFee : plan.yearlyFee) : 0

    let savingsInfo = ""
    if (messageVolume > 20000 && messageVolume <= 1000000) {
      savingsInfo = "Volume pricing active - Better rates applied!"
    } else if (messageVolume > 1000000 && messageVolume <= 5000000) {
      savingsInfo = "Premium volume pricing - Excellent savings!"
    } else if (messageVolume > 5000000) {
      savingsInfo = "Best volume pricing - Maximum savings unlocked!"
    }

    return {
      messageCost,
      platformFee,
      totalCost: messageCost + platformFee,
      savingsInfo,
    }
  }, [messageVolume, selectedCountry, selectedPlan, billingCycle, categoryDistribution])

  const handleCustomVolumeChange = (value: string) => {
    setCustomVolume(value)
    const numValue = Number.parseInt(value.replace(/,/g, ""))
    if (!isNaN(numValue) && numValue >= 1000 && numValue <= 10000000) {
      setMessageVolume(numValue)
    }
  }

  const handlePresetVolume = (value: number) => {
    setMessageVolume(value)
    setCustomVolume("")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-green-50/30 to-white">
      <section className="relative py-10 border-b bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/pricing">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Pricing
              </Link>
            </Button>
          </div>
          <div className="max-w-3xl">
            <Badge className="bg-green-100 text-green-700 hover:bg-green-200 border-green-200 mb-4">
              Smart Volume Pricing
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Pricing Calculator</h1>
            <p className="text-lg text-muted-foreground">
              Get instant cost estimates with our smart volume-based pricing. Higher volumes automatically get better
              rates.
            </p>
          </div>
        </div>
      </section>

      <section className="py-10 md:py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-[1fr_420px] gap-6 max-w-7xl mx-auto">
            <div className="space-y-5">
              <Card className="border-2 border-green-100 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-green-600" />
                    Message Volume
                  </CardTitle>
                  <CardDescription>Select a preset or enter a custom monthly message volume</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <Label className="text-sm font-medium">Quick Select</Label>
                    <div className="grid grid-cols-4 gap-3">
                      {presetVolumes.map((preset) => (
                        <button
                          key={preset.value}
                          onClick={() => handlePresetVolume(preset.value)}
                          className={cn(
                            "p-4 rounded-lg border-2 font-semibold text-lg transition-all duration-200 hover:scale-105",
                            messageVolume === preset.value
                              ? "border-green-600 bg-green-600 text-white shadow-lg"
                              : "border-gray-300 hover:border-green-400 hover:bg-green-50",
                          )}
                        >
                          {preset.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-sm font-medium">Custom Volume</Label>
                    <div className="relative">
                      <Input
                        type="text"
                        placeholder="Enter custom volume (e.g., 25000)"
                        value={customVolume}
                        onChange={(e) => handleCustomVolumeChange(e.target.value)}
                        className="h-12 text-lg border-2 border-gray-300 focus:border-green-500"
                      />
                      {customVolume && (
                        <button
                          onClick={() => {
                            setCustomVolume("")
                            setMessageVolume(10000)
                          }}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          ×
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label className="text-base font-medium">Current Selection</Label>
                      <Badge variant="secondary" className="text-xl font-bold px-4 py-2">
                        {messageVolume.toLocaleString()}
                      </Badge>
                    </div>
                    <Slider
                      value={[messageVolume]}
                      onValueChange={(value) => {
                        setMessageVolume(value[0])
                        setCustomVolume("")
                      }}
                      min={1000}
                      max={10000000}
                      step={1000}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>1K</span>
                      <span>2.5M</span>
                      <span>5M</span>
                      <span>10M</span>
                    </div>
                  </div>

                  {calculatedCosts.savingsInfo && (
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border-2 border-green-200 animate-in fade-in slide-in-from-top-2 duration-500">
                      <p className="text-sm font-semibold text-green-900 flex items-center gap-2">
                        <TrendingUp className="h-4 w-4" />
                        {calculatedCosts.savingsInfo}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="border-2 border-green-100 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5 text-green-600" />
                    Target Country
                  </CardTitle>
                  <CardDescription>Select your primary target market</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {countryPricing.map((country) => (
                      <button
                        key={country.country}
                        onClick={() => setSelectedCountry(country.country)}
                        className={cn(
                          "p-3 rounded-lg border-2 text-sm font-medium transition-all duration-200 hover:scale-105",
                          selectedCountry === country.country
                            ? "border-green-600 bg-green-50 text-green-700 shadow-md"
                            : "border-gray-200 hover:border-green-300 hover:bg-green-50/50",
                        )}
                      >
                        {country.country}
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-green-100 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Rocket className="h-5 w-5 text-green-600" />
                    Subscription Plan
                  </CardTitle>
                  <CardDescription>Choose your platform plan</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-center gap-4 p-3 bg-gray-50 rounded-lg">
                    <span className={cn("text-sm font-medium", billingCycle === "monthly" && "text-green-600")}>
                      Monthly
                    </span>
                    <button
                      onClick={() => setBillingCycle(billingCycle === "monthly" ? "yearly" : "monthly")}
                      className={cn(
                        "relative inline-flex h-7 w-12 items-center rounded-full transition-colors duration-300",
                        billingCycle === "yearly" ? "bg-green-600" : "bg-gray-300",
                      )}
                    >
                      <span
                        className={cn(
                          "inline-block h-5 w-5 transform rounded-full bg-white transition-transform duration-300",
                          billingCycle === "yearly" ? "translate-x-6" : "translate-x-1",
                        )}
                      />
                    </button>
                    <span className={cn("text-sm font-medium", billingCycle === "yearly" && "text-green-600")}>
                      Yearly
                      <Badge className="ml-2 bg-green-100 text-green-700 border-green-200 text-xs">Save 20%</Badge>
                    </span>
                  </div>

                  <div className="grid gap-3">
                    {platformPlans.map((plan) => (
                      <button
                        key={plan.name}
                        onClick={() => setSelectedPlan(plan.name)}
                        className={cn(
                          "p-4 rounded-lg border-2 text-left transition-all duration-200 hover:scale-[1.02]",
                          selectedPlan === plan.name
                            ? "border-green-600 bg-green-50 shadow-md"
                            : "border-gray-200 hover:border-green-300 hover:bg-green-50/50",
                        )}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <div className={cn("p-2 rounded-lg bg-gradient-to-br", plan.color)}>
                              <plan.icon className="h-5 w-5 text-white" />
                            </div>
                            <span className="font-semibold text-lg">{plan.name}</span>
                          </div>
                          <div className="text-right">
                            <div className="text-xl font-bold text-green-600">
                              ₹{billingCycle === "monthly" ? plan.monthlyFee : plan.yearlyFee}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              /{billingCycle === "monthly" ? "month" : "year"}
                            </div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-green-100 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                    Message Distribution
                  </CardTitle>
                  <CardDescription>Adjust the percentage of each message type</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label className="text-base">Marketing Messages</Label>
                      <Badge variant="secondary" className="text-base font-semibold">
                        {categoryDistribution.marketing}%
                      </Badge>
                    </div>
                    <Slider
                      value={[categoryDistribution.marketing]}
                      onValueChange={(value) => setCategoryDistribution((prev) => ({ ...prev, marketing: value[0] }))}
                      min={0}
                      max={100}
                      step={5}
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label className="text-base">Utility Messages</Label>
                      <Badge variant="secondary" className="text-base font-semibold">
                        {categoryDistribution.utility}%
                      </Badge>
                    </div>
                    <Slider
                      value={[categoryDistribution.utility]}
                      onValueChange={(value) => setCategoryDistribution((prev) => ({ ...prev, utility: value[0] }))}
                      min={0}
                      max={100}
                      step={5}
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label className="text-base">Authentication Messages</Label>
                      <Badge variant="secondary" className="text-base font-semibold">
                        {categoryDistribution.authentication}%
                      </Badge>
                    </div>
                    <Slider
                      value={[categoryDistribution.authentication]}
                      onValueChange={(value) =>
                        setCategoryDistribution((prev) => ({ ...prev, authentication: value[0] }))
                      }
                      min={0}
                      max={100}
                      step={5}
                      className="w-full"
                    />
                  </div>

                  <div className="text-xs text-muted-foreground bg-blue-50 p-3 rounded-lg border border-blue-200">
                    <p className="font-medium text-blue-900 mb-1">Distribution Total</p>
                    <p className="text-blue-700">
                      Current:{" "}
                      {categoryDistribution.marketing +
                        categoryDistribution.utility +
                        categoryDistribution.authentication}
                      %
                      {categoryDistribution.marketing +
                        categoryDistribution.utility +
                        categoryDistribution.authentication !==
                        100 && " (Adjust to 100% for accurate estimates)"}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-blue-200 bg-blue-50/50 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-blue-900">
                    <AlertCircle className="h-5 w-5 text-blue-600" />
                    RCS Messaging
                  </CardTitle>
                  <CardDescription className="text-blue-700">
                    Rich Communication Services pricing information
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 p-4 bg-white rounded-lg border border-blue-200">
                      <Info className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                      <div className="space-y-2">
                        <p className="text-sm font-semibold text-blue-900">RCS messaging is available for India only</p>
                        <p className="text-sm text-blue-700">
                          Fixed rate: <span className="font-bold">₹0.17 per message</span>
                        </p>
                        <p className="text-xs text-blue-600">
                          RCS (Rich Communication Services) enables enhanced messaging with rich media, interactive
                          buttons, and branded experiences.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="lg:sticky lg:top-24 h-fit">
              <Card className="border-2 border-green-500 shadow-2xl">
                <CardHeader className="bg-gradient-to-br from-green-600 to-emerald-600 text-white">
                  <CardTitle className="text-2xl">Cost Summary</CardTitle>
                  <CardDescription className="text-green-50">Your estimated {billingCycle} costs</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 pt-6">
                  {calculatedCosts.savingsInfo && (
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border-2 border-green-200 animate-in fade-in slide-in-from-top-2 duration-500">
                      <p className="text-sm font-semibold text-green-900 flex items-center gap-2">
                        <TrendingUp className="h-4 w-4" />
                        {calculatedCosts.savingsInfo}
                      </p>
                    </div>
                  )}

                  <div className="space-y-4">
                    <div className="flex items-center justify-between py-3 border-b-2">
                      <div>
                        <span className="text-sm font-medium block">Platform Fee</span>
                        <span className="text-xs text-muted-foreground">{selectedPlan} Plan</span>
                      </div>
                      <span className="text-xl font-bold">₹{calculatedCosts.platformFee.toLocaleString()}</span>
                    </div>

                    <div className="flex items-center justify-between py-3 border-b-2">
                      <div>
                        <span className="text-sm font-medium block">Message Costs</span>
                        <span className="text-xs text-muted-foreground">
                          {messageVolume.toLocaleString()} messages in {selectedCountry}
                        </span>
                      </div>
                      <span className="text-xl font-bold">₹{calculatedCosts.messageCost.toFixed(2)}</span>
                    </div>

                    <div className="flex items-center justify-between py-6 bg-gradient-to-br from-green-50 to-emerald-50 -mx-6 px-6 rounded-lg border-2 border-green-200">
                      <div>
                        <span className="text-base font-bold block">Total Cost</span>
                        <span className="text-xs text-muted-foreground">
                          {billingCycle === "monthly" ? "Per Month" : "Per Year"}
                        </span>
                      </div>
                      <span className="text-4xl font-bold text-green-600">
                        ₹{calculatedCosts.totalCost.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3 pt-4">
                    <Button className="w-full bg-green-600 hover:bg-green-700 text-white h-12 text-base" asChild>
                      <Link href="/contact">Get Started Now</Link>
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full h-12 text-base bg-transparent"
                      onClick={() => window.print()}
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download Quote
                    </Button>
                  </div>

                  <div className="pt-4 space-y-2 text-xs text-muted-foreground bg-gray-50 p-4 rounded-lg">
                    <p className="font-medium text-gray-900 mb-2">Pricing Details:</p>
                    <p>• Based on Meta's official WhatsApp rates</p>
                    <p>• All prices in Indian Rupees (INR)</p>
                    <p>• Estimates may vary based on actual usage</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
