"use client"

import type React from "react"
import { Clock } from "lucide-react"
import { Card } from "@/shared/ui/card"
import { Input } from "@/shared/ui/input"
import type { RestaurantFormData } from "@/shared/types/restaurant-form"
import { useTheme } from "next-themes" // Import useTheme
import { cn } from "@/shared/lib/utils" // Import cn

interface WorkingHoursStepProps {
  formData: RestaurantFormData
  setFormData: React.Dispatch<React.SetStateAction<RestaurantFormData>>
}

export function WorkingHoursStep({ formData, setFormData }: WorkingHoursStepProps) {
  const { theme } = useTheme() // Get current theme

  type DayKey = keyof RestaurantFormData["openingHours"]

  const handleHoursChange = (day: DayKey, field: "open" | "close" | "closed", value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      openingHours: {
        ...prev.openingHours,
        [day]: {
          ...prev.openingHours[day],
          [field]: value,
        },
      },
    }))
  }

  const dayNames: Record<DayKey, string> = {
    monday: "Понедельник",
    tuesday: "Вторник",
    wednesday: "Среда",
    thursday: "Четверг",
    friday: "Пятница",
    saturday: "Суббота",
    sunday: "Воскресенье",
  }

  return (
    <Card
      className={cn(
        "rounded-3xl p-6",
        theme === "dark" ? "bg-[#1A1A1A] border border-[#333333]" : "bg-white border border-gray-200 shadow-sm",
      )}
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-orange-500/20 rounded-xl flex items-center justify-center">
          <Clock className="w-5 h-5 text-orange-400" />
        </div>
        <h2 className={cn("text-xl font-bold", theme === "dark" ? "text-white" : "text-gray-900")}>Время работы</h2>
      </div>
      <div className="space-y-4">
        {(Object.keys(formData.openingHours) as DayKey[]).map((day) => {
          const hours = formData.openingHours[day]
          return (
            <div
              key={day}
              className={cn(
                "flex items-center gap-4 p-4 rounded-xl",
                theme === "dark" ? "bg-[#2A2730]" : "bg-gray-100",
              )}
            >
              <div className="w-24">
                <span className={cn("font-medium", theme === "dark" ? "text-white" : "text-gray-900")}>
                  {dayNames[day]}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={hours.closed}
                  onChange={(e) => handleHoursChange(day, "closed", e.target.checked)}
                  className={cn(
                    "w-4 h-4 text-orange-500 rounded",
                    theme === "dark" ? "bg-[#1A1A1A] border-[#3D3A46]" : "bg-gray-200 border-gray-300",
                  )}
                />
                <span className={cn("text-sm", theme === "dark" ? "text-gray-400" : "text-gray-600")}>Выходной</span>
              </div>
              {!hours.closed && (
                <div className="flex items-center gap-2">
                  <Input
                    type="time"
                    value={hours.open}
                    onChange={(e) => handleHoursChange(day, "open", e.target.value)}
                    className={cn(
                      "w-32",
                      theme === "dark"
                        ? "bg-[#1A1A1A] border-[#3D3A46] text-white"
                        : "bg-gray-200 border-gray-300 text-gray-900",
                    )}
                  />
                  <span className={cn("", theme === "dark" ? "text-gray-400" : "text-gray-600")}>—</span>
                  <Input
                    type="time"
                    value={hours.close}
                    onChange={(e) => handleHoursChange(day, "close", e.target.value)}
                    className={cn(
                      "w-32",
                      theme === "dark"
                        ? "bg-[#1A1A1A] border-[#3D3A46] text-white"
                        : "bg-gray-200 border-gray-300 text-gray-900",
                    )}
                  />
                </div>
              )}
            </div>
          )
        })}
      </div>
    </Card>
  )
}
