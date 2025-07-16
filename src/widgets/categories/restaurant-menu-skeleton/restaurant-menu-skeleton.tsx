export default function RestaurantMenuSkeleton() {
  return (
    <div className="p-6 animate-pulse">
      {/* Скелетон заголовка */}
      <div className="flex gap-4 mb-6">
        <div className="h-16 bg-gray-700 rounded-3xl flex-1"></div>
        <div className="h-16 w-32 bg-gray-700 rounded-3xl"></div>
        <div className="h-16 w-48 bg-gray-700 rounded-3xl"></div>
      </div>

      <div className="flex gap-7">
        {/* Скелетон основного контента */}
        <div className="flex-1">
          {/* Скелетон категорий */}
          <div className="mb-6">
            <div className="h-6 w-32 bg-gray-700 rounded mb-4"></div>
            <div className="flex gap-6 p-4 border border-gray-600 rounded-3xl">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="w-14 h-14 bg-gray-700 rounded-2xl mb-3"></div>
                  <div className="h-4 w-16 bg-gray-700 rounded"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Скелетон сетки меню */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-16">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="relative mb-10">
                <div className="absolute -top-18 left-1/2 transform -translate-x-1/2 z-10">
                  <div className="w-34 h-34 bg-gray-700 rounded-full"></div>
                </div>
                <div className="border border-gray-600 rounded-3xl pt-16 pb-6 px-6">
                  <div className="text-center space-y-3">
                    <div className="h-6 bg-gray-700 rounded mx-auto w-3/4"></div>
                    <div className="h-4 bg-gray-700 rounded mx-auto w-1/2"></div>
                    <div className="h-8 bg-gray-700 rounded mx-auto w-20"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Скелетон корзины */}
        <div className="w-80">
          <div className="h-6 w-24 bg-gray-700 rounded mb-6"></div>
          <div className="border border-gray-600 rounded-3xl p-4">
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-24 bg-gray-700 rounded-2xl"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

