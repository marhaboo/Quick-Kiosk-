"use client"

import { useEffect, useState } from "react"
import Sidebar from "@/widgets/admin/super-admin/sidebar/sidebar"
import StatsCards from "@/widgets/admin/super-admin/stats-cards/stats-cards"
import RestaurantTable from "@/widgets/admin/super-admin/restaurant-table/restaurant-table"
import JobTable from "@/widgets/admin/super-admin/job-table/job-table"
import MenuManagement from "@/widgets/admin/restaurant-owner/menu-management/menu-management"
import TableManagement from "@/widgets/admin/restaurant-owner/table-management/table-management"
import OrderProcessing from "@/widgets/admin/restaurant-owner/order-processing/order-processing"
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/shared/ui/chart"
import { TrendingUp, ShoppingCart, DollarSign, AlertCircle, Activity, Clock } from "lucide-react"
import { useRouter } from "next/navigation"
import UserTable from "@/features/admin/user-table/user-table"
import type { AppDispatch, RootState } from "@/app/store/store"
import { useDispatch, useSelector } from "react-redux"
import { getUsers } from "@/entities/user/api/api"
import SettingsAdmin from "@/widgets/admin/super-admin/settingd-dmin/settings-admin"
import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts"

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [isLoading] = useState(false)
  const router = useRouter()
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [userRole, setUserRole] = useState<"super-admin" | "restaurant-owner" | "cashier" | undefined>(undefined)
  const [userName, setUserName] = useState<string | null>(null)
  const [isAuth, setIsAuth] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      router.replace("/login")
    } else {
      setIsAuth(true)
    }
  }, [router])

  const dispatch: AppDispatch = useDispatch()
  const { users } = useSelector((state: RootState) => state.users)
  const { requests } = useSelector((state: RootState) => state.resRequest)

  useEffect(() => {
    if (typeof window === "undefined") return
    const savedUserString = localStorage.getItem("user")
    console.log("localStorage 'user' raw string:", savedUserString)
    let parsedUser: { username: string; role: string } | null = null
    if (savedUserString) {
      try {
        const potentialUser = JSON.parse(savedUserString)
        if (typeof potentialUser === "object" && potentialUser !== null && "username" in potentialUser) {
          parsedUser = potentialUser as { username: string; role: string }
        } else if (typeof potentialUser === "string") {
          parsedUser = { username: potentialUser, role: "unknown" }
        } else {
          console.warn("⚠️ localStorage 'user' content is not a recognized format:", potentialUser)
        }
      } catch (e) {
        console.error("Error parsing localStorage 'user' item as JSON:", e)
        parsedUser = { username: savedUserString, role: "unknown" }
      }
    }

    if (parsedUser && parsedUser.username) {
      setUserName(parsedUser.username)
      console.log("Set userName from localStorage:", parsedUser.username)
      dispatch(getUsers())
    } else {
      console.log("No valid user found in localStorage or invalid format.")
      setUserName(null)
    }
  }, [dispatch])

  useEffect(() => {
    console.log("Current userName state:", userName)
    console.log("Current users from Redux:", users)
    if (userName && users.length > 0) {
      const currentUser = users.find((user) => user.username === userName)
      if (currentUser) {
        console.log("✅ Found user in Redux store:", currentUser)
        if (["Admin"].includes(currentUser.role)) {
          setUserRole("super-admin")
        } else if (["Restaurant Owner"].includes(currentUser.role)) {
          setUserRole("restaurant-owner")
        } else if (["Cashier"].includes(currentUser.role)) {
          setUserRole("cashier")
        } else {
          setUserRole("restaurant-owner")
        }
      } else {
        console.warn("⚠️ User not found in users array for username:", userName)
        setUserRole(undefined)
      }
    } else if (userName && users.length === 0) {
      console.log("Waiting for users data to load...")
    } else {
      console.log("userName is null or users array is empty, cannot determine role.")
      setUserRole(undefined)
    }
  }, [userName, users])

  useEffect(() => {
    if (typeof window === "undefined") return
    const isLoggedIn = localStorage.getItem("isLoggedIn")
    if (isLoggedIn === "true") {
      setIsAuthorized(true)
    } else {
      router.replace("/not-found")
    }
  }, [router])

  if (!isAuthorized && !isAuth) {
    return null
  }


  // Get user role statistics for chart
  const getUserRoleStats = () => {
    const stats = { admin: 0, owner: 0, cashier: 0 }
    users.forEach((user) => {
      if (user.role === "Admin") stats.admin++
      else if (user.role === "Owner") stats.owner++
      else if (user.role === "Cashier") stats.cashier++
    })
    return [
      { name: "Администраторы", value: stats.admin, color: "#8b5cf6" },
      { name: "Владельцы ресторанов", value: stats.owner, color: "#10b981" },
      { name: "Кассиры", value: stats.cashier, color: "#f59e0b" },
    ]
  }

  // Get monthly data for bar chart
  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return "Только что"
    if (diffInHours < 24) return `${diffInHours} час${diffInHours === 1 ? "" : diffInHours < 5 ? "а" : "ов"} назад`
    const diffInDays = Math.floor(diffInHours / 24)
    return `${diffInDays} день${diffInDays === 1 ? "" : diffInDays < 5 ? "я" : "ей"} назад`
  }

  // Get status display text
  const getStatusText = (status: string) => {
    switch (status) {
      case "Pending":
        return "На рассмотрении"
      case "Accepted":
        return "Одобрено"
      case "Rejected":
        return "Отклонено"
      default:
        return "Неизвестно"
    }
  }

  // Get status color classes
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Accepted":
        return "bg-green-500/20 text-green-400 border border-green-500/30"
      case "Rejected":
        return "bg-red-500/20 text-red-400 border border-red-500/30"
      case "Pending":
        return "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border border-gray-500/30"
    }
  }

  // Контент панели Супер-админа
  const renderSuperAdminDashboard = () => (
    <div className="space-y-8 animate-fade-in-up">
      {/* Заголовок */}
      <div className="flex flex-col space-y-2">
        <h1 className="text-4xl font-bold tracking-tight text-white text-shadow-glow">Панель супер-админа</h1>
        <p className="text-lg text-gray-300">
          Добро пожаловать! Здесь собрана ключевая информация о системе на сегодня.
        </p>
      </div>

      {/* Карточки статистики */}
      <div className="animate-fade-in-up animation-delay-200">
        <StatsCards isLoading={isLoading} userRole={userRole} />
      </div>

      {/* Две секции: Последние заявки и пользователи */}
<div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-stretch">
  {/* Последние заявки */}
  <div className="xl:col-span-1 animate-fade-in-up animation-delay-200">
    <Card className="h-full border border-[#333333] bg-[#1a1a1a] hover:border-orange-500/30 transition-all duration-300 glass-effect">
      <CardHeader className="pb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-orange-500/20 border border-orange-500/30 rounded-lg">
            <Activity className="h-5 w-5 text-orange-400" />
          </div>
          <div>
            <CardTitle className="text-xl font-semibold text-white">Последние заявки</CardTitle>
            <p className="text-sm text-gray-400 mt-1">Новые запросы на регистрацию</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {requests.slice(0, 4).map((request, index) => (
          <div
            key={request.id || index}
            className="flex items-center justify-between p-4 rounded-xl bg-gray-800/30 hover:bg-gray-700/50 transition-all duration-200 animate-fade-in-up"
            style={{ animationDelay: `${300 + index * 100}ms` }}
          >
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-white">{request.name?.charAt(0) || "R"}</span>
              </div>
              <div>
                <p className="font-medium text-white">{request.name || "Неизвестный ресторан"}</p>
                <div className="flex items-center space-x-2 mt-1">
                  <p className="text-sm text-gray-400">от {request.ownerFullName || "Неизвестный владелец"}</p>
                  <span className="text-gray-600">•</span>
                  <p className="text-sm text-gray-400 flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {formatTimeAgo(request.createdAt || new Date().toISOString())}
                  </p>
                </div>
              </div>
            </div>
            {/* Статус */}
            <div
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${getStatusColor(
                request.status || "Pending",
              )}`}
            >
              {getStatusText(request.status || "Pending")}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  </div>

  {/* Статистика пользователей */}
  <div className="animate-fade-in-up animation-delay-400">
    <Card className="h-full border border-[#333333] bg-[#1a1a1a] hover:border-orange-500/30 transition-all duration-300 glass-effect">
      <CardHeader className="pb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-purple-500/20 border border-purple-500/30 rounded-lg">
            <TrendingUp className="h-5 w-5 text-purple-400" />
          </div>
          <div>
            <CardTitle className="text-xl font-semibold text-white">Пользователи системы</CardTitle>
            <p className="text-sm text-gray-400 mt-1">Распределение по ролям</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col justify-between">
        <ChartContainer
          config={{
            admin: { label: "Администраторы", color: "#8b5cf6" },
            owner: { label: "Владельцы", color: "#10b981" },
            cashier: { label: "Кассиры", color: "#f59e0b" },
          }}
          className="h-[200px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={getUserRoleStats()}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {getUserRoleStats().map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <ChartTooltip content={<ChartTooltipContent />} />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
        <div className="mt-4 space-y-2">
          {getUserRoleStats().map((stat, index) => (
            <div key={index} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: stat.color }}></div>
                <span className="text-gray-300">{stat.name}</span>
              </div>
              <span className="text-white font-medium">{stat.value}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  </div>
</div>

    </div>
  )

  // Контент панели владельца ресторана
  const renderRestaurantOwnerDashboard = () => (
    <div className="space-y-8 animate-fade-in-up">
      {/* Заголовок */}
      <div className="flex flex-col space-y-2">
        <h1 className="text-4xl font-bold tracking-tight text-white text-shadow-glow">Управление рестораном</h1>
        <p className="text-lg text-gray-300">
          Добро пожаловать, {userName}! Управляйте операциями ресторана и отслеживайте показатели.
        </p>
      </div>

      {/* Карточки статистики */}
      <div className="animate-fade-in-up animation-delay-200">
        <StatsCards isLoading={isLoading} userRole={userRole} />
      </div>

      {/* Последние заказы и уведомления */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Последние заказы */}
        <div className="xl:col-span-2">
          <Card className="border border-[#333333] bg-[#1a1a1a] hover:border-orange-500/30 transition-all duration-300 glass-effect">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-500/20 border border-blue-500/30 rounded-lg">
                    <ShoppingCart className="h-5 w-5 text-blue-400" />
                  </div>
                  <div>
                    <CardTitle className="text-xl font-semibold text-white">Последние заказы</CardTitle>
                    <p className="text-sm text-gray-400 mt-1">Свежие заказы клиентов</p>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  id: "#1247",
                  customer: "Иван Смирнов",
                  items: "2x Бургер, 1x Картофель фри",
                  total: "1850₽",
                  status: "preparing",
                  time: "5 мин назад",
                },
                {
                  id: "#1246",
                  customer: "Сара Джонсон",
                  items: "1x Пицца Маргарита",
                  total: "1350₽",
                  status: "ready",
                  time: "12 мин назад",
                },
                {
                  id: "#1245",
                  customer: "Михаил Волков",
                  items: "3x Тако, 2x Напитки",
                  total: "2350₽",
                  status: "delivered",
                  time: "25 мин назад",
                },
                {
                  id: "#1244",
                  customer: "Эмма Дэвис",
                  items: "1x Салат, 1x Суп",
                  total: "1260₽",
                  status: "preparing",
                  time: "32 мин назад",
                },
              ].map((order, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 rounded-xl bg-gray-800/30 hover:bg-gray-700/50 transition-all duration-200"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-white">{order.id.slice(-2)}</span>
                    </div>
                    <div>
                      <p className="font-medium text-white">{order.customer}</p>
                      <p className="text-sm text-gray-400">{order.items}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <p className="text-sm text-green-400 font-medium">{order.total}</p>
                        <span className="text-gray-600">•</span>
                        <p className="text-sm text-gray-400">{order.time}</p>
                      </div>
                    </div>
                  </div>
                  <div
                    className={`px-3 py-1.5 rounded-full text-xs font-medium ${
                      order.status === "ready"
                        ? "bg-green-500/20 text-green-400 border border-green-500/30"
                        : order.status === "delivered"
                          ? "bg-gray-500/20 text-gray-400 border border-gray-500/30"
                          : "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                    }`}
                  >
                    {order.status === "ready" ? "Готов" : order.status === "delivered" ? "Доставлен" : "Готовится"}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Уведомления */}
        <div>
          <Card className="border border-[#333333] bg-[#1a1a1a] hover:border-orange-500/30 transition-all duration-300 glass-effect">
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-orange-500/20 border border-orange-500/30 rounded-lg">
                  <AlertCircle className="h-5 w-5 text-orange-400" />
                </div>
                <div>
                  <CardTitle className="text-xl font-semibold text-white">Уведомления</CardTitle>
                  <p className="text-sm text-gray-400 mt-1">Важные оповещения</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                <p className="text-sm text-red-400 font-medium">Мало товара на складе</p>
                <p className="text-xs text-gray-400 mt-1">Булочки для бургеров заканчиваются (осталось 12)</p>
              </div>
              <div className="p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                <p className="text-sm text-yellow-400 font-medium">Перерыв персонала</p>
                <p className="text-xs text-gray-400 mt-1">2 сотрудника на перерыве</p>
              </div>
              <div className="p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                <p className="text-sm text-blue-400 font-medium">Новый отзыв</p>
                <p className="text-xs text-gray-400 mt-1">Получен 5-звездочный отзыв</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )

  // Cashier Dashboard Content
  const renderCashierDashboard = () => (
    <div className="space-y-8 animate-fade-in-up">
      {/* Заголовок и приветствие */}
      <div className="flex flex-col space-y-2">
        <h1 className="text-4xl font-bold tracking-tight text-white text-shadow-glow">Панель Кассира</h1>
        <p className="text-lg text-gray-300">
          Добро пожаловать, {userName}! Обрабатывайте заказы и платежи эффективно.
        </p>
      </div>

      {/* Статистика */}
      <div className="animate-fade-in-up animation-delay-200">
        <StatsCards isLoading={isLoading} userRole={userRole} />
      </div>

      {/* Активные заказы и способы оплаты */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Активные заказы */}
        <Card className="border border-[#333333] bg-[#1a1a1a] hover:border-orange-500/30 transition-all duration-300 glass-effect">
          <CardHeader className="pb-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-orange-500/20 border border-orange-500/30 rounded-lg">
                <ShoppingCart className="h-5 w-5 text-orange-400" />
              </div>
              <div>
                <CardTitle className="text-xl font-semibold text-white">Активные Заказы</CardTitle>
                <p className="text-sm text-gray-400 mt-1">Заказы готовые к оплате</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              {
                id: "#1250",
                table: "Стол 5",
                items: "2x Бургер, 1x Картофель фри, 2x Напитки",
                total: "2450₽",
                status: "ready",
              },
              {
                id: "#1249",
                table: "Стол 12",
                items: "1x Пицца, 1x Салат",
                total: "2100₽",
                status: "ready",
              },
              {
                id: "#1248",
                table: "На вынос",
                items: "3x Сэндвича",
                total: "1635₽",
                status: "preparing",
              },
            ].map((order, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 rounded-xl bg-gray-800/30 hover:bg-gray-700/50 transition-all duration-200"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-white">{order.id.slice(-2)}</span>
                  </div>
                  <div>
                    <p className="font-medium text-white">{order.table}</p>
                    <p className="text-sm text-gray-400">{order.items}</p>
                    <p className="text-sm text-green-400 font-medium mt-1">{order.total}</p>
                  </div>
                </div>
                <div
                  className={`px-3 py-1.5 rounded-full text-xs font-medium ${
                    order.status === "ready"
                      ? "bg-green-500/20 text-green-400 border border-green-500/30"
                      : "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                  }`}
                >
                  {order.status === "ready" ? "Готов к оплате" : "Готовится"}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Способы оплаты */}
        <Card className="border border-[#333333] bg-[#1a1a1a] hover:border-orange-500/30 transition-all duration-300 glass-effect">
          <CardHeader className="pb-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-500/20 border border-green-500/30 rounded-lg">
                <DollarSign className="h-5 w-5 text-green-400" />
              </div>
              <div>
                <CardTitle className="text-xl font-semibold text-white">Способы Оплаты</CardTitle>
                <p className="text-sm text-gray-400 mt-1">Разбивка платежей за сегодня</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { method: "Оплата картой", amount: "63,563₽", percentage: "68%", color: "bg-blue-500" },
              { method: "Наличные", amount: "23,419₽", percentage: "25%", color: "bg-green-500" },
              { method: "Цифровой кошелек", amount: "6,544₽", percentage: "7%", color: "bg-purple-500" },
            ].map((payment, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-800/30">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${payment.color}`}></div>
                  <div>
                    <p className="text-sm font-medium text-white">{payment.method}</p>
                    <p className="text-xs text-gray-400">{payment.percentage} от общего</p>
                  </div>
                </div>
                <p className="text-sm font-medium text-green-400">{payment.amount}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        if (userRole === "super-admin") {
          return renderSuperAdminDashboard()
        } else if (userRole === "restaurant-owner") {
          return renderRestaurantOwnerDashboard()
        } else if (userRole === "cashier") {
          return renderCashierDashboard()
        }
        return renderSuperAdminDashboard()
      case "restaurants":
        return userRole === "super-admin" ? (
          <div className="animate-fade-in-up">
            <RestaurantTable />
          </div>
        ) : (
          <AccessDenied />
        )
      case "jobs":
        return userRole === "super-admin" ? (
          <div className="animate-fade-in-up">
            <JobTable isLoading={isLoading} />
          </div>
        ) : (
          <AccessDenied />
        )
      case "users":
        return userRole === "super-admin" ? (
          <div className="animate-fade-in-up">
            <UserTable />
          </div>
        ) : (
          <AccessDenied />
        )
      case "settings":
        return (
          <div className="animate-fade-in-up">
            <div className="text-center py-12 text-gray-400">
              <SettingsAdmin />
            </div>
          </div>
        )
      case "menu":
        return userRole === "restaurant-owner" ? (
          <div className="animate-fade-in-up">
            <MenuManagement />
          </div>
        ) : (
          <AccessDenied />
        )
      case "tables":
        return userRole === "restaurant-owner" ? (
          <div className="animate-fade-in-up">
            <TableManagement />
          </div>
        ) : (
          <AccessDenied />
        )
      case "orders":
        return userRole === "restaurant-owner" || userRole === "cashier" ? (
          <div className="animate-fade-in-up">
            {userRole === "cashier" ? (
              <OrderProcessing />
            ) : (
              <OrderProcessing/>
            )}
          </div>
        ) : (
          <AccessDenied />
        )
      case "staff":
        return userRole === "restaurant-owner" ? (
          <div className="animate-fade-in-up">
            <div className="text-center py-12 text-gray-400">Управление персоналом будет отображено здесь</div>
          </div>
        ) : (
          <AccessDenied />
        )
      case "analytics":
        return userRole === "restaurant-owner" ? (
          <div className="animate-fade-in-up">
            <div className="text-center py-12 text-gray-400">Аналитика продаж будет отображена здесь</div>
          </div>
        ) : (
          <AccessDenied />
        )
      case "profile":
        return (
          <div className="animate-fade-in-up">
            <div className="text-center py-12 text-gray-400">Настройки профиля будут отображены здесь</div>
          </div>
        )
      case "payments":
        return userRole === "restaurant-owner" ? (
          <div className="animate-fade-in-up">
            <OrderProcessing />
          </div>
        ) : (
          <AccessDenied />
        )
      default:
        return null
    }
  }

  // Компонент для вывода сообщения "Доступ запрещен"
  const AccessDenied = () => (
    <div className="text-center py-12">
      <p className="text-gray-400">Доступ запрещен</p>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] to-[#1a1a1a]">
      <div className="flex">
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} userRole={userRole} userName={userName} />
        <main className="flex-1 p-8 lg:p-12">
          <div className="animate-fade-in-up">{renderContent()}</div>
        </main>
      </div>
    </div>
  )
}
