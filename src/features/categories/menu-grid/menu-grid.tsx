"use client"

import { useState } from "react"
import Image from "next/image"
import { Plus, X, ShoppingCart, ChevronDown } from "lucide-react"
import { Button } from "@/shared/ui/button"
import { Card } from "@/shared/ui/card"
import { MenuItem } from "@/widgets/categories/restaurant-menu/restaurant-menu"

interface MenuGridProps {
  items: MenuItem[]
  cartItems: { id: number; quantity: number }[]
  onAddToCart: (item: MenuItem) => void
  onRemoveFromCart?: (itemId: number) => void
}

export default function MenuGrid({ items, cartItems, onAddToCart, onRemoveFromCart }: MenuGridProps) {
  const [visibleCount, setVisibleCount] = useState(6)
  const ITEMS_PER_PAGE = 6

  const isInCart = (itemId: number) => {
    return cartItems.some((cartItem) => cartItem.id === itemId)
  }

  const getCartQuantity = (itemId: number) => {
    const cartItem = cartItems.find((item) => item.id === itemId)
    return cartItem ? cartItem.quantity : 0
  }

  const showMore = () => {
    setVisibleCount((prev) => Math.min(prev + ITEMS_PER_PAGE, items.length))
  }

  const showLess = () => {
    setVisibleCount(6)
  }

  const visibleItems = items.slice(0, visibleCount)
  const hasMore = visibleCount < items.length
  const canShowLess = visibleCount > 6

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-6 pt-12">
        {visibleItems.map((item) => (
          <div key={item.id} className="relative mb-10">
            <div className="absolute -top-14 left-1/2 transform -translate-x-1/2 z-10">
              <div className="w-24 h-24 rounded-full overflow-hidden bg-white border-4 border-white shadow-lg">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  width={96}
                  height={96}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <Card className="border mb-6 border-[#333333] rounded-2xl overflow-hidden group hover:border-orange-500/50 transition-all duration-300 pt-14 pb-5 px-4">
              <div className="text-center">
                <div className="line-clamp-2">
                  <h3
                    className="text-white font-bold text-base mb-2 text-center line-clamp-2"
                    style={{ minHeight: "3rem" }}
                  >
                    {item.name}
                  </h3>
                </div>
                <div className="mb-2">
                  <p className="text-white font-bold text-xl">{item.price.toFixed(2)}</p>
                  <p className="text-gray-400 text-sm font-medium">СОМОНИ</p>
                </div>
              </div>

              <div className="flex items-center justify-between gap-2">
                {isInCart(item.id) ? (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onRemoveFromCart?.(item.id)}
                    className="w-10 h-10 rounded-full bg-red-500/20 border border-red-500/30 text-red-400 hover:text-red-300 hover:bg-red-500/30 transition-all duration-200"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                ) : (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-10 h-10 rounded-full bg-gray-500/20 border border-gray-500/30 text-gray-400 cursor-default"
                    disabled
                  >
                    <ShoppingCart className="w-4 h-4" />
                  </Button>
                )}

                {isInCart(item.id) && (
                  <div className="flex items-center justify-center">
                    <span className="text-white font-bold text-base bg-orange-500/20 border border-orange-500/30 rounded-full w-7 h-7 flex items-center justify-center">
                      {getCartQuantity(item.id)}
                    </span>
                  </div>
                )}

                <Button
                  onClick={() => onAddToCart(item)}
                  size="sm"
                  className="w-10 h-10 rounded-full bg-green-500/20 border border-green-500/30 text-green-400 hover:text-green-300 hover:bg-green-500/30 transition-all duration-200"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          </div>
        ))}
      </div>

      {(hasMore || canShowLess) && (
        <div className="flex justify-center items-center gap-4 mt-8 mb-6">
          {hasMore && (
            <Button
              onClick={showMore}
              className="bg-orange-500/20 hover:bg-orange-500/30 border border-orange-500/30 text-orange-400 hover:text-orange-300 px-6 py-3 rounded-2xl flex items-center gap-2 transition-all duration-200"
            >
              <ChevronDown className="w-5 h-5" />
              Показать еще ({items.length - visibleCount})
            </Button>
          )}
          {canShowLess && (
            <Button
              onClick={showLess}
              variant="ghost"
              className="text-gray-400 hover:text-gray-300 hover:bg-gray-500/10 border border-gray-500/30 px-6 py-3 rounded-2xl transition-all duration-200"
            >
              Свернуть
            </Button>
          )}
        </div>
      )}

      <div className="text-center mt-4">
        <p className="text-gray-400 text-sm">
          Показано {visibleCount} из {items.length} товаров
        </p>
      </div>
    </div>
  )
}