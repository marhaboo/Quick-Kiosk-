"use client"

import type React from "react"

import { Store, MapPin, Phone, Mail, Users } from "lucide-react"
import { Card } from "@/shared/ui/card"
import { Input } from "@/shared/ui/input"
import type { RestaurantFormData } from "@/shared/types/restaurant-form"

interface BasicInfoStepProps {
  formData: RestaurantFormData
  setFormData: React.Dispatch<React.SetStateAction<RestaurantFormData>>
}

export function BasicInfoStep({ formData, setFormData }: BasicInfoStepProps) {
  const handleInputChange = (field: keyof RestaurantFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Card className="bg-[#1A1A1A] border border-[#333333] rounded-3xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-orange-500/20 rounded-xl flex items-center justify-center">
          <Store className="w-5 h-5 text-orange-400" />
        </div>
        <h2 className="text-xl font-bold text-white">Основная информация</h2>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">Название ресторана *</label>
            <Input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className="bg-[#2A2730] border-[#3D3A46] text-white placeholder:text-gray-500 rounded-xl"
              placeholder="Название вашего ресторана"
              required
            />
          </div>

          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">Тип кухни *</label>
            <select
              value={formData.cuisine}
              onChange={(e) => handleInputChange("cuisine", e.target.value)}
              className="w-full bg-[#2A2730] border border-[#3D3A46] text-white rounded-xl px-4 py-3"
              required
            >
              <option value="">Выберите тип кухни</option>
              <option value="tajik">Таджикская</option>
              <option value="uzbek">Узбекская</option>
              <option value="european">Европейская</option>
              <option value="asian">Азиатская</option>
              <option value="italian">Итальянская</option>
              <option value="fast-food">Фаст-фуд</option>
              <option value="mixed">Смешанная</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-gray-300 text-sm font-medium mb-2">Описание ресторана *</label>
          <textarea
            value={formData.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
            className="w-full bg-[#2A2730] border border-[#3D3A46] text-white placeholder:text-gray-500 rounded-xl px-4 py-3 resize-none"
            placeholder="Расскажите о вашем ресторане, его особенностях и атмосфере"
            rows={4}
            required
          />
        </div>

        <div>
          <label className="block text-gray-300 text-sm font-medium mb-2">Адрес *</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
            <textarea
              value={formData.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
              className="w-full bg-[#2A2730] border border-[#3D3A46] text-white placeholder:text-gray-500 rounded-xl pl-10 pr-4 py-3 resize-none"
              placeholder="Полный адрес ресторана"
              rows={2}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">Ценовая категория *</label>
            <select
              value={formData.priceRange}
              onChange={(e) => handleInputChange("priceRange", e.target.value)}
              className="w-full bg-[#2A2730] border border-[#3D3A46] text-white rounded-xl px-4 py-3"
              required
            >
              <option value="">Выберите ценовую категорию</option>
              <option value="budget">$ - Бюджетно (до 50 сомони)</option>
              <option value="moderate">$$ - Умеренно (50-150 сомони)</option>
              <option value="expensive">$$$ - Дорого (150+ сомони)</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">Вместимость *</label>
            <div className="relative">
              <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="number"
                value={formData.capacity}
                onChange={(e) => handleInputChange("capacity", e.target.value)}
                className="bg-[#2A2730] border-[#3D3A46] text-white placeholder:text-gray-500 rounded-xl pl-10"
                placeholder="Количество мест"
                required
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">Телефон *</label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                className="bg-[#2A2730] border-[#3D3A46] text-white placeholder:text-gray-500 rounded-xl pl-10"
                placeholder="+992 XX XXX XXXX"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="bg-[#2A2730] border-[#3D3A46] text-white placeholder:text-gray-500 rounded-xl pl-10"
                placeholder="restaurant@example.com"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-gray-300 text-sm font-medium mb-2">Веб-сайт</label>
          <Input
            type="url"
            value={formData.website}
            onChange={(e) => handleInputChange("website", e.target.value)}
            className="bg-[#2A2730] border-[#3D3A46] text-white placeholder:text-gray-500 rounded-xl"
            placeholder="https://your-restaurant.com"
          />
        </div>
      </div>
    </Card>
  )
}
