"use client"

import { Button } from "@/components/ui/button"
import { RotateCcw } from "lucide-react"

interface HeaderProps {
  onReset: () => void
}

export function Header({ onReset }: HeaderProps) {
  return (
    <div className="flex items-center justify-between mb-4 sm:mb-6">
      <h1 className="text-xl sm:text-2xl font-bold">India Oven</h1>
      <Button
        onClick={onReset}
        variant="outline"
        size="sm"
        className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
      >
        <RotateCcw className="h-4 w-4 mr-2" />
        Reset All
      </Button>
    </div>
  )
}
