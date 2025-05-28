"use client"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { MinusCircle, PlusCircle } from "lucide-react"
import { searchMenuItems } from "@/utils/search"
import type { MenuData, MenuOrders, SpiceLevel } from "@/types"

interface SearchResultsProps {
  searchQuery: string
  menuData: MenuData
  menuOrders: MenuOrders
  onAddItem: (category: string, itemName: string, spiceLevel?: SpiceLevel) => void
  onRemoveItem: (category: string, itemName: string) => void
  onUpdateSpiceLevel: (category: string, itemName: string, spiceLevel: SpiceLevel) => void
  formatCurrency: (amount: number) => string
}

export function SearchResults({
  searchQuery,
  menuData,
  menuOrders,
  onAddItem,
  onRemoveItem,
  onUpdateSpiceLevel,
  formatCurrency,
}: SearchResultsProps) {
  const searchResults = searchMenuItems(searchQuery, menuData)

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Label className="text-sm sm:text-base font-medium">Search Results</Label>
        <span className="text-xs text-gray-500">{searchResults.length} items found</span>
      </div>

      {searchResults.length > 0 ? (
        <div className="border rounded-md p-3 max-h-80 overflow-y-auto space-y-2">
          {searchResults.map(({ item, category, categoryName }) => {
            const key = `${category}|${item.name}`
            const order = menuOrders[key]
            const quantity = order?.quantity || 0

            return (
              <div key={key} className="flex flex-col space-y-2 p-2 border rounded bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{item.name}</span>
                    <span className="text-xs text-gray-500">
                      {formatCurrency(item.price)} • {categoryName}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => onRemoveItem(category, item.name)}
                      disabled={quantity === 0}
                      className="h-7 w-7"
                    >
                      <MinusCircle className="h-3 w-3" />
                    </Button>
                    <span className="w-6 text-center text-sm">{quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => onAddItem(category, item.name)}
                      className="h-7 w-7"
                    >
                      <PlusCircle className="h-3 w-3" />
                    </Button>
                  </div>
                </div>

                {/* Spice level selection for search results */}
                {item.hasSpice && quantity > 0 && (
                  <div className="flex items-center gap-2">
                    <span className="text-xs">Spice Level:</span>
                    {(["Mild", "Medium", "Hot"] as SpiceLevel[]).map((level) => (
                      <Button
                        key={level}
                        variant={order?.spiceLevel === level ? "default" : "outline"}
                        size="sm"
                        className="h-6 px-2 text-xs"
                        onClick={() => onUpdateSpiceLevel(category, item.name, level)}
                      >
                        {level}
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      ) : (
        <div className="text-center text-gray-500 py-4 border rounded-md">
          No items found for &ldquo;{searchQuery}&rdquo;. Try different spelling or keywords.
        </div>
      )}
    </div>
  )
}
