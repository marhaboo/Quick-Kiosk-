"use client"

import Link from "next/link"
import { Button } from "@/shared/ui/button"
import { Card } from "@/shared/ui/card"
import { useTheme } from "next-themes" // Import useTheme
import { cn } from "@/shared/lib/utils" // Import cn

export function SuccessPage() {
  const { theme } = useTheme() // Get current theme

  return (
    <div
      className={cn(
        "min-h-screen flex items-center justify-center p-6",
        theme === "dark" ? "bg-[#0F0F0F]" : "bg-neutral-100",
      )}
    >
      <Card
        className={cn(
          "rounded-3xl p-8 text-center max-w-md w-full",
          theme === "dark" ? "bg-[#1A1A1A] border border-[#333333]" : "bg-white border border-gray-200 shadow-sm",
        )}
      >
        <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className={cn("text-2xl font-bold mb-4", theme === "dark" ? "text-white" : "text-gray-900")}>
          Заявка отправлена!
        </h2>
        <p className={cn("mb-6", theme === "dark" ? "text-gray-400" : "text-gray-600")}>
          Мы рассмотрим вашу заявку на добавление ресторана и свяжемся с вами в течение 24 часов.
        </p>
        <Link href="/">
          <Button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-xl">
            Вернуться на главную
          </Button>
        </Link>
      </Card>
    </div>
  )
}
