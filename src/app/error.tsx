"use client"

import { useEffect } from "react"
import Link from "next/link"
import { Home, RefreshCw, AlertCircle } from "lucide-react"
import { Button } from "@/shared/ui/button"
import { Card } from "@/shared/ui/card"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen bg-[#0F0F0F] flex items-center justify-center p-6">
      <div className="max-w-2xl w-full">
        <Card className="bg-[#1A1A1A] border border-[#333333] rounded-3xl p-8 text-center">
          {/* Иконка ошибки */}
          <div className="mb-8">
            <div className="w-24 h-24 mx-auto rounded-full bg-red-500/20 border border-red-500/30 flex items-center justify-center">
              <AlertCircle className="w-12 h-12 text-red-400" />
            </div>
          </div>

          {/* Заголовок */}
          <div className="mb-6">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Что-то пошло не так</h1>
            <p className="text-gray-400 text-lg leading-relaxed">
              Произошла непредвиденная ошибка. Попробуйте обновить страницу или вернуться на главную.
            </p>
          </div>

          {/* Кнопки действий */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              onClick={reset}
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-2xl flex items-center gap-2 transition-all duration-200"
            >
              <RefreshCw className="w-5 h-5" />
              Попробовать снова
            </Button>

            <Link href="/">
              <Button
                variant="ghost"
                className="text-gray-300 hover:text-white hover:bg-[#2A2730] border border-[#333333] px-6 py-3 rounded-2xl flex items-center gap-2 transition-all duration-200"
              >
                <Home className="w-5 h-5" />
                На главную
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  )
}
