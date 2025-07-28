import type { PricingConstants } from "@/types"

export const PRICING: PricingConstants = {
  SODA_PRICE: 3.95,
  ICED_TEA_PRICE: 2.95,
  BEER_SMALL_PRICE: 5.95,
  BEER_LARGE_PRICE: 10.95,
  TAX_RATE: 0.085,
  CASH_DISCOUNT_RATE: 0.1,
  TO_GO_PRICE_PER_LB: 12.95,
  WEEKDAY_LUNCH_PRICE: 18.95,
  WEEKDAY_DINNER_PRICE: 20.95,
  WEEKEND_LUNCH_PRICE: 20.95,
  WEEKEND_DINNER_PRICE: 22.95,
  WEEKDAY_KID_PRICE: 10.95,
  WEEKEND_KID_PRICE: 12.95,
}

export const TIME_RANGES = {
  LUNCH_START: 11 * 60, // 11:00 AM in minutes
  LUNCH_END: 14 * 60 + 30, // 2:30 PM in minutes
  DINNER_START: 17 * 60, // 5:00 PM in minutes
  DINNER_END: 21 * 60 + 30, // 9:30 PM in minutes
}

export const WEEKEND_DAYS = [0, 5, 6] // Sunday, Friday, Saturday
