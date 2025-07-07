"use client"

import Link from "next/link"
import { Home, ArrowLeft, AlertTriangle } from "lucide-react"
import { Button } from "@/shared/ui/button"
import { Card } from "@/shared/ui/card"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0F0F0F] flex items-center justify-center p-6">
      <div className="max-w-2xl w-full">
        {/* Основная карточка */}
        <Card className="bg-[#1A1A1A] border border-[#333333] rounded-3xl p-8 text-center">
          {/* Иконка ошибки */}
          <div className="mb-8">
            <div className="w-24 h-24 mx-auto rounded-full bg-orange-500/20 border border-orange-500/30 flex items-center justify-center">
              <AlertTriangle className="w-12 h-12 text-orange-400" />
            </div>
          </div>

          {/* Заголовок 404 */}
          <div className="mb-6">
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-4">
              4<span className="text-orange-500">0</span>4
            </h1>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Страница не найдена</h2>
            <p className="text-gray-400 text-lg leading-relaxed">
              К сожалению, запрашиваемая страница не существует или была перемещена
            </p>
          </div>

          {/* Кнопки действий */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Link href="/">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-2xl flex items-center gap-2 transition-all duration-200">
                <Home className="w-5 h-5" />
                На главную
              </Button>
            </Link>

            <Button
              variant="ghost"
              onClick={() => window.history.back()}
              className="text-gray-300 hover:text-white hover:bg-[#2A2730] border border-[#333333] px-6 py-3 rounded-2xl flex items-center gap-2 transition-all duration-200"
            >
              <ArrowLeft className="w-5 h-5" />
              Назад
            </Button>
          </div>

          {/* Дополнительные ссылки */}
          <div className="border-t border-[#333333] pt-6">
            <p className="text-gray-400 mb-4">Возможно, вас заинтересует:</p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link href="/restaurant/1">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-300 hover:text-orange-400 hover:bg-orange-500/10 border border-[#333333] rounded-xl px-4 py-2 transition-all duration-200"
                >
                  Меню ресторанов
                </Button>
              </Link>

              <Link href="/cart">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-300 hover:text-orange-400 hover:bg-orange-500/10 border border-[#333333] rounded-xl px-4 py-2 transition-all duration-200"
                >
                  Корзина
                </Button>
              </Link>

              <Link href="/orders">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-300 hover:text-orange-400 hover:bg-orange-500/10 border border-[#333333] rounded-xl px-4 py-2 transition-all duration-200"
                >
                  Заказы
                </Button>
              </Link>
            </div>
          </div>
        </Card>

        {/* Декоративные элементы */}
        <div className="absolute top-20 left-20 w-2 h-2 bg-orange-500 rounded-full opacity-60 animate-pulse"></div>
        <div
          className="absolute bottom-20 right-20 w-3 h-3 bg-orange-400 rounded-full opacity-40 animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-10 w-1 h-1 bg-orange-300 rounded-full opacity-50 animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>
    </div>
  )
}
