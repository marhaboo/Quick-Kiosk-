"use client"

import { useState } from "react"
import { Package, Sandwich, Coffee, ShoppingBasket, Drumstick, Box } from "lucide-react"
import { MenuHeader } from "@/widgets/categories/menu-header/menu-header"
import MenuSidebar from "@/features/categories/menu-sidebar/menu-sidebar"

import { CartSidebar } from "../cart-sidebar/cart-sidebar"
import  MenuGrid  from "@/features/categories/menu-grid/menu-grid"


export interface MenuItem {
  id: number
  name: string
  price: number
  image: string
  category: string
  description?: string
}

export interface CartItem extends MenuItem {
  quantity: number
}

const menuItems: MenuItem[] = [
  {
    id: 1,
    name: "Шашлык из баранины",
    price: 11.5,
    image: "/placeholder.svg?height=120&width=120",
    category: "all",
    description: "Сочный шашлык из баранины",
  },
  {
    id: 2,
    name: "Чизбургер классический",
    price: 15.0,
    image: "/placeholder.svg?height=120&width=120",
    category: "burgers",
  },
  {
    id: 3,
    name: "Кока-кола 0.5л",
    price: 5.0,
    image: "/placeholder.svg?height=120&width=120",
    category: "drinks",
  },
  {
    id: 4,
    name: "Куриные крылышки BBQ",
    price: 18.0,
    image: "/placeholder.svg?height=120&width=120",
    category: "chicken",
  },
  {
    id: 5,
    name: "Комбо Мега",
    price: 25.0,
    image: "/placeholder.svg?height=120&width=120",
    category: "combo",
  },
  {
    id: 6,
    name: "Картофель фри большой",
    price: 8.0,
    image: "/placeholder.svg?height=120&width=120",
    category: "sides",
  },
]

const categories = [
  {
    id: "all",
    name: "Все продукты",
    icon: Package,
  },
  {
    id: "burgers",
    name: "Бургеры",
    icon: Sandwich,
  },
  {
    id: "drinks",
    name: "Напитки",
    icon: Coffee,
  },
  {
    id: "sides",
    name: "Гарниры",
    icon: ShoppingBasket,
  },
  {
    id: "chicken",
    name: "Курица",
    icon: Drumstick,
  },
  {
    id: "combo",
    name: "Комбо наборы",
    icon: Box,
  },
]

export function RestaurantMenu() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [searchQuery, setSearchQuery] = useState("")

  const addToCart = (item: MenuItem) => {
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
    <div className="px-6">
      {/* Верхняя панель */}
      <MenuHeader searchQuery={searchQuery} onSearchChange={setSearchQuery} />

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
            <h2 className="text-lg font-bold text-white mb-6">Меню</h2>
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
          items={cartItems}
          totalAmount={totalAmount}
          onUpdateQuantity={updateQuantity}
          onRemoveItem={removeFromCart}
        />
      </div>
    </div>
  )
}
