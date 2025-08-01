"use client"

import { Calendar, Clock, Users } from "lucide-react"
import { useTheme } from "next-themes"
import { cn } from "@/shared/lib/utils"
import { useEffect, useState } from "react"

export function ReservationHeader() {
  const { theme } = useTheme()
  const [currentTime, setCurrentTime] = useState(() =>
    new Date().toLocaleTimeString("ru-RU", {
      hour: "2-digit",
      minute: "2-digit",
    })
  )
  
  const currentDate = new Date().toLocaleDateString("ru-RU", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  // Обновляем время каждую минуту
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(
        new Date().toLocaleTimeString("ru-RU", {
          hour: "2-digit",
          minute: "2-digit",
        })
      )
    }, 60 * 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="mb-8 animate-fade-in-up">
      <div
        className={cn(
          "glass-effect rounded-2xl p-6 border",
          theme === "dark"
            ? "bg-[#1A1A1A]/80 border-[#3D3A46]"
            : "bg-white/80 border-gray-300 shadow-sm"
        )}
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Заголовок */}
          <div>
            <h1
              className={cn(
                "text-3xl font-bold mb-2",
                theme === "dark"
                  ? "text-white text-shadow-glow"
                  : "text-gray-900"
              )}
            >
              Управление столиками
            </h1>
            <p className={cn(theme === "dark" ? "text-gray-300" : "text-gray-700")}>
              Выберите свободный столик для бронирования
            </p>
          </div>

          {/* Информация о времени */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div
              className={cn(
                "flex items-center gap-2 text-sm",
                theme === "dark" ? "text-gray-300" : "text-gray-600"
              )}
            >
              <Calendar className={cn("w-5 h-5", theme === "dark" ? "text-orange-500" : "text-orange-600")} />
              <span>{currentDate}</span>
            </div>
            <div
              className={cn(
                "flex items-center gap-2 text-sm",
                theme === "dark" ? "text-gray-300" : "text-gray-600"
              )}
            >
              <Clock className={cn("w-5 h-5", theme === "dark" ? "text-orange-500" : "text-orange-600")} />
              <span>{currentTime}</span>
            </div>
          </div>
        </div>

        {/* Дополнительная информация */}
        <div
          className={cn(
            "mt-4 pt-4 border-t text-sm flex items-center gap-2",
            theme === "dark" ? "border-[#3D3A46] text-gray-400" : "border-gray-300 text-gray-600"
          )}
        >
          <Users className={cn("w-4 h-4", theme === "dark" ? "text-gray-400" : "text-gray-700")} />
          <span>Нажмите на свободный столик для бронирования</span>
        </div>
      </div>
    </div>
  )
}
