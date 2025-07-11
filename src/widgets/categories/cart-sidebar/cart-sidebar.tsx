"use client"

import { useState } from "react"
import Image from "next/image"
import { Plus, Minus, MapPin, Clock, CalendarCheck, Truck, Store, User, Phone } from "lucide-react"
import { Button } from "@/shared/ui/button"
import { Card } from "@/shared/ui/card"
import { Input } from "@/shared/ui/input"
import type { CartItem } from "../restaurant-menu/restaurant-menu"

interface CartSidebarProps {
  items: CartItem[]
  totalAmount: number
  onUpdateQuantity: (itemId: number, quantity: number) => void
  onRemoveItem: (itemId: number) => void
}

type OrderType = "pickup" | "delivery" | "table"

export function CartSidebar({ items, totalAmount, onUpdateQuantity }: CartSidebarProps) {
  const [orderType, setOrderType] = useState<OrderType>("pickup")
  const [deliveryAddress, setDeliveryAddress] = useState("")
  const [selectedTable, setSelectedTable] = useState("")
  const [reservationTime, setReservationTime] = useState("")
  const [deliveryName, setDeliveryName] = useState("")
  const [deliveryPhone, setDeliveryPhone] = useState("")

  const deliveryFee = orderType === "delivery" ? 10 : 0
  const finalAmount = totalAmount + deliveryFee

  return (
    <div className="w-80 backdrop-blur-md">
      <h2 className="text-white text-lg my-6 font-semibold">Корзина</h2>
      <div className="border border-[#3D3A46] rounded-3xl p-4">
        {/* Кнопка очистить корзину */}
        <div className="mb-6 flex justify-end">
          <Button
            variant="ghost"
            size="sm"
            className="text-orange-400 hover:text-orange-300 hover:bg-orange-500/10 px-4 py-2 rounded-xl border border-orange-500/30"
          >
            Очистить корзину
          </Button>
        </div>

        {/* Список товаров */}
        <div className="space-y-3 mb-6 max-h-96 min-h-96 overflow-y-auto">
          {items.length === 0 ? (
            <p className="text-gray-400 text-center py-8">Корзина пуста</p>
          ) : (
            items.map((item) => (
              <Card key={item.id} className="bg-[#222125]/60 border border-[#3D3A46] p-4 rounded-2xl">
                <div className="flex items-start gap-4">
                  {/* Изображение товара */}
                  <div className="w-[100px] h-[104px] rounded-2xl overflow-hidden bg-white/10 flex-shrink-0">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      width={100}
                      height={104}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Информация о товаре */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-white font-semibold text-base mb-1">{item.name}</h4>
                    <div className="flex flex-col gap-2">
                      {/* Цена */}
                      <p className="text-white font-bold text-sm">{item.price.toFixed(2)} сомони</p>

                      {/* Кнопки изменения количества */}
                      <div className="flex items-center bg-[#2A2730] rounded-full p-1 w-fit border border-[#3D3A46]">
                        <div className="bg-[#1A1A1A] rounded-full w-8 h-8 flex items-center justify-center">
                          <span className="text-white font-bold text-sm">{item.quantity}</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 p-0 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-full mx-1"
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <div className="w-px h-4 bg-[#3D3A46]"></div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 p-0 text-green-400 hover:text-green-300 hover:bg-green-500/20 rounded-full mx-1"
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>

        {/* Тип заказа и оформление */}
        {items.length > 0 && (
          <div className="space-y-4">
            {/* Выбор типа заказа */}
            <div className="space-y-3">
              <h3 className="text-white font-semibold text-sm">Тип заказа:</h3>

              <div className="grid grid-cols-1 gap-2">
                {/* Самовывоз */}
                <button
                  onClick={() => setOrderType("pickup")}
                  className={`flex items-center gap-3 p-3 rounded-2xl border transition-all ${
                    orderType === "pickup"
                      ? "border-orange-500/50 bg-orange-500/10"
                      : "border-[#3D3A46] bg-[#2A2730]/50 hover:bg-[#2A2730]/80"
                  }`}
                >
                  <Store className="w-5 h-5 text-orange-400" />
                  <div className="text-left">
                    <p className="text-white font-medium text-sm">Самовывоз</p>
                    <p className="text-gray-400 text-xs">Готов через 15-20 мин</p>
                  </div>
                </button>

                {/* Доставка */}
                <button
                  onClick={() => setOrderType("delivery")}
                  className={`flex items-center gap-3 p-3 rounded-2xl border transition-all ${
                    orderType === "delivery"
                      ? "border-orange-500/50 bg-orange-500/10"
                      : "border-[#3D3A46] bg-[#2A2730]/50 hover:bg-[#2A2730]/80"
                  }`}
                >
                  <Truck className="w-5 h-5 text-blue-400" />
                  <div className="text-left">
                    <p className="text-white font-medium text-sm">Доставка</p>
                    <p className="text-gray-400 text-xs">30-45 мин • +10 сомони</p>
                  </div>
                </button>

                {/* Столик */}
                <button
                  onClick={() => setOrderType("table")}
                  className={`flex items-center gap-3 p-3 rounded-2xl border transition-all ${
                    orderType === "table"
                      ? "border-orange-500/50 bg-orange-500/10"
                      : "border-[#3D3A46] bg-[#2A2730]/50 hover:bg-[#2A2730]/80"
                  }`}
                >
                  <CalendarCheck className="w-5 h-5 text-green-400" />
                  <div className="text-left">
                    <p className="text-white font-medium text-sm">За столиком</p>
                    <p className="text-gray-400 text-xs">Бронирование столика</p>
                  </div>
                </button>
              </div>
            </div>

            {/* Дополнительные поля в зависимости от типа заказа */}
            {orderType === "delivery" && (
              <div className="space-y-3">
                <div>
                  <label className="block text-white text-sm font-medium mb-2">Адрес доставки:</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      placeholder="Введите адрес доставки"
                      className="bg-[#2A2730] border-[#3D3A46] text-white placeholder:text-gray-500 rounded-xl pl-10"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white text-sm font-medium mb-2">Имя получателя:</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      value={deliveryName}
                      onChange={(e) => setDeliveryName(e.target.value)}
                      placeholder="Введите ваше имя"
                      className="bg-[#2A2730] border-[#3D3A46] text-white placeholder:text-gray-500 rounded-xl pl-10"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white text-sm font-medium mb-2">Номер телефона:</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      type="tel"
                      value={deliveryPhone}
                      onChange={(e) => setDeliveryPhone(e.target.value)}
                      placeholder="+992 XX XXX XXXX"
                      className="bg-[#2A2730] border-[#3D3A46] text-white placeholder:text-gray-500 rounded-xl pl-10"
                    />
                  </div>
                </div>
              </div>
            )}

            {orderType === "table" && (
              <div className="space-y-3">
                <div>
                  <label className="block text-white text-sm font-medium mb-2">Номер столика:</label>
                  <select
                    value={selectedTable}
                    onChange={(e) => setSelectedTable(e.target.value)}
                    className="w-full bg-[#2A2730] border border-[#3D3A46] text-white rounded-xl px-3 py-2"
                  >
                    <option value="">Выберите столик</option>
                    <option value="1">Столик №1 (2 места)</option>
                    <option value="2">Столик №2 (4 места)</option>
                    <option value="3">Столик №3 (6 мест)</option>
                    <option value="4">Столик №4 (8 мест)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-white text-sm font-medium mb-2">Время бронирования:</label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      type="datetime-local"
                      value={reservationTime}
                      onChange={(e) => setReservationTime(e.target.value)}
                      className="bg-[#2A2730] border-[#3D3A46] text-white rounded-xl pl-10"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Итоговая сумма */}
            <div className="space-y-2 p-4 bg-[#2A2730]/50 rounded-2xl border border-[#3D3A46]">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Сумма заказа:</span>
                <span className="text-white">{totalAmount.toFixed(2)} сомони</span>
              </div>
              {orderType === "delivery" && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Доставка:</span>
                  <span className="text-white">{deliveryFee.toFixed(2)} сомони</span>
                </div>
              )}
              <div className="flex justify-between font-bold pt-2 border-t border-[#3D3A46]">
                <span className="text-white">Итого:</span>
                <span className="text-green-400 text-lg">{finalAmount.toFixed(2)} сомони</span>
              </div>
            </div>

            {/* Кнопка оформления заказа */}
            <Button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-2xl text-lg">
              {orderType === "pickup" && "Заказать самовывоз"}
              {orderType === "delivery" && "Заказать доставку"}
              {orderType === "table" && "Забронировать столик"}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
