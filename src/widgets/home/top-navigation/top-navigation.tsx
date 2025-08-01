"use client"

import Link from "next/link"
import { Button } from "@/shared/ui/button"
import { LogIn, Briefcase, UtensilsCrossed, ArrowDown, Sun, Moon } from "lucide-react"
import { useTheme } from "next-themes"
import { cn } from "@/shared/lib/utils"


export function TopNavigation() {
  const { theme, setTheme } = useTheme()

  const handleScroll = () => {
    const target = document.getElementById("restaurant-form")
    if (target) {
      target.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="w-full">
      <div
        className="w-full bg-gradient-to-r from-orange-500 to-orange-600 py-2 px-6 cursor-pointer"
        onClick={handleScroll}
      >
        <div className="container mx-auto flex items-center justify-center gap-2 text-white text-sm font-medium">
          <span>Внизу можно добавить свой ресторан</span>
          <ArrowDown className="w-4 h-4 animate-bounce" />
        </div>
      </div>
  
      <div
        className={cn(
          "py-4 px-6",
          theme === "dark"
            ? "bg-black/40 backdrop-blur-md border-b border-white/10"
            : "bg-white border-b border-gray-100 shadow-sm",
        )}
      >
        <div className="container mx-auto flex items-center justify-between">
          {/* Логотип */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
              <UtensilsCrossed className="w-6 h-6 text-white" />
            </div>
            <span className={cn("font-bold text-xl", theme === "dark" ? "text-white" : "text-gray-900")}>ResNet</span>
          </Link>
          {/* Кнопки справа */}
          <div className="flex items-center gap-4">
            {/* Заявка на работу */}
            <Link href="/job-application">
              <Button
                variant="ghost"
                className={cn(
                  "px-4 py-2 rounded-xl transition-all duration-200",
                  theme === "dark"
                    ? "text-white hover:text-orange-400 hover:bg-white/10 border border-white/20 hover:border-orange-500/50"
                    : "text-gray-700 hover:text-orange-500 hover:bg-gray-100 border border-gray-200 hover:border-orange-200",
                )}
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
            {/* Theme Toggle Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className={cn(
                "rounded-xl transition-all duration-200",
                theme === "dark"
                  ? "text-white hover:text-orange-400 hover:bg-white/10 border border-white/20 hover:border-orange-500/50"
                  : "text-gray-700 hover:text-orange-500 hover:bg-gray-100 border border-gray-200 hover:border-orange-200",
              )}
            >
              {theme === "dark" ? (
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all " />
              ) : (
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              )}
              <span className="sr-only">Переключить тему</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
