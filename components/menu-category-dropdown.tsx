"use client"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { ChevronDown, MinusCircle, PlusCircle } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { MenuItem, MenuOrders, OrderType, SpiceLevel } from "@/types"

interface MenuCategoryDropdownProps {
  categoryKey: string
  categoryName: string
  items: MenuItem[]
  menuOrders: MenuOrders
  onAddItem: (category: string, itemName: string, spiceLevel?: SpiceLevel) => void
  onRemoveItem: (category: string, itemName: string) => void
  onUpdateSpiceLevel: (category: string, itemName: string, spiceLevel: SpiceLevel) => void
  formatCurrency: (amount: number) => string
  orderType?: OrderType
}

export function MenuCategoryDropdown({
  categoryKey,
  categoryName,
  items,
  menuOrders,
  onAddItem,
  onRemoveItem,
  onUpdateSpiceLevel,
  formatCurrency,
}: MenuCategoryDropdownProps) {
  // Calculate total items selected in this category
  const categoryItemCount = items.reduce((count, item) => {
    const key = `${categoryKey}|${item.name}`
    const order = menuOrders[key]
    return count + (order?.quantity || 0)
  }, 0)

  return (
    <div className="flex items-center justify-between">
      <Label className="text-sm sm:text-base">{categoryName}</Label>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="h-9 sm:h-10">
            {categoryItemCount > 0 && (
              <span className="mr-2 bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
                {categoryItemCount}
              </span>
            )}
            Select Items <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-80 max-h-96 overflow-y-auto">
          {items.map((item) => {
            const key = `${categoryKey}|${item.name}`
            const order = menuOrders[key]
            const quantity = order?.quantity || 0

            return (
              <DropdownMenuItem
                key={item.name}
                className="flex flex-col items-start p-3 space-y-2"
                onSelect={(e) => e.preventDefault()}
              >
                <div className="flex items-center justify-between w-full">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{item.name}</span>
                    <span className="text-xs text-gray-500">{formatCurrency(item.price)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        onRemoveItem(categoryKey, item.name)
                      }}
                      disabled={quantity === 0}
                      className="h-7 w-7"
                    >
                      <MinusCircle className="h-3 w-3" />
                    </Button>
                    <span className="w-6 text-center text-sm">{quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        onAddItem(categoryKey, item.name)
                      }}
                      className="h-7 w-7"
                    >
                      <PlusCircle className="h-3 w-3" />
                    </Button>
                  </div>
                </div>

                {/* Spice level selection - only show if item has spice and quantity > 0 */}
                {item.hasSpice && quantity > 0 && (
                  <div className="flex items-center gap-2 w-full">
                    <span className="text-xs">Spice Level:</span>
                    {(["Mild", "Medium", "Hot"] as SpiceLevel[]).map((level) => (
                      <Button
                        key={level}
                        variant={order?.spiceLevel === level ? "default" : "outline"}
                        size="sm"
                        className="h-6 px-2 text-xs"
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          onUpdateSpiceLevel(categoryKey, item.name, level)
                        }}
                      >
                        {level}
                      </Button>
                    ))}
                  </div>
                )}
              </DropdownMenuItem>
            )
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
