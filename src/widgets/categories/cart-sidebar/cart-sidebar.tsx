"use client"

import { useState } from "react"
import Image from "next/image"
import { Plus, Minus, MapPin, Clock, CalendarCheck, Truck, Store, User, Phone, ChevronDown } from "lucide-react"
import { Button } from "@/shared/ui/button"
import { Card } from "@/shared/ui/card"
import { Input } from "@/shared/ui/input"
import { useDispatch } from "react-redux"
import type { AppDispatch } from "@/app/store/store"
import { postOrder } from "@/entities/cart-order/api/api-order"
import type { OrderItem, OrderItems } from "@/entities/cart-order/models/type"
import { useTheme } from "next-themes"
import { cn } from "@/shared/lib/utils"
import { CartItem } from "../restaurant-menu/restaurant-menu"
import { SuccessOrder } from "@/features/categories/succes-page/succes-page"


interface CartSidebarProps {
  items: CartItem[]
  totalAmount: number
  onUpdateQuantity: (itemId: number, quantity: number) => void
  onRemoveItem: (itemId: number) => void
  restaurantId: string
}

type OrderType = "Pickup" | "Delivery" | "AtTable"

export function CartSidebar({ items, totalAmount, onUpdateQuantity, onRemoveItem, restaurantId }: CartSidebarProps) {
  const [orderType, setOrderType] = useState<OrderType>("Pickup")
  const [deliveryAddress, setDeliveryAddress] = useState("")
  const [selectedTable, setSelectedTable] = useState("")
  const [bookingDateTime, setBookingDateTime] = useState("")
  const [fullName, setFullName] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
   const [showModal, setShowModal] = useState(false)
  const deliveryFee = orderType === "Delivery" ? 10 : 0
  const finalAmount = totalAmount + deliveryFee
  const dispatch: AppDispatch = useDispatch()
  const { theme } = useTheme()

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

    const orderItems: OrderItem[] = items.map((item) => ({
      productId: item.id,
      quantity: item.quantity,
      priceAtMoment: item.price,
    }))

    const orderData: OrderItems = {
      items: orderItems,
      fullName: fullName.trim(),
      phoneNumber: phoneNumber.trim(),
      // Send 0 if not 'AtTable', otherwise parse the selected table ID
      tableId: orderType === "AtTable" ? Number.parseInt(selectedTable) : 0,
      restaurantId: Number.parseInt(restaurantId),
      type: orderType,
      deliveryAddress: orderType === "Delivery" ? deliveryAddress.trim() : null,
      bookingDateTime: orderType === "AtTable" ? bookingDateTime : null,
      status: "pending",
      totalAmount: finalAmount,
    }

    try {
      await dispatch(postOrder(orderData)).unwrap()
      setIsSubmitted(true)
      setFullName("")
      setPhoneNumber("")
      setDeliveryAddress("")
      setSelectedTable("")
      setBookingDateTime("")
      handleClearCart()
    } catch (error) {
      console.error("Ошибка отправки заказа:", error)
      alert("Не удалось отправить заказ. Попробуйте позже.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    setShowModal(!showModal)
    return (
      <SuccessOrder
        orderType={orderType}
        onClose={() => {
          setShowModal(false)
          setIsSubmitted(false)
        }}
      />
    )
  }

  return (
    <div className={cn("w-80 backdrop-blur-md rounded-lg px-5 pb-8  mt-5", theme === "dark" ? "" : "bg-white/50")}>
      <h2 className={cn("text-lg my-6 font-semibold", theme === "dark" ? "text-white" : "text-gray-900")}>Корзина</h2>
      <div
        className={cn(
          "rounded-3xl p-4 ",
          theme === "dark" ? "border border-[#3D3A46] " : "border border-gray-200 bg-white shadow-sm",
        )}
      >
        <div className="mb-6 flex justify-end">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearCart}
            className={cn(
              "px-4 py-2 rounded-xl border",
              theme === "dark"
                ? "text-orange-400 hover:text-orange-300 hover:bg-orange-500/10 border-orange-500/30"
                : "text-orange-500 hover:text-orange-600 hover:bg-orange-100 border-orange-300",
            )}
          >
            Очистить корзину
          </Button>
        </div>
        <div className="space-y-3 mb-6 overflow-y-auto max-h-96">
          {items.length === 0 ? (
            <p className={cn("text-center py-8", theme === "dark" ? "text-gray-400" : "text-gray-600")}>
              Корзина пуста
            </p>
          ) : (
            items.map((item) => (
              <Card
                key={item.id}
                className={cn(
                  "p-4 rounded-2xl",
                  theme === "dark" ? "bg-[#222125]/60 border border-[#3D3A46]" : "bg-gray-100 border border-gray-200",
                )}
              >
                <div className="flex items-start gap-4">
                  <div className="w-[100px] h-[104px] rounded-2xl overflow-hidden bg-white/10 flex-shrink-0">
                    <Image
                      src={item.image || "/placeholder.svg?height=104&width=100&query=food"}
                      alt={item.name}
                      width={100}
                      height={104}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4
                      className={cn("font-semibold text-base mb-1", theme === "dark" ? "text-white" : "text-gray-900")}
                    >
                      {item.name}
                    </h4>
                    <div className="flex flex-col gap-2">
                      <p className={cn("font-bold text-sm", theme === "dark" ? "text-white" : "text-gray-900")}>
                        {item.price.toFixed(2)} сомони
                      </p>
                      <div
                        className={cn(
                          "flex items-center rounded-full p-1 w-fit border",
                          theme === "dark" ? "bg-[#2A2730] border-[#3D3A46]" : "bg-gray-200 border-gray-300",
                        )}
                      >
                        <div
                          className={cn(
                            "rounded-full w-8 h-8 flex items-center justify-center",
                            theme === "dark" ? "bg-[#1A1A1A]" : "bg-gray-300",
                          )}
                        >
                          <span className={cn("font-bold text-sm", theme === "dark" ? "text-white" : "text-gray-900")}>
                            {item.quantity}
                          </span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 p-0 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-full mx-1"
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <div className={cn("w-px h-4", theme === "dark" ? "bg-[#3D3A46]" : "bg-gray-300")}></div>
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
        {items.length > 0 && (
          <div className="space-y-4">
            <div className="space-y-3">
              <h3 className={cn("font-semibold text-sm", theme === "dark" ? "text-white" : "text-gray-900")}>
                Тип заказа:
              </h3>
              <div className="grid grid-cols-1 gap-2">
                <button
                  onClick={() => setOrderType("Pickup")}
                  className={cn(
                    `flex items-center gap-3 p-3 rounded-2xl border transition-all`,
                    orderType === "Pickup"
                      ? "border-orange-500/50 bg-orange-500/10"
                      : theme === "dark"
                        ? "border-[#3D3A46] bg-[#2A2730]/50 hover:bg-[#2A2730]/80"
                        : "border-gray-200 bg-gray-100 hover:bg-gray-200",
                  )}
                >
                  <Store className="w-5 h-5 text-orange-400" />
                  <div className="text-left">
                    <p className={cn("font-medium text-sm", theme === "dark" ? "text-white" : "text-gray-900")}>
                      Самовывоз
                    </p>
                    <p className={cn("text-xs", theme === "dark" ? "text-gray-400" : "text-gray-600")}>
                      Готов через 15-20 мин
                    </p>
                  </div>
                </button>
                <button
                  onClick={() => setOrderType("Delivery")}
                  className={cn(
                    `flex items-center gap-3 p-3 rounded-2xl border transition-all`,
                    orderType === "Delivery"
                      ? "border-orange-500/50 bg-orange-500/10"
                      : theme === "dark"
                        ? "border-[#3D3A46] bg-[#2A2730]/50 hover:bg-[#2A2730]/80"
                        : "border-gray-200 bg-gray-100 hover:bg-gray-200",
                  )}
                >
                  <Truck className="w-5 h-5 text-blue-400" />
                  <div className="text-left">
                    <p className={cn("font-medium text-sm", theme === "dark" ? "text-white" : "text-gray-900")}>
                      Доставка
                    </p>
                    <p className={cn("text-xs", theme === "dark" ? "text-gray-400" : "text-gray-600")}>
                      30-45 мин • +10 сомони
                    </p>
                  </div>
                </button>
                <button
                  onClick={() => setOrderType("AtTable")}
                  className={cn(
                    `flex items-center gap-3 p-3 rounded-2xl border transition-all`,
                    orderType === "AtTable"
                      ? "border-orange-500/50 bg-orange-500/10"
                      : theme === "dark"
                        ? "border-[#3D3A46] bg-[#2A2730]/50 hover:bg-[#2A2730]/80"
                        : "border-gray-200 bg-gray-100 hover:bg-gray-200",
                  )}
                >
                  <CalendarCheck className="w-5 h-5 text-green-400" />
                  <div className="text-left">
                    <p className={cn("font-medium text-sm", theme === "dark" ? "text-white" : "text-gray-900")}>
                      За столиком
                    </p>
                    <p className={cn("text-xs", theme === "dark" ? "text-gray-400" : "text-gray-600")}>
                      Бронирование столика
                    </p>
                  </div>
                </button>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <label
                  className={cn("block text-sm font-medium mb-2", theme === "dark" ? "text-white" : "text-gray-900")}
                >
                  Полное имя: *
                </label>
                <div className="relative">
                  <User
                    className={cn(
                      "absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4",
                      theme === "dark" ? "text-gray-400" : "text-gray-600",
                    )}
                  />
                  <Input
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Введите ваше полное имя"
                    className={cn(
                      "rounded-xl pl-10 h-12",
                      theme === "dark"
                        ? "bg-[#2A2730] border-[#3D3A46] text-white placeholder:text-gray-500"
                        : "bg-gray-100 border-gray-300 text-gray-900 placeholder:text-gray-500",
                    )}
                    required
                  />
                </div>
              </div>
              <div>
                <label
                  className={cn("block text-sm font-medium mb-2", theme === "dark" ? "text-white" : "text-gray-900")}
                >
                  Номер телефона: *
                </label>
                <div className="relative">
                  <Phone
                    className={cn(
                      "absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4",
                      theme === "dark" ? "text-gray-400" : "text-gray-600",
                    )}
                  />
                  <Input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="+992 XX XXX XXXX"
                    className={cn(
                      "rounded-xl pl-10 h-12",
                      theme === "dark"
                        ? "bg-[#2A2730] border-[#3D3A46] text-white placeholder:text-gray-500"
                        : "bg-gray-100 border-gray-300 text-gray-900 placeholder:text-gray-500",
                    )}
                    required
                  />
                </div>
              </div>
            </div>
            {orderType === "Delivery" && (
              <div className="space-y-3">
                <div>
                  <label
                    className={cn("block text-sm font-medium mb-2", theme === "dark" ? "text-white" : "text-gray-900")}
                  >
                    Адрес доставки: *
                  </label>
                  <div className="relative">
                    <MapPin
                      className={cn(
                        "absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4",
                        theme === "dark" ? "text-gray-400" : "text-gray-600",
                      )}
                    />
                    <Input
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      placeholder="Введите адрес доставки"
                      className={cn(
                        "rounded-xl pl-10 h-12",
                        theme === "dark"
                          ? "bg-[#2A2730] border-[#3D3A46] text-white placeholder:text-gray-500"
                          : "bg-gray-100 border-gray-300 text-gray-900 placeholder:text-gray-500",
                      )}
                      required
                    />
                  </div>
                </div>
              </div>
            )}
            {orderType === "AtTable" && (
              <div className="space-y-3">
                <div>
                  <label
                    className={cn("block text-sm font-medium mb-2", theme === "dark" ? "text-white" : "text-gray-900")}
                  >
                    Номер столика: *
                  </label>
                  <div className="relative">
                    <select
                      value={selectedTable}
                      onChange={(e) => setSelectedTable(e.target.value)}
                      className={cn(
                        "w-full rounded-xl px-3 py-2 h-12 appearance-none pr-10",
                        theme === "dark"
                          ? "bg-[#2A2730] border border-[#3D3A46] text-white"
                          : "bg-gray-100 border border-gray-300 text-gray-900",
                      )}
                      required
                    >
                      <option value="">Выберите столик</option>
                      <option value="1">Столик №1 (2 места)</option>
                      <option value="2">Столик №2 (4 места)</option>
                      <option value="3">Столик №3 (6 мест)</option>
                      <option value="4">Столик №4 (8 мест)</option>
                    </select>
                    <ChevronDown
                      className={cn(
                        "absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none",
                        theme === "dark" ? "text-gray-500" : "text-gray-600",
                      )}
                    />
                  </div>
                </div>
                <div>
                  <label
                    className={cn("block text-sm font-medium mb-2", theme === "dark" ? "text-white" : "text-gray-900")}
                  >
                    Время бронирования: *
                  </label>
                  <div className="relative">
                    <Clock
                      className={cn(
                        "absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4",
                        theme === "dark" ? "text-gray-400" : "text-gray-600",
                      )}
                    />
                    <Input
                      type="datetime-local"
                      value={bookingDateTime}
                      onChange={(e) => setBookingDateTime(e.target.value)}
                      className={cn(
                        "rounded-xl pl-10 h-12",
                        theme === "dark"
                          ? "bg-[#2A2730] border-[#3D3A46] text-white"
                          : "bg-gray-100 border-gray-300 text-gray-900",
                      )}
                      required
                    />
                  </div>
                </div>
              </div>
            )}
            <div
              className={cn(
                "space-y-2 p-4 rounded-2xl border",
                theme === "dark" ? "bg-[#2A2730]/50 border-[#3D3A46]" : "bg-gray-100/50 border-gray-200",
              )}
            >
              <div className="flex justify-between text-sm">
                <span className={cn("", theme === "dark" ? "text-gray-400" : "text-gray-600")}>Сумма заказа:</span>
                <span className={cn("", theme === "dark" ? "text-white" : "text-gray-900")}>
                  {totalAmount.toFixed(2)} сомони
                </span>
              </div>
              {orderType === "Delivery" && (
                <div className="flex justify-between text-sm">
                  <span className={cn("", theme === "dark" ? "text-gray-400" : "text-gray-600")}>Доставка:</span>
                  <span className={cn("", theme === "dark" ? "text-white" : "text-gray-900")}>
                    {deliveryFee.toFixed(2)} сомони
                  </span>
                </div>
              )}
              <div
                className={cn(
                  "flex justify-between font-bold pt-2 border-t",
                  theme === "dark" ? "border-[#3D3A46]" : "border-gray-300",
                )}
              >
                <span className={cn("", theme === "dark" ? "text-white" : "text-gray-900")}>Итого:</span>
                <span className="text-green-400 text-lg">{finalAmount.toFixed(2)} сомони</span>
              </div>
            </div>
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
