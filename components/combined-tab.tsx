"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TimeDisplay } from "@/components/time-display"
import { SearchBar } from "@/components/search-bar"
import { QuantityCounter } from "@/components/quantity-counter"
import { DrinksDropdown } from "@/components/drinks-dropdown"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"
import { MenuCategoryList } from "@/components/menu-category-list"
import { SearchResults } from "@/components/search-results"
import { BillSummary } from "@/components/bill-summary"
import { useMenuHandlers } from "@/hooks/use-menu-handlers"
import { MENU_DATA } from "@/constants/menu-data"
import { PRICING } from "@/constants/pricing"
import type { useRestaurantState } from "@/hooks/use-restaurant-state"

interface CombinedTabProps {
  state: ReturnType<typeof useRestaurantState>
  formatCurrency: (amount: number) => string
  tax: number
  grandTotal: number
  cashTotal: number
}

export function CombinedTab({ state, formatCurrency, tax, grandTotal, cashTotal }: CombinedTabProps) {
  const { addMenuItem, removeMenuItem, updateSpiceLevel } = useMenuHandlers(
    state.combinedMenuOrders,
    state.setCombinedMenuOrders,
  )

  // Buffet increment/decrement handlers
  const incrementCombinedBuffet = () =>
    state.setCombinedBuffetCounts((prev) => ({ ...prev, buffetCount: prev.buffetCount + 1 }))
  const decrementCombinedBuffet = () =>
    state.setCombinedBuffetCounts((prev) => ({ ...prev, buffetCount: Math.max(0, prev.buffetCount - 1) }))
  const incrementCombinedKid = () => state.setCombinedBuffetCounts((prev) => ({ ...prev, kidCount: prev.kidCount + 1 }))
  const decrementCombinedKid = () =>
    state.setCombinedBuffetCounts((prev) => ({ ...prev, kidCount: Math.max(0, prev.kidCount - 1) }))

  // Calculate bill items
  const billItems = []

  // Buffet items
  if (state.combinedBuffetCounts.buffetCount > 0) {
    billItems.push({
      label: `${state.combinedBuffetCounts.buffetCount} adult buffet${state.combinedBuffetCounts.buffetCount > 1 ? "s" : ""}`,
      amount: state.combinedBuffetCounts.buffetCount * state.buffetBasePrice,
    })
  }

  if (state.combinedBuffetCounts.kidCount > 0) {
    billItems.push({
      label: `${state.combinedBuffetCounts.kidCount} kid buffet${state.combinedBuffetCounts.kidCount > 1 ? "s" : ""}`,
      amount: state.combinedBuffetCounts.kidCount * state.kidBuffetPrice,
    })
  }

  if (state.combinedBuffetCounts.sodaCount > 0) {
    billItems.push({
      label: `${state.combinedBuffetCounts.sodaCount} soda${state.combinedBuffetCounts.sodaCount > 1 ? "s" : ""}`,
      amount: state.combinedBuffetCounts.sodaCount * PRICING.SODA_PRICE,
    })
  }

  if (state.combinedBuffetCounts.icedTeaCount > 0) {
    billItems.push({
      label: `${state.combinedBuffetCounts.icedTeaCount} iced tea${state.combinedBuffetCounts.icedTeaCount > 1 ? "s" : ""}`,
      amount: state.combinedBuffetCounts.icedTeaCount * PRICING.ICED_TEA_PRICE,
    })
  }

  if (state.combinedBuffetCounts.beerSmallCount > 0) {
    billItems.push({
      label: `${state.combinedBuffetCounts.beerSmallCount} beer${state.combinedBuffetCounts.beerSmallCount > 1 ? "s" : ""} (small)`,
      amount: state.combinedBuffetCounts.beerSmallCount * PRICING.BEER_SMALL_PRICE,
    })
  }

  if (state.combinedBuffetCounts.beerLargeCount > 0) {
    billItems.push({
      label: `${state.combinedBuffetCounts.beerLargeCount} beer${state.combinedBuffetCounts.beerLargeCount > 1 ? "s" : ""} (large)`,
      amount: state.combinedBuffetCounts.beerLargeCount * PRICING.BEER_LARGE_PRICE,
    })
  }

  // Menu items
  Object.entries(state.combinedMenuOrders).forEach(([itemKey, order]) => {
    const [category, itemName] = itemKey.split("|")
    const categoryData = MENU_DATA[category as keyof typeof MENU_DATA]
    const item = categoryData?.find((item) => item.name === itemName)

    if (item && order.quantity > 0) {
      billItems.push({
        label: `${order.quantity} ${item.name}${order.spiceLevel ? ` (${order.spiceLevel})` : ""}`,
        amount: item.price * order.quantity,
      })
    }
  })

  return (
    <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
      {/* Combined Input Section */}
      <Card>
        <CardHeader className="pb-2 sm:pb-4">
          <CardTitle>Combined Order</CardTitle>
          <CardDescription>Mix buffet and menu items in one order</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 sm:space-y-6">
          <TimeDisplay
            currentTime={state.currentTime}
            suggestedPrice={state.suggestedPrice}
            suggestedKidPrice={state.suggestedKidPrice}
            formatCurrency={formatCurrency}
          />

          <SearchBar
            id="combined-search"
            label="Search Menu Items"
            placeholder="Search for dishes... (e.g., chicken tikka, biryani)"
            value={state.combinedSearchQuery}
            onChange={(e) => state.setCombinedSearchQuery(e.target.value)}
            onClear={() => state.setCombinedSearchQuery("")}
          />

          {/* Search Results for Combined Tab */}
          {state.combinedSearchQuery.trim() && (
            <SearchResults
              searchQuery={state.combinedSearchQuery}
              menuData={MENU_DATA}
              menuOrders={state.combinedMenuOrders}
              onAddItem={addMenuItem}
              onRemoveItem={removeMenuItem}
              onUpdateSpiceLevel={updateSpiceLevel}
              formatCurrency={formatCurrency}
            />
          )}

          {/* Buffet Section - Only show when not searching */}
          {!state.combinedSearchQuery.trim() && (
            <div className="space-y-4">
              <Label className="text-base font-medium text-blue-600">Buffet Items</Label>

              <QuantityCounter
                label={`Adult Buffet (${formatCurrency(state.buffetBasePrice)})`}
                count={state.combinedBuffetCounts.buffetCount}
                onIncrement={incrementCombinedBuffet}
                onDecrement={decrementCombinedBuffet}
              />

              <QuantityCounter
                label={`Kid Buffet (${formatCurrency(state.kidBuffetPrice)})`}
                count={state.combinedBuffetCounts.kidCount}
                onIncrement={incrementCombinedKid}
                onDecrement={decrementCombinedKid}
              />

              <DrinksDropdown
                counts={state.combinedBuffetCounts}
                onUpdateCounts={state.setCombinedBuffetCounts}
                formatCurrency={formatCurrency}
              />
            </div>
          )}

          {!state.combinedSearchQuery.trim() && <Separator />}

          {/* Menu Section - Only show when not searching */}
          {!state.combinedSearchQuery.trim() && (
            <div className="space-y-4">
              <Label className="text-base font-medium text-green-600">Menu Items</Label>
              <MenuCategoryList
                menuData={MENU_DATA}
                menuOrders={state.combinedMenuOrders}
                onAddItem={addMenuItem}
                onRemoveItem={removeMenuItem}
                onUpdateSpiceLevel={updateSpiceLevel}
                formatCurrency={formatCurrency}
                orderType="combined"
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Combined Bill Calculation Section */}
      <Card>
        <CardHeader className="pb-2 sm:pb-4">
          <CardTitle>Combined Order Summary</CardTitle>
          <CardDescription>Buffet and menu items combined</CardDescription>
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
