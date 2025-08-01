"use client"

import { cn } from "@/shared/lib/utils"
import Image from "next/image"
import { useTheme } from "next-themes" // Import useTheme

interface Category {
  id: string
  name: string
  image: string
}

interface MenuSidebarProps {
  categories: Category[]
  selectedCategory: string
  onCategorySelect: (categoryId: string) => void
}

export default function MenuSidebar({ categories, selectedCategory, onCategorySelect }: MenuSidebarProps) {
  const { theme } = useTheme() // Get current theme

  return (
    <div className="my-6">
      {/* Заголовок */}
      <div className="mb-6">
        <h2 className={cn("text-lg font-semibold", theme === "dark" ? "text-white" : "text-gray-900")}>Категории</h2>
      </div>
      {/* Горизонтальная навигация */}
      <nav
        className={cn(
          "flex items-center gap-10 overflow-x-auto scrollbar-hide rounded-3xl p-4",
          theme === "dark" ? "border border-[#3D3A46]" : "border border-gray-200 bg-white shadow-sm",
        )}
      >
        {categories.map((category) => {
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
                    : theme === "dark"
                      ? "bg-[#222125]/60 hover:bg-[#222125]/80 border-gray-600/50"
                      : "bg-gray-100 hover:bg-gray-200 border-gray-300",
                )}
              >
                <Image
                  width={24}
                  height={24}
                  src={category?.image || "/placeholder.svg"}
                  alt={category.name}
                  className={cn(
                    "w-6 h-6 transition-all duration-200",
                    selectedCategory === category.id ? "scale-110" : "group-hover:opacity-90",
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
                  selectedCategory === category.id
                    ? "text-orange-400"
                    : theme === "dark"
                      ? "text-gray-300 group-hover:text-white"
                      : "text-gray-600 group-hover:text-gray-900",
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
