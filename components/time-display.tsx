import { Clock } from "lucide-react"
import { formatTime, formatDay, getTimezoneName } from "@/utils/pricing"

interface TimeDisplayProps {
  currentTime: Date
  suggestedPrice: number
  suggestedKidPrice: number
  formatCurrency: (amount: number) => string
}

export function TimeDisplay({ currentTime, suggestedPrice, suggestedKidPrice, formatCurrency }: TimeDisplayProps) {
  const isValidServiceTime = suggestedPrice > 0

  return (
    <div className="bg-slate-50 p-3 rounded-md space-y-1">
      <div className="flex items-center text-sm text-slate-600">
        <Clock className="h-4 w-4 mr-2" />
        <span>
          Current Local Time: {formatTime(currentTime)}, {formatDay(currentTime)}
        </span>
      </div>
      <div className="text-xs text-slate-500">Timezone: {getTimezoneName()}</div>
      {isValidServiceTime ? (
        <div className="text-sm text-green-600">
          <div>
            Adult Buffet: {formatCurrency(suggestedPrice)} ({currentTime.getHours() < 15 ? "Lunch" : "Dinner"} Rate)
          </div>
          <div>
            Kid Buffet: {formatCurrency(suggestedKidPrice)} ({currentTime.getHours() < 15 ? "Lunch" : "Dinner"} Rate)
          </div>
        </div>
      ) : (
        <div className="text-sm text-amber-600">Outside service hours. Please set prices manually.</div>
      )}
    </div>
  )
}
