"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { MenuCategoryList } from "@/components/menu-category-list"
import { BillSummary } from "@/components/bill-summary"
import { useMenuHandlers } from "@/hooks/use-menu-handlers"
import { MENU_DATA } from "@/constants/menu-data"
import { PRICING } from "@/constants/pricing"
import type { useRestaurantState } from "@/hooks/use-restaurant-state"

interface ToGoTabProps {
  state: ReturnType<typeof useRestaurantState>
  formatCurrency: (amount: number) => string
  tax: number
  grandTotal: number
  cashTotal: number
}

export function ToGoTab({ state, formatCurrency, tax, grandTotal, cashTotal }: ToGoTabProps) {
  const { addMenuItem, removeMenuItem, updateSpiceLevel } = useMenuHandlers(
    state.toGoMenuOrders,
    state.setToGoMenuOrders,
  )

  const toGoWeightTotal = (Number.parseFloat(state.toGoWeight) || 0) * PRICING.TO_GO_PRICE_PER_LB

  // Calculate bill items
  const billItems = []

  // Weight-based food
  if (Number.parseFloat(state.toGoWeight) > 0) {
    billItems.push({
      label: `${state.toGoWeight} lbs to-go food @ ${formatCurrency(PRICING.TO_GO_PRICE_PER_LB)}/lb`,
      amount: toGoWeightTotal,
    })
  }

  // Additional Items
  Object.entries(state.toGoMenuOrders).forEach(([itemKey, order]) => {
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

  // Filter menu data for to-go specific categories
  const toGoMenuData = {
    tandooriBreads: MENU_DATA.tandooriBreads,
    beverages: MENU_DATA.beverages,
    desserts: MENU_DATA.desserts,
  }

  return (
    <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
      {/* To-Go Input Section */}
      <Card>
        <CardHeader className="pb-2 sm:pb-4">
          <CardTitle>To-Go Order</CardTitle>
          <CardDescription>Weight-based pricing and additional items</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 sm:space-y-6">
          {/* Weight Input Section */}
          <div className="space-y-4">
            <Label className="text-base font-medium text-orange-600">To-Go Food by Weight</Label>
            <div className="space-y-2">
              <Label htmlFor="togo-weight" className="text-sm sm:text-base">
                Weight (lbs) - {formatCurrency(PRICING.TO_GO_PRICE_PER_LB)} per lb
              </Label>
              <div className="flex items-center">
                <Input
                  id="togo-weight"
                  type="number"
                  step="0.1"
                  min="0"
                  value={state.toGoWeight}
                  onChange={(e) => state.setToGoWeight(e.target.value)}
                  placeholder="0.0"
                  className="h-10 sm:h-11 text-base"
                />
                <span className="ml-2 text-sm sm:text-base">lbs</span>
              </div>
              {Number.parseFloat(state.toGoWeight) > 0 && (
                <div className="text-sm text-green-600">Weight Total: {formatCurrency(toGoWeightTotal)}</div>
              )}
            </div>
          </div>

          <Separator />

          {/* Additional Items Section */}
          <div className="space-y-4">
            <Label className="text-base font-medium text-purple-600">Additional Items</Label>
            <MenuCategoryList
              menuData={toGoMenuData}
              menuOrders={state.toGoMenuOrders}
              onAddItem={addMenuItem}
              onRemoveItem={removeMenuItem}
              onUpdateSpiceLevel={updateSpiceLevel}
              formatCurrency={formatCurrency}
              orderType="togo"
            />
          </div>
        </CardContent>
      </Card>

      {/* To-Go Bill Calculation Section */}
      <Card>
        <CardHeader className="pb-2 sm:pb-4">
          <CardTitle>To-Go Order Summary</CardTitle>
          <CardDescription>Weight-based food and additional items</CardDescription>
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
