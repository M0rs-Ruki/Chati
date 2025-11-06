"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { MessageSquare, Calculator, TrendingUp, Info } from "lucide-react"
import Link from "next/link"

const PRESET_VOLUMES = [
  { label: "1K", value: 1000 },
  { label: "10K", value: 10000 },
  { label: "50K", value: 50000 },
  { label: "100K", value: 100000 },
]

const RCS_COST_PER_MESSAGE = 0.17 // ₹0.17 per message

export default function RCSCalculatorClientPage() {
  const [messageVolume, setMessageVolume] = useState(10000)
  const [customVolume, setCustomVolume] = useState("")
  const [isAnimating, setIsAnimating] = useState(false)

  // Calculate total cost
  const totalCost = (messageVolume * RCS_COST_PER_MESSAGE).toFixed(2)
  const costPerThousand = (1000 * RCS_COST_PER_MESSAGE).toFixed(2)

  // Handle preset button click
  const handlePresetClick = (value: number) => {
    setMessageVolume(value)
    setCustomVolume("")
    triggerAnimation()
  }

  // Handle custom volume input
  const handleCustomVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/,/g, "")
    setCustomVolume(value)

    const numValue = Number.parseInt(value)
    if (!isNaN(numValue) && numValue > 0) {
      setMessageVolume(numValue)
      triggerAnimation()
    }
  }

  // Handle slider change
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(e.target.value)
    setMessageVolume(value)
    setCustomVolume("")
    triggerAnimation()
  }

  // Trigger animation
  const triggerAnimation = () => {
    setIsAnimating(true)
    setTimeout(() => setIsAnimating(false), 300)
  }

  // Format number with commas
  const formatNumber = (num: number) => {
    return num.toLocaleString("en-IN")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Header */}
      <div className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <Link href="/pricing" className="text-sm text-gray-600 hover:text-green-600 transition-colors">
            ← Back to Pricing
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 md:py-20">
        {/* Hero Section */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <MessageSquare className="h-4 w-4" />
            RCS Messaging Calculator
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance">
            Calculate Your <span className="text-green-600">RCS Messaging</span> Costs
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto text-balance">
            Get instant estimates for sending Rich Communication Services (RCS) messages in India. Simple, transparent
            pricing at ₹0.17 per message.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Calculator Section */}
          <Card className="p-6 md:p-8 shadow-xl border-2 hover:shadow-2xl transition-shadow">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-lg bg-green-100 flex items-center justify-center">
                <Calculator className="h-5 w-5 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold">Message Volume</h2>
            </div>

            {/* Preset Buttons */}
            <div className="mb-8">
              <label className="text-sm font-medium text-gray-700 mb-3 block">Quick Select</label>
              <div className="grid grid-cols-4 gap-2">
                {PRESET_VOLUMES.map((preset) => (
                  <Button
                    key={preset.value}
                    onClick={() => handlePresetClick(preset.value)}
                    variant={messageVolume === preset.value ? "default" : "outline"}
                    className={`h-12 font-semibold transition-all ${
                      messageVolume === preset.value
                        ? "bg-green-600 hover:bg-green-700 shadow-md scale-105"
                        : "hover:border-green-600 hover:text-green-600"
                    }`}
                  >
                    {preset.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Custom Volume Input */}
            <div className="mb-8">
              <label className="text-sm font-medium text-gray-700 mb-3 block">Custom Volume</label>
              <div className="relative">
                <Input
                  type="text"
                  value={customVolume}
                  onChange={handleCustomVolumeChange}
                  placeholder="Enter custom message volume"
                  className="h-12 text-lg pr-24"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">messages</span>
              </div>
            </div>

            {/* Slider */}
            <div className="mb-8">
              <label className="text-sm font-medium text-gray-700 mb-3 block">
                Adjust Volume: {formatNumber(messageVolume)} messages
              </label>
              <input
                type="range"
                min="1000"
                max="1000000"
                step="1000"
                value={messageVolume}
                onChange={handleSliderChange}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>1K</span>
                <span>250K</span>
                <span>500K</span>
                <span>750K</span>
                <span>1M</span>
              </div>
            </div>

            {/* Info Box */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3">
              <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-blue-900">
                <p className="font-medium mb-1">RCS Messaging - India Only</p>
                <p className="text-blue-700">
                  RCS costs are fixed at ₹0.17 per message and only applicable for messages sent within India.
                </p>
              </div>
            </div>
          </Card>

          {/* Cost Summary Section */}
          <div className="space-y-6">
            {/* Total Cost Card */}
            <Card
              className={`p-6 md:p-8 shadow-xl border-2 border-green-200 bg-gradient-to-br from-green-50 to-white transition-all ${
                isAnimating ? "scale-105" : ""
              }`}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-10 rounded-lg bg-green-600 flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold">Cost Estimate</h2>
              </div>

              <div className="space-y-6">
                {/* Message Volume */}
                <div className="flex justify-between items-center pb-4 border-b">
                  <span className="text-gray-600">Message Volume</span>
                  <span className="text-xl font-bold">{formatNumber(messageVolume)}</span>
                </div>

                {/* Rate per Message */}
                <div className="flex justify-between items-center pb-4 border-b">
                  <span className="text-gray-600">Rate per Message</span>
                  <span className="text-xl font-bold text-green-600">₹0.17</span>
                </div>

                {/* Cost per 1000 */}
                <div className="flex justify-between items-center pb-4 border-b">
                  <span className="text-gray-600">Cost per 1,000 Messages</span>
                  <span className="text-xl font-bold">₹{costPerThousand}</span>
                </div>

                {/* Total Cost */}
                <div className="bg-green-600 text-white rounded-xl p-6 mt-6">
                  <div className="text-sm font-medium mb-2 opacity-90">Total Estimated Cost</div>
                  <div className="text-4xl md:text-5xl font-bold">₹{totalCost}</div>
                  <div className="text-sm mt-2 opacity-90">for {formatNumber(messageVolume)} RCS messages</div>
                </div>
              </div>
            </Card>

            {/* Features Card */}
            <Card className="p-6 shadow-lg">
              <h3 className="font-bold text-lg mb-4">Why Choose RCS Messaging?</h3>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>Rich media support (images, videos, carousels)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>Interactive buttons and quick replies</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>Read receipts and typing indicators</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>Brand verification and trust</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>Higher engagement rates than SMS</span>
                </li>
              </ul>
            </Card>

            {/* CTA */}
            <div className="text-center">
              <Link href="/pricing">
                <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8">
                  View All Pricing Plans
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Additional Info Section */}
        <div className="mt-16 max-w-4xl mx-auto">
          <Card className="p-8 bg-gradient-to-br from-gray-50 to-white">
            <h3 className="text-2xl font-bold mb-4 text-center">Understanding RCS Pricing</h3>
            <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-600">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Fixed Rate</h4>
                <p>
                  RCS messaging has a simple, transparent pricing model at ₹0.17 per message, regardless of volume. No
                  hidden fees or complex calculations.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">India Only</h4>
                <p>
                  Currently, RCS messaging is only available for messages sent within India. International RCS support
                  coming soon.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">No Minimum Volume</h4>
                <p>
                  Start with as few or as many messages as you need. There's no minimum volume requirement for RCS
                  messaging.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Pay As You Go</h4>
                <p>
                  Only pay for the messages you send. No monthly commitments or unused message credits going to waste.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
