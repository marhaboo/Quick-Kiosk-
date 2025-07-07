"use client"

import { Search, User2, Plus } from "lucide-react"
import { Input } from "@/shared/ui/input"

interface MenuHeaderProps {
  searchQuery: string
  onSearchChange: (query: string) => void
}

const historyItems = ["ОШ 1", "ОШ 2"]
const maxSlots = 5

export function MenuHeader({ searchQuery, onSearchChange }: MenuHeaderProps) {
  return (
    <div className="flex   gap-6">
      {/* Первый блок — поиск и профиль */}
      <div className="flex-1 rounded-3xl border border-[#3D3A46] p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6 flex-1">
            <div className="relative flex-1 max-w-md">
              <Input
                placeholder="Поиск товаров..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="rounded-3xl border border-[#3D3A46]  text-white placeholder:text-white/40 focus:border-orange-500 focus:outline-none"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            </div>
          </div>
          <div className="flex items-center gap-2 text-white/40">
            <div className="flex flex-col text-end text-[12px]">
              <p className="text-white">Олимджон Шарипов</p>
              <p className="text-white/40">Админ</p>
            </div>
            <div className="p-1.5 border rounded-2xl border-[#3D3A46]">
              <User2 className="w-8 h-8" />
            </div>
          </div>
        </div>
      </div>

      {/* Второй блок — история заказов */}
      <div className="rounded-3xl border w-80 border-[#3D3A46] p-2.5 flex items-center gap-2  backdrop-blur-sm">
        {historyItems.map((item, index) => (
          <div
            key={index}
            className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white text-sm"
          >
            {item}
          </div>
        ))}

        {/* Кнопка добавления */}
        <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 cursor-pointer">
          <Plus className="w-4 h-4" />
        </div>

        {/* Пустые ячейки */}
        {Array.from({ length: maxSlots - historyItems.length - 1 }).map((_, index) => (
          <div
            key={`empty-${index}`}
            className="w-12 h-12 rounded-full border border-white/10"
          />
        ))}
      </div>
    </div>
  )
}
