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
      name: "Бургер «Московский»",
      description: "Сочная говяжья котлета, свежие овощи, фирменный соус и хрустящая булочка",
      price: 450,
      category: "Бургеры",
      available: true,
    },
    {
      id: "2",
      name: "Пицца «Четыре сыра»",
      description: "Моцарелла, пармезан, горгонзола и рикотта на тонком тесте",
      price: 680,
      category: "Пицца",
      available: true,
    },
    {
      id: "3",
      name: "Салат «Цезарь» с курицей",
      description: "Хрустящий салат романо, куриная грудка, пармезан, сухарики, соус цезарь",
      price: 380,
      category: "Салаты",
      available: false,
    },
    {
      id: "4",
      name: "Стейк из лосося",
      description: "Свежий норвежский лосось на гриле с лимонным маслом и зеленью",
      price: 890,
      category: "Горячие блюда",
      available: true,
    },
    {
      id: "5",
      name: "Борщ украинский",
      description: "Традиционный борщ со свеклой, капустой и говядиной, подается со сметаной",
      price: 280,
      category: "Супы",
      available: true,
    },
    {
      id: "6",
      name: "Паста Карбонара",
      description: "Спагетти с беконом, яйцом, пармезаном и черным перцем",
      price: 420,
      category: "Паста",
      available: true,
    },
  ])

  const categories = ["Все", "Бургеры", "Пицца", "Салаты", "Горячие блюда", "Супы", "Паста"]
  const [selectedCategory, setSelectedCategory] = useState("Все")

  const filteredItems =
    selectedCategory === "Все" ? menuItems : menuItems.filter((item) => item.category === selectedCategory)

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-white">Управление Меню</h1>
          <p className="text-gray-400 mt-1">Управляйте позициями меню вашего ресторана</p>
        </div>
        <Button className="bg-orange-500 hover:bg-orange-600 text-white">
          <Plus className="h-4 w-4 mr-2" />
          Добавить Позицию
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
                <span className="text-2xl font-bold text-green-400">{item.price}₽</span>
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
                  {item.available ? "Доступно" : "Недоступно"}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
