export interface MenuItem {
  name: string
  price: number
  hasSpice: boolean
}

export interface MenuOrder {
  quantity: number
  spiceLevel?: string
}

export interface MenuOrders {
  [key: string]: MenuOrder
}

export interface MenuData {
  [category: string]: MenuItem[]
}

export type OrderType = "menu" | "combined" | "togo"

export type SpiceLevel = "Mild" | "Medium" | "Hot"

export interface PricingConstants {
  SODA_PRICE: number
  ICED_TEA_PRICE: number
  BEER_SMALL_PRICE: number
  BEER_LARGE_PRICE: number
  TAX_RATE: number
  CASH_DISCOUNT_RATE: number
  TO_GO_PRICE_PER_LB: number
  WEEKDAY_LUNCH_PRICE: number
  WEEKDAY_DINNER_PRICE: number
  WEEKEND_LUNCH_PRICE: number
  WEEKEND_DINNER_PRICE: number
  WEEKDAY_KID_PRICE: number
  WEEKEND_KID_PRICE: number
}

export interface BuffetCounts {
  buffetCount: number
  kidCount: number
  sodaCount: number
  icedTeaCount: number
  beerSmallCount: number
  beerLargeCount: number
}

export interface SearchResult {
  item: MenuItem
  category: string
  categoryName: string
}
