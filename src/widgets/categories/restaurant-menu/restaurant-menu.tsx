"use client"

import { useEffect, useState } from "react"
import { Package } from "lucide-react"
import { MenuHeader } from "@/widgets/categories/menu-header/menu-header"
import MenuSidebar from "@/features/categories/menu-sidebar/menu-sidebar"
import { CartSidebar } from "../cart-sidebar/cart-sidebar"
import MenuGrid from "@/features/categories/menu-grid/menu-grid"
import { getRestaurantById } from "@/entities/restaurantById/api/api"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@/app/store/store"
import { API_BASE_URL } from "@/shared/utils/image-utils"
import { ShortMenuItem } from "@/entities/home/models/types"


export interface CartItem extends ShortMenuItem {
  quantity: number
}


export function RestaurantMenu({ restaurantId }: { restaurantId: string; }) {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [searchQuery, setSearchQuery] = useState("")

  const { currentRestaurant } = useSelector((state: RootState) => state.resById)
  const dispatch: AppDispatch = useDispatch()
  const categories = [
    {
      id: "all",
      name: "Все продукты",
      image: "/images/all-category.svg",
    },
    ...(currentRestaurant?.categories?.map((cat) => ({
      id: cat.id.toString(),
      name: cat.name,
      image: API_BASE_URL + cat.imageUrl
    })) ?? []),
  ]

    const isImageUrl = (url:string) => {
    return url.startsWith("/") 
  }

  const menuItems: ShortMenuItem[] = currentRestaurant?.menu
    ?
    currentRestaurant?.menu?.map((item) => ({
      id: item.id,
      name: item.name,
      price: item.price,
      image: isImageUrl(item.imageUrl) ? API_BASE_URL + item.imageUrl : "/images/placeholder.png",
      category: item.categoryId.toString() || "all",
      description: item.description
    })) : []


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
    <div className="p-6 bg-[url('/images/bg-of-site.png')] bg-no-repeat bg-cover bg-center before:absolute before:inset-0 before:bg-black/50 before:z-0">
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