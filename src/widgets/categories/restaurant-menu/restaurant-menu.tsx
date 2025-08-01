"use client"

import { useEffect, useState } from "react"
import { MenuHeader } from "@/widgets/categories/menu-header/menu-header"
import MenuSidebar from "@/features/categories/menu-sidebar/menu-sidebar"
import { CartSidebar } from "@/widgets/categories/cart-sidebar/cart-sidebar"
import MenuGrid from "@/features/categories/menu-grid/menu-grid"
import { getRestaurantById } from "@/entities/restaurantById/api/api"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "@/app/store/store"
import { API_BASE_URL } from "@/shared/utils/image-utils"
import type { ShortMenuItem } from "@/entities/home/models/types"
import { useTheme } from "next-themes" // Import useTheme
import { cn } from "@/shared/lib/utils" // Import cn

export interface CartItem extends ShortMenuItem {
  quantity: number
}

export function RestaurantMenu({ restaurantId }: { restaurantId: string }) {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const { currentRestaurant } = useSelector((state: RootState) => state.resById)
  const dispatch: AppDispatch = useDispatch()
  const { theme } = useTheme() // Get current theme

  const categories = [
    {
      id: "all",
      name: "Все продукты",
      image: "/images/all-category.svg",
    },
    ...(currentRestaurant?.categories?.map((cat) => ({
      id: cat.id.toString(),
      name: cat.name,
      image: API_BASE_URL + cat.imageUrl,
    })) ?? []),
  ]

  const isImageUrl = (url: string) => {
    return url.startsWith("/")
  }

  const menuItems: ShortMenuItem[] = currentRestaurant?.menu
    ? currentRestaurant?.menu?.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        image: isImageUrl(item.imageUrl) ? API_BASE_URL + item.imageUrl : "/placeholder.svg?height=104&width=100",
        category: item.categoryId.toString() || "all",
        description: item.description,
      }))
    : []

  useEffect(() => {
    dispatch(getRestaurantById(restaurantId))
  }, [dispatch, restaurantId])

  const addToCart = (item: ShortMenuItem) => {
    setCartItems((prev) => {
      const existingItem = prev.find((cartItem) => cartItem.id === item.id)
      if (existingItem) {
        return prev.map((cartItem) =>
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem,
        )
      }
      return [...prev, { ...item, quantity: 1 }]
    })
  }

  const removeFromCart = (itemId: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== itemId))
  }

  const updateQuantity = (itemId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId)
      return
    }
    setCartItems((prev) => prev.map((item) => (item.id === itemId ? { ...item, quantity } : item)))
  }

  const filteredItems = menuItems.filter((item) => {
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <div
      className={cn(
        "p-6",
        theme === "dark"
          ? "bg-[url('/images/bg-of-site.png')] bg-no-repeat bg-cover bg-center before:absolute before:inset-0 before:bg-black/50 before:z-0"
          : "bg-neutral-100",
      )}
    >
      {/* Верхняя панель */}
      <MenuHeader searchQuery={searchQuery} restaurant={currentRestaurant!} onSearchChange={setSearchQuery} />
      <div className="flex gap-7">
        {/* Основной контент */}
        <div className="flex-1 flex flex-col">
          {/* Горизонтальные категории */}
          <MenuSidebar
            categories={categories}
            selectedCategory={selectedCategory}
            onCategorySelect={setSelectedCategory}
          />
          {/* Сетка меню */}
          <div className="flex-1 overflow-y-auto">
            <h2 className={cn("text-lg font-bold mb-6", theme === "dark" ? "text-white" : "text-gray-900")}>Меню</h2>
            <MenuGrid
              items={filteredItems}
              cartItems={cartItems}
              onAddToCart={addToCart}
              onRemoveFromCart={removeFromCart}
            />
          </div>
        </div>
        {/* Правая панель корзины */}
        <CartSidebar
          restaurantId={restaurantId}
          items={cartItems}
          totalAmount={totalAmount}
          onUpdateQuantity={updateQuantity}
          onRemoveItem={removeFromCart}
        />
      </div>
    </div>
  )
}
