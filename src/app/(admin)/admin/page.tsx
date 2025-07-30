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
import { BarChart3, TrendingUp, Activity, Clock, ShoppingCart, DollarSign, AlertCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import UserTable from "@/features/admin/user-table/user-table"
import type { AppDispatch, RootState } from "@/app/store/store"
import { useDispatch, useSelector } from "react-redux"
import { getUsers } from "@/entities/user/api/api"
import SettingsAdmin from "@/widgets/admin/super-admin/settingd-dmin/settings-admin"

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [isLoading] = useState(false)
  const router = useRouter()
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [userRole, setUserRole] = useState<"super-admin" | "restaurant-owner" | "cashier" | undefined>(undefined)
  const [userName, setUserName] = useState<string | null>(null)

  const dispatch: AppDispatch = useDispatch()
  const { users } = useSelector((state: RootState) => state.users)

  useEffect(() => {
    if (typeof window === "undefined") return
    const savedUserString = localStorage.getItem("user")
    console.log("localStorage 'user' raw string:", savedUserString)

    let parsedUser: { username: string; role: string } | null = null
    if (savedUserString) {
      try {
        const potentialUser = JSON.parse(savedUserString)
        // Case 1: Stored as an object with a username property
        if (typeof potentialUser === "object" && potentialUser !== null && "username" in potentialUser) {
          parsedUser = potentialUser as { username: string; role: string }
        }
        // Case 2: Stored as a JSON-stringified plain string (e.g., JSON.stringify("myusername"))
        else if (typeof potentialUser === "string") {
          parsedUser = { username: potentialUser, role: "unknown" } // Assign a default role or handle as needed
        } else {
          console.warn("⚠️ localStorage 'user' content is not a recognized format:", potentialUser)
        }
      } catch (e) {
        console.error("Error parsing localStorage 'user' item as JSON:", e)
        // Case 3: Stored as a plain username string (e.g., "myusername")
        parsedUser = { username: savedUserString, role: "unknown" } // Treat as plain string if JSON parsing fails
      }
    }

    if (parsedUser && parsedUser.username) {
      setUserName(parsedUser.username) // Set the username string
      console.log("Set userName from localStorage:", parsedUser.username)
      dispatch(getUsers()) // Fetch users from API
    } else {
      console.log("No valid user found in localStorage or invalid format.")
      setUserName(null) // Ensure userName is null if no valid user is found
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
          setUserRole("restaurant-owner") // Default fallback
        }
      } else {
        console.warn("⚠️ User not found in users array for username:", userName)
        setUserRole(undefined) // Clear role if user not found
      }
    } else if (userName && users.length === 0) {
      console.log("Waiting for users data to load...")
    } else {
      console.log("userName is null or users array is empty, cannot determine role.")
      setUserRole(undefined) // Ensure role is undefined if username is not set
    }
  }, [userName, users])

  // Проверяем авторизацию
  useEffect(() => {
    if (typeof window === "undefined") return
    const isLoggedIn = localStorage.getItem("isLoggedIn")
    if (isLoggedIn === "true") {
      setIsAuthorized(true)
    } else {
      router.replace("/not-found")
    }
  }, [router])

  if (!isAuthorized) {
    return null
  }

  // Super Admin Dashboard Content
  const renderSuperAdminDashboard = () => (
    <div className="space-y-8 animate-fade-in-up">
      <div className="flex flex-col space-y-2">
        <h1 className="text-4xl font-bold tracking-tight text-white text-shadow-glow">Super Admin Dashboard</h1>
        <p className="text-lg text-gray-300">Welcome back! Here's what's happening with your platform today.</p>
      </div>
      <div className="animate-fade-in-up animation-delay-200">
        <StatsCards isLoading={isLoading} userRole={userRole} />
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 animate-fade-in-up animation-delay-200">
          <Card className="border border-[#333333] bg-[#1a1a1a] hover:border-orange-500/30 transition-all duration-300 glass-effect">
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-orange-500/20 border border-orange-500/30 rounded-lg">
                  <Activity className="h-5 w-5 text-orange-400" />
                </div>
                <div>
                  <CardTitle className="text-xl font-semibold text-white">Recent Applications</CardTitle>
                  <p className="text-sm text-gray-400 mt-1">Latest restaurant registration requests</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { name: "Bella Vista Restaurant", owner: "Ivan Petrov", status: "pending", time: "2 hours ago" },
                { name: "Sushi Master", owner: "Anna Smirnova", status: "approved", time: "5 hours ago" },
                { name: "Pizza Corner", owner: "Mikhail Kozlov", status: "rejected", time: "1 day ago" },
                { name: "Cafe Delight", owner: "Elena Volkov", status: "pending", time: "2 days ago" },
              ].map((restaurant, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 rounded-xl bg-gray-800/30 hover:bg-gray-700/50 transition-all duration-200 animate-fade-in-up"
                  style={{ animationDelay: `${300 + index * 100}ms` }}
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-white">{restaurant.name.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="font-medium text-white">{restaurant.name}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <p className="text-sm text-gray-400">by {restaurant.owner}</p>
                        <span className="text-gray-600">•</span>
                        <p className="text-sm text-gray-400 flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {restaurant.time}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                      restaurant.status === "approved"
                        ? "bg-green-500/20 text-green-400 border border-green-500/30"
                        : restaurant.status === "rejected"
                          ? "bg-red-500/20 text-red-400 border border-red-500/30"
                          : "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                    }`}
                  >
                    {restaurant.status === "approved"
                      ? "Approved"
                      : restaurant.status === "rejected"
                        ? "Rejected"
                        : "Pending Review"}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
        <div className="animate-fade-in-up animation-delay-200">
          <Card className="border border-[#333333] bg-[#1a1a1a] hover:border-orange-500/30 transition-all duration-300 glass-effect h-full">
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-500/20 border border-purple-500/30 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-purple-400" />
                </div>
                <div>
                  <CardTitle className="text-xl font-semibold text-white">Analytics</CardTitle>
                  <p className="text-sm text-gray-400 mt-1">Monthly performance insights</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col">
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center space-y-4 animate-fade-in-up">
                  <div className="p-6 bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-purple-500/30 rounded-2xl">
                    <BarChart3 className="h-16 w-16 mx-auto text-purple-400" />
                  </div>
                  <div>
                    <p className="text-gray-300 text-sm">Interactive charts coming soon</p>
                    <p className="text-xs text-gray-500 mt-1">Advanced analytics dashboard in development</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )

  // Restaurant Owner Dashboard Content
  const renderRestaurantOwnerDashboard = () => (
    <div className="space-y-8 animate-fade-in-up">
      <div className="flex flex-col space-y-2">
        <h1 className="text-4xl font-bold tracking-tight text-white text-shadow-glow">Restaurant Management</h1>
        <p className="text-lg text-gray-300">
          Welcome back, {userName}! Manage your restaurant operations and track performance.
        </p>
      </div>

      <div className="animate-fade-in-up animation-delay-200">
        <StatsCards isLoading={isLoading} userRole={userRole} />
      </div>

      {/* Recent Orders and Quick Actions */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2">
          <Card className="border border-[#333333] bg-[#1a1a1a] hover:border-orange-500/30 transition-all duration-300 glass-effect">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-500/20 border border-blue-500/30 rounded-lg">
                    <ShoppingCart className="h-5 w-5 text-blue-400" />
                  </div>
                  <div>
                    <CardTitle className="text-xl font-semibold text-white">Recent Orders</CardTitle>
                    <p className="text-sm text-gray-400 mt-1">Latest customer orders</p>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  id: "#1247",
                  customer: "John Smith",
                  items: "2x Burger, 1x Fries",
                  total: "$24.50",
                  status: "preparing",
                  time: "5 min ago",
                },
                {
                  id: "#1246",
                  customer: "Sarah Johnson",
                  items: "1x Pizza Margherita",
                  total: "$18.00",
                  status: "ready",
                  time: "12 min ago",
                },
                {
                  id: "#1245",
                  customer: "Mike Wilson",
                  items: "3x Tacos, 2x Drinks",
                  total: "$31.25",
                  status: "delivered",
                  time: "25 min ago",
                },
                {
                  id: "#1244",
                  customer: "Emma Davis",
                  items: "1x Salad, 1x Soup",
                  total: "$16.75",
                  status: "preparing",
                  time: "32 min ago",
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
                    {order.status === "ready" ? "Ready" : order.status === "delivered" ? "Delivered" : "Preparing"}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="border border-[#333333] bg-[#1a1a1a] hover:border-orange-500/30 transition-all duration-300 glass-effect">
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-orange-500/20 border border-orange-500/30 rounded-lg">
                  <AlertCircle className="h-5 w-5 text-orange-400" />
                </div>
                <div>
                  <CardTitle className="text-xl font-semibold text-white">Alerts</CardTitle>
                  <p className="text-sm text-gray-400 mt-1">Important notifications</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                <p className="text-sm text-red-400 font-medium">Low Stock Alert</p>
                <p className="text-xs text-gray-400 mt-1">Burger buns running low (12 left)</p>
              </div>
              <div className="p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                <p className="text-sm text-yellow-400 font-medium">Staff Break</p>
                <p className="text-xs text-gray-400 mt-1">2 staff members on break</p>
              </div>
              <div className="p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                <p className="text-sm text-blue-400 font-medium">New Review</p>
                <p className="text-xs text-gray-400 mt-1">5-star review received</p>
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
      <div className="flex flex-col space-y-2">
        <h1 className="text-4xl font-bold tracking-tight text-white text-shadow-glow">Cashier Dashboard</h1>
        <p className="text-lg text-gray-300">Welcome back, {userName}! Handle orders and payments efficiently.</p>
      </div>

      <div className="animate-fade-in-up animation-delay-200">
        <StatsCards isLoading={isLoading} userRole={userRole} />
      </div>

      {/* Active Orders and Quick Actions */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <Card className="border border-[#333333] bg-[#1a1a1a] hover:border-orange-500/30 transition-all duration-300 glass-effect">
          <CardHeader className="pb-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-orange-500/20 border border-orange-500/30 rounded-lg">
                <ShoppingCart className="h-5 w-5 text-orange-400" />
              </div>
              <div>
                <CardTitle className="text-xl font-semibold text-white">Active Orders</CardTitle>
                <p className="text-sm text-gray-400 mt-1">Orders ready for payment</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              {
                id: "#1250",
                table: "Table 5",
                items: "2x Burger, 1x Fries, 2x Drinks",
                total: "$32.50",
                status: "ready",
              },
              { id: "#1249", table: "Table 12", items: "1x Pizza, 1x Salad", total: "$28.00", status: "ready" },
              { id: "#1248", table: "Takeout", items: "3x Sandwiches", total: "$21.75", status: "preparing" },
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
                  {order.status === "ready" ? "Ready to Pay" : "Preparing"}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border border-[#333333] bg-[#1a1a1a] hover:border-orange-500/30 transition-all duration-300 glass-effect">
          <CardHeader className="pb-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-500/20 border border-green-500/30 rounded-lg">
                <DollarSign className="h-5 w-5 text-green-400" />
              </div>
              <div>
                <CardTitle className="text-xl font-semibold text-white">Payment Methods</CardTitle>
                <p className="text-sm text-gray-400 mt-1">Today's payment breakdown</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { method: "Card Payments", amount: "$847.50", percentage: "68%", color: "bg-blue-500" },
              { method: "Cash Payments", amount: "$312.25", percentage: "25%", color: "bg-green-500" },
              { method: "Digital Wallet", amount: "$87.25", percentage: "7%", color: "bg-purple-500" },
            ].map((payment, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-800/30">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${payment.color}`}></div>
                  <div>
                    <p className="text-sm font-medium text-white">{payment.method}</p>
                    <p className="text-xs text-gray-400">{payment.percentage} of total</p>
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
      // Super Admin specific tabs
      case "restaurants":
        return userRole === "super-admin" ? (
          <div className="animate-fade-in-up">
            <RestaurantTable />
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-400">Access denied</p>
          </div>
        )
      case "jobs":
        return userRole === "super-admin" ? (
          <div className="animate-fade-in-up">
            <JobTable isLoading={isLoading} />
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-400">Access denied</p>
          </div>
        )
      case "users":
        return userRole === "super-admin" ? (
          <div className="animate-fade-in-up">
            <UserTable />
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-400">Access denied</p>
          </div>
        )
      case "settings":
        return (
          <div className="animate-fade-in-up">
            <div className="text-center py-12">
              <p className="text-gray-400">
                <SettingsAdmin />
              </p>
            </div>
          </div>
        )
      // Restaurant Owner specific tabs
      case "menu":
        return userRole === "restaurant-owner" ? (
          <div className="animate-fade-in-up">
            <MenuManagement />
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-400">Access denied</p>
          </div>
        )
      case "tables":
        return userRole === "restaurant-owner" ? (
          <div className="animate-fade-in-up">
            <TableManagement />
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-400">Access denied</p>
          </div>
        )
      case "orders":
        return userRole === "restaurant-owner" || userRole === "cashier" ? (
          <div className="animate-fade-in-up">
            {userRole === "cashier" ? (
              <OrderProcessing />
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-400">Order Management will be displayed here</p>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-400">Access denied</p>
          </div>
        )
      case "staff":
        return userRole === "restaurant-owner" ? (
          <div className="animate-fade-in-up">
            <div className="text-center py-12">
              <p className="text-gray-400">Staff Management will be displayed here</p>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-400">Access denied</p>
          </div>
        )
      case "analytics":
        return userRole === "restaurant-owner" ? (
          <div className="animate-fade-in-up">
            <div className="text-center py-12">
              <p className="text-gray-400">Sales Analytics will be displayed here</p>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-400">Access denied</p>
          </div>
        )
      case "profile":
        return (
          <div className="animate-fade-in-up">
            <div className="text-center py-12">
              <p className="text-gray-400">Profile Settings will be displayed here</p>
            </div>
          </div>
        )
      // Cashier specific tabs
      case "payments":
        return userRole === "cashier" ? (
          <div className="animate-fade-in-up">
            <OrderProcessing />
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-400">Access denied</p>
          </div>
        )
      default:
        return null
    }
  }

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
