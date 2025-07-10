"use client"

import type React from "react"

import { Users, Phone, Mail } from "lucide-react"
import { Card } from "@/shared/ui/card"
import { Input } from "@/shared/ui/input"
import type { RestaurantFormData } from "@/shared/types/restaurant-form"

interface OwnerContactsStepProps {
  formData: RestaurantFormData
  setFormData: React.Dispatch<React.SetStateAction<RestaurantFormData>>
}

export function OwnerContactsStep({ formData, setFormData }: OwnerContactsStepProps) {
  const handleInputChange = (field: keyof RestaurantFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Card className="bg-[#1A1A1A] border border-[#333333] rounded-3xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-orange-500/20 rounded-xl flex items-center justify-center">
          <Users className="w-5 h-5 text-orange-400" />
        </div>
        <h2 className="text-xl font-bold text-white">Контакты владельца</h2>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-gray-300 text-sm font-medium mb-2">ФИО владельца *</label>
          <Input
            type="text"
            value={formData.ownerName}
            onChange={(e) => handleInputChange("ownerName", e.target.value)}
            className="bg-[#2A2730] border-[#3D3A46] text-white placeholder:text-gray-500 rounded-xl"
            placeholder="Полное имя владельца ресторана"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">Телефон владельца *</label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="tel"
                value={formData.ownerPhone}
                onChange={(e) => handleInputChange("ownerPhone", e.target.value)}
                className="bg-[#2A2730] border-[#3D3A46] text-white placeholder:text-gray-500 rounded-xl pl-10"
                placeholder="+992 XX XXX XXXX"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">Email владельца *</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="email"
                value={formData.ownerEmail}
                onChange={(e) => handleInputChange("ownerEmail", e.target.value)}
                className="bg-[#2A2730] border-[#3D3A46] text-white placeholder:text-gray-500 rounded-xl pl-10"
                placeholder="owner@example.com"
                required
              />
            </div>
          </div>
        </div>

        <div className="bg-[#2A2730] rounded-xl p-4">
          <h3 className="text-white font-semibold mb-2">Условия сотрудничества</h3>
          <ul className="text-gray-400 text-sm space-y-1">
            <li>• Комиссия платформы: 5% с каждого заказа</li>
            <li>• Бесплатное размещение и продвижение</li>
            <li>• Техническая поддержка 24/7</li>
            <li>• Аналитика и отчеты по продажам</li>
          </ul>
        </div>
      </div>
    </Card>
  )
}
