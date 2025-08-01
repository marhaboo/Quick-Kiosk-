"use client"

import { Badge } from "@/shared/ui/badge"
import { useTheme } from "next-themes"
import { cn } from "@/shared/lib/utils"
import { ScrollArea, ScrollBar } from "@/shared/ui/scroll-area"

interface CategoryFilterProps {
  categories: string[]
  selectedCategory: string | null
  onSelectCategory: (category: string | null) => void
}

export function CategoryFilter({ categories, selectedCategory, onSelectCategory }: CategoryFilterProps) {
  const { theme } = useTheme()

  return (
    <div className="mb-8">
      <ScrollArea className="w-full whitespace-nowrap pb-4">
        <div className="flex space-x-3 justify-center overflow-x-auto">
          <Badge
            onClick={() => onSelectCategory(null)}
            className={cn(
              "cursor-pointer px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200",
              selectedCategory === null
                ? "bg-orange-500 text-white hover:bg-orange-600"
                : theme === "dark"
                  ? "bg-gray-700 text-gray-200 hover:bg-gray-600"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300",
            )}
          >
            Все
          </Badge>
          {categories.map((category) => (
            <Badge
              key={category}
              onClick={() => onSelectCategory(category)}
              className={cn(
                "cursor-pointer px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200",
                selectedCategory === category
                  ? "bg-orange-500 text-white hover:bg-orange-600"
                  : theme === "dark"
                    ? "bg-gray-700 text-gray-200 hover:bg-gray-600"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300",
              )}
            >
              {category}
            </Badge>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  )
}
