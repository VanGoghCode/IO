"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SearchBar } from "@/components/search-bar"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"
import { MenuCategoryList } from "@/components/menu-category-list"
import { SearchResults } from "@/components/search-results"
import { BillSummary } from "@/components/bill-summary"
import { useMenuHandlers } from "@/hooks/use-menu-handlers"
import { MENU_DATA } from "@/constants/menu-data"
import type { useRestaurantState } from "@/hooks/use-restaurant-state"

interface MenuTabProps {
  state: ReturnType<typeof useRestaurantState>
  formatCurrency: (amount: number) => string
  tax: number
  grandTotal: number
  cashTotal: number
}

export function MenuTab({ state, formatCurrency, tax, grandTotal, cashTotal }: MenuTabProps) {
  const { addMenuItem, removeMenuItem, updateSpiceLevel } = useMenuHandlers(state.menuOrders, state.setMenuOrders)

  // Calculate bill items
  const billItems = Object.entries(state.menuOrders)
    .map(([itemKey, order]) => {
      const [category, itemName] = itemKey.split("|")
      const categoryData = MENU_DATA[category as keyof typeof MENU_DATA]
      const item = categoryData?.find((item) => item.name === itemName)

      if (!item || order.quantity === 0) return null

      return {
        label: `${order.quantity} ${item.name}${order.spiceLevel ? ` (${order.spiceLevel})` : ""}`,
        amount: item.price * order.quantity,
      }
    })
    .filter(Boolean) as Array<{ label: string; amount: number }>

  return (
    <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
      {/* Menu Input Section */}
      <Card>
        <CardHeader className="pb-2 sm:pb-4">
          <CardTitle>Menu Selection</CardTitle>
          <CardDescription>Choose items from our menu</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <SearchBar
            id="search"
            label="Search Menu"
            placeholder="Search for dishes... (e.g., chicken tikka, biryani)"
            value={state.searchQuery}
            onChange={(e) => state.setSearchQuery(e.target.value)}
            onClear={() => state.setSearchQuery("")}
          />

          {/* Search Results */}
          {state.searchQuery.trim() && (
            <SearchResults
              searchQuery={state.searchQuery}
              menuData={MENU_DATA}
              menuOrders={state.menuOrders}
              onAddItem={addMenuItem}
              onRemoveItem={removeMenuItem}
              onUpdateSpiceLevel={updateSpiceLevel}
              formatCurrency={formatCurrency}
            />
          )}

          {/* Category Dropdowns - Only show when not searching */}
          {!state.searchQuery.trim() && (
            <div className="space-y-4">
              <Separator />
              <Label className="text-sm sm:text-base font-medium">Browse by Category</Label>
              <MenuCategoryList
                menuData={MENU_DATA}
                menuOrders={state.menuOrders}
                onAddItem={addMenuItem}
                onRemoveItem={removeMenuItem}
                onUpdateSpiceLevel={updateSpiceLevel}
                formatCurrency={formatCurrency}
                orderType="menu"
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Menu Bill Calculation Section */}
      <Card>
        <CardHeader className="pb-2 sm:pb-4">
          <CardTitle>Order Summary</CardTitle>
          <CardDescription>Your selected items and total</CardDescription>
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
