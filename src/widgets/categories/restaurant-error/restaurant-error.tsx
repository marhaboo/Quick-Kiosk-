import { AlertCircle } from "lucide-react";

export default function RestaurantError({ error }: { error: string | null }) {
  return (
    <div className="p-6 py-16 text-center">
      <div className="max-w-md mx-auto">
        <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertCircle className="w-8 h-8 text-red-400" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-4">Ресторан не найден</h2>
        <p className="text-gray-400 mb-6">{error || "Запрашиваемый ресторан не существует или временно недоступен"}</p>
        <div className="space-y-3">
          <button
            onClick={() => window.history.back()}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-xl transition-colors"
          >
            Вернуться назад
          </button>
          <a
            href="/"
            className="block w-full bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors"
          >
            На главную
          </a>
        </div>
      </div>
    </div>
  )
}