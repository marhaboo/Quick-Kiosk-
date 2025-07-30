"use client"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card"
import { Button } from "@/shared/ui/button"
import { ShoppingCart, Clock, CheckCircle, DollarSign, CreditCard, Banknote } from "lucide-react"

interface Order {
  id: string
  tableNumber?: number
  customerName?: string
  items: Array<{
    name: string
    quantity: number
    price: number
  }>
  total: number
  status: "ready" | "preparing" | "paid"
  orderTime: string
  paymentMethod?: "cash" | "card" | "digital"
}

export default function OrderProcessing() {
  const [orders] = useState<Order[]>([
    {
      id: "#1250",
      tableNumber: 5,
      customerName: "John Smith",
      items: [
        { name: "Classic Burger", quantity: 2, price: 12.99 },
        { name: "French Fries", quantity: 1, price: 6.5 },
        { name: "Coca Cola", quantity: 2, price: 3.0 },
      ],
      total: 32.5,
      status: "ready",
      orderTime: "19:30",
    },
    {
      id: "#1249",
      tableNumber: 12,
      customerName: "Sarah Johnson",
      items: [
        { name: "Margherita Pizza", quantity: 1, price: 16.99 },
        { name: "Caesar Salad", quantity: 1, price: 9.99 },
      ],
      total: 28.0,
      status: "ready",
      orderTime: "19:25",
    },
    {
      id: "#1248",
      customerName: "Mike Wilson (Takeout)",
      items: [
        { name: "Grilled Salmon", quantity: 1, price: 22.99 },
        { name: "Rice", quantity: 1, price: 4.5 },
      ],
      total: 27.49,
      status: "preparing",
      orderTime: "19:40",
    },
  ])

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ready":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "preparing":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "paid":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  const handlePayment = (orderId: string, method: "cash" | "card" | "digital") => {
    console.log(`Processing payment for ${orderId} via ${method}`)
    // Here you would handle the actual payment processing
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-white">Order Processing</h1>
          <p className="text-gray-400 mt-1">Process payments and manage orders</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Orders List */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-semibold text-white">Active Orders</h2>
          {orders.map((order) => (
            <Card
              key={order.id}
              className={`border border-[#333333] bg-[#1a1a1a] hover:border-orange-500/30 transition-all duration-300 cursor-pointer ${
                selectedOrder?.id === order.id ? "border-orange-500/50" : ""
              }`}
              onClick={() => setSelectedOrder(order)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-500/20 border border-blue-500/30 rounded-lg">
                      <ShoppingCart className="h-4 w-4 text-blue-400" />
                    </div>
                    <div>
                      <CardTitle className="text-lg text-white">Order {order.id}</CardTitle>
                      <p className="text-sm text-gray-400">
                        {order.tableNumber ? `Table ${order.tableNumber}` : "Takeout"} • {order.customerName}
                      </p>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
                    {order.status === "ready" ? "Ready to Pay" : order.status === "preparing" ? "Preparing" : "Paid"}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-1">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span className="text-gray-300">
                        {item.quantity}x {item.name}
                      </span>
                      <span className="text-gray-300">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-gray-700">
                  <span className="text-sm text-gray-400">Total</span>
                  <span className="text-lg font-bold text-green-400">${order.total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-xs text-gray-400">
                  <span>Ordered at {order.orderTime}</span>
                  {order.paymentMethod && <span className="capitalize">Paid via {order.paymentMethod}</span>}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Payment Panel */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-white">Payment Processing</h2>

          {selectedOrder ? (
            <Card className="border border-[#333333] bg-[#1a1a1a]">
              <CardHeader>
                <CardTitle className="text-white">Process Payment</CardTitle>
                <p className="text-gray-400">Order {selectedOrder.id}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-gray-800/50 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Total Amount</span>
                    <span className="text-2xl font-bold text-green-400">${selectedOrder.total.toFixed(2)}</span>
                  </div>
                </div>

                {selectedOrder.status === "ready" && (
                  <div className="space-y-3">
                    <p className="text-sm text-gray-400">Select Payment Method:</p>

                    <Button
                      className="w-full bg-green-500 hover:bg-green-600 text-white"
                      onClick={() => handlePayment(selectedOrder.id, "cash")}
                    >
                      <Banknote className="h-4 w-4 mr-2" />
                      Cash Payment
                    </Button>

                    <Button
                      className="w-full bg-blue-500 hover:bg-blue-600 text-white"
                      onClick={() => handlePayment(selectedOrder.id, "card")}
                    >
                      <CreditCard className="h-4 w-4 mr-2" />
                      Card Payment
                    </Button>

                    <Button
                      className="w-full bg-purple-500 hover:bg-purple-600 text-white"
                      onClick={() => handlePayment(selectedOrder.id, "digital")}
                    >
                      <DollarSign className="h-4 w-4 mr-2" />
                      Digital Wallet
                    </Button>
                  </div>
                )}

                {selectedOrder.status === "preparing" && (
                  <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg text-center">
                    <Clock className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
                    <p className="text-yellow-400 text-sm">Order is still being prepared</p>
                  </div>
                )}

                {selectedOrder.status === "paid" && (
                  <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg text-center">
                    <CheckCircle className="h-8 w-8 text-green-400 mx-auto mb-2" />
                    <p className="text-green-400 text-sm">Payment completed</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ) : (
            <Card className="border border-[#333333] bg-[#1a1a1a]">
              <CardContent className="p-8 text-center">
                <ShoppingCart className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400">Select an order to process payment</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
