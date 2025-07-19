"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { ArrowLeft, Upload, User, Mail, Phone, MapPin, FileText, Briefcase } from "lucide-react"
import { Button } from "@/shared/ui/button"
import { Card } from "@/shared/ui/card"
import { Input } from "@/shared/ui/input"
import Link from "next/link"
import { useDispatch } from "react-redux"
import { postJobApplication } from "@/entities/job-application/api/job-application-api"
import { AppDispatch } from "@/app/store/store"

interface FormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  position: string
  experience: string
  motivation: string
  resume: File | null
}

export function JobApplicationForm() {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    position: "",
    experience: "",
    motivation: "",
    resume: null,
  })
  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {
    // dispatch(postJobApplication(formData))
  }, [dispatch, postJobApplication])

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setFormData((prev) => ({ ...prev, resume: file }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Имитация отправки формы
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-[#0F0F0F] flex items-center justify-center p-6">
        <Card className="bg-[#1A1A1A] border border-[#333333] rounded-3xl p-8 text-center max-w-md w-full">
          <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">Заявка отправлена!</h2>
          <p className="text-gray-400 mb-6">Мы рассмотрим вашу заявку и свяжемся с вами в ближайшее время.</p>
          <Link href="/">
            <Button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-xl">
              Вернуться на главную
            </Button>
          </Link>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0F0F0F] p-6">
      <div className="max-w-4xl mx-auto">
        {/* Заголовок */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/">
            <Button
              variant="ghost"
              size="sm"
              className="w-10 h-10 rounded-full bg-[#2A2730] border border-[#3D3A46] text-gray-300 hover:text-white hover:bg-[#2A2730]/80"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-white">Заявка на работу</h1>
            <p className="text-gray-400">Присоединяйтесь к нашей команде</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Личная информация */}
          <Card className="bg-[#1A1A1A] border border-[#333333] rounded-3xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-orange-500/20 rounded-xl flex items-center justify-center">
                <User className="w-5 h-5 text-orange-400" />
              </div>
              <h2 className="text-xl font-bold text-white">Личная информация</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Имя *</label>
                <Input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  className="bg-[#2A2730] border-[#3D3A46] text-white placeholder:text-gray-500 rounded-xl"
                  placeholder="Введите ваше имя"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Фамилия *</label>
                <Input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  className="bg-[#2A2730] border-[#3D3A46] text-white placeholder:text-gray-500 rounded-xl"
                  placeholder="Введите вашу фамилию"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Email *</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="bg-[#2A2730] border-[#3D3A46] text-white placeholder:text-gray-500 rounded-xl pl-10"
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>

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

              <div className="md:col-span-2">
                <label className="block text-gray-300 text-sm font-medium mb-2">Адрес</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
                  <textarea
                    value={formData.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    className="w-full bg-[#2A2730] border border-[#3D3A46] text-white placeholder:text-gray-500 rounded-xl pl-10 pr-4 py-3 resize-none"
                    placeholder="Ваш адрес проживания"
                    rows={2}
                  />
                </div>
              </div>
            </div>
          </Card>

          {/* Информация о работе */}
          <Card className="bg-[#1A1A1A] border border-[#333333] rounded-3xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-orange-500/20 rounded-xl flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-orange-400" />
              </div>
              <h2 className="text-xl font-bold text-white">Информация о работе</h2>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Желаемая должность *</label>
                <select
                  value={formData.position}
                  onChange={(e) => handleInputChange("position", e.target.value)}
                  className="w-full bg-[#2A2730] border border-[#3D3A46] text-white rounded-xl px-4 py-3"
                  required
                >
                  <option value="">Выберите должность</option>
                  <option value="waiter">Официант</option>
                  <option value="cook">Повар</option>
                  <option value="barista">Бариста</option>
                  <option value="manager">Менеджер</option>
                  <option value="cleaner">Уборщик</option>
                  <option value="delivery">Курьер</option>
                  <option value="other">Другое</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Опыт работы</label>
                <textarea
                  value={formData.experience}
                  onChange={(e) => handleInputChange("experience", e.target.value)}
                  className="w-full bg-[#2A2730] border border-[#3D3A46] text-white placeholder:text-gray-500 rounded-xl px-4 py-3 resize-none"
                  placeholder="Расскажите о вашем опыте работы в сфере общественного питания"
                  rows={4}
                />
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Мотивационное письмо</label>
                <textarea
                  value={formData.motivation}
                  onChange={(e) => handleInputChange("motivation", e.target.value)}
                  className="w-full bg-[#2A2730] border border-[#3D3A46] text-white placeholder:text-gray-500 rounded-xl px-4 py-3 resize-none"
                  placeholder="Почему вы хотите работать в нашей компании?"
                  rows={4}
                />
              </div>
            </div>
          </Card>

          {/* Загрузка резюме */}
          <Card className="bg-[#1A1A1A] border border-[#333333] rounded-3xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-orange-500/20 rounded-xl flex items-center justify-center">
                <FileText className="w-5 h-5 text-orange-400" />
              </div>
              <h2 className="text-xl font-bold text-white">Резюме</h2>
            </div>

            <div className="border-2 border-dashed border-[#3D3A46] rounded-xl p-8 text-center hover:border-orange-500/50 transition-colors">
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-300 mb-2">Загрузите ваше резюме</p>
              <p className="text-gray-500 text-sm mb-4">PDF, DOC, DOCX до 5MB</p>
              <input
                type="file"
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx"
                className="hidden"
                id="resume-upload"
              />
              <label htmlFor="resume-upload">
                <Button
                  type="button"
                  variant="ghost"
                  className="bg-orange-500/20 hover:bg-orange-500/30 text-orange-400 border border-orange-500/30 rounded-xl"
                >
                  Выбрать файл
                </Button>
              </label>
              {formData.resume && <p className="text-green-400 text-sm mt-2">✓ {formData.resume.name}</p>}
            </div>
          </Card>

          {/* Кнопка отправки */}
          <div className="text-center">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold px-8 py-4 rounded-2xl text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Отправка..." : "Отправить заявку"}
            </Button>
            <p className="text-gray-400 text-sm mt-4">
              Нажимая &quot;Отправить заявку&quot;, вы соглашаетесь с обработкой персональных данных
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}
