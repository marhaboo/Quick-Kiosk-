"use client";

import { Card, CardContent } from "@/shared/ui/card";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  Package
} from "lucide-react";
import { AppDispatch, RootState } from "@/app/store/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { deleteRestaurantById, getRestaurantById } from "@/entities/restaurantById/api/api";
import Image from "next/image";

export default function MenuManagementUI() {
  const { currentRestaurant } = useSelector((state: RootState) => state.resById);
  const dispatch: AppDispatch = useDispatch();

  const [selectedCategory, setSelectedCategory] = useState<string>("Все");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    dispatch(getRestaurantById("4"));
  }, [dispatch]);

  // фильтрация меню
  const filteredMenu = currentRestaurant?.menu?.filter((item) => {
    const matchesCategory =
      selectedCategory === "Все" || item.categoryName === selectedCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="container mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white">Управление Меню</h1>
            <p className="text-gray-400 mt-1">
              Мониторинг и управление меню ресторана
            </p>
          </div>
          <Button className="bg-orange-500 hover:bg-orange-600">
            <Plus className="h-4 w-4 mr-2" />
            Добавить Блюдо
          </Button>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col lg:flex-row gap-4 items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Поиск по названию блюда..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#1a1a1a] border border-[#333333] pl-10 text-white placeholder-gray-400 focus:border-orange-500"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {["Все", "Салаты", "Горячее", "Десерты"].map((category) => (
              <Button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={
                  selectedCategory === category
                    ? "bg-orange-500 hover:bg-orange-600 text-white"
                    : "border-[#333333] text-gray-300 bg-transparent hover:border-orange-500"
                }
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMenu?.map((item) => (
            <Card
              key={item.id}
              className="border border-[#333333] bg-[#1a1a1a] hover:border-orange-500/30 transition-all duration-300 overflow-hidden"
            >
              <div className="relative">
                <Image
                  src=""
                  alt={item.name}
                  width={200}
                  height={200}
                  className="w-full h-48 object-cover"
                />
              </div>

              <CardContent className="p-4 space-y-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white">
                      {item.name}
                    </h3>
                    <p className="text-sm text-orange-400 font-medium">
                      {item.categoryName}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-green-400">
                      {item.price}₽
                    </div>
                  </div>
                </div>

                <p className="text-sm text-gray-400 line-clamp-2">
                  {item.description || "Описание блюда отсутствует."}
                </p>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <Package className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-300">Количество:</span>
                    <span className="font-medium text-white">
                      {item.quantity}
                    </span>
                  </div>
                  <span className="text-gray-500">
                    Добавлено:{" "}
                    {new Date(item.createdAt).toLocaleDateString("ru-RU")}
                  </span>
                </div>

                <div className="flex space-x-2 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-[#333333] text-gray-300 bg-transparent hover:border-orange-500"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-[#333333] text-gray-300 bg-transparent hover:border-red-500 hover:text-red-400"
                    onClick={() => {
                      dispatch(deleteRestaurantById(item.id));
                    }}
                  > 
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredMenu?.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg">Блюда не найдены</div>
            <p className="text-gray-500 mt-2">
              Попробуйте изменить критерии поиска
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
