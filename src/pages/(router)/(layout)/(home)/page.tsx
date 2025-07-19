"use client"
import { RestaurantList } from "@/features/home/restautrant-list/restaurant-list";
import { AddRestaurantSection } from "@/widgets/home/add-restaurant-section/add-restaurant-section";
import { TopNavigation } from "@/widgets/home/top-navigation/top-navigation";


export default function HomePage() {
  return (
    <div className="bg-[url('/images/back.gif')] bg-cover bg-center min-h-screen relative">
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative z-10">
        {/* Верхняя навигация */}
        <TopNavigation />

        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Рестораны и кафе
              <span className="text-orange-500 block mt-2">Душанбе</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Откройте для себя лучшие места для незабываемого гастрономического опыта в столице Таджикистана
            </p>
          </div>

          <RestaurantList />
        </div>

        {/* Секция добавления ресторана */}
        <AddRestaurantSection />
      </div>
    </div>
  )
}
