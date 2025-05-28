"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TimeDisplay } from "@/components/time-display"
import { BuffetPriceControls } from "@/components/buffet-price-controls"
import { QuantityCounter } from "@/components/quantity-counter"
import { DrinksDropdown } from "@/components/drinks-dropdown"
import { BillSummary } from "@/components/bill-summary"
import { PRICING } from "@/constants/pricing"
import type { useRestaurantState } from "@/hooks/use-restaurant-state"

interface BuffetTabProps {
  state: ReturnType<typeof useRestaurantState>
  formatCurrency: (amount: number) => string
  tax: number
  grandTotal: number
  cashTotal: number
}

export function BuffetTab({ state, formatCurrency, tax, grandTotal, cashTotal }: BuffetTabProps) {
  const isValidServiceTime = state.suggestedPrice > 0

  // Increment and decrement handlers
  const incrementBuffet = () => state.setBuffetCounts((prev) => ({ ...prev, buffetCount: prev.buffetCount + 1 }))
  const decrementBuffet = () =>
    state.setBuffetCounts((prev) => ({ ...prev, buffetCount: Math.max(0, prev.buffetCount - 1) }))
  const incrementKid = () => state.setBuffetCounts((prev) => ({ ...prev, kidCount: prev.kidCount + 1 }))
  const decrementKid = () => state.setBuffetCounts((prev) => ({ ...prev, kidCount: Math.max(0, prev.kidCount - 1) }))

  // Calculate bill items
  const billItems = []

  if (state.buffetCounts.buffetCount > 0) {
    billItems.push({
      label: `${state.buffetCounts.buffetCount} adult buffet${state.buffetCounts.buffetCount > 1 ? "s" : ""}`,
      amount: state.buffetCounts.buffetCount * state.buffetBasePrice,
    })
  }

  if (state.buffetCounts.kidCount > 0) {
    billItems.push({
      label: `${state.buffetCounts.kidCount} kid buffet${state.buffetCounts.kidCount > 1 ? "s" : ""}`,
      amount: state.buffetCounts.kidCount * state.kidBuffetPrice,
    })
  }

  if (state.buffetCounts.sodaCount > 0) {
    billItems.push({
      label: `${state.buffetCounts.sodaCount} soda${state.buffetCounts.sodaCount > 1 ? "s" : ""}`,
      amount: state.buffetCounts.sodaCount * PRICING.SODA_PRICE,
    })
  }

  if (state.buffetCounts.icedTeaCount > 0) {
    billItems.push({
      label: `${state.buffetCounts.icedTeaCount} iced tea${state.buffetCounts.icedTeaCount > 1 ? "s" : ""}`,
      amount: state.buffetCounts.icedTeaCount * PRICING.ICED_TEA_PRICE,
    })
  }

  if (state.buffetCounts.beerSmallCount > 0) {
    billItems.push({
      label: `${state.buffetCounts.beerSmallCount} beer${state.buffetCounts.beerSmallCount > 1 ? "s" : ""} (small)`,
      amount: state.buffetCounts.beerSmallCount * PRICING.BEER_SMALL_PRICE,
    })
  }

  if (state.buffetCounts.beerLargeCount > 0) {
    billItems.push({
      label: `${state.buffetCounts.beerLargeCount} beer${state.buffetCounts.beerLargeCount > 1 ? "s" : ""} (large)`,
      amount: state.buffetCounts.beerLargeCount * PRICING.BEER_LARGE_PRICE,
    })
  }

  return (
    <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
      {/* Buffet Input Section */}
      <Card>
        <CardHeader className="pb-2 sm:pb-4">
          <CardTitle>Buffet Section</CardTitle>
          <CardDescription>Enter quantities and view current pricing</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 sm:space-y-6">
          <TimeDisplay
            currentTime={state.currentTime}
            suggestedPrice={state.suggestedPrice}
            suggestedKidPrice={state.suggestedKidPrice}
            formatCurrency={formatCurrency}
          />

          <BuffetPriceControls
            buffetBasePrice={state.buffetBasePrice}
            kidBuffetPrice={state.kidBuffetPrice}
            manualPriceOverride={state.manualPriceOverride}
            isValidServiceTime={isValidServiceTime}
            onBuffetPriceChange={(value) => state.setBuffetBasePrice(value)}
            onKidPriceChange={(value) => state.setKidBuffetPrice(value)}
            onManualOverrideChange={(checked) => {
              state.setManualPriceOverride(checked)
              if (!checked && state.suggestedPrice > 0) {
                state.setBuffetBasePrice(state.suggestedPrice)
                state.setKidBuffetPrice(state.suggestedKidPrice)
              }
            }}
          />

          <div className="space-y-4">
            <QuantityCounter
              label="Buffet"
              count={state.buffetCounts.buffetCount}
              onIncrement={incrementBuffet}
              onDecrement={decrementBuffet}
            />

            <QuantityCounter
              label={`Kid Buffet (${formatCurrency(state.kidBuffetPrice)})`}
              count={state.buffetCounts.kidCount}
              onIncrement={incrementKid}
              onDecrement={decrementKid}
            />

            <DrinksDropdown
              counts={state.buffetCounts}
              onUpdateCounts={state.setBuffetCounts}
              formatCurrency={formatCurrency}
            />
          </div>
        </CardContent>
      </Card>

      {/* Bill Calculation Section */}
      <Card>
        <CardHeader className="pb-2 sm:pb-4">
          <CardTitle>Bill Calculation</CardTitle>
          <CardDescription>Itemized charges and total</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 sm:space-y-6">
          <BillSummary
            items={billItems}
            tax={tax}
            grandTotal={grandTotal}
            cashTotal={cashTotal}
            formatCurrency={formatCurrency}
            isCalculatorOpen={state.isCalculatorOpen}
            onCalculatorOpenChange={state.setIsCalculatorOpen}
            amountReceived={state.amountReceived}
            onAmountReceivedChange={(e) => state.setAmountReceived(e.target.value)}
            onCalculatorReset={() => state.setAmountReceived("")}
          />
        </CardContent>
      </Card>
    </div>
  )
}
