"use client"

import Link from "next/link"
import { Button } from "@/shared/ui/button"
import { Card } from "@/shared/ui/card"
import { Plus, Store, Star, Users, TrendingUp } from "lucide-react"
import { useTheme } from "next-themes"
import { cn } from "@/shared/lib/utils"

export function AddRestaurantSection() {
  const { theme } = useTheme()

  return (
    <div className="py-20 px-6">
      <div className="container mx-auto">
        <Card
          id="restaurant-form"
          className={cn(
            "rounded-3xl p-8 md:p-12",
            theme === "dark"
              ? "bg-black/40 backdrop-blur-md border border-white/10"
              : "bg-white shadow-lg border border-gray-100",
          )}
        >
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Store className="w-8 h-8 text-white" />
            </div>
            <h2
              className={cn("text-3xl md:text-4xl font-bold mb-4", theme === "dark" ? "text-white" : "text-gray-900")}
            >
              Добавьте свой ресторан
            </h2>
            <p
              className={cn(
                "text-xl max-w-2xl mx-auto leading-relaxed",
                theme === "dark" ? "text-gray-300" : "text-gray-700",
              )}
            >
              Присоединяйтесь к нашей платформе и привлекайте больше клиентов в свой ресторан
            </p>
          </div>
          {/* Преимущества */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Users className="w-6 h-6 text-orange-400" />
              </div>
              <h3 className={cn("font-semibold mb-2", theme === "dark" ? "text-white" : "text-gray-900")}>
                Больше клиентов
              </h3>
              <p className={cn("text-sm", theme === "dark" ? "text-gray-400" : "text-gray-600")}>
                Привлекайте новых посетителей через нашу платформу
              </p>
            </div>
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Star className="w-6 h-6 text-orange-400" />
              </div>
              <h3 className={cn("font-semibold mb-2", theme === "dark" ? "text-white" : "text-gray-900")}>
                Отзывы и рейтинг
              </h3>
              <p className={cn("text-sm", theme === "dark" ? "text-gray-400" : "text-gray-600")}>
                Получайте обратную связь и повышайте качество
              </p>
            </div>
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="w-6 h-6 text-orange-400" />
              </div>
              <h3 className={cn("font-semibold mb-2", theme === "dark" ? "text-white" : "text-gray-900")}>
                Рост продаж
              </h3>
              <p className={cn("text-sm", theme === "dark" ? "text-gray-400" : "text-gray-600")}>
                Увеличивайте доходы с помощью онлайн-заказов
              </p>
            </div>
          </div>
          {/* Кнопка действия */}
          <div className="text-center">
            <Link href="/add-restaurant">
              <Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold px-8 py-4 rounded-2xl text-lg flex items-center gap-3 mx-auto transition-all duration-200 shadow-lg shadow-orange-500/20">
                <Plus className="w-5 h-5" />
                Добавить ресторан
              </Button>
            </Link>
            <p className={cn("text-sm mt-4", theme === "dark" ? "text-gray-400" : "text-gray-500")}>
              Бесплатная регистрация • Быстрое подключение • Поддержка 24/7
            </p>
          </div>
        </Card>
      </div>
    </div>
  )
}
