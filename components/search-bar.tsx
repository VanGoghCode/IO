"use client"

import type React from "react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

interface SearchBarProps {
  id: string
  label: string
  placeholder: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onClear: () => void
}

export function SearchBar({ id, label, placeholder, value, onChange, onClear }: SearchBarProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-sm sm:text-base">
        {label}
      </Label>
      <div className="relative">
        <Input
          id={id}
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="h-10 sm:h-11 text-base pr-10"
        />
        {value && (
          <Button variant="ghost" size="icon" onClick={onClear} className="absolute right-1 top-1 h-8 w-8">
            ×
          </Button>
        )}
      </div>
    </div>
  )
}
