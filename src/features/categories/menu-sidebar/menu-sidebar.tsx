"use client"

import { cn } from "@/shared/lib/utils"
import type React from "react"

interface Category {
  id: string
  name: string
  icon: React.ComponentType<{ className?: string }>
}

interface MenuSidebarProps {
  categories: Category[]
  selectedCategory: string
  onCategorySelect: (categoryId: string) => void
}

export default function MenuSidebar({ categories, selectedCategory, onCategorySelect }: MenuSidebarProps) {
  return (
    <div className="my-6">
      {/* Заголовок */}
      <div className="mb-6">
        <h2 className="text-white text-lg font-semibold">Категории</h2>
      </div>

      {/* Горизонтальная навигация */}
      <nav className="flex items-center gap-10 overflow-x-auto scrollbar-hide border border-[#3D3A46] rounded-3xl p-4">
        {categories.map((category) => {
          const Icon = category.icon

          return (
            <button
              key={category.id}
              onClick={() => onCategorySelect(category.id)}
              className="flex flex-col items-center group cursor-pointer flex-shrink-0"
            >
              {/* Иконка в круге */}
              <div
                className={cn(
                  "relative w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-200 border",
                  selectedCategory === category.id
                    ? "bg-orange-500/20 border-orange-500/50 shadow-lg shadow-orange-500/20"
                    : "bg-[#222125]/60 hover:bg-[#222125]/80 border-gray-600/50",
                )}
              >
                <Icon
                  className={cn(
                    "w-6 h-6 transition-all duration-200",
                    selectedCategory === category.id
                      ? "text-orange-400 scale-110"
                      : "text-gray-300 group-hover:text-white",
                  )}
                />

                {/* Активный индикатор */}
                {selectedCategory === category.id && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-orange-500 rounded-full"></div>
                )}
              </div>

              {/* Текст */}
              <span
                className={cn(
                  "text-sm font-medium w-16 h-7 mt-3 transition-colors duration-200 text-center leading-tight",
                  selectedCategory === category.id ? "text-orange-400" : "text-gray-300 group-hover:text-white",
                )}
              >
                {category.name}
              </span>
            </button>
          )
        })}
      </nav>
    </div>
  )
}