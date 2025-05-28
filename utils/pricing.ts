import { PRICING, TIME_RANGES, WEEKEND_DAYS } from "@/constants/pricing"

export const formatCurrency = (amount: number): string => {
  return `$${amount.toFixed(2)}`
}

export const formatTime = (date: Date): string => {
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  })
}

export const formatDay = (date: Date): string => {
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    timeZone: "UTC",
  })
}

export const getTimezoneName = (): string => {
  return Intl.DateTimeFormat().resolvedOptions().timeZone
}

export const calculateBuffetPricing = (currentTime: Date) => {
  const day = currentTime.getDay()
  const isWeekend = WEEKEND_DAYS.includes(day)

  const hours = currentTime.getHours()
  const minutes = currentTime.getMinutes()
  const timeInMinutes = hours * 60 + minutes

  let adultPrice = 0
  let kidPrice = 0

  if (timeInMinutes >= TIME_RANGES.LUNCH_START && timeInMinutes <= TIME_RANGES.LUNCH_END) {
    // Lunch time
    adultPrice = isWeekend ? PRICING.WEEKEND_LUNCH_PRICE : PRICING.WEEKDAY_LUNCH_PRICE
    kidPrice = isWeekend ? PRICING.WEEKEND_KID_PRICE : PRICING.WEEKDAY_KID_PRICE
  } else if (timeInMinutes >= TIME_RANGES.DINNER_START && timeInMinutes <= TIME_RANGES.DINNER_END) {
    // Dinner time
    adultPrice = isWeekend ? PRICING.WEEKEND_DINNER_PRICE : PRICING.WEEKDAY_DINNER_PRICE
    kidPrice = isWeekend ? PRICING.WEEKEND_KID_PRICE : PRICING.WEEKEND_KID_PRICE
  }

  return { adultPrice, kidPrice }
}
