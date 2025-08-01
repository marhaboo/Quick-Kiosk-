"use client"

import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card"
import { Badge } from "@/shared/ui/badge"
import type { Restaurant } from "@/entities/home/models/types"
import { API_BASE_URL } from "@/shared/utils/image-utils"
import { Armchair, Clock, MapPin, Phone, Utensils } from "lucide-react"
import { useRouter } from "next/navigation"
import { useTheme } from "next-themes"
import { cn } from "@/shared/lib/utils"
// Removed: import { useTranslations } from "next-intl"

interface RestaurantCardProps {
  restaurant: Restaurant
}

export function RestaurantCard({ restaurant }: RestaurantCardProps) {
  const availableTables = restaurant.tables?.filter((t) => t.status === "Available").length || 0
  const menuCount = restaurant.menu?.length || 0
  const router = useRouter()
  const { theme } = useTheme()
  // Removed: const t = useTranslations("RestaurantCard")

  return (
    <Card
      onClick={() => router.push(`/restaurant/${restaurant.id}`)}
      className={cn(
        "group pt-0 gap-2.5 relative overflow-hidden transition-all duration-500 cursor-pointer",
        theme === "dark"
          ? "bg-black/40 backdrop-blur-md border border-white/10 hover:border-orange-500/50 hover:shadow-2xl hover:shadow-orange-500/20 hover:-translate-y-2"
          : "bg-white rounded-xl shadow-md border border-gray-100 hover:border-orange-300 hover:shadow-lg hover:shadow-orange-100 hover:-translate-y-2",
      )}
    >
      {/* Градиентный оверлей */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="relative overflow-hidden">
        <Image
          src={restaurant.imageUrl ? `${API_BASE_URL}${restaurant.imageUrl}` : "/placeholder.svg?height=200&width=300"}
          alt={restaurant.name}
          width={300}
          height={200}
          className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-t via-transparent to-transparent",
            theme === "dark" ? "from-black/60" : "from-black/20",
          )}
        ></div>
        <div className="absolute top-4 left-4">
          <Badge className="bg-orange-500/90 text-white border-0 hover:bg-orange-500 backdrop-blur-sm font-medium px-3 py-1">
            {restaurant.cuisine}
          </Badge>
        </div>
        <div className="absolute top-4 right-4 w-2 h-2 bg-orange-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div
          className={cn(
            "absolute bottom-4 left-4 text-sm px-2 py-1 rounded shadow",
            theme === "dark" ? "bg-black/60 text-white" : "bg-white/80 text-gray-900",
          )}
        >
          ⭐ {restaurant.rating.toFixed(1)}
        </div>
      </div>
      <CardHeader className=" relative z-10">
        <CardTitle
          className={cn(
            "text-2xl font-bold group-hover:text-orange-400 transition-colors duration-300",
            theme === "dark" ? "text-white" : "text-gray-900",
          )}
        >
          {restaurant.name}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0 relative z-10">
        <CardDescription
          className={cn(
            "pt-0 leading-relaxed text-sm transition-colors duration-300",
            theme === "dark" ? "text-gray-300 group-hover:text-gray-200" : "text-gray-600 group-hover:text-gray-700",
          )}
        >
          {restaurant.description.length > 100 ? restaurant.description.slice(0, 100) + "..." : restaurant.description}
        </CardDescription>
        <div className={cn("mt-6 space-y-0.5 text-sm", theme === "dark" ? "text-white" : "text-gray-700")}>
          {/* Адрес */}
          <p className={cn("flex items-center gap-2", theme === "dark" ? "text-gray-400" : "text-gray-500")}>
            <MapPin className="w-4 h-4" />
            {restaurant.address}
          </p>
          {/* Телефон */}
          <Link href={`tel:${restaurant.phone}`} className="flex items-center gap-2 text-orange-400 hover:underline">
            <Phone className="w-4 h-4" />
            {restaurant.phone}
          </Link>
          {/* Время работы */}
          <p className={cn("flex items-center gap-2", theme === "dark" ? "text-gray-400" : "text-gray-500")}>
            <Clock className="w-4 h-4" />
            {restaurant.openingHours}
          </p>
          {/* Кол-во блюд */}
          {menuCount > 0 && (
            <p className={cn("flex items-center gap-2", theme === "dark" ? "text-gray-300" : "text-gray-600")}>
              <Utensils className="w-4 h-4" />
              {menuCount} блюд(а)
            </p>
          )}
          {/* Столики */}
          {availableTables > 0 && (
            <p className={cn("flex items-center gap-2", theme === "dark" ? "text-gray-300" : "text-gray-600")}>
              <Armchair className="w-4 h-4" />
              {availableTables} свободных столико��
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
