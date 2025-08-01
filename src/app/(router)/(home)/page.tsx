"use client"

import { RestaurantList } from "@/features/home/restautrant-list/restaurant-list"
import { AddRestaurantSection } from "@/widgets/home/add-restaurant-section/add-restaurant-section"
import { TopNavigation } from "@/widgets/home/top-navigation/top-navigation"
import { OurAdvantagesSection } from "@/widgets/home/our-advantages-section/our-advantages-section"
import { useTheme } from "next-themes"
import { cn } from "@/shared/lib/utils"


export default function HomePage() {
  const { theme } = useTheme()
  

  return (
    <div
      className={cn(
        "min-h-screen",
        theme === "dark" ? "bg-[url('/images/bg-of-site.png')] bg-cover bg-center relative" : "bg-neutral-100",
      )}
    >
      {theme === "dark" && <div className="absolute inset-0 bg-black/60"></div>}
      <div className="relative z-10">
        <TopNavigation />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-16">
            <h1
              className={cn("text-5xl md:text-6xl font-bold mb-6", theme === "dark" ? "text-white" : "text-gray-900")}
            >
              Рестораны и кафе
              <span className="text-orange-500 block mt-2">Душанбе</span>
            </h1>
            <p
              className={cn(
                "text-xl max-w-3xl mx-auto leading-relaxed",
                theme === "dark" ? "text-gray-300" : "text-gray-700",
              )}
            >
              Откройте для себя лучшие места для незабываемого гастрономического опыта в столице Таджикистана
            </p>
          </div>
          <RestaurantList />
        </div>
        <OurAdvantagesSection />
        <AddRestaurantSection />
      </div>
    </div>
  )
}
