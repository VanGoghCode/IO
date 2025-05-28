import type { MenuOrders, BuffetCounts } from "@/types"
import { PRICING } from "@/constants/pricing"
import { MENU_DATA } from "@/constants/menu-data"

export const calculateMenuTotal = (menuOrders: MenuOrders): number => {
  return Object.entries(menuOrders).reduce((total, [itemKey, order]) => {
    const [category, itemName] = itemKey.split("|")
    const categoryData = MENU_DATA[category]
    const item = categoryData?.find((item) => item.name === itemName)
    return total + (item ? item.price * order.quantity : 0)
  }, 0)
}

export const calculateBuffetTotal = (counts: BuffetCounts, buffetBasePrice: number, kidBuffetPrice: number): number => {
  const buffetTotal = counts.buffetCount * buffetBasePrice
  const kidTotal = counts.kidCount * kidBuffetPrice
  const sodaTotal = counts.sodaCount * PRICING.SODA_PRICE
  const icedTeaTotal = counts.icedTeaCount * PRICING.ICED_TEA_PRICE
  const beerSmallTotal = counts.beerSmallCount * PRICING.BEER_SMALL_PRICE
  const beerLargeTotal = counts.beerLargeCount * PRICING.BEER_LARGE_PRICE

  return buffetTotal + kidTotal + sodaTotal + icedTeaTotal + beerSmallTotal + beerLargeTotal
}

export const calculateToGoTotal = (weight: string, menuOrders: MenuOrders): number => {
  const weightTotal = (Number.parseFloat(weight) || 0) * PRICING.TO_GO_PRICE_PER_LB
  const menuTotal = calculateMenuTotal(menuOrders)
  return weightTotal + menuTotal
}

export const calculateTaxAndTotal = (subtotal: number) => {
  const tax = subtotal * PRICING.TAX_RATE
  const grandTotal = subtotal + tax
  const cashTotalBeforeRounding = grandTotal * (1 - PRICING.CASH_DISCOUNT_RATE)
  const cashTotal = Math.ceil(cashTotalBeforeRounding) // Round up to next whole dollar

  return { tax, grandTotal, cashTotal }
}

export const calculateChange = (amountReceived: string, cashTotal: number): number => {
  const receivedAmount = Number.parseFloat(amountReceived) || 0
  return receivedAmount - cashTotal
}
