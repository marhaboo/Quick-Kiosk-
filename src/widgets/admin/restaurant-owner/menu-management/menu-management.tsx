"use client"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card"
import { Button } from "@/shared/ui/button"
import { ChefHat, Plus, Edit, Trash2, Eye, EyeOff } from "lucide-react"

interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  category: string
  available: boolean
  image?: string
}

export default function MenuManagement() {
  const [menuItems] = useState<MenuItem[]>([
    {
      id: "1",
      name: "Classic Burger",
      description: "Beef patty with lettuce, tomato, and special sauce",
      price: 12.99,
      category: "Burgers",
      available: true,
    },
    {
      id: "2",
      name: "Margherita Pizza",
      description: "Fresh mozzarella, tomato sauce, and basil",
      price: 16.99,
      category: "Pizza",
      available: true,
    },
    {
      id: "3",
      name: "Caesar Salad",
      description: "Romaine lettuce, croutons, parmesan, caesar dressing",
      price: 9.99,
      category: "Salads",
      available: false,
    },
    {
      id: "4",
      name: "Grilled Salmon",
      description: "Atlantic salmon with herbs and lemon",
      price: 22.99,
      category: "Seafood",
      available: true,
    },
  ])

  const categories = ["All", "Burgers", "Pizza", "Salads", "Seafood"]
  const [selectedCategory, setSelectedCategory] = useState("All")

  const filteredItems =
    selectedCategory === "All" ? menuItems : menuItems.filter((item) => item.category === selectedCategory)

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-white">Menu Management</h1>
          <p className="text-gray-400 mt-1">Manage your restaurant&apos;s menu items</p>
        </div>
        <Button className="bg-orange-500 hover:bg-orange-600 text-white">
          <Plus className="h-4 w-4 mr-2" />
          Add New Item
        </Button>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            onClick={() => setSelectedCategory(category)}
            className={
              selectedCategory === category
                ? "bg-orange-500 hover:bg-orange-600 text-white"
                : "border-gray-600 text-gray-300 hover:bg-gray-700"
            }
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Menu Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <Card
            key={item.id}
            className="border border-[#333333] bg-[#1a1a1a] hover:border-orange-500/30 transition-all duration-300"
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-orange-500/20 border border-orange-500/30 rounded-lg">
                    <ChefHat className="h-4 w-4 text-orange-400" />
                  </div>
                  <div>
                    <CardTitle className="text-lg text-white">{item.name}</CardTitle>
                    <p className="text-sm text-gray-400">{item.category}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  {item.available ? (
                    <Eye className="h-4 w-4 text-green-400" />
                  ) : (
                    <EyeOff className="h-4 w-4 text-red-400" />
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-300">{item.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-green-400">${item.price}</span>
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
                  >
                    <Edit className="h-3 w-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-red-600 text-red-400 hover:bg-red-900/20 bg-transparent"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-gray-700">
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    item.available ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
                  }`}
                >
                  {item.available ? "Available" : "Unavailable"}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
