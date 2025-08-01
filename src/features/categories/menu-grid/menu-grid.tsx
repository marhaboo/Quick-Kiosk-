"use client"

import { useState } from "react"
import Image from "next/image"
import { Plus, X, ShoppingCart, ChevronDown } from "lucide-react"
import { Button } from "@/shared/ui/button"
import { Card } from "@/shared/ui/card"
import { useSelector } from "react-redux"
import type { RootState } from "@/app/store/store"
import type { ShortMenuItem } from "@/entities/home/models/types"
import { useTheme } from "next-themes" // Import useTheme
import { cn } from "@/shared/lib/utils" // Import cn

interface MenuGridProps {
  items: ShortMenuItem[]
  cartItems: { id: number; quantity: number }[]
  onAddToCart: (item: ShortMenuItem) => void
  onRemoveFromCart?: (itemId: number) => void
}

// Skeleton component for loading state
function MenuItemSkeleton() {
  const { theme } = useTheme() // Get theme for skeleton

  return (
    <div className="relative mb-10">
      <div className="absolute -top-14 left-1/2 transform -translate-x-1/2 z-10">
        <div
          className={cn(
            "w-24 h-24 rounded-full border-4 shadow-lg animate-pulse",
            theme === "dark" ? "bg-gray-700 border-white" : "bg-gray-200 border-gray-100",
          )}
        />
      </div>
      <Card
        className={cn(
          "rounded-2xl overflow-hidden pt-14 pb-5 px-4",
          theme === "dark" ? "border border-[#333333] bg-[#222125]/60" : "border border-gray-200 bg-white shadow-sm",
        )}
      >
        <div className="text-center">
          <div className="mb-2">
            <div className={cn("h-6 rounded animate-pulse mb-2", theme === "dark" ? "bg-gray-700" : "bg-gray-300")} />
            <div
              className={cn(
                "h-4 rounded animate-pulse w-3/4 mx-auto",
                theme === "dark" ? "bg-gray-700" : "bg-gray-300",
              )}
            />
          </div>
          <div className="mb-2">
            <div
              className={cn(
                "h-6 rounded animate-pulse w-20 mx-auto mb-1",
                theme === "dark" ? "bg-gray-700" : "bg-gray-300",
              )}
            />
            <div
              className={cn("h-4 rounded animate-pulse w-16 mx-auto", theme === "dark" ? "bg-gray-700" : "bg-gray-300")}
            />
          </div>
        </div>
        <div className="flex items-center justify-between gap-2">
          <div
            className={cn("w-10 h-10 rounded-full animate-pulse", theme === "dark" ? "bg-gray-700" : "bg-gray-300")}
          />
          <div
            className={cn("w-10 h-10 rounded-full animate-pulse", theme === "dark" ? "bg-gray-700" : "bg-gray-300")}
          />
        </div>
      </Card>
    </div>
  )
}

export default function MenuGrid({ items, cartItems, onAddToCart, onRemoveFromCart }: MenuGridProps) {
  const [visibleCount, setVisibleCount] = useState(6)
  const ITEMS_PER_PAGE = 6
  const { currentRestaurantLoading } = useSelector((state: RootState) => state.resById)
  const { theme } = useTheme() // Get current theme

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

  // Show skeleton loading state
  if (currentRestaurantLoading) {
    return (
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-6 pt-12">
          {Array.from({ length: 6 }).map((_, index) => (
            <MenuItemSkeleton key={index} />
          ))}
        </div>
        <div className="flex justify-center items-center gap-4 mt-8 mb-6">
          <div
            className={cn("h-12 w-40 rounded-2xl animate-pulse", theme === "dark" ? "bg-gray-700" : "bg-gray-300")}
          />
        </div>
        <div className="text-center mt-4">
          <div
            className={cn("h-4 w-48 rounded animate-pulse mx-auto", theme === "dark" ? "bg-gray-700" : "bg-gray-300")}
          />
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-6 pt-12">
        {visibleItems.map((item) => (
          <div key={item.id} className="relative mb-10">
            <div className="absolute -top-14 left-1/2 transform -translate-x-1/2 z-10">
              <div
                className={cn(
                  "w-24 h-24 rounded-full overflow-hidden border-4 shadow-lg",
                  theme === "dark" ? "bg-white border-white" : "bg-gray-100 border-gray-100",
                )}
              >
                <Image
                  src={item.image || "/placeholder.svg?height=96&width=96&query=food"}
                  alt={item.name}
                  width={96}
                  height={96}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <Card
              className={cn(
                "rounded-2xl overflow-hidden group hover:border-orange-500/50 transition-all duration-300 pt-14 pb-5 px-4",
                theme === "dark"
                  ? "border border-[#333333] bg-[#222125]/60"
                  : "border border-gray-200 bg-white shadow-sm",
              )}
            >
              <div className="text-center">
                <div className="line-clamp-2">
                  <h3
                    className={cn(
                      "font-bold text-base mb-2 text-center line-clamp-2",
                      theme === "dark" ? "text-white" : "text-gray-900",
                    )}
                    style={{ minHeight: "3rem" }}
                  >
                    {item.name}
                  </h3>
                </div>
                <div className="mb-2">
                  <p className={cn("font-bold text-xl", theme === "dark" ? "text-white" : "text-gray-900")}>
                    {item.price.toFixed(2)}
                  </p>
                  <p className={cn("text-sm font-medium", theme === "dark" ? "text-gray-400" : "text-gray-600")}>
                    СОМОНИ
                  </p>
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
                    className={cn(
                      "w-10 h-10 rounded-full cursor-default",
                      theme === "dark"
                        ? "bg-gray-500/20 border border-gray-500/30 text-gray-400"
                        : "bg-gray-200 border border-gray-300 text-gray-500",
                    )}
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
              className={cn(
                "px-6 py-3 rounded-2xl transition-all duration-200",
                theme === "dark"
                  ? "text-gray-400 hover:text-gray-300 hover:bg-gray-500/10 border border-gray-500/30"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-200 border border-gray-300",
              )}
            >
              Свернуть
            </Button>
          )}
        </div>
      )}
      <div className="text-center mt-4">
        <p className={cn("text-sm", theme === "dark" ? "text-gray-400" : "text-gray-600")}>
          Показано {Math.min(visibleCount, items.length)} из {items.length} товаров
        </p>
      </div>
    </div>
  )
}
