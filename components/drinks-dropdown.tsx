"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { ChevronDown, MinusCircle, PlusCircle } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { PRICING } from "@/constants/pricing"
import type { BuffetCounts } from "@/types"

interface DrinksDropdownProps {
  counts: BuffetCounts
  onUpdateCounts: React.Dispatch<React.SetStateAction<BuffetCounts>>
  formatCurrency: (amount: number) => string
}

export function DrinksDropdown({ counts, onUpdateCounts, formatCurrency }: DrinksDropdownProps) {
  const updateCount = (field: keyof BuffetCounts, increment: boolean) => {
    onUpdateCounts((prev) => ({
      ...prev,
      [field]: increment ? prev[field] + 1 : Math.max(0, prev[field] - 1),
    }))
  }

  return (
    <div className="flex items-center justify-between">
      <Label className="text-sm sm:text-base">Drinks</Label>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="h-9 sm:h-10">
            Select Drinks <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          {/* Soda */}
          <DropdownMenuItem className="flex items-center justify-between p-3" onSelect={(e) => e.preventDefault()}>
            <span className="text-sm">Soda ({formatCurrency(PRICING.SODA_PRICE)})</span>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  updateCount("sodaCount", false)
                }}
                disabled={counts.sodaCount === 0}
                className="h-7 w-7"
              >
                <MinusCircle className="h-3 w-3" />
              </Button>
              <span className="w-6 text-center text-sm">{counts.sodaCount}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  updateCount("sodaCount", true)
                }}
                className="h-7 w-7"
              >
                <PlusCircle className="h-3 w-3" />
              </Button>
            </div>
          </DropdownMenuItem>

          {/* Iced Tea */}
          <DropdownMenuItem className="flex items-center justify-between p-3" onSelect={(e) => e.preventDefault()}>
            <span className="text-sm">Iced Tea ({formatCurrency(PRICING.ICED_TEA_PRICE)})</span>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  updateCount("icedTeaCount", false)
                }}
                disabled={counts.icedTeaCount === 0}
                className="h-7 w-7"
              >
                <MinusCircle className="h-3 w-3" />
              </Button>
              <span className="w-6 text-center text-sm">{counts.icedTeaCount}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  updateCount("icedTeaCount", true)
                }}
                className="h-7 w-7"
              >
                <PlusCircle className="h-3 w-3" />
              </Button>
            </div>
          </DropdownMenuItem>

          {/* Beer Small */}
          <DropdownMenuItem className="flex items-center justify-between p-3" onSelect={(e) => e.preventDefault()}>
            <span className="text-sm">Beer (Small) ({formatCurrency(PRICING.BEER_SMALL_PRICE)})</span>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  updateCount("beerSmallCount", false)
                }}
                disabled={counts.beerSmallCount === 0}
                className="h-7 w-7"
              >
                <MinusCircle className="h-3 w-3" />
              </Button>
              <span className="w-6 text-center text-sm">{counts.beerSmallCount}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  updateCount("beerSmallCount", true)
                }}
                className="h-7 w-7"
              >
                <PlusCircle className="h-3 w-3" />
              </Button>
            </div>
          </DropdownMenuItem>

          {/* Beer Large */}
          <DropdownMenuItem className="flex items-center justify-between p-3" onSelect={(e) => e.preventDefault()}>
            <span className="text-sm">Beer (Large) ({formatCurrency(PRICING.BEER_LARGE_PRICE)})</span>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  updateCount("beerLargeCount", false)
                }}
                disabled={counts.beerLargeCount === 0}
                className="h-7 w-7"
              >
                <MinusCircle className="h-3 w-3" />
              </Button>
              <span className="w-6 text-center text-sm">{counts.beerLargeCount}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  updateCount("beerLargeCount", true)
                }}
                className="h-7 w-7"
              >
                <PlusCircle className="h-3 w-3" />
              </Button>
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
