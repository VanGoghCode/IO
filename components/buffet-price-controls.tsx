"use client"

import type React from "react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

interface BuffetPriceControlsProps {
  buffetBasePrice: number
  kidBuffetPrice: number
  manualPriceOverride: boolean
  isValidServiceTime: boolean
  onBuffetPriceChange: (value: number) => void
  onKidPriceChange: (value: number) => void
  onManualOverrideChange: (checked: boolean) => void
}

export function BuffetPriceControls({
  buffetBasePrice,
  kidBuffetPrice,
  manualPriceOverride,
  isValidServiceTime,
  onBuffetPriceChange,
  onKidPriceChange,
  onManualOverrideChange,
}: BuffetPriceControlsProps) {
  const handleBuffetPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseFloat(e.target.value) || 0
    onBuffetPriceChange(value)
  }

  const handleKidPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseFloat(e.target.value) || 0
    onKidPriceChange(value)
  }

  return (
    <>
      {/* Buffet Base Price - Only show when manual override is enabled or outside service hours */}
      {(manualPriceOverride || !isValidServiceTime) && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="buffet-price" className="text-sm sm:text-base">
              Buffet Base Price
            </Label>
            <div className="flex items-center space-x-2">
              <Label htmlFor="manual-override" className="text-xs">
                Manual
              </Label>
              <Switch
                id="manual-override"
                checked={manualPriceOverride || !isValidServiceTime}
                onCheckedChange={onManualOverrideChange}
                disabled={!isValidServiceTime}
              />
            </div>
          </div>
          <div className="flex items-center">
            <span className="mr-2 text-sm sm:text-base">$</span>
            <Input
              id="buffet-price"
              type="number"
              step="0.01"
              min="0"
              value={buffetBasePrice || ""}
              onChange={handleBuffetPriceChange}
              placeholder="0.00"
              className="h-10 sm:h-11 text-base"
            />
          </div>
        </div>
      )}

      {/* Manual Override Switch - Show when inputs are hidden */}
      {!manualPriceOverride && isValidServiceTime && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-sm sm:text-base">Automatic Pricing Active</Label>
            <div className="flex items-center space-x-2">
              <Label htmlFor="manual-override-standalone" className="text-xs">
                Manual
              </Label>
              <Switch
                id="manual-override-standalone"
                checked={manualPriceOverride}
                onCheckedChange={onManualOverrideChange}
              />
            </div>
          </div>
          <div className="text-xs text-slate-500">Prices are automatically set based on current time and day</div>
        </div>
      )}

      {/* Kid Buffet Price - Only show when manual override is enabled or outside service hours */}
      {(manualPriceOverride || !isValidServiceTime) && (
        <div className="space-y-2">
          <Label htmlFor="kid-buffet-price" className="text-sm sm:text-base">
            Kid Buffet Price
          </Label>
          <div className="flex items-center">
            <span className="mr-2 text-sm sm:text-base">$</span>
            <Input
              id="kid-buffet-price"
              type="number"
              step="0.01"
              min="0"
              value={kidBuffetPrice || ""}
              onChange={handleKidPriceChange}
              placeholder="0.00"
              className="h-10 sm:h-11 text-base"
            />
          </div>
        </div>
      )}
    </>
  )
}
