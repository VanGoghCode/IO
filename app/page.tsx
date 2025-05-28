"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Header } from "@/components/header"
import { BuffetTab } from "@/components/buffet-tab"
import { MenuTab } from "@/components/menu-tab"
import { CombinedTab } from "@/components/combined-tab"
import { ToGoTab } from "@/components/togo-tab"
import { useRestaurantState } from "@/hooks/use-restaurant-state"
import { formatCurrency } from "@/utils/pricing"
import {
  calculateMenuTotal,
  calculateBuffetTotal,
  calculateToGoTotal,
  calculateTaxAndTotal,
} from "@/utils/calculations"

export default function RestaurantBilling() {
  const state = useRestaurantState()

  const getSubtotal = () => {
    switch (state.activeTab) {
      case "buffet":
        return calculateBuffetTotal(state.buffetCounts, state.buffetBasePrice, state.kidBuffetPrice)
      case "menu":
        return calculateMenuTotal(state.menuOrders)
      case "combined":
        return (
          calculateBuffetTotal(state.combinedBuffetCounts, state.buffetBasePrice, state.kidBuffetPrice) +
          calculateMenuTotal(state.combinedMenuOrders)
        )
      case "togo":
        return calculateToGoTotal(state.toGoWeight, state.toGoMenuOrders)
      default:
        return 0
    }
  }

  const subtotal = getSubtotal()
  const { tax, grandTotal, cashTotal } = calculateTaxAndTotal(subtotal)

  return (
    <div className="container mx-auto py-4 sm:py-8 px-2 sm:px-4 max-w-4xl">
      <Header onReset={state.resetAllValues} />

      <Tabs value={state.activeTab} onValueChange={state.setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="buffet">Buffet</TabsTrigger>
          <TabsTrigger value="menu">Menu</TabsTrigger>
          <TabsTrigger value="combined">Combined</TabsTrigger>
          <TabsTrigger value="togo">To Go</TabsTrigger>
        </TabsList>

        <TabsContent value="buffet">
          <BuffetTab
            state={state}
            formatCurrency={formatCurrency}
            tax={tax}
            grandTotal={grandTotal}
            cashTotal={cashTotal}
          />
        </TabsContent>

        <TabsContent value="menu">
          <MenuTab
            state={state}
            formatCurrency={formatCurrency}
            tax={tax}
            grandTotal={grandTotal}
            cashTotal={cashTotal}
          />
        </TabsContent>

        <TabsContent value="combined">
          <CombinedTab
            state={state}
            formatCurrency={formatCurrency}
            tax={tax}
            grandTotal={grandTotal}
            cashTotal={cashTotal}
          />
        </TabsContent>

        <TabsContent value="togo">
          <ToGoTab
            state={state}
            formatCurrency={formatCurrency}
            tax={tax}
            grandTotal={grandTotal}
            cashTotal={cashTotal}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}
