"use client"

import { RestaurantCard } from "@/widgets/home/restaurant-card/restaurant-card"
import { useDispatch, useSelector } from "react-redux"
import { Restaurant } from "@/entities/home/models/types"
import { AppDispatch, RootState } from "@/app/store/store"
import { useEffect } from "react"
import { getRestaurants } from "@/entities/home/api/home-api"

export function RestaurantList() {
  const restaurants = useSelector((state: RootState) => state.home.data) as Restaurant[]
  const dispatch: AppDispatch = useDispatch()
  useEffect(() => {
    dispatch(getRestaurants())
  }, [dispatch])


  if (!restaurants || restaurants.length === 0) {
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
        <h3 className="text-xl font-semibold text-white mb-2">Рестораны не найдены</h3>
        <p className="text-gray-400">Попробуйте обновить страницу или зайти позже</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {restaurants.map((restaurant, index) => (
        <div key={restaurant.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 150}ms` }}>
          <RestaurantCard restaurant={restaurant} />
        </div>
      ))}
    </div>
  )
}
