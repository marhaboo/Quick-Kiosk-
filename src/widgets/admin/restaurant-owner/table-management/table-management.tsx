"use client"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card"
import { Button } from "@/shared/ui/button"
import { Users, Clock, CheckCircle, AlertCircle } from "lucide-react"

interface Table {
  id: string
  number: number
  capacity: number
  status: "available" | "occupied" | "reserved" | "cleaning"
  currentOrder?: {
    orderId: string
    customerName: string
    orderTime: string
    total: number
  }
  reservationTime?: string
}

export default function TableManagement() {
  const [tables] = useState<Table[]>([
    {
      id: "1",
      number: 1,
      capacity: 2,
      status: "occupied",
      currentOrder: {
        orderId: "#1247",
        customerName: "John Smith",
        orderTime: "19:30",
        total: 45.5,
      },
    },
    {
      id: "2",
      number: 2,
      capacity: 4,
      status: "available",
    },
    {
      id: "3",
      number: 3,
      capacity: 6,
      status: "reserved",
      reservationTime: "20:00",
    },
    {
      id: "4",
      number: 4,
      capacity: 2,
      status: "cleaning",
    },
    {
      id: "5",
      number: 5,
      capacity: 4,
      status: "occupied",
      currentOrder: {
        orderId: "#1248",
        customerName: "Sarah Johnson",
        orderTime: "19:45",
        total: 32.75,
      },
    },
    {
      id: "6",
      number: 6,
      capacity: 8,
      status: "available",
    },
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "occupied":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      case "reserved":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "cleaning":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "available":
        return <CheckCircle className="h-4 w-4" />
      case "occupied":
        return <Users className="h-4 w-4" />
      case "reserved":
        return <Clock className="h-4 w-4" />
      case "cleaning":
        return <AlertCircle className="h-4 w-4" />
      default:
        return <Users className="h-4 w-4" />
    }
  }

  const statusCounts = {
    available: tables.filter((t) => t.status === "available").length,
    occupied: tables.filter((t) => t.status === "occupied").length,
    reserved: tables.filter((t) => t.status === "reserved").length,
    cleaning: tables.filter((t) => t.status === "cleaning").length,
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-white">Table Management</h1>
          <p className="text-gray-400 mt-1">Monitor and manage restaurant tables</p>
        </div>
      </div>

      {/* Status Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border border-[#333333] bg-[#1a1a1a]">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-400">{statusCounts.available}</div>
            <div className="text-sm text-gray-400">Available</div>
          </CardContent>
        </Card>
        <Card className="border border-[#333333] bg-[#1a1a1a]">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-400">{statusCounts.occupied}</div>
            <div className="text-sm text-gray-400">Occupied</div>
          </CardContent>
        </Card>
        <Card className="border border-[#333333] bg-[#1a1a1a]">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-400">{statusCounts.reserved}</div>
            <div className="text-sm text-gray-400">Reserved</div>
          </CardContent>
        </Card>
        <Card className="border border-[#333333] bg-[#1a1a1a]">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-400">{statusCounts.cleaning}</div>
            <div className="text-sm text-gray-400">Cleaning</div>
          </CardContent>
        </Card>
      </div>

      {/* Tables Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tables.map((table) => (
          <Card
            key={table.id}
            className="border border-[#333333] bg-[#1a1a1a] hover:border-orange-500/30 transition-all duration-300"
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl text-white">Table {table.number}</CardTitle>
                <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(table.status)}`}>
                  <div className="flex items-center space-x-1">
                    {getStatusIcon(table.status)}
                    <span className="capitalize">{table.status}</span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-400">Capacity: {table.capacity} people</p>
            </CardHeader>
            <CardContent className="space-y-4">
              {table.currentOrder && (
                <div className="p-3 bg-gray-800/50 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="text-sm font-medium text-white">{table.currentOrder.customerName}</p>
                      <p className="text-xs text-gray-400">Order {table.currentOrder.orderId}</p>
                    </div>
                    <p className="text-sm font-bold text-green-400">${table.currentOrder.total}</p>
                  </div>
                  <p className="text-xs text-gray-400">Started at {table.currentOrder.orderTime}</p>
                </div>
              )}

              {table.reservationTime && table.status === "reserved" && (
                <div className="p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                  <p className="text-sm text-yellow-400">Reserved for {table.reservationTime}</p>
                </div>
              )}

              <div className="flex space-x-2">
                {table.status === "available" && (
                  <Button size="sm" className="flex-1 bg-blue-500 hover:bg-blue-600">
                    Seat Customers
                  </Button>
                )}
                {table.status === "occupied" && (
                  <>
                    <Button size="sm" variant="outline" className="flex-1 border-gray-600 text-gray-300 bg-transparent">
                      View Order
                    </Button>
                    <Button size="sm" className="flex-1 bg-green-500 hover:bg-green-600">
                      Check Out
                    </Button>
                  </>
                )}
                {table.status === "cleaning" && (
                  <Button size="sm" className="flex-1 bg-green-500 hover:bg-green-600">
                    Mark Clean
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
