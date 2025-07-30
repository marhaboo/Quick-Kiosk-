"use client"
import { Card, CardContent } from "@/shared/ui/card"
import { BarChart3, Users, Store, DollarSign, ShoppingCart, TrendingUp } from "lucide-react"

interface StatsCardsProps {
  isLoading: boolean
  userRole?: "super-admin" | "restaurant-owner" | "cashier" | null | undefined
}

export default function StatsCards({ isLoading, userRole }: StatsCardsProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, index) => (
          <Card key={index} className="border border-[#333333] bg-[#1a1a1a] animate-pulse">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <div className="h-4 bg-gray-700 rounded w-20"></div>
                  <div className="h-8 bg-gray-700 rounded w-16"></div>
                </div>
                <div className="h-12 w-12 bg-gray-700 rounded-lg"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  const getSuperAdminStats = () => [
    { title: "Всего Ресторанов", value: "127", icon: Store, color: "from-blue-500 to-blue-600", change: "+12%" },
    {
      title: "Активные Пользователи",
      value: "2,847",
      icon: Users,
      color: "from-green-500 to-green-600",
      change: "+18%",
    },
    {
      title: "Заявки на Рассмотрении",
      value: "23",
      icon: BarChart3,
      color: "from-orange-500 to-orange-600",
      change: "+5%",
    },
    {
      title: "Месячная Выручка",
      value: "3,592,900₽",
      icon: DollarSign,
      color: "from-purple-500 to-purple-600",
      change: "+23%",
    },
  ]

  const getRestaurantOwnerStats = () => [
    {
      title: "Выручка за Сегодня",
      value: "213,525₽",
      icon: DollarSign,
      color: "from-green-500 to-green-600",
      change: "+12%",
    },
    { title: "Активные Заказы", value: "18", icon: ShoppingCart, color: "from-blue-500 to-blue-600", change: "+3" },
    { title: "Позиции в Меню", value: "127", icon: BarChart3, color: "from-purple-500 to-purple-600", change: "+5" },
    { title: "Месячный Рост", value: "23%", icon: TrendingUp, color: "from-orange-500 to-orange-600", change: "+8%" },
  ]

  const getCashierStats = () => [
    {
      title: "Продажи за Сегодня",
      value: "93,525₽",
      icon: DollarSign,
      color: "from-green-500 to-green-600",
      change: "+8%",
    },
    { title: "Обработано Заказов", value: "47", icon: ShoppingCart, color: "from-blue-500 to-blue-600", change: "+12" },
    { title: "Заказы в Ожидании", value: "6", icon: BarChart3, color: "from-orange-500 to-orange-600", change: "-2" },
    {
      title: "Средний Чек",
      value: "1,987₽",
      icon: TrendingUp,
      color: "from-purple-500 to-purple-600",
      change: "+5%",
    },
  ]

  const getStats = () => {
    switch (userRole) {
      case "super-admin":
        return getSuperAdminStats()
      case "restaurant-owner":
        return getRestaurantOwnerStats()
      case "cashier":
        return getCashierStats()
      default:
        return getSuperAdminStats()
    }
  }

  const stats = getStats()

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card
          key={index}
          className="border border-[#333333] bg-[#1a1a1a] hover:border-orange-500/30 transition-all duration-300 glass-effect"
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">{stat.title}</p>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-xs text-green-400 mt-1">{stat.change}</p>
              </div>
              <div className={`p-3 bg-gradient-to-br ${stat.color} rounded-lg`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
