"use client"

import { Search, User2, CalendarCheck, Home, Bell, Settings, ChevronDown, MapPin } from "lucide-react"
import { Input } from "@/shared/ui/input"
import { Button } from "@/shared/ui/button"
import Link from "next/link"
import { Restaurant } from "@/entities/home/models/types"

interface MenuHeaderProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  restaurant: Restaurant
}

export function MenuHeader({ searchQuery, onSearchChange, restaurant }: MenuHeaderProps) {
  return (
    <div className="space-y-4">
      {/* Верхняя панель навигации */}
      <div className="flex items-center justify-between">
        {/* Левая часть - навигация */}
        <div className="flex items-center gap-4">
          <Link passHref href="/">
            <Button
              variant="ghost"
              className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#2A2730] hover:bg-orange-500/20 border border-[#3D3A46] hover:border-orange-500/50 text-white hover:text-orange-400 transition-all duration-200"
            >
              <Home className="w-4 h-4" />
              <span className="font-medium">Главная</span>
            </Button>
          </Link>

          <div className="w-px h-6 bg-[#3D3A46]"></div>

          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-white text-sm font-medium">Ресторан &quot;{restaurant?.name ? restaurant?.name : "Без названия"}&quot;</span>
          </div>
        </div>

        {/* Правая часть - уведомления и настройки */}
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            className="w-10 h-10 rounded-full bg-[#2A2730] hover:bg-[#2A2730]/80 border border-[#3D3A46] text-gray-300 hover:text-white relative"
          >
            <Bell className="w-4 h-4" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">3</span>
            </div>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="w-10 h-10 rounded-full bg-[#2A2730] hover:bg-[#2A2730]/80 border border-[#3D3A46] text-gray-300 hover:text-white"
          >
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Основная панель */}
      <div className="grid grid-cols-12 gap-6">
        {/* Поиск - занимает 6 колонок */}
        <div className="col-span-6">
          <div className="rounded-3xl border border-[#3D3A46] bg-[#1A1A1A]/60 backdrop-blur-sm p-4">
            <div className="relative">
              <Input
                placeholder="Поиск блюд и напитков..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="rounded-2xl border-0 bg-[#2A2730] text-white placeholder:text-white/50 focus:ring-2 focus:ring-orange-500/50 pl-12 pr-4 py-3"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-orange-400 w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Бронирование - занимает 3 колонки */}
        <div className="col-span-3">
          <Link href="/reservations">
            <div className="rounded-3xl border border-[#3D3A46] bg-gradient-to-r from-orange-500/10 to-orange-600/10 hover:from-orange-500/20 hover:to-orange-600/20 backdrop-blur-sm p-4 h-full flex items-center gap-4 cursor-pointer transition-all duration-300 hover:border-orange-500/50 group">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/20 group-hover:scale-110 transition-transform duration-200">
                <CalendarCheck className="w-6 h-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-white text-sm">Бронирование</span>
                <span className="text-xs text-orange-400">столиков</span>
              </div>
            </div>
          </Link>
        </div>

        {/* Профиль - занимает 3 колонки */}
        <div className="col-span-3">
          <div className="rounded-3xl border border-[#3D3A46] bg-[#1A1A1A]/60 backdrop-blur-sm p-4 h-full">
            <div className="flex items-center justify-between h-full">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <User2 className="w-6 h-6 text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-white font-semibold text-sm">Гость</span>
                  <span className="text-gray-400 text-xs">Добро пожаловать</span>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="w-8 h-8 rounded-full hover:bg-white/10 text-gray-400 hover:text-white"
              >
                <ChevronDown className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Дополнительная информационная панель */}
      <div className="flex items-center justify-between p-4 rounded-2xl bg-[#2A2730]/50 border border-[#3D3A46]">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-green-400 text-sm font-medium">
              {restaurant?.openingHours
                ? `Открыто до ${restaurant?.openingHours.split('–')[1]}`
                : 'Время не указано'}
            </span>
          </div>
          <div className="w-px h-4 bg-[#3D3A46]"></div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-gray-400" />
            <span className="text-white text-sm">{restaurant?.address ? restaurant?.address : "Адрес не указан"}</span>
          </div>

          <div className="w-px h-4 bg-[#3D3A46]"></div>
          <div className="flex items-center gap-2">
            <span className="text-gray-400 text-sm">Время доставки:</span>
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
          <span className="text-white font-semibold ml-2">
            {restaurant?.rating ? `${restaurant?.rating} / 5` : 'Нет рейтинга'}
          </span>
        </div>

      </div>
    </div>
  )
}