"use client"

import { useEffect, useState } from "react"
import Sidebar from "@/widgets/admin/sidebar/sidebar"
import StatsCards from "@/widgets/admin/stats-cards/stats-cards"
import RestaurantTable from "@/widgets/admin/restaurant-table/restaurant-table"
import JobTable from "@/widgets/admin/job-table/job-table"
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card"
import { BarChart3 } from "lucide-react"
import { useRouter } from "next/navigation"
import UserTable from "@/features/admin/user-table/user-table"
import { AppDispatch, RootState } from "@/app/store/store"
import { useDispatch, useSelector } from "react-redux"
import { getUsers } from "@/entities/user/api/api"

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [isLoading] = useState(false)
  const router = useRouter()
  const [isAuthorized, setIsAuthorized] = useState(false)

    const userDataString = localStorage.getItem("user")
    let userName: string | null = null
    
    if(userDataString){
      const userData = JSON.parse(userDataString)
      userName = userData.userName || null
    }
  
    const dispatch:AppDispatch = useDispatch()
    useEffect(() => {
      dispatch(getUsers(userName))
    }, [dispatch,userName]) 
  
    const user = useSelector((state: RootState) => state.users.users)
  
    if(user) {
      user.filter((item) => item.role === "Admin") 
    }
    else{
  
    }

  useEffect(() => {
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

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <div className="animate-fade-in-up">
            <h2 className="text-3xl font-bold text-white mb-8 text-shadow-glow">Дашборд</h2>
            <StatsCards isLoading={isLoading} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border border-[#333333] bg-[#1a1a1a] hover:border-orange-500/30 transition-all duration-300 glass-effect animate-fade-in-up">
                <CardHeader>
                  <CardTitle className="text-white">Последние запросы</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: "Bella Vista", owner: "Иван Петров", status: "pending" },
                      { name: "Sushi Master", owner: "Анна Смирнова", status: "approved" },
                      { name: "Pizza Corner", owner: "Михаил Козлов", status: "rejected" },
                    ].map((restaurant, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between animate-fade-in-up animation-delay-200"
                        style={{ animationDelay: `${index * 200}ms` }}
                      >
                        <div>
                          <p className="font-medium text-white">{restaurant.name}</p>
                          <p className="text-sm text-gray-400">{restaurant.owner}</p>
                        </div>
                        <div
                          className={`px-2 py-1 rounded-full text-xs font-medium ${restaurant.status === "approved"
                            ? "bg-green-500/20 text-green-400 border border-green-500/30"
                            : restaurant.status === "rejected"
                              ? "bg-red-500/20 text-red-400 border border-red-500/30"
                              : "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                            }`}
                        >
                          {restaurant.status === "approved"
                            ? "Одобрено"
                            : restaurant.status === "rejected"
                              ? "Отклонено"
                              : "Ожидает"}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-[#333333] bg-[#1a1a1a] hover:border-orange-500/30 transition-all duration-300 glass-effect animate-fade-in-up">
                <CardHeader>
                  <CardTitle className="text-white">Статистика по месяцам</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-gray-500">
                    <div className="text-center animate-scale-in">
                      <BarChart3 className="h-16 w-16 mx-auto mb-4 text-orange-400" />
                      <span className="text-gray-400">График будет здесь</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )

      case "restaurants":
        return <RestaurantTable />

      case "jobs":
        return <JobTable isLoading={isLoading} />

      case "users":
        return (
          <UserTable/>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] to-[#1a1a1a]">
      <div className="flex">
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

        <div className="flex-1 p-8">{renderContent()}</div>
      </div>
    </div>
  )
}
