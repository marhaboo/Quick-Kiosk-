"use client"

import { useState } from "react"
import Image from "next/image"
import { Plus, Minus, MapPin, Clock, CalendarCheck, Truck, Store, User, Phone } from "lucide-react"
import { Button } from "@/shared/ui/button"
import { Card } from "@/shared/ui/card"
import { Input } from "@/shared/ui/input"
import { useDispatch } from "react-redux"
import type { AppDispatch } from "@/app/store/store"
import { postOrder } from "@/app/entities/cart-order/api/api-order"
import { OrderItem, OrderItems } from "@/app/entities/cart-order/models/type"
import { CartItem } from "../restaurant-menu/restaurant-menu"

interface CartSidebarProps {
  items: CartItem[]
  totalAmount: number
  onUpdateQuantity: (itemId: number, quantity: number) => void
  onRemoveItem: (itemId: number) => void
}

type OrderType = "Pickup" | "Delivery" | "AtTable"

export function CartSidebar({ items, totalAmount, onUpdateQuantity, onRemoveItem }: CartSidebarProps) {
  const [orderType, setOrderType] = useState<OrderType>("Pickup")
  const [deliveryAddress, setDeliveryAddress] = useState("")
  const [selectedTable, setSelectedTable] = useState("")
  const [bookingDateTime, setBookingDateTime] = useState("")
  const [fullName, setFullName] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const deliveryFee = orderType === "Delivery" ? 10 : 0
  const finalAmount = totalAmount + deliveryFee
  const dispatch: AppDispatch = useDispatch()

  const handleClearCart = () => {
    items.forEach((item) => onRemoveItem(item.id))
  }

  const validateForm = (): boolean => {
    if (items.length === 0) {
      alert("Корзина пуста")
      return false
    }

    if (orderType === "Delivery") {
      if (!deliveryAddress.trim()) {
        alert("Введите адрес доставки")
        return false
      }
      if (!fullName.trim()) {
        alert("Введите полное имя")
        return false
      }
      if (!phoneNumber.trim()) {
        alert("Введите номер телефона")
        return false
      }
    }

    if (orderType === "AtTable") {
      if (!selectedTable) {
        alert("Выберите столик")
        return false
      }
      if (!bookingDateTime) {
        alert("Выберите время бронирования")
        return false
      }
      if (!fullName.trim()) {
        alert("Введите полное имя")
        return false
      }
      if (!phoneNumber.trim()) {
        alert("Введите номер телефона")
        return false
      }
    }

    if (orderType === "Pickup") {
      if (!fullName.trim()) {
        alert("Введите полное имя")
        return false
      }
      if (!phoneNumber.trim()) {
        alert("Введите номер телефона")
        return false
      }
    }

    return true
  }

  const handleSubmitOrder = async () => {
    if (!validateForm()) return

    setIsSubmitting(true)

    // Преобразуем CartItem в OrderItem
    const orderItems: OrderItem[] = items.map((item) => ({
      productId: item.id,
      quantity: item.quantity,
      priceAtMoment: item.price,
    }))

    // Формируем данные заказа согласно интерфейсу OrderItems
    const orderData: OrderItems = {
      items: orderItems,
      fullName: fullName.trim(),
      phoneNumber: phoneNumber.trim(),
      tableId: orderType === "AtTable" ? Number.parseInt(selectedTable) : null,
      type: orderType,
      deliveryAddress: orderType === "Delivery" ? deliveryAddress.trim() : null,
      bookingDateTime: orderType === "AtTable" ? bookingDateTime : null,
      status: "pending", // Начальный статус заказа
      totalAmount: finalAmount,
    }


    try {
      await dispatch(postOrder(orderData)).unwrap()
      setIsSubmitted(true)
      // Очищаем форму после успешного заказа
      setFullName("")
      setPhoneNumber("")
      setDeliveryAddress("")
      setSelectedTable("")
      setBookingDateTime("")
      // Очищаем корзину
      handleClearCart()
    } catch (error) {
      console.error("Ошибка отправки заказа:", error)
      alert("Не удалось отправить заказ. Попробуйте позже.")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Показываем сообщение об успешной отправке
  if (isSubmitted) {
    return (
      <div className="w-80 backdrop-blur-md">
        <div className="border border-[#3D3A46] rounded-3xl p-6 text-center">
          <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Заказ принят!</h3>
          <p className="text-gray-400 mb-4">
            {orderType === "Pickup" && "Ваш заказ будет готов через 15-20 минут"}
            {orderType === "Delivery" && "Ваш заказ будет доставлен в течение 30-45 минут"}
            {orderType === "AtTable" && "Столик забронирован на указанное время"}
          </p>
          <Button
            onClick={() => setIsSubmitted(false)}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-xl"
          >
            Сделать новый заказ
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="w-80 backdrop-blur-md">
      <h2 className="text-white text-lg my-6 font-semibold">Корзина</h2>
      <div className="border border-[#3D3A46] rounded-3xl p-4">
        {/* Кнопка очистить корзину */}
        <div className="mb-6 flex justify-end">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearCart}
            className="text-orange-400 hover:text-orange-300 hover:bg-orange-500/10 px-4 py-2 rounded-xl border border-orange-500/30"
          >
            Очистить корзину
          </Button>
        </div>

        {/* Список товаров */}
        <div className="space-y-3 mb-6 overflow-y-auto max-h-96">
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
                  onClick={() => setOrderType("Pickup")}
                  className={`flex items-center gap-3 p-3 rounded-2xl border transition-all ${orderType === "Pickup"
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
                  onClick={() => setOrderType("Delivery")}
                  className={`flex items-center gap-3 p-3 rounded-2xl border transition-all ${orderType === "Delivery"
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
                  onClick={() => setOrderType("AtTable")}
                  className={`flex items-center gap-3 p-3 rounded-2xl border transition-all ${orderType === "AtTable"
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

            {/* Общие поля для всех типов заказов */}
            <div className="space-y-3">
              <div>
                <label className="block text-white text-sm font-medium mb-2">Полное имя: *</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Введите ваше полное имя"
                    className="bg-[#2A2730] border-[#3D3A46] text-white placeholder:text-gray-500 rounded-xl pl-10"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-white text-sm font-medium mb-2">Номер телефона: *</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="+992 XX XXX XXXX"
                    className="bg-[#2A2730] border-[#3D3A46] text-white placeholder:text-gray-500 rounded-xl pl-10"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Дополнительные поля для доставки */}
            {orderType === "Delivery" && (
              <div className="space-y-3">
                <div>
                  <label className="block text-white text-sm font-medium mb-2">Адрес доставки: *</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      placeholder="Введите адрес доставки"
                      className="bg-[#2A2730] border-[#3D3A46] text-white placeholder:text-gray-500 rounded-xl pl-10"
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Дополнительные поля для столика */}
            {orderType === "AtTable" && (
              <div className="space-y-3">
                <div>
                  <label className="block text-white text-sm font-medium mb-2">Номер столика: *</label>
                  <select
                    value={selectedTable}
                    onChange={(e) => setSelectedTable(e.target.value)}
                    className="w-full bg-[#2A2730] border border-[#3D3A46] text-white rounded-xl px-3 py-2"
                    required
                  >
                    <option value="">Выберите столик</option>
                    <option value="1">Столик №1 (2 места)</option>
                    <option value="2">Столик №2 (4 места)</option>
                    <option value="3">Столик №3 (6 мест)</option>
                    <option value="4">Столик №4 (8 мест)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-white text-sm font-medium mb-2">Время бронирования: *</label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      type="datetime-local"
                      value={bookingDateTime}
                      onChange={(e) => setBookingDateTime(e.target.value)}
                      className="bg-[#2A2730] border-[#3D3A46] text-white rounded-xl pl-10"
                      required
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
              {orderType === "Delivery" && (
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
            <Button
              onClick={handleSubmitOrder}
              disabled={isSubmitting}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-2xl text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                "Отправка..."
              ) : (
                <>
                  {orderType === "Pickup" && "Заказать самовывоз"}
                  {orderType === "Delivery" && "Заказать доставку"}
                  {orderType === "AtTable" && "Забронировать столик"}
                </>
              )}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
