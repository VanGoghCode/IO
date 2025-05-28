"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Calculator } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface CashCalculatorProps {
  cashTotal: number
  formatCurrency: (amount: number) => string
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  amountReceived: string
  onAmountReceivedChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onReset: () => void
}

export function CashCalculator({
  cashTotal,
  formatCurrency,
  isOpen,
  onOpenChange,
  amountReceived,
  onAmountReceivedChange,
  onReset,
}: CashCalculatorProps) {
  const receivedAmount = Number.parseFloat(amountReceived) || 0
  const changeToReturn = receivedAmount - cashTotal

  return (
    <div className="flex justify-between items-center font-bold text-sm sm:text-base text-green-600">
      <span>Cash</span>
      <div className="flex items-center gap-2">
        <span>${cashTotal.toFixed(0)}</span>
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
          <DialogTrigger asChild>
            <Button variant="outline" size="icon" className="h-6 w-6">
              <Calculator className="h-3 w-3" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Cash Calculator</DialogTitle>
              <DialogDescription>Calculate change for cash payment</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="amount-received">Amount Received from Customer</Label>
                <div className="flex items-center">
                  <span className="mr-2">$</span>
                  <Input
                    id="amount-received"
                    type="number"
                    step="0.01"
                    min="0"
                    value={amountReceived}
                    onChange={onAmountReceivedChange}
                    placeholder="0.00"
                    className="text-base"
                  />
                </div>
              </div>

              <div className="bg-slate-50 p-3 rounded-md space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Cash Total (rounded):</span>
                  <span className="font-bold">${cashTotal.toFixed(0)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Amount Received:</span>
                  <span className="font-bold">{formatCurrency(receivedAmount)}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-base font-bold">
                  <span>Change to Return:</span>
                  <span className={changeToReturn >= 0 ? "text-green-600" : "text-red-600"}>
                    {formatCurrency(Math.max(0, changeToReturn))}
                  </span>
                </div>
                {changeToReturn < 0 && <div className="text-red-600 text-sm">Insufficient amount received!</div>}
              </div>

              <div className="flex gap-2">
                <Button onClick={onReset} variant="outline" className="flex-1">
                  Reset
                </Button>
                <Button onClick={() => onOpenChange(false)} className="flex-1">
                  Close
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
