"use client"

import type React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/shared/utils/cn"
import { ShoppingCart, Settings, User, Receipt, Grid3X3, UtensilsCrossed } from "lucide-react"

interface SidebarItem {
  id: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  href: string
  badge?: number
}

const sidebarItems: SidebarItem[] = [
  {
    id: "home",
    label: "Главная",
    icon: Grid3X3,
    href: "/",
  },
  {
    id: "cart",
    label: "Корзина",
    icon: ShoppingCart,
    href: "/cart",
    badge: 3,
  },
  {
    id: "orders",
    label: "Заказы",
    icon: Receipt,
    href: "/orders",
  },
  {
    id: "profile",
    label: "Профиль",
    icon: User,
    href: "/profile",
  },
  {
    id: "settings",
    label: "Настройки",
    icon: Settings,
    href: "/settings",
  },
]

export function Sidebar() {
  const pathname = usePathname() ?? ""


  return (
    <div className="fixed h-full w-20 backdrop-blur-sm  z-50">
      {/* Логотип */}
      <div className="p-4 border mb-4  rounded-3xl border-[#3D3A46]">
        <div className="flex items-center justify-center gap-3">
          <div className="w-10  h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
            <UtensilsCrossed className="w-6 h-6 text-white" />
          </div>
        </div>
      </div>
      {/* Навигация */}
      <nav className="flex flex-col items-center py-4 space-y-5 border border-[#3D3A46] rounded-3xl">
        {sidebarItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/")

          return (
            <Link key={item.id} href={item.href}>
              <div className="flex flex-col items-center group cursor-pointer">
                {/* Иконка в круге */}
                <div
                  className={cn(
                    "relative w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-200",
                    isActive
                      ? "bg-[#222125] border-gray-600"
                      : "bg-[#222125]/60 hover:bg-[#222125]/80 border-gray-600/50"
                  )}
                >
                  <Icon
                    className={cn(
                      "w-5 h-5 transition-colors duration-200",
                      isActive ? "text-white" : "text-gray-400 group-hover:text-gray-300",
                    )}
                  />

                  {/* Badge для корзины */}
                  {item.badge && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-medium">{item.badge}</span>
                    </div>
                  )}
                </div>

                {/* Текст */}
                <span
                  className={cn(
                    "text-xs font-medium mt-2 transition-colors duration-200",
                    isActive ? "text-white" : "text-gray-400 group-hover:text-gray-300",
                  )}
                >
                  {item.label}
                </span>
              </div>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
