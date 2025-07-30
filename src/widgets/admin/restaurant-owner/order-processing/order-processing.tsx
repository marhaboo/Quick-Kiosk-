"use client"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card"
import { Button } from "@/shared/ui/button"
import { ShoppingCart, Clock, CheckCircle, DollarSign, CreditCard, Banknote } from "lucide-react"

interface Order {
  id: string
  tableNumber?: number
  customerName?: string
  items: Array<{
    name: string
    quantity: number
    price: number
  }>
  total: number
  status: "ready" | "preparing" | "paid"
  orderTime: string
  paymentMethod?: "cash" | "card" | "digital"
}

export default function OrderProcessing() {
  const [orders] = useState<Order[]>([
    {
      id: "#1250",
      tableNumber: 5,
      customerName: "Анна Козлова",
      items: [
        { name: "Бургер «Московский»", quantity: 2, price: 450 },
        { name: "Картофель фри", quantity: 1, price: 180 },
        { name: "Кока-Кола", quantity: 2, price: 120 },
      ],
      total: 1320,
      status: "ready",
      orderTime: "19:30",
    },
    {
      id: "#1249",
      tableNumber: 12,
      customerName: "Владимир Смирнов",
      items: [
        { name: "Пицца «Четыре сыра»", quantity: 1, price: 680 },
        { name: "Салат «Цезарь» с курицей", quantity: 1, price: 380 },
      ],
      total: 1060,
      status: "ready",
      orderTime: "19:25",
    },
    {
      id: "#1248",
      customerName: "Елена Волкова (Навынос)",
      items: [
        { name: "Стейк из лосося", quantity: 1, price: 890 },
        { name: "Овощи гриль", quantity: 1, price: 250 },
      ],
      total: 1140,
      status: "preparing",
      orderTime: "19:40",
    },
    {
      id: "#1247",
      tableNumber: 8,
      customerName: "Игорь Петров",
      items: [
        { name: "Борщ украинский", quantity: 2, price: 280 },
        { name: "Хлеб черный", quantity: 1, price: 60 },
        { name: "Сметана", quantity: 2, price: 40 },
      ],
      total: 700,
      status: "ready",
      orderTime: "19:10",
    },
  ])

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ready":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "preparing":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "paid":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "ready":
        return "Готов к оплате"
      case "preparing":
        return "Готовится"
      case "paid":
        return "Оплачен"
      default:
        return status
    }
  }

  const getPaymentMethodText = (method: string) => {
    switch (method) {
      case "cash":
        return "наличные"
      case "card":
        return "карту"
      case "digital":
        return "цифровой кошелек"
      default:
        return method
    }
  }

  const handlePayment = (orderId: string, method: "cash" | "card" | "digital") => {
    console.log(`Обработка платежа для ${orderId} через ${method}`)
    // Здесь будет обработка реального платежа
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-white">Обработка Заказов</h1>
          <p className="text-gray-400 mt-1">Обрабатывайте платежи и управляйте заказами</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Orders List */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-semibold text-white">Активные Заказы</h2>
          {orders.map((order) => (
            <Card
              key={order.id}
              className={`border border-[#333333] bg-[#1a1a1a] hover:border-orange-500/30 transition-all duration-300 cursor-pointer ${
                selectedOrder?.id === order.id ? "border-orange-500/50" : ""
              }`}
              onClick={() => setSelectedOrder(order)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-500/20 border border-blue-500/30 rounded-lg">
                      <ShoppingCart className="h-4 w-4 text-blue-400" />
                    </div>
                    <div>
                      <CardTitle className="text-lg text-white">Заказ {order.id}</CardTitle>
                      <p className="text-sm text-gray-400">
                        {order.tableNumber ? `Стол ${order.tableNumber}` : "На вынос"} • {order.customerName}
                      </p>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
                    {getStatusText(order.status)}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-1">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span className="text-gray-300">
                        {item.quantity}x {item.name}
                      </span>
                      <span className="text-gray-300">{(item.price * item.quantity).toFixed(0)}₽</span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-gray-700">
                  <span className="text-sm text-gray-400">Итого</span>
                  <span className="text-lg font-bold text-green-400">{order.total.toFixed(0)}₽</span>
                </div>
                <div className="flex justify-between items-center text-xs text-gray-400">
                  <span>Заказан в {order.orderTime}</span>
                  {order.paymentMethod && (
                    <span className="capitalize">Оплачен через {getPaymentMethodText(order.paymentMethod)}</span>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Payment Panel */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-white">Обработка Платежей</h2>

          {selectedOrder ? (
            <Card className="border border-[#333333] bg-[#1a1a1a]">
              <CardHeader>
                <CardTitle className="text-white">Обработать Платеж</CardTitle>
                <p className="text-gray-400">Заказ {selectedOrder.id}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-gray-800/50 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Общая Сумма</span>
                    <span className="text-2xl font-bold text-green-400">{selectedOrder.total.toFixed(0)}₽</span>
                  </div>
                </div>

                {selectedOrder.status === "ready" && (
                  <div className="space-y-3">
                    <p className="text-sm text-gray-400">Выберите способ оплаты:</p>

                    <Button
                      className="w-full bg-green-500 hover:bg-green-600 text-white"
                      onClick={() => handlePayment(selectedOrder.id, "cash")}
                    >
                      <Banknote className="h-4 w-4 mr-2" />
                      Наличные
                    </Button>

                    <Button
                      className="w-full bg-blue-500 hover:bg-blue-600 text-white"
                      onClick={() => handlePayment(selectedOrder.id, "card")}
                    >
                      <CreditCard className="h-4 w-4 mr-2" />
                      Банковская Карта
                    </Button>

                    <Button
                      className="w-full bg-purple-500 hover:bg-purple-600 text-white"
                      onClick={() => handlePayment(selectedOrder.id, "digital")}
                    >
                      <DollarSign className="h-4 w-4 mr-2" />
                      Цифровой Кошелек
                    </Button>
                  </div>
                )}

                {selectedOrder.status === "preparing" && (
                  <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg text-center">
                    <Clock className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
                    <p className="text-yellow-400 text-sm">Заказ еще готовится</p>
                  </div>
                )}

                {selectedOrder.status === "paid" && (
                  <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg text-center">
                    <CheckCircle className="h-8 w-8 text-green-400 mx-auto mb-2" />
                    <p className="text-green-400 text-sm">Платеж завершен</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ) : (
            <Card className="border border-[#333333] bg-[#1a1a1a]">
              <CardContent className="p-8 text-center">
                <ShoppingCart className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400">Выберите заказ для обработки платежа</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
