"use client"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { MinusCircle, PlusCircle } from "lucide-react"

interface QuantityCounterProps {
  label: string
  count: number
  onIncrement: () => void
  onDecrement: () => void
}

export function QuantityCounter({ label, count, onIncrement, onDecrement }: QuantityCounterProps) {
  return (
    <div className="flex items-center justify-between">
      <Label className="text-sm sm:text-base">{label}</Label>
      <div className="flex items-center gap-2 sm:gap-3">
        <Button
          variant="outline"
          size="icon"
          onClick={onDecrement}
          disabled={count === 0}
          className="h-9 w-9 sm:h-10 sm:w-10"
        >
          <MinusCircle className="h-4 w-4 sm:h-5 sm:w-5" />
        </Button>
        <span className="w-8 text-center text-sm sm:text-base">{count}</span>
        <Button variant="outline" size="icon" onClick={onIncrement} className="h-9 w-9 sm:h-10 sm:w-10">
          <PlusCircle className="h-4 w-4 sm:h-5 sm:w-5" />
        </Button>
      </div>
    </div>
  )
}
