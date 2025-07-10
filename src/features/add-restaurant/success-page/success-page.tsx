import Link from "next/link"
import { Button } from "@/shared/ui/button"
import { Card } from "@/shared/ui/card"

export function SuccessPage() {
  return (
    <div className="min-h-screen bg-[#0F0F0F] flex items-center justify-center p-6">
      <Card className="bg-[#1A1A1A] border border-[#333333] rounded-3xl p-8 text-center max-w-md w-full">
        <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-white mb-4">Заявка отправлена!</h2>
        <p className="text-gray-400 mb-6">
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
