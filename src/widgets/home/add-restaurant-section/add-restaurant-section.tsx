"use client"

import Link from "next/link"
import { Button } from "@/shared/ui/button"
import { Card } from "@/shared/ui/card"
import { Plus, Store, Star, Users, TrendingUp } from "lucide-react"

export function AddRestaurantSection() {
  return (
    <div className="py-20 px-6">
      <div className="container mx-auto">
        <Card id="restaurant-form" className="bg-black/40 backdrop-blur-md border border-white/10 rounded-3xl p-8 md:p-12">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Store className="w-8 h-8 text-white" />
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Добавьте свой ресторан</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Присоединяйтесь к нашей платформе и привлекайте больше клиентов в свой ресторан
            </p>
          </div>

          {/* Преимущества */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Users className="w-6 h-6 text-orange-400" />
              </div>
              <h3 className="text-white font-semibold mb-2">Больше клиентов</h3>
              <p className="text-gray-400 text-sm">Привлекайте новых посетителей через нашу платформу</p>
            </div>

            <div className="text-center p-4">
              <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Star className="w-6 h-6 text-orange-400" />
              </div>
              <h3 className="text-white font-semibold mb-2">Отзывы и рейтинг</h3>
              <p className="text-gray-400 text-sm">Получайте обратную связь и повышайте качество</p>
            </div>

            <div className="text-center p-4">
              <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="w-6 h-6 text-orange-400" />
              </div>
              <h3 className="text-white font-semibold mb-2">Рост продаж</h3>
              <p className="text-gray-400 text-sm">Увеличивайте доходы с помощью онлайн-заказов</p>
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

            <p className="text-gray-400 text-sm mt-4">Бесплатная регистрация • Быстрое подключение • Поддержка 24/7</p>
          </div>
        </Card>
      </div>
    </div>
  )
}
