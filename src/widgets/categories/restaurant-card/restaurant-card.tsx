import Image, { type StaticImageData } from "next/image"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card"
import { Badge } from "@/shared/ui/badge"

interface Restaurant {
  id: number
  name: string
  description: string
  image: StaticImageData
  cuisine: string
}

interface RestaurantCardProps {
  restaurant: Restaurant
}

export function RestaurantCard({ restaurant }: RestaurantCardProps) {
  return (
    <Link href={`/restaurant/${restaurant.id}`}>
      <Card className="group relative overflow-hidden bg-black/40 backdrop-blur-md border border-white/10 hover:border-orange-500/50 transition-all duration-500 cursor-pointer hover:shadow-2xl hover:shadow-orange-500/20 hover:-translate-y-2">
        {/* Градиентный оверлей */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        <div className="relative overflow-hidden">
          <Image
            src={restaurant.image || "/placeholder.svg"}
            alt={restaurant.name}
            width={300}
            height={200}
            className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
          />

          {/* Градиентный оверлей на изображение */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

          <div className="absolute top-4 left-4">
            <Badge className="bg-orange-500/90 text-white border-0 hover:bg-orange-500 backdrop-blur-sm font-medium px-3 py-1">
              {restaurant.cuisine}
            </Badge>
          </div>

          {/* Декоративный элемент */}
          <div className="absolute top-4 right-4 w-2 h-2 bg-orange-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>

        <CardHeader className="pb-3 relative z-10">
          <CardTitle className="text-2xl font-bold text-white group-hover:text-orange-400 transition-colors duration-300">
            {restaurant.name}
          </CardTitle>
        </CardHeader>

        <CardContent className="pt-0 relative z-10">
          <CardDescription className="text-gray-300 leading-relaxed text-base group-hover:text-gray-200 transition-colors duration-300">
            {restaurant.description}
          </CardDescription>

          {/* Декоративная линия */}
          <div className="mt-4 h-0.5 bg-gradient-to-r from-orange-500 to-transparent w-0 group-hover:w-full transition-all duration-500"></div>
        </CardContent>
      </Card>
    </Link>
  )
}
