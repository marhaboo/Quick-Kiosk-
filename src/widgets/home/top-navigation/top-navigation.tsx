"use client"

import Link from "next/link"
import { Button } from "@/shared/ui/button"
import { LogIn, Briefcase, UtensilsCrossed, ArrowDown } from "lucide-react"

export function TopNavigation() {
  const handleScroll = () => {
    const target = document.getElementById("restaurant-form")
    if (target) {
      target.scrollIntoView({ behavior: "smooth" })
    }
  }
  return (
    <div className="w-full">
      {/* Указатель баннер */}
      <div className="w-full bg-gradient-to-r from-orange-500 to-orange-600 py-2 px-6"
        onClick={handleScroll}>
        <div className="container mx-auto flex items-center justify-center gap-2 text-white text-sm font-medium">
          <span>Внизу можно добавить свой ресторан</span>
          <ArrowDown className="w-4 h-4 animate-bounce" />
        </div>
      </div>

      {/* Основная навигация */}
      <div className="py-4 px-6">
        <div className="container mx-auto flex items-center justify-between">
          {/* Логотип */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
              <UtensilsCrossed className="w-6 h-6 text-white" />
            </div>
            <span className="text-white font-bold text-xl">ResNet</span>
          </Link>

          {/* Кнопки справа */}
          <div className="flex items-center gap-4">
            {/* Заявка на работу */}
            <Link href="/job-application">
              <Button
                variant="ghost"
                className="text-white hover:text-orange-400 hover:bg-white/10 border border-white/20 hover:border-orange-500/50 px-4 py-2 rounded-xl transition-all duration-200"
              >
                <Briefcase className="w-4 h-4 mr-2" />
                Заявка на работу
              </Button>
            </Link>

            {/* Вход */}
            <Link href="/login">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2 rounded-xl flex items-center gap-2 transition-all duration-200 shadow-lg shadow-orange-500/20">
                <LogIn className="w-4 h-4" />
                Вход
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
