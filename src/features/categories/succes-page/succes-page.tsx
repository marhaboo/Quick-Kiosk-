"use client"

import { Button } from "@/shared/ui/button"
import { Card } from "@/shared/ui/card"
import { useTheme } from "next-themes"
import { cn } from "@/shared/lib/utils"

interface SuccessOrderProps {
  orderType: "Pickup" | "Delivery" | "AtTable"
  onClose: () => void
}

export function SuccessOrder({ orderType, onClose }: SuccessOrderProps) {
  const { theme } = useTheme()

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center p-6",
        theme === "dark" ? "bg-[#0F0F0F]/80" : "bg-neutral-100/80",
      )}
    >
      <Card
        className={cn(
          "rounded-3xl p-8 text-center max-w-md w-full",
          theme === "dark"
            ? "bg-[#1A1A1A] border border-[#333333]"
            : "bg-white border border-gray-200 shadow-sm",
        )}
      >
        {/* Иконка успеха */}
        <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-8 h-8 text-green-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        {/* Заголовок */}
        <h2
          className={cn(
            "text-2xl font-bold mb-4",
            theme === "dark" ? "text-white" : "text-gray-900",
          )}
        >
          Заказ принят!
        </h2>

        {/* Текст в зависимости от типа заказа */}
        <p
          className={cn(
            "mb-6",
            theme === "dark" ? "text-gray-400" : "text-gray-600",
          )}
        >
          {orderType === "Pickup" && "Ваш заказ будет готов через 15-20 минут"}
          {orderType === "Delivery" && "Ваш заказ будет доставлен в течение 30-45 минут"}
          {orderType === "AtTable" && "Столик забронирован на указанное время"}
        </p>

        {/* Кнопка */}
        <Button
          onClick={onClose}
          className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-xl"
        >
          Сделать новый заказ
        </Button>
      </Card>
    </div>
  )
}
