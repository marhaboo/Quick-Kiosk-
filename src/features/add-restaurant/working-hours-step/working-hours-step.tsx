"use client"

import type React from "react"

import { Clock } from "lucide-react"
import { Card } from "@/shared/ui/card"
import { Input } from "@/shared/ui/input"
import type { RestaurantFormData } from "@/shared/types/restaurant-form"

interface WorkingHoursStepProps {
  formData: RestaurantFormData
  setFormData: React.Dispatch<React.SetStateAction<RestaurantFormData>>
}

export function WorkingHoursStep({ formData, setFormData }: WorkingHoursStepProps) {
  const handleHoursChange = (
    day: keyof RestaurantFormData["openingHours"],
    field: "open" | "close" | "closed",
    value: string | boolean,
  ) => {
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

  const dayNames = {
    monday: "Понедельник",
    tuesday: "Вторник",
    wednesday: "Среда",
    thursday: "Четверг",
    friday: "Пятница",
    saturday: "Суббота",
    sunday: "Воскресенье",
  }

  return (
    <Card className="bg-[#1A1A1A] border border-[#333333] rounded-3xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-orange-500/20 rounded-xl flex items-center justify-center">
          <Clock className="w-5 h-5 text-orange-400" />
        </div>
        <h2 className="text-xl font-bold text-white">Время работы</h2>
      </div>

      <div className="space-y-4">
        {Object.entries(formData.openingHours).map(([day, hours]) => (
          <div key={day} className="flex items-center gap-4 p-4 bg-[#2A2730] rounded-xl">
            <div className="w-24">
              <span className="text-white font-medium">{dayNames[day as keyof typeof dayNames]}</span>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={hours.closed}
                onChange={(e) =>
                  handleHoursChange(day as keyof RestaurantFormData["openingHours"], "closed", e.target.checked)
                }
                className="w-4 h-4 text-orange-500 bg-[#1A1A1A] border-[#3D3A46] rounded"
              />
              <span className="text-gray-400 text-sm">Выходной</span>
            </div>

            {!hours.closed && (
              <div className="flex items-center gap-2">
                <Input
                  type="time"
                  value={hours.open}
                  onChange={(e) =>
                    handleHoursChange(day as keyof RestaurantFormData["openingHours"], "open", e.target.value)
                  }
                  className="bg-[#1A1A1A] border-[#3D3A46] text-white w-32"
                />
                <span className="text-gray-400">—</span>
                <Input
                  type="time"
                  value={hours.close}
                  onChange={(e) =>
                    handleHoursChange(day as keyof RestaurantFormData["openingHours"], "close", e.target.value)
                  }
                  className="bg-[#1A1A1A] border-[#3D3A46] text-white w-32"
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </Card>
  )
}
