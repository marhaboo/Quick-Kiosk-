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
import type { CartItem } from "../restaurant-menu/restaurant-menu"

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
  const [errors, setErrors] = useState<Record<string, string>>({})

  const deliveryFee = orderType === "Delivery" ? 10 : 0
  const finalAmount = totalAmount + deliveryFee
  const dispatch: AppDispatch = useDispatch()
  const { theme } = useTheme()

  const handleClearCart = () => {
    items.forEach((item) => onRemoveItem(item.id))
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (items.length === 0) {
      newErrors.cart = "Корзина пуста"
      setErrors(newErrors)
      return false
    }

    if (!fullName.trim()) {
      newErrors.fullName = "Полное имя обязательно"
    }

    if (!phoneNumber.trim()) {
      newErrors.phoneNumber = "Номер телефона обязателен"
    } else if (!/^\+?[\d\s-()]+$/.test(phoneNumber.trim())) {
      newErrors.phoneNumber = "Пожалуйста, введите корректный номер телефона"
    }

    // Validate order type specific fields
    if (orderType === "Delivery") {
      if (!deliveryAddress.trim()) {
        newErrors.deliveryAddress = "Адрес доставки обязателен"
      }
    }

    if (orderType === "AtTable") {
      if (!selectedTable) {
        newErrors.selectedTable = "Пожалуйста, выберите столик"
      }
      if (!bookingDateTime) {
        newErrors.bookingDateTime = "Пожалуйста, выберите время бронирования"
      } else {
        const bookingDate = new Date(bookingDateTime)
        const now = new Date()
        if (bookingDate <= now) {
          newErrors.bookingDateTime = "Время бронирования должно быть в будущем"
        }
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmitOrder = async () => {
    if (!validateForm()) return

    setIsSubmitting(true)
    setErrors({})

    try {
      // Validate quantities before sending
      const orderItems: OrderItem[] = items.map((item) => {
        const quantity = Math.max(1, Math.min(item.quantity, 999)) // Ensure quantity is between 1 and 999
        const price = Math.max(0, item.price) // Ensure price is not negative

        return {
          productId: item.id,
          quantity: quantity,
          priceAtMoment: price,
        }
      })

      const orderData: OrderItems = {
        items: orderItems,
        fullName: fullName.trim(),
        phoneNumber: phoneNumber.trim(),
        tableId: orderType === "AtTable" ? Number.parseInt(selectedTable, 10) : 0,
        restaurantId: Number.parseInt(restaurantId, 10),
        type: orderType,
        deliveryAddress: orderType === "Delivery" ? deliveryAddress.trim() : "",
        bookingDateTime: orderType === "AtTable" ? new Date(bookingDateTime).toISOString() : new Date().toISOString(),
        status: "Pending",
        totalAmount: Math.round(finalAmount * 100) / 100, // Round to 2 decimal places
      }

      console.log("Sending order data:", orderData)

      const result = await dispatch(postOrder(orderData)).unwrap()

      console.log("Order submitted successfully:", result)

      setFullName("")
      setPhoneNumber("")
      setDeliveryAddress("")
      setSelectedTable("")
      setBookingDateTime("")
      handleClearCart()

      // Show success message
      alert("Заказ успешно оформлен!")
    } catch (error: unknown) {
      let errorMessage = "Не удалось оформить заказ. Пожалуйста, попробуйте снова."

      if (error instanceof Error) {
        errorMessage = error.message
      } else if (typeof error === "string") {
        errorMessage = error
      }

      setErrors({ submit: errorMessage })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Get current date and time for min datetime-local value
  const now = new Date()
  const minDateTime = new Date(now.getTime() + 30 * 60000) // 30 minutes from now
  const minDateTimeString = minDateTime.toISOString().slice(0, 16)

  return (
    <div className={cn("w-80 backdrop-blur-md rounded-lg px-5 pb-8 mt-5", theme === "dark" ? "" : "bg-white/50")}>
      <h2 className={cn("text-lg my-6 font-semibold", theme === "dark" ? "text-white" : "text-gray-900")}>Корзина</h2>

      <div
        className={cn(
          "rounded-3xl p-4",
          theme === "dark" ? "border border-[#3D3A46]" : "border border-gray-200 bg-white shadow-sm",
        )}
      >
        {/* Clear Cart Button */}
        <div className="mb-6 flex justify-end">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearCart}
            disabled={items.length === 0}
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

        {/* Cart Items */}
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
                        ${item.price.toFixed(2)}
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
                          <span
                            className={cn("font-bold text-[12px]", theme === "dark" ? "text-white" : "text-gray-900")}
                          >
                            {item.quantity}
                          </span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onUpdateQuantity(item.id, Math.max(0, item.quantity - 1))}
                          className="w-4 h-4 p-0 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-full mx-1"
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <div className={cn("w-px h-4", theme === "dark" ? "bg-[#3D3A46]" : "bg-gray-300")}></div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onUpdateQuantity(item.id, Math.min(999, item.quantity + 1))}
                          className="w-4 h-4 p-0 text-green-400 hover:text-green-300 hover:bg-green-500/20 rounded-full mx-1"
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

        {/* Order Form */}
        {items.length > 0 && (
          <div className="space-y-4">
            {/* Error Messages */}
            {Object.keys(errors).length > 0 && (
              <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                {Object.entries(errors).map(([key, message]) => (
                  <p key={key} className="text-red-400 text-sm">
                    {message}
                  </p>
                ))}
              </div>
            )}

            {/* Order Type Selection */}
            <div className="space-y-3">
              <h3 className={cn("font-semibold text-sm", theme === "dark" ? "text-white" : "text-gray-900")}>
                Тип заказа:
              </h3>
              <div className="grid grid-cols-1 gap-2">
                <button
                  onClick={() => setOrderType("Pickup")}
                  className={cn(
                    "flex items-center gap-3 p-3 rounded-2xl border transition-all",
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
                    "flex items-center gap-3 p-3 rounded-2xl border transition-all",
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
                      30-45 мин • +$10
                    </p>
                  </div>
                </button>
                <button
                  onClick={() => setOrderType("AtTable")}
                  className={cn(
                    "flex items-center gap-3 p-3 rounded-2xl border transition-all",
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

            {/* Customer Information */}
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
                      errors.fullName && "border-red-500",
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
                      errors.phoneNumber && "border-red-500",
                    )}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Delivery Address */}
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
                        errors.deliveryAddress && "border-red-500",
                      )}
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Table Booking */}
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
                        errors.selectedTable && "border-red-500",
                      )}
                      required
                    >
                      <option value="">Выберите столик</option>
                      <option value="1">Столик #1 (2 места)</option>
                      <option value="2">Столик #2 (4 места)</option>
                      <option value="3">Столик #3 (6 мест)</option>
                      <option value="4">Столик #4 (8 мест)</option>
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
                      min={minDateTimeString}
                      onChange={(e) => setBookingDateTime(e.target.value)}
                      className={cn(
                        "rounded-xl pl-10 h-12",
                        theme === "dark"
                          ? "bg-[#2A2730] border-[#3D3A46] text-white"
                          : "bg-gray-100 border-gray-300 text-gray-900",
                        errors.bookingDateTime && "border-red-500",
                      )}
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Order Summary */}
            <div
              className={cn(
                "space-y-2 p-4 rounded-2xl border",
                theme === "dark" ? "bg-[#2A2730]/50 border-[#3D3A46]" : "bg-gray-100/50 border-gray-200",
              )}
            >
              <div className="flex justify-between text-sm">
                <span className={cn("", theme === "dark" ? "text-gray-400" : "text-gray-600")}>Подытог:</span>
                <span className={cn("", theme === "dark" ? "text-white" : "text-gray-900")}>
                  ${totalAmount.toFixed(2)}
                </span>
              </div>
              {orderType === "Delivery" && (
                <div className="flex justify-between text-sm">
                  <span className={cn("", theme === "dark" ? "text-gray-400" : "text-gray-600")}>Доставка:</span>
                  <span className={cn("", theme === "dark" ? "text-white" : "text-gray-900")}>
                    ${deliveryFee.toFixed(2)}
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
                <span className="text-green-400 text-lg">${finalAmount.toFixed(2)}</span>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              onClick={handleSubmitOrder}
              disabled={isSubmitting}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-2xl text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                "Оформление..."
              ) : (
                <>
                  {orderType === "Pickup" && "Оформить заказ на самовывоз"}
                  {orderType === "Delivery" && "Оформить заказ с доставкой"}
                  {orderType === "AtTable" && "Забронировать столик и заказать"}
                </>
              )}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
