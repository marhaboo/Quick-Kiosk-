"use client"

import { Search, User2, CalendarCheck, Home, Bell, Settings, ChevronDown, MapPin } from "lucide-react"
import { Input } from "@/shared/ui/input"
import { Button } from "@/shared/ui/button"
import Link from "next/link"
import type { Restaurant } from "@/entities/home/models/types"
import { useTheme } from "next-themes" // Import useTheme
import { cn } from "@/shared/lib/utils" // Import cn

interface MenuHeaderProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  restaurant: Restaurant
}

export function MenuHeader({ searchQuery, onSearchChange, restaurant }: MenuHeaderProps) {
  const { theme } = useTheme() // Get current theme

  return (
    <div className="space-y-4">
      {/* Верхняя панель навигации */}
      <div className="flex items-center justify-between">
        {/* Левая часть - навигация */}
        <div className="flex items-center gap-4">
          <Link passHref href="/">
            <Button
              variant="ghost"
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-2xl transition-all duration-200",
                theme === "dark"
                  ? "bg-[#2A2730] hover:bg-orange-500/20 border border-[#3D3A46] hover:border-orange-500/50 text-white hover:text-orange-400"
                  : "bg-gray-200 hover:bg-orange-100 border border-gray-300 hover:border-orange-200 text-gray-700 hover:text-orange-500",
              )}
            >
              <Home className="w-4 h-4" />
              <span className="font-medium">Главная</span>
            </Button>
          </Link>
          <div className={cn("w-px h-6", theme === "dark" ? "bg-[#3D3A46]" : "bg-gray-300")}></div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className={cn("text-sm font-medium", theme === "dark" ? "text-white" : "text-gray-900")}>
              Ресторан &quot;{restaurant?.name ? restaurant?.name : "Без названия"}&quot;
            </span>
          </div>
        </div>
        {/* Правая часть - уведомления и настройки */}
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "w-10 h-10 rounded-full relative transition-all duration-200",
              theme === "dark"
                ? "bg-[#2A2730] hover:bg-[#2A2730]/80 border border-[#3D3A46] text-gray-300 hover:text-white"
                : "bg-gray-200 hover:bg-gray-300 border border-gray-300 text-gray-700 hover:text-gray-900",
            )}
          >
            <Bell className="w-4 h-4" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">3</span>
            </div>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "w-10 h-10 rounded-full transition-all duration-200",
              theme === "dark"
                ? "bg-[#2A2730] hover:bg-[#2A2730]/80 border border-[#3D3A46] text-gray-300 hover:text-white"
                : "bg-gray-200 hover:bg-gray-300 border border-gray-300 text-gray-700 hover:text-gray-900",
            )}
          >
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </div>
      {/* Основная панель */}
      <div className="grid grid-cols-12 gap-6">
        {/* Поиск - занимает 6 колонок */}
        <div className="col-span-6">
          <div
            className={cn(
              "rounded-3xl backdrop-blur-sm p-4",
              theme === "dark"
                ? "border border-[#3D3A46] bg-[#1A1A1A]/60"
                : "border border-gray-200 bg-white/60 shadow-sm",
            )}
          >
            <div className="relative">
              <Input
                placeholder="Поиск блюд и напитков..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className={cn(
                  "rounded-2xl border-0 focus:ring-2 focus:ring-orange-500/50 pl-12 pr-4 py-3",
                  theme === "dark"
                    ? "bg-[#2A2730] text-white placeholder:text-white/50"
                    : "bg-gray-100 text-gray-900 placeholder:text-gray-500",
                )}
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-orange-400 w-5 h-5" />
            </div>
          </div>
        </div>
        {/* Бронирование - занимает 3 колонки */}
        <div className="col-span-3">
          <Link href="/reservations">
            <div
              className={cn(
                "rounded-3xl bg-gradient-to-r from-orange-500/10 to-orange-600/10 hover:from-orange-500/20 hover:to-orange-600/20 backdrop-blur-sm p-4 h-full flex items-center gap-4 cursor-pointer transition-all duration-300 group",
                theme === "dark"
                  ? "border border-[#3D3A46] hover:border-orange-500/50"
                  : "border border-gray-200 hover:border-orange-300 shadow-sm",
              )}
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/20 group-hover:scale-110 transition-transform duration-200">
                <CalendarCheck className="w-6 h-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className={cn("font-bold text-sm", theme === "dark" ? "text-white" : "text-gray-900")}>
                  Бронирование
                </span>
                <span className="text-xs text-orange-400">столиков</span>
              </div>
            </div>
          </Link>
        </div>
        {/* Профиль - занимает 3 колонки */}
        <div className="col-span-3">
          <div
            className={cn(
              "rounded-3xl backdrop-blur-sm p-4 h-full",
              theme === "dark"
                ? "border border-[#3D3A46] bg-[#1A1A1A]/60"
                : "border border-gray-200 bg-white/60 shadow-sm",
            )}
          >
            <div className="flex items-center justify-between h-full">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <User2 className="w-6 h-6 text-white" />
                </div>
                <div className="flex flex-col">
                  <span className={cn("font-semibold text-sm", theme === "dark" ? "text-white" : "text-gray-900")}>
                    Гость
                  </span>
                  <span className={cn("text-xs", theme === "dark" ? "text-gray-400" : "text-gray-600")}>
                    Добро пожаловать
                  </span>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "w-8 h-8 rounded-full transition-all duration-200",
                  theme === "dark"
                    ? "hover:bg-white/10 text-gray-400 hover:text-white"
                    : "hover:bg-gray-200 text-gray-600 hover:text-gray-900",
                )}
              >
                <ChevronDown className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* Дополнительная информационная панель */}
      <div
        className={cn(
          "flex items-center justify-between p-4 rounded-2xl transition-all duration-200",
          theme === "dark" ? "bg-[#2A2730]/50 border border-[#3D3A46]" : "bg-white/50 border border-gray-200 shadow-sm",
        )}
      >
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-green-400 text-sm font-medium">
              {restaurant?.openingHours ? `Открыто до ${restaurant?.openingHours.split("–")[1]}` : "Время не указано"}
            </span>
          </div>
          <div className={cn("w-px h-4", theme === "dark" ? "bg-[#3D3A46]" : "bg-gray-300")}></div>
          <div className="flex items-center gap-2">
            <MapPin className={cn("w-4 h-4", theme === "dark" ? "text-gray-400" : "text-gray-600")} />
            <span className={cn("text-sm", theme === "dark" ? "text-white" : "text-gray-900")}>
              {restaurant?.address ? restaurant?.address : "Адрес не указан"}
            </span>
          </div>
          <div className={cn("w-px h-4", theme === "dark" ? "bg-[#3D3A46]" : "bg-gray-300")}></div>
          <div className="flex items-center gap-2">
            <span className={cn("text-sm", theme === "dark" ? "text-gray-400" : "text-gray-600")}>Время доставки:</span>
            <span className="text-orange-400 font-semibold">25-35 мин</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex -space-x-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 border-2 border-[#1A1A1A] flex items-center justify-center"
              >
                <span className="text-white text-xs font-bold">★</span>
              </div>
            ))}
          </div>
          <span className={cn("font-semibold ml-2", theme === "dark" ? "text-white" : "text-gray-900")}>
            {restaurant?.rating ? `${restaurant?.rating} / 5` : "Нет рейтинга"}
          </span>
        </div>
      </div>
    </div>
  )
}
