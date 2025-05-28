"use client"

import { MenuCategoryDropdown } from "./menu-category-dropdown"
import { CATEGORY_NAMES } from "@/constants/menu-data"
import type { MenuData, MenuOrders, OrderType, SpiceLevel } from "@/types"

interface MenuCategoryListProps {
  menuData: MenuData
  menuOrders: MenuOrders
  onAddItem: (category: string, itemName: string, spiceLevel?: SpiceLevel) => void
  onRemoveItem: (category: string, itemName: string) => void
  onUpdateSpiceLevel: (category: string, itemName: string, spiceLevel: SpiceLevel) => void
  formatCurrency: (amount: number) => string
  orderType?: OrderType
}

export function MenuCategoryList({
  menuData,
  menuOrders,
  onAddItem,
  onRemoveItem,
  onUpdateSpiceLevel,
  formatCurrency,
  orderType = "menu",
}: MenuCategoryListProps) {
  return (
    <div className="space-y-4">
      {Object.entries(menuData).map(([categoryKey, items]) => (
        <MenuCategoryDropdown
          key={categoryKey}
          categoryKey={categoryKey}
          categoryName={CATEGORY_NAMES[categoryKey] || categoryKey}
          items={items}
          menuOrders={menuOrders}
          onAddItem={onAddItem}
          onRemoveItem={onRemoveItem}
          onUpdateSpiceLevel={onUpdateSpiceLevel}
          formatCurrency={formatCurrency}
          orderType={orderType}
        />
      ))}
    </div>
  )
}
