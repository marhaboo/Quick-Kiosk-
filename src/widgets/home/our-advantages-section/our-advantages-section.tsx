"use client"

import { Card } from "@/shared/ui/card"
import { CheckCircle, Heart, Shield, Zap } from "lucide-react"
import { useTheme } from "next-themes"
import { cn } from "@/shared/lib/utils"


export function OurAdvantagesSection() {
  const { theme } = useTheme()
  // Removed: const t = useTranslations("OurAdvantagesSection")

  const advantages = [
    {
      icon: <CheckCircle className="w-8 h-8 text-orange-500" />,
      title: "Простота использования",
      description: "Интуитивно понятный интерфейс для быстрого поиска и бронирования.",
    },
    {
      icon: <Heart className="w-8 h-8 text-orange-500" />,
      title: "Любимые места",
      description: "Сохраняйте избранные рестораны и получайте персональные рекомендации.",
    },
    {
      icon: <Shield className="w-8 h-8 text-orange-500" />,
      title: "Безопасность данных",
      description: "Мы гарантируем конфиденциальность и защиту вашей личной информации.",
    },
    {
      icon: <Zap className="w-8 h-8 text-orange-500" />,
      title: "Быстрые бронирования",
      description: "Мгновенное подтверждение бронирования столика в несколько кликов.",
    },
  ]

  return (
    <div className="py-20 px-6">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className={cn("text-3xl md:text-4xl font-bold mb-4", theme === "dark" ? "text-white" : "text-gray-900")}>
            Почему выбирают нас?
          </h2>
          <p
            className={cn(
              "text-xl max-w-3xl mx-auto leading-relaxed",
              theme === "dark" ? "text-gray-300" : "text-gray-700",
            )}
          >
            Мы стремимся предоставить лучший опыт для поиска и бронирования ресторанов в Душанбе.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {advantages.map((advantage, index) => (
            <Card
              key={index}
              className={cn(
                "p-6 text-center rounded-xl shadow-md transition-all duration-300",
                theme === "dark"
                  ? "bg-black/40 backdrop-blur-md border border-white/10 hover:border-orange-500/50"
                  : "bg-white border border-gray-100 hover:border-orange-300",
              )}
            >
              <div className="mb-4 flex justify-center">{advantage.icon}</div>
              <h3 className={cn("text-xl font-semibold mb-2", theme === "dark" ? "text-white" : "text-gray-900")}>
                {advantage.title}
              </h3>
              <p className={cn("text-sm leading-relaxed", theme === "dark" ? "text-gray-400" : "text-gray-600")}>
                {advantage.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
