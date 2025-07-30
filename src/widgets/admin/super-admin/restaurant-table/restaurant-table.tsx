"use client"

import { useSelector, useDispatch } from "react-redux"
import type { RootState, AppDispatch } from "@/app/store/store"
import { putResRequest, delResRequest, getResRequest } from "@/entities/res-request/api/api"
import { CheckCircle, XCircle, Store, Clock } from "lucide-react"
import { Button } from "@/shared/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card"
import { useEffect } from "react"

// Компонент для статуса
function getStatusBadge(status: string) {
  const normalized = status.toLowerCase()
  switch (normalized) {
    case "accepted":
      return (
        <span className="px-3 py-1 text-sm font-medium rounded-full bg-green-500/10 text-green-400 border border-green-500/20">
          Одобрено
        </span>
      )
    case "rejected":
      return (
        <span className="px-3 py-1 text-sm font-medium rounded-full bg-red-500/10 text-red-400 border border-red-500/20">
          Отклонено
        </span>
      )
    default:
      return (
        <span className="px-3 py-1 text-sm font-medium rounded-full bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">
          На рассмотрении
        </span>
      )
  }
}

const RequestList = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { requests, loading, error } = useSelector((state: RootState) => state.resRequest)

  useEffect(() => {
    dispatch(getResRequest())
  }, [dispatch])

  if (loading) {
    return (
      <Card className="border border-[#333333] bg-[#1a1a1a] animate-pulse glass-effect">
        <CardHeader>
          <div className="h-8 bg-gray-700 rounded w-48" />
        </CardHeader>
        <CardContent className="space-y-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="flex items-center justify-between p-4 rounded-xl bg-gray-800/30">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gray-700 rounded-full" />
                <div className="space-y-2">
                  <div className="h-4 bg-gray-700 rounded w-32" />
                  <div className="h-3 bg-gray-700 rounded w-24" />
                </div>
              </div>
              <div className="flex space-x-2">
                <div className="h-8 w-8 bg-gray-700 rounded-full" />
                <div className="h-8 w-8 bg-gray-700 rounded-full" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="border border-[#333333] bg-[#1a1a1a] glass-effect">
        <CardContent className="p-8 text-center">
          <p className="text-red-400">Ошибка: {error}</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h2 className="text-3xl font-bold text-white text-shadow-glow">Заявки ресторанов</h2>
        <p className="text-gray-300">Управление заявками на регистрацию ресторанов</p>
      </div>

      <Card className="border border-[#333333] bg-[#1a1a1a] glass-effect">
        <CardHeader className="pb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-orange-500/20 border border-orange-500/30 rounded-lg">
              <Store className="h-5 w-5 text-orange-400" />
            </div>
            <div>
              <CardTitle className="text-xl font-semibold text-white">Заявки в ожидании</CardTitle>
              <p className="text-sm text-gray-400 mt-1">Всего заявок: {requests.length}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {requests.length === 0 ? (
            <div className="text-center py-12">
              <Store className="h-16 w-16 mx-auto text-gray-600 mb-4" />
              <p className="text-gray-400">Заявок ресторанов не найдено</p>
            </div>
          ) : (
            requests.map((restaurant, index) => (
              <div
                key={restaurant.id}
                className="p-6 hover:bg-gray-800/30 transition-all duration-300 animate-fade-in-up glass-effect rounded-xl"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-white">{restaurant.name.charAt(0)}</span>
                      </div>
                      <div>
                        <h3 className="text-white font-semibold text-lg">{restaurant.name}</h3>
                        <p className="text-gray-400">{restaurant.ownerFullName}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Clock className="h-3 w-3 text-gray-500" />
                          <p className="text-sm text-gray-500">{restaurant.createdAt.slice(0, 10)}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    {getStatusBadge(restaurant.status)}
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        onClick={() => dispatch(putResRequest({ id: restaurant.id, status: "accepted" }))}
                        className="w-10 h-10 rounded-full bg-green-500/20 border border-green-500/30 text-green-400 hover:text-green-300 hover:bg-green-500/30 hover:scale-110 transition-all duration-300 glass-effect"
                      >
                        <CheckCircle className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => dispatch(delResRequest(restaurant.id))}
                        className="w-10 h-10 rounded-full bg-red-500/20 border border-red-500/30 text-red-400 hover:text-red-300 hover:bg-red-500/30 transition-all duration-200"
                      >
                        <XCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default RequestList
