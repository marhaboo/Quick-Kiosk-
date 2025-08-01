"use client"

import { RestaurantCard } from "@/widgets/home/restaurant-card/restaurant-card"
import { useDispatch, useSelector } from "react-redux"
import type { Restaurant } from "@/entities/home/models/types"
import type { AppDispatch, RootState } from "@/app/store/store"
import { useEffect, useMemo } from "react"
import { useTheme } from "next-themes"
import { cn } from "@/shared/lib/utils" 
import { CategoryFilter } from "@/widgets/home/category-filter/category-filter"
import { getRestaurants } from "@/entities/home/api/home-api"
import { setCategoryFilter } from "@/entities/home/reducers/homeSlice"

function RestaurantCardSkeleton() {
  const { theme } = useTheme()
  return (
    <div
      className={cn(
        "rounded-xl overflow-hidden animate-pulse",
        theme === "dark" ? "bg-gray-800/50" : "bg-white shadow-sm",
      )}
    >
      <div className={cn("aspect-video", theme === "dark" ? "bg-gray-700/50" : "bg-gray-200")} />
      <div className="p-4 space-y-3">
        <div className={cn("h-6 rounded w-3/4", theme === "dark" ? "bg-gray-700/50" : "bg-gray-300")} />
        <div className="space-y-2">
          <div className={cn("h-4 rounded w-full", theme === "dark" ? "bg-gray-700/50" : "bg-gray-200")} />
          <div className={cn("h-4 rounded w-2/3", theme === "dark" ? "bg-gray-700/50" : "bg-gray-200")} />
        </div>
        <div className="flex items-center justify-between pt-2">
          <div className={cn("h-5 rounded w-20", theme === "dark" ? "bg-gray-700/50" : "bg-gray-300")} />
          <div className={cn("h-8 rounded w-16", theme === "dark" ? "bg-gray-700/50" : "bg-gray-300")} />
        </div>
      </div>
    </div>
  )
}

function RestaurantListSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {Array.from({ length: 8 }).map((_, index) => (
        <div key={index} className="animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
          <RestaurantCardSkeleton />
        </div>
      ))}
    </div>
  )
}

export function RestaurantList() {
  const allRestaurants = useSelector((state: RootState) => state.home.data) as Restaurant[]
  const loading = useSelector((state: RootState) => state.home.loading)
  const selectedCategory = useSelector((state: RootState) => state.home.selectedCategory)
  const dispatch: AppDispatch = useDispatch()
  const { theme } = useTheme()

  useEffect(() => {
    dispatch(getRestaurants())
  }, [dispatch])

  // Extract unique categories from all restaurants
  const categories = useMemo(() => {
    const uniqueCuisines = new Set<string>()
    allRestaurants.forEach((restaurant) => {
      if (restaurant.cuisine) {
        // Use restaurant.cuisine directly
        uniqueCuisines.add(restaurant.cuisine)
      }
    })
    return Array.from(uniqueCuisines).sort()
  }, [allRestaurants])

  // Filter restaurants based on selected category
  const filteredRestaurants = useMemo(() => {
    if (!selectedCategory) {
      return allRestaurants
    }
    return allRestaurants.filter((restaurant) => restaurant.cuisine === selectedCategory)
  }, [allRestaurants, selectedCategory])

  const handleSelectCategory = (category: string | null) => {
    dispatch(setCategoryFilter(category))
  }

  // Show skeleton while loading
  if (loading) {
    return (
      <>
        <CategoryFilter categories={[]} selectedCategory={selectedCategory} onSelectCategory={handleSelectCategory} />
        <RestaurantListSkeleton />
      </>
    )
  }

  // Show empty state when not loading and no restaurants
  if (!allRestaurants || allRestaurants.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            />
          </svg>
        </div>
        <h3 className={cn("text-xl font-semibold mb-2", theme === "dark" ? "text-white" : "text-gray-900")}>
          Рестораны не найдены
        </h3>
        <p className={cn(theme === "dark" ? "text-gray-400" : "text-gray-500")}>
          Попробуйте обновить страницу или зайти позже
        </p>
      </div>
    )
  }

  // Show restaurants when loaded
  return (
    <>
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={handleSelectCategory}
      />
      {filteredRestaurants.length === 0 && selectedCategory ? (
        <div className="text-center py-16">
          <h3 className={cn("text-xl font-semibold mb-2", theme === "dark" ? "text-white" : "text-gray-900")}>
            Нет ресторанов в категории &quot;{selectedCategory}&ldquo;
          </h3>
          <p className={cn(theme === "dark" ? "text-gray-400" : "text-gray-500")}>
            Попробуйте выбрать другую категорию или &quot;Все&ldquo;
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredRestaurants.map((restaurant, index) => (
            <div key={restaurant.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 150}ms` }}>
              <RestaurantCard restaurant={restaurant} />
            </div>
          ))}
        </div>
      )}
    </>
  )
}
