"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  BarChart3,
  Users,
  Store,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  Shield,
  FileText,
  Table,
  ShoppingCart,
  ChefHat,
  User,
  DollarSign,
  CreditCard,
  LogOut,
} from "lucide-react"
import { Button } from "@/shared/ui/button"
import { cn } from "@/shared/lib/utils"

interface SidebarProps {
  activeTab: string
  onTabChange: (tab: string) => void
  userRole: "super-admin" | "restaurant-owner" | "cashier" | undefined
  userName: string | null
}

// Меню для разных ролей
const superAdminMenuItems = [
  { id: "dashboard", label: "Обзор", icon: BarChart3 },
  { id: "restaurants", label: "Рестораны", icon: Store },
  { id: "jobs", label: "Вакансии", icon: Briefcase },
  { id: "users", label: "Пользователи", icon: Users },
]

const restaurantOwnerMenuItems = [
  { id: "dashboard", label: "Главная", icon: BarChart3 },
  { id: "menu", label: "Меню", icon: ChefHat },
  { id: "tables", label: "Столы", icon: Table },
  { id: "orders", label: "Заказы", icon: ShoppingCart },
  { id: "staff", label: "Персонал", icon: Users },
  { id: "analytics", label: "Аналитика", icon: FileText },
]

const cashierMenuItems = [
  { id: "dashboard", label: "Главная", icon: BarChart3 },
  { id: "orders", label: "Заказы", icon: ShoppingCart },
  { id: "payments", label: "Платежи", icon: CreditCard },
  { id: "profile", label: "Профиль", icon: User },
]

export default function Sidebar({ activeTab, onTabChange, userRole }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const router = useRouter()

  // выбор меню и инфо по роли
  const getMenuConfig = () => {
    switch (userRole) {
      case "super-admin":
        return {
          menuItems: superAdminMenuItems,
          roleTitle: "Супер-админ",
          roleSubtitle: "Полный контроль системы",
          roleIcon: Shield,
          roleInitials: "СА",
        }
      case "restaurant-owner":
        return {
          menuItems: restaurantOwnerMenuItems,
          roleTitle: "Админ",
          roleSubtitle: "Управление рестораном",
          roleIcon: Store,
          roleInitials: "ВР",
        }
      case "cashier":
        return {
          menuItems: cashierMenuItems,
          roleTitle: "Кассир",
          roleSubtitle: "Работа с заказами и оплатами",
          roleIcon: DollarSign,
          roleInitials: "КА",
        }
      default:
        return {
          menuItems: [],
          roleTitle: "Загрузка...",
          roleSubtitle: "Определяем вашу роль",
          roleIcon: BarChart3,
          roleInitials: "...",
        }
    }
  }

  const { menuItems, roleTitle, roleSubtitle, roleIcon: RoleIcon } = getMenuConfig()

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token") 
    router.push("/") 
  }

  return (
    <div
      className={cn(
        "bg-[#1a1a1a] border-r border-[#333333] transition-all duration-300 ease-in-out h-screen   flex flex-col",
        isCollapsed ? "w-16 items-center" : "w-80",
      )}
    >
      {/* Header */}
      <div className="p-6 border-b border-[#333333]">
        <div className="flex items-center">
          {!isCollapsed && (
            <div className="animate-fade-in-up flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <div className="p-2 gradient-orange rounded-lg">
                  <RoleIcon className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white">{roleTitle}</h1>
                  <p className="text-sm text-gray-400">{roleSubtitle}</p>
                </div>
              </div>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-gray-400 hover:text-white hover:bg-gray-700/50 transition-all duration-200 rounded-lg"
            type="button"
          >
            {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1">
        {menuItems.map((item, index) => {
          const Icon = item.icon
          const isActive = activeTab === item.id
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={cn(
                "w-full flex items-center px-3 py-3 text-left rounded-xl transition-all duration-200 group relative animate-fade-in-up",
                isActive
                  ? "bg-gradient-to-r from-orange-500 to-yellow-500 text-white shadow-md"
                  : "text-gray-400 hover:text-white hover:bg-gray-700/50 border border-transparent hover:border-gray-600/30",
                isCollapsed && "justify-center",
              )}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <Icon
                className={cn(
                  "h-5 w-5 transition-all duration-200 flex-shrink-0",
                  isActive ? "text-white" : "text-gray-400 group-hover:text-white",
                  !isCollapsed && "mr-3",
                )}
              />
              {!isCollapsed && <span>{item.label}</span>}
            </button>
          )
        })}
      </nav>

      {/* Footer */}
      {!isCollapsed && (
        <div className="p-6 border-t border-[#333333] animate-fade-in-up">
          {/* Logout Button */}
          <Button
            onClick={handleLogout}
            variant="ghost"
            className="w-full flex items-center justify-start text-gray-400 hover:text-white hover:bg-gray-700/50 transition-all duration-200 rounded-lg"
          >
            <LogOut className="h-5 w-5 mr-2" />
            Выйти
          </Button>
        </div>
      )}
    </div>
  )
}
