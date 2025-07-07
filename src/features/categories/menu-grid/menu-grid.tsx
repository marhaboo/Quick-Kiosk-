"use client"

import Image from "next/image"
import { Plus, X, ShoppingCart } from "lucide-react"
import { Button } from "@/shared/ui/button"
import { Card } from "@/shared/ui/card"
import { MenuItem } from "@/widgets/categories/restaurant-menu/restaurant-menu"


interface MenuGridProps {
  items: MenuItem[]
  cartItems: { id: number; quantity: number }[]
  onAddToCart: (item: MenuItem) => void
  onRemoveFromCart?: (itemId: number) => void
}

export function MenuGrid({ items, cartItems, onAddToCart, onRemoveFromCart }: MenuGridProps) {
  // Функция для проверки, есть ли товар в корзине
  const isInCart = (itemId: number) => {
    return cartItems.some((cartItem) => cartItem.id === itemId)
  }

  // Функция для получения количества товара в корзине
  const getCartQuantity = (itemId: number) => {
    const cartItem = cartItems.find((item) => item.id === itemId)
    return cartItem ? cartItem.quantity : 0
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 pt-16">
      {items.map((item) => (
        <div key={item.id} className="relative mb-10">
          <div className="absolute -top-18 left-1/2 transform -translate-x-1/2 z-10">
            <div className="w-34 h-34 rounded-full overflow-hidden bg-white border-4 border-white shadow-lg">
              <Image
                src={item.image || "/placeholder.svg"}
                alt={item.name}
                width={136}
                height={136}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <Card className="border mb-6 border-[#333333] rounded-3xl overflow-hidden group hover:border-orange-500/50 transition-all duration-300 pt-16 pb-6 px-6">
            {/* Информация о блюде */}
            <div className="text-center ">
              <div className="line-clamp-2">

                <h3
                  className="text-white font-bold text-lg mb-3 text-center line-clamp-2"
                  style={{ minHeight: "3.5rem" }}
                >
                  {item.name}
                </h3>

              </div>

              {/* Цена */}
              <div className="mb-2">
                <p className="text-white font-bold text-2xl">{item.price.toFixed(2)}</p>
                <p className="text-gray-400 text-sm font-medium">СОМОНИ</p>
              </div>
            </div>

            {/* Кнопки действий */}
            <div className="flex items-center justify-between gap-4">
              {/* Левая кнопка - показываем X если товар в корзине, иначе пустую корзину */}
              {isInCart(item.id) ? (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onRemoveFromCart?.(item.id)}
                  className="w-12 h-12 rounded-full bg-red-500/20 border border-red-500/30 text-red-400 hover:text-red-300 hover:bg-red-500/30 transition-all duration-200"
                >
                  <X className="w-5 h-5" />
                </Button>
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-12 h-12 rounded-full bg-gray-500/20 border border-gray-500/30 text-gray-400 cursor-default"
                  disabled
                >
                  <ShoppingCart className="w-5 h-5" />
                </Button>
              )}

              {/* Показываем количество если товар в корзине */}
              {isInCart(item.id) && (
                <div className="flex items-center justify-center">
                  <span className="text-white font-bold text-lg bg-orange-500/20 border border-orange-500/30 rounded-full w-8 h-8 flex items-center justify-center">
                    {getCartQuantity(item.id)}
                  </span>
                </div>
              )}

              {/* Кнопка добавления в корзину */}
              <Button
                onClick={() => onAddToCart(item)}
                size="sm"
                className="w-12 h-12 rounded-full bg-green-500/20 border border-green-500/30 text-green-400 hover:text-green-300 hover:bg-green-500/30 transition-all duration-200"
              >
                <Plus className="w-5 h-5" />
              </Button>
            </div>
          </Card>
        </div>
      ))}
    </div>
  )
}
