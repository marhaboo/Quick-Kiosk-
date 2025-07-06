import { RestaurantList } from "@/features/home/restautrant-list/restaurant-list";


export default function HomePage() {
  return (
    <div className="bg-[url('/images/bg-of-site.png')] bg-cover bg-center min-h-screen relative">
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative z-10 container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 animate-fade-in-up">
            Рестораны и кафе
            <span className="text-orange-500 block mt-2">Душанбе</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed animate-fade-in-up animation-delay-200">
            Лучшие места для вкусной еды в Душанбе
          </p>
        </div>

        <RestaurantList />
      </div>
    </div>
  )
}
