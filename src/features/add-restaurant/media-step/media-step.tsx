"use client"

import type React from "react"
import { Camera, Upload, Star } from "lucide-react"
import { Card } from "@/shared/ui/card"
import { Button } from "@/shared/ui/button"
import type { RestaurantFormData } from "@/shared/types/restaurant-form"

interface MediaStepProps {
  formData: RestaurantFormData
  setFormData: React.Dispatch<React.SetStateAction<RestaurantFormData>>
}

export function MediaStep({ formData, setFormData }: MediaStepProps) {
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setFormData((prev) => ({ ...prev, images: [...prev.images, ...files] }))
  }

  const handleMenuUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setFormData((prev) => ({ ...prev, menu: file }))
  }

  const removeImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }))
  }

  return (
    <div className="space-y-6">
      <Card className="bg-[#1A1A1A] border border-[#333333] rounded-3xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-orange-500/20 rounded-xl flex items-center justify-center">
            <Camera className="w-5 h-5 text-orange-400" />
          </div>
          <h2 className="text-xl font-bold text-white">Фотографии ресторана</h2>
        </div>

        <div className="border-2 border-dashed border-[#3D3A46] rounded-xl p-8 text-center hover:border-orange-500/50 transition-colors mb-4">
          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-300 mb-2">Загрузите фотографии вашего ресторана</p>
          <p className="text-gray-500 text-sm mb-4">JPG, PNG до 5MB каждая (максимум 10 фото)</p>
          <input
            type="file"
            onChange={handleImageUpload}
            accept="image/*"
            multiple
            className="hidden"
            id="images-upload"
          />
          <label htmlFor="images-upload">
            <Button
              type="button"
              variant="ghost"
              className="bg-orange-500/20 hover:bg-orange-500/30 text-orange-400 border border-orange-500/30 rounded-xl"
            >
              Выбрать фото
            </Button>
          </label>
        </div>

        {formData.images.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {formData.images.map((image, index) => (
              <div key={index} className="relative group">
                <img
                  src={URL.createObjectURL(image) || "/placeholder.svg"}
                  alt={`Restaurant ${index + 1}`}
                  className="w-full h-24 object-cover rounded-xl"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </Card>

      <Card className="bg-[#1A1A1A] border border-[#333333] rounded-3xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-orange-500/20 rounded-xl flex items-center justify-center">
            <Star className="w-5 h-5 text-orange-400" />
          </div>
          <h2 className="text-xl font-bold text-white">Меню</h2>
        </div>

        <div className="border-2 border-dashed border-[#3D3A46] rounded-xl p-8 text-center hover:border-orange-500/50 transition-colors">
          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-300 mb-2">Загрузите меню ресторана</p>
          <p className="text-gray-500 text-sm mb-4">PDF, JPG, PNG до 10MB</p>
          <input type="file" onChange={handleMenuUpload} accept=".pdf,image/*" className="hidden" id="menu-upload" />
          <label htmlFor="menu-upload">
            <Button
              type="button"
              variant="ghost"
              className="bg-orange-500/20 hover:bg-orange-500/30 text-orange-400 border border-orange-500/30 rounded-xl"
            >
              Выбрать файл
            </Button>
          </label>
          {formData.menu && <p className="text-green-400 text-sm mt-2">✓ {formData.menu.name}</p>}
        </div>
      </Card>
    </div>
  )
}
