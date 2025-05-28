"use client"

import type React from "react"

import { useCallback } from "react"
import type { MenuOrders, SpiceLevel } from "@/types"

export const useMenuHandlers = (
  menuOrders: MenuOrders,
  setMenuOrders: React.Dispatch<React.SetStateAction<MenuOrders>>,
) => {
  const addMenuItem = useCallback(
    (category: string, itemName: string, spiceLevel?: SpiceLevel) => {
      const key = `${category}|${itemName}`
      setMenuOrders((prev) => ({
        ...prev,
        [key]: {
          quantity: (prev[key]?.quantity || 0) + 1,
          spiceLevel: spiceLevel || prev[key]?.spiceLevel,
        },
      }))
    },
    [setMenuOrders],
  )

  const removeMenuItem = useCallback(
    (category: string, itemName: string) => {
      const key = `${category}|${itemName}`
      setMenuOrders((prev) => {
        const newOrders = { ...prev }
        if (newOrders[key] && newOrders[key].quantity > 0) {
          newOrders[key] = {
            ...newOrders[key],
            quantity: newOrders[key].quantity - 1,
          }
          if (newOrders[key].quantity === 0) {
            delete newOrders[key]
          }
        }
        return newOrders
      })
    },
    [setMenuOrders],
  )

  const updateSpiceLevel = useCallback(
    (category: string, itemName: string, spiceLevel: SpiceLevel) => {
      const key = `${category}|${itemName}`
      setMenuOrders((prev) => ({
        ...prev,
        [key]: {
          ...prev[key],
          spiceLevel,
        },
      }))
    },
    [setMenuOrders],
  )

  return {
    addMenuItem,
    removeMenuItem,
    updateSpiceLevel,
  }
}
