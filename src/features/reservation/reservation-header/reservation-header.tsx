"use client"

import { Calendar, Clock, Users } from "lucide-react"

export function ReservationHeader() {
  const currentDate = new Date().toLocaleDateString("ru-RU", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  const currentTime = new Date().toLocaleTimeString("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
  })

  return (
    <div className="mb-8 animate-fade-in-up">
      <div className="glass-effect bg-[#1A1A1A]/80 rounded-2xl p-6 border border-[#3D3A46]">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Заголовок */}
          <div>
            <h1 className="text-3xl font-bold text-white text-shadow-glow mb-2">Управление столиками</h1>
            <p className="text-gray-300">Выберите свободный столик для бронирования</p>
          </div>

          {/* Информация о времени */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex items-center gap-2 text-gray-300">
              <Calendar className="w-5 h-5 text-orange-500" />
              <span className="text-sm">{currentDate}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <Clock className="w-5 h-5 text-orange-500" />
              <span className="text-sm">{currentTime}</span>
            </div>
          </div>
        </div>

        {/* Дополнительная информация */}
        <div className="mt-4 pt-4 border-t border-[#3D3A46]">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Users className="w-4 h-4" />
            <span>Нажмите на свободный столик для бронирования</span>
          </div>
        </div>
      </div>
    </div>
  )
}
