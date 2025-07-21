"use client"

import { useState } from "react"
import { Card, CardContent } from "@/shared/ui/card"
import { Button } from "@/shared/ui/button"
import { Badge } from "@/shared/ui/badge"
import { CheckCircle, XCircle, Plus } from "lucide-react"

interface Restaurant {
  id: number
  name: string
  owner: string
  status: string
  date: string
}

interface RestaurantTableProps {
  isLoading?: boolean
}

function TableSkeleton() {
  return (
    <Card className="border border-[#333333] bg-[#1a1a1a] animate-pulse">
      <CardContent className="p-0">
        <div className="p-6">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="flex items-center justify-between py-4 border-b border-[#333333] last:border-b-0"
            >
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-700 rounded w-32" />
                <div className="h-3 bg-gray-700 rounded w-24" />
              </div>
              <div className="flex space-x-2">
                <div className="h-8 w-8 bg-gray-700 rounded-full" />
                <div className="h-8 w-8 bg-gray-700 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default function RestaurantTable({ isLoading }: RestaurantTableProps) {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([
    { id: 1, name: "Bella Vista", owner: "Иван Петров", status: "pending", date: "2024-01-15" },
    { id: 2, name: "Sushi Master", owner: "Анна Смирнова", status: "approved", date: "2024-01-14" },
    { id: 3, name: "Pizza Corner", owner: "Михаил Козлов", status: "rejected", date: "2024-01-13" },
  ])

  const updateRestaurantStatus = (id: number, status: string) => {
    setRestaurants(restaurants.map((r) => (r.id === id ? { ...r, status } : r)))
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-500/20 text-green-400 border border-green-500/30">Одобрено</Badge>
      case "rejected":
        return <Badge className="bg-red-500/20 text-red-400 border border-red-500/30">Отклонено</Badge>
      case "pending":
        return <Badge className="bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">Ожидает</Badge>
      default:
        return <Badge className="bg-gray-500/20 text-gray-400 border border-gray-500/30">{status}</Badge>
    }
  }

  if (isLoading) {
    return <TableSkeleton />
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-white">Запросы ресторанов</h2>
        <Button className="gradient-orange hover:shadow-lg hover:scale-105 transition-all duration-300 pulse-orange">
          <Plus className="mr-2 h-4 w-4" />
          Добавить ресторан
        </Button>
      </div>

      <Card className="border border-[#333333] bg-[#1a1a1a] overflow-hidden">
        <CardContent className="p-0">
          <div className="divide-y divide-[#333333]">
            {restaurants.map((restaurant, index) => (
              <div
                key={restaurant.id}
                className="p-6 hover:bg-gray-800/30 transition-all duration-300 animate-fade-in-up glass-effect"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4">
                      <div>
                        <h3 className="text-white font-semibold text-lg">{restaurant.name}</h3>
                        <p className="text-gray-400">{restaurant.owner}</p>
                        <p className="text-gray-500 text-sm">{restaurant.date}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    {getStatusBadge(restaurant.status)}
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        onClick={() => updateRestaurantStatus(restaurant.id, "approved")}
                        className="w-10 h-10 rounded-full bg-green-500/20 border border-green-500/30 text-green-400 hover:text-green-300 hover:bg-green-500/30 hover:scale-110 transition-all duration-300 glass-effect"
                      >
                        <CheckCircle className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => updateRestaurantStatus(restaurant.id, "rejected")}
                        className="w-10 h-10 rounded-full bg-red-500/20 border border-red-500/30 text-red-400 hover:text-red-300 hover:bg-red-500/30 transition-all duration-200"
                      >
                        <XCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
