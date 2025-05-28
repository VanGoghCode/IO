"use client"

import type React from "react"

import { Separator } from "@/components/ui/separator"
import { CashCalculator } from "./cash-calculator"

interface BillItem {
  label: string
  amount: number
}

interface BillSummaryProps {
  items: BillItem[]
  tax: number
  grandTotal: number
  cashTotal: number
  formatCurrency: (amount: number) => string
  isCalculatorOpen: boolean
  onCalculatorOpenChange: (open: boolean) => void
  amountReceived: string
  onAmountReceivedChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onCalculatorReset: () => void
}

export function BillSummary({
  items,
  tax,
  grandTotal,
  cashTotal,
  formatCurrency,
  isCalculatorOpen,
  onCalculatorOpenChange,
  amountReceived,
  onAmountReceivedChange,
  onCalculatorReset,
}: BillSummaryProps) {
  return (
    <div className="space-y-2">
      {items.map((item, index) => (
        <div key={index} className="flex justify-between text-sm sm:text-base">
          <span>{item.label}</span>
          <span>{formatCurrency(item.amount)}</span>
        </div>
      ))}

      {items.length === 0 && <div className="text-center text-gray-500 py-4">No items selected yet</div>}

      <Separator className="my-2" />

      {/* Tax */}
      <div className="flex justify-between text-xs sm:text-sm">
        <span>tax (8.5% of sum of all above amounts)</span>
        <span>{formatCurrency(tax)}</span>
      </div>

      <Separator className="my-2" />

      {/* Cash Calculator */}
      <CashCalculator
        cashTotal={cashTotal}
        formatCurrency={formatCurrency}
        isOpen={isCalculatorOpen}
        onOpenChange={onCalculatorOpenChange}
        amountReceived={amountReceived}
        onAmountReceivedChange={onAmountReceivedChange}
        onReset={onCalculatorReset}
      />

      {/* Total */}
      <div className="flex justify-between font-bold text-sm sm:text-base text-red-600">
        <span>Total (Sum of all amounts)</span>
        <span>{formatCurrency(grandTotal)}</span>
      </div>
    </div>
  )
}
