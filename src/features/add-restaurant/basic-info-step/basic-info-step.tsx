"use client"

import type React from "react"
import { Store, MapPin, Phone, ChevronDown } from "lucide-react"
import { Card } from "@/shared/ui/card"
import { Input } from "@/shared/ui/input"
import type { RestaurantFormData } from "@/shared/types/restaurant-form"
import { useTheme } from "next-themes" // Import useTheme
import { cn } from "@/shared/lib/utils" // Import cn

interface BasicInfoStepProps {
  formData: RestaurantFormData
  setFormData: React.Dispatch<React.SetStateAction<RestaurantFormData>>
}

export function BasicInfoStep({ formData, setFormData }: BasicInfoStepProps) {
  const { theme } = useTheme() // Get current theme

  const handleInputChange = (field: keyof RestaurantFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Card
      className={cn(
        "rounded-3xl p-8 shadow-lg",
        theme === "dark" ? "bg-[#1A1A1A] border border-[#444444]" : "bg-white border border-gray-200",
      )}
    >
      <div className="flex items-center gap-4 mb-10">
        <div className="w-12 h-12 bg-orange-500/25 rounded-2xl flex items-center justify-center transition-colors duration-300 hover:bg-orange-500/40">
          <Store className="w-6 h-6 text-orange-400" />
        </div>
        <h2 className={cn("text-2xl font-extrabold tracking-wide", theme === "dark" ? "text-white" : "text-gray-900")}>
          Основная информация
        </h2>
      </div>
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
          <div>
            <label
              className={cn(
                "block text-sm font-semibold mb-3 tracking-wide",
                theme === "dark" ? "text-gray-400" : "text-gray-700",
              )}
            >
              Название ресторана <span className="text-orange-500">*</span>
            </label>
            <Input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className={cn(
                "rounded-2xl px-5 py-3 h-12 focus:border-orange-500 focus:ring-2 focus:ring-orange-500 transition", // Added h-12
                theme === "dark"
                  ? "bg-[#2A2730] border border-[#555555] text-white placeholder:text-gray-500"
                  : "bg-gray-100 border border-gray-300 text-gray-900 placeholder:text-gray-500",
              )}
              placeholder="Название вашего ресторана"
              required
              spellCheck={false}
              autoComplete="off"
            />
          </div>
          <div>
            <label
              className={cn(
                "block text-sm font-semibold mb-3 tracking-wide",
                theme === "dark" ? "text-gray-400" : "text-gray-700",
              )}
            >
              Тип кухни <span className="text-orange-500">*</span>
            </label>
            <div className="relative">
              <select
                value={formData.cuisine}
                onChange={(e) => handleInputChange("cuisine", e.target.value)}
                className={cn(
                  "w-full rounded-2xl px-5 py-3 h-12 focus:border-orange-500 focus:ring-2 focus:ring-orange-500 transition appearance-none pr-10", // Added h-12
                  theme === "dark"
                    ? "bg-[#2A2730] border border-[#555555] text-white"
                    : "bg-gray-100 border border-gray-300 text-gray-900",
                )}
                required
              >
                <option value="" disabled>
                  Выберите тип кухни
                </option>
                <option value="tajik">Таджикская</option>
                <option value="uzbek">Узбекская</option>
                <option value="european">Европейская</option>
                <option value="asian">Азиатская</option>
                <option value="italian">Итальянская</option>
                <option value="fast-food">Фаст-фуд</option>
                <option value="mixed">Смешанная</option>
              </select>
              <ChevronDown
                className={cn(
                  "absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none",
                  theme === "dark" ? "text-gray-500" : "text-gray-600",
                )}
              />
            </div>
          </div>
        </div>
        <div>
          <label
            className={cn(
              "block text-sm font-semibold mb-3 tracking-wide",
              theme === "dark" ? "text-gray-400" : "text-gray-700",
            )}
          >
            Описание ресторана <span className="text-orange-500">*</span>
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
            className={cn(
              "w-full rounded-2xl px-5 py-4 resize-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500 transition",
              theme === "dark"
                ? "bg-[#2A2730] border border-[#555555] text-white placeholder:text-gray-500"
                : "bg-gray-100 border border-gray-300 text-gray-900 placeholder:text-gray-500",
            )}
            placeholder="Расскажите о вашем ресторане, его особенностях и атмосфере"
            rows={5}
            required
            spellCheck={false}
          />
        </div>
        <div>
          <label
            className={cn(
              "block text-sm font-semibold mb-3 tracking-wide",
              theme === "dark" ? "text-gray-400" : "text-gray-700",
            )}
          >
            Адрес <span className="text-orange-500">*</span>
          </label>
          <div className="relative">
            <MapPin
              className={cn("absolute left-4 top-4 w-5 h-5", theme === "dark" ? "text-gray-500" : "text-gray-600")}
            />
            <textarea
              value={formData.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
              className={cn(
                "w-full rounded-2xl pl-12 pr-5 py-4 resize-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500 transition",
                theme === "dark"
                  ? "bg-[#2A2730] border border-[#555555] text-white placeholder:text-gray-500"
                  : "bg-gray-100 border border-gray-300 text-gray-900 placeholder:text-gray-500",
              )}
              placeholder="Полный адрес ресторана"
              rows={3}
              required
              spellCheck={false}
            />
          </div>
        </div>
        <div>
          <label
            className={cn(
              "block text-sm font-semibold mb-3 tracking-wide",
              theme === "dark" ? "text-gray-400" : "text-gray-700",
            )}
          >
            Телефон <span className="text-orange-500">*</span>
          </label>
          <div className="relative max-w-sm">
            <Phone
              className={cn(
                "absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5",
                theme === "dark" ? "text-gray-500" : "text-gray-600",
              )}
            />
            <Input
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              className={cn(
                "rounded-2xl pl-12 py-3 h-12 focus:border-orange-500 focus:ring-2 focus:ring-orange-500 transition", // Added h-12
                theme === "dark"
                  ? "bg-[#2A2730] border border-[#555555] text-white placeholder:text-gray-500"
                  : "bg-gray-100 border border-gray-300 text-gray-900 placeholder:text-gray-500",
              )}
              placeholder="+992 XX XXX XXXX"
              required
              spellCheck={false}
            />
          </div>
        </div>
      </div>
    </Card>
  )
}
