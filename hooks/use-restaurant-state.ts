"use client"

import { useState, useEffect } from "react"
import type { MenuOrders, BuffetCounts } from "@/types"
import { calculateBuffetPricing } from "@/utils/pricing"

export const useRestaurantState = () => {
  // Tab state
  const [activeTab, setActiveTab] = useState("buffet")

  // Time and pricing state
  const [currentTime, setCurrentTime] = useState(new Date())
  const [buffetBasePrice, setBuffetBasePrice] = useState(0)
  const [kidBuffetPrice, setKidBuffetPrice] = useState(0)
  const [manualPriceOverride, setManualPriceOverride] = useState(false)
  const [suggestedPrice, setSuggestedPrice] = useState(0)
  const [suggestedKidPrice, setSuggestedKidPrice] = useState(0)

  // Buffet state
  const [buffetCounts, setBuffetCounts] = useState<BuffetCounts>({
    buffetCount: 0,
    kidCount: 0,
    sodaCount: 0,
    icedTeaCount: 0,
    beerSmallCount: 0,
    beerLargeCount: 0,
  })

  // Menu state
  const [menuOrders, setMenuOrders] = useState<MenuOrders>({})
  const [searchQuery, setSearchQuery] = useState("")

  // Combined state
  const [combinedBuffetCounts, setCombinedBuffetCounts] = useState<BuffetCounts>({
    buffetCount: 0,
    kidCount: 0,
    sodaCount: 0,
    icedTeaCount: 0,
    beerSmallCount: 0,
    beerLargeCount: 0,
  })
  const [combinedMenuOrders, setCombinedMenuOrders] = useState<MenuOrders>({})
  const [combinedSearchQuery, setCombinedSearchQuery] = useState("")

  // To-go state
  const [toGoWeight, setToGoWeight] = useState("")
  const [toGoMenuOrders, setToGoMenuOrders] = useState<MenuOrders>({})

  // Cash calculator state
  const [amountReceived, setAmountReceived] = useState("")
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false)

  // Time-based pricing effect
  useEffect(() => {
    const updateTimeAndPrice = () => {
      const now = new Date()
      setCurrentTime(now)

      const { adultPrice, kidPrice } = calculateBuffetPricing(now)

      setSuggestedPrice(adultPrice)
      setSuggestedKidPrice(kidPrice)

      // Only update the buffet prices if not in manual override mode
      if (!manualPriceOverride) {
        setBuffetBasePrice(adultPrice)
        setKidBuffetPrice(kidPrice)
      }
    }

    // Update immediately
    updateTimeAndPrice()

    // Update every minute
    const intervalId = setInterval(updateTimeAndPrice, 60000)

    return () => clearInterval(intervalId)
  }, [manualPriceOverride])

  // Reset function
  const resetAllValues = () => {
    setBuffetCounts({
      buffetCount: 0,
      kidCount: 0,
      sodaCount: 0,
      icedTeaCount: 0,
      beerSmallCount: 0,
      beerLargeCount: 0,
    })
    setMenuOrders({})
    setSearchQuery("")
    setCombinedBuffetCounts({
      buffetCount: 0,
      kidCount: 0,
      sodaCount: 0,
      icedTeaCount: 0,
      beerSmallCount: 0,
      beerLargeCount: 0,
    })
    setCombinedMenuOrders({})
    setCombinedSearchQuery("")
    setToGoWeight("")
    setToGoMenuOrders({})
    setAmountReceived("")
    setIsCalculatorOpen(false)
    setManualPriceOverride(false)
  }

  return {
    // Tab state
    activeTab,
    setActiveTab,

    // Time and pricing
    currentTime,
    buffetBasePrice,
    setBuffetBasePrice,
    kidBuffetPrice,
    setKidBuffetPrice,
    manualPriceOverride,
    setManualPriceOverride,
    suggestedPrice,
    suggestedKidPrice,

    // Buffet state
    buffetCounts,
    setBuffetCounts,

    // Menu state
    menuOrders,
    setMenuOrders,
    searchQuery,
    setSearchQuery,

    // Combined state
    combinedBuffetCounts,
    setCombinedBuffetCounts,
    combinedMenuOrders,
    setCombinedMenuOrders,
    combinedSearchQuery,
    setCombinedSearchQuery,

    // To-go state
    toGoWeight,
    setToGoWeight,
    toGoMenuOrders,
    setToGoMenuOrders,

    // Cash calculator
    amountReceived,
    setAmountReceived,
    isCalculatorOpen,
    setIsCalculatorOpen,

    // Actions
    resetAllValues,
  }
}
