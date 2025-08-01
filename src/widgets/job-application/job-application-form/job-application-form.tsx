"use client"

import type React from "react"
import { useState } from "react"
import { ArrowLeft, User, Mail, Phone, MapPin, FileText, Briefcase, ChevronDown } from "lucide-react" // Added ChevronDown
import { Button } from "@/shared/ui/button"
import { Card } from "@/shared/ui/card"
import { Input } from "@/shared/ui/input"
import Link from "next/link"
import { useDispatch } from "react-redux"
import { postJobApplication } from "@/entities/job-application/api/job-application-api"
import type { AppDispatch } from "@/app/store/store"
import { useTheme } from "next-themes" // Import useTheme
import { cn } from "@/shared/lib/utils" // Import cn

interface FormData {
  firstName: string
  lastName: string
  restaurantName: string
  email: string
  phone: string
  address: string
  desiredPosition: string
  workExperience: string
  motivationLetter: string
  resumeUrl: string
}

export function JobApplicationForm() {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    restaurantName: "",
    email: "",
    phone: "",
    address: "",
    desiredPosition: "",
    workExperience: "",
    motivationLetter: "",
    resumeUrl: "",
  })
  const dispatch: AppDispatch = useDispatch()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { theme } = useTheme() // Get current theme

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, resumeUrl: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      await dispatch(postJobApplication(formData)).unwrap()
      setIsSubmitted(true)
    } catch (error) {
      console.error("Ошибка отправки заявки:", error)
      alert("Не удалось отправить заявку. Попробуйте позже.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div
        className={cn(
          "min-h-screen flex items-center justify-center p-6",
          theme === "dark" ? "bg-[#0F0F0F]" : "bg-neutral-100",
        )}
      >
        <Card
          className={cn(
            "rounded-3xl p-8 text-center max-w-md w-full",
            theme === "dark" ? "bg-[#1A1A1A] border border-[#333333]" : "bg-white border border-gray-200 shadow-sm",
          )}
        >
          <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className={cn("text-2xl font-bold mb-4", theme === "dark" ? "text-white" : "text-gray-900")}>
            Заявка отправлена!
          </h2>
          <p className={cn("mb-6", theme === "dark" ? "text-gray-400" : "text-gray-600")}>
            Мы рассмотрим вашу заявку и свяжемся с вами в ближайшее время.
          </p>
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
    <div className={cn("min-h-screen p-6", theme === "dark" ? "bg-[#0F0F0F]" : "bg-neutral-100")}>
      <div className="max-w-4xl mx-auto">
        {/* Заголовок */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/">
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "w-10 h-10 rounded-full transition-all duration-200",
                theme === "dark"
                  ? "bg-[#2A2730] border border-[#3D3A46] text-gray-300 hover:text-white hover:bg-[#2A2730]/80"
                  : "bg-gray-200 border border-gray-300 text-gray-700 hover:text-gray-900 hover:bg-gray-300",
              )}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <h1 className={cn("text-3xl font-bold", theme === "dark" ? "text-white" : "text-gray-900")}>
              Заявка на работу
            </h1>
            <p className={cn("", theme === "dark" ? "text-gray-400" : "text-gray-700")}>
              Присоединяйтесь к нашей команде
            </p>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Личная информация */}
          <Card
            className={cn(
              "rounded-3xl p-6",
              theme === "dark" ? "bg-[#1A1A1A] border border-[#333333]" : "bg-white border border-gray-200 shadow-sm",
            )}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-orange-500/20 rounded-xl flex items-center justify-center">
                <User className="w-5 h-5 text-orange-400" />
              </div>
              <h2 className={cn("text-xl font-bold", theme === "dark" ? "text-white" : "text-gray-900")}>
                Личная информация
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  className={cn("block text-sm font-medium mb-2", theme === "dark" ? "text-gray-300" : "text-gray-700")}
                >
                  Имя *
                </label>
                <Input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  className={cn(
                    "rounded-xl h-12", // Added h-12
                    theme === "dark"
                      ? "bg-[#2A2730] border-[#3D3A46] text-white placeholder:text-gray-500"
                      : "bg-gray-100 border-gray-300 text-gray-900 placeholder:text-gray-500",
                  )}
                  placeholder="Введите ваше имя"
                  required
                />
              </div>
              <div>
                <label
                  className={cn("block text-sm font-medium mb-2", theme === "dark" ? "text-gray-300" : "text-gray-700")}
                >
                  Фамилия *
                </label>
                <Input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  className={cn(
                    "rounded-xl h-12", // Added h-12
                    theme === "dark"
                      ? "bg-[#2A2730] border-[#3D3A46] text-white placeholder:text-gray-500"
                      : "bg-gray-100 border-gray-300 text-gray-900 placeholder:text-gray-500",
                  )}
                  placeholder="Введите вашу фамилию"
                  required
                />
              </div>
              <div>
                <label
                  className={cn("block text-sm font-medium mb-2", theme === "dark" ? "text-gray-300" : "text-gray-700")}
                >
                  Название ресторана
                </label>
                <Input
                  type="text"
                  value={formData.restaurantName}
                  onChange={(e) => handleInputChange("restaurantName", e.target.value)}
                  className={cn(
                    "rounded-xl h-12", // Added h-12
                    theme === "dark"
                      ? "bg-[#2A2730] border-[#3D3A46] text-white placeholder:text-gray-500"
                      : "bg-gray-100 border-gray-300 text-gray-900 placeholder:text-gray-500",
                  )}
                  placeholder="Введите название ресторана"
                />
              </div>
              <div>
                <label
                  className={cn("block text-sm font-medium mb-2", theme === "dark" ? "text-gray-300" : "text-gray-700")}
                >
                  Email *
                </label>
                <div className="relative">
                  <Mail
                    className={cn(
                      "absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4",
                      theme === "dark" ? "text-gray-400" : "text-gray-600",
                    )}
                  />
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className={cn(
                      "rounded-xl pl-10 h-12", // Added h-12
                      theme === "dark"
                        ? "bg-[#2A2730] border-[#3D3A46] text-white placeholder:text-gray-500"
                        : "bg-gray-100 border-gray-300 text-gray-900 placeholder:text-gray-500",
                    )}
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>
              <div>
                <label
                  className={cn("block text-sm font-medium mb-2", theme === "dark" ? "text-gray-300" : "text-gray-700")}
                >
                  Телефон *
                </label>
                <div className="relative">
                  <Phone
                    className={cn(
                      "absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4",
                      theme === "dark" ? "text-gray-400" : "text-gray-600",
                    )}
                  />
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className={cn(
                      "rounded-xl pl-10 h-12", // Added h-12
                      theme === "dark"
                        ? "bg-[#2A2730] border-[#3D3A46] text-white placeholder:text-gray-500"
                        : "bg-gray-100 border-gray-300 text-gray-900 placeholder:text-gray-500",
                    )}
                    placeholder="+992 XX XXX XXXX"
                    required
                  />
                </div>
              </div>
              <div>
                <label
                  className={cn("block text-sm font-medium mb-2", theme === "dark" ? "text-gray-300" : "text-gray-700")}
                >
                  Адрес
                </label>
                <div className="relative">
                  <MapPin
                    className={cn(
                      "absolute left-3 top-3 w-4 h-4",
                      theme === "dark" ? "text-gray-400" : "text-gray-600",
                    )}
                  />
                  <Input
                    value={formData.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    className={cn(
                      "w-full rounded-xl pl-10 pr-4 py-3 resize-none h-12", // Added h-12
                      theme === "dark"
                        ? "bg-[#2A2730] border border-[#3D3A46] text-white placeholder:text-gray-500"
                        : "bg-gray-100 border border-gray-300 text-gray-900 placeholder:text-gray-500",
                    )}
                    placeholder="Ваш адрес проживания"
                  />
                </div>
              </div>
            </div>
          </Card>
          {/* Информация о работе */}
          <Card
            className={cn(
              "rounded-3xl p-6",
              theme === "dark" ? "bg-[#1A1A1A] border border-[#333333]" : "bg-white border border-gray-200 shadow-sm",
            )}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-orange-500/20 rounded-xl flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-orange-400" />
              </div>
              <h2 className={cn("text-xl font-bold", theme === "dark" ? "text-white" : "text-gray-900")}>
                Информация о работе
              </h2>
            </div>
            <div className="space-y-6">
              <div>
                <label
                  className={cn("block text-sm font-medium mb-2", theme === "dark" ? "text-gray-300" : "text-gray-700")}
                >
                  Желаемая должность *
                </label>
                <div className="relative">
                  <select
                    value={formData.desiredPosition}
                    onChange={(e) => handleInputChange("desiredPosition", e.target.value)}
                    className={cn(
                      "w-full rounded-xl px-4 py-3 h-12 appearance-none pr-10", // Added h-12 and appearance-none pr-10
                      theme === "dark"
                        ? "bg-[#2A2730] border border-[#3D3A46] text-white"
                        : "bg-gray-100 border border-gray-300 text-gray-900",
                    )}
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
                  <ChevronDown
                    className={cn(
                      "absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none",
                      theme === "dark" ? "text-gray-500" : "text-gray-600",
                    )}
                  />
                </div>
              </div>
              <div>
                <label
                  className={cn("block text-sm font-medium mb-2", theme === "dark" ? "text-gray-300" : "text-gray-700")}
                >
                  Опыт работы
                </label>
                <textarea
                  value={formData.workExperience}
                  onChange={(e) => handleInputChange("workExperience", e.target.value)}
                  className={cn(
                    "w-full rounded-xl px-4 py-3 resize-none",
                    theme === "dark"
                      ? "bg-[#2A2730] border border-[#3D3A46] text-white placeholder:text-gray-500"
                      : "bg-gray-100 border border-gray-300 text-gray-900 placeholder:text-gray-500",
                  )}
                  placeholder="Расскажите о вашем опыте работы в сфере общественного питания"
                  rows={4}
                />
              </div>
              <div>
                <label
                  className={cn("block text-sm font-medium mb-2", theme === "dark" ? "text-gray-300" : "text-gray-700")}
                >
                  Мотивационное письмо
                </label>
                <textarea
                  value={formData.motivationLetter}
                  onChange={(e) => handleInputChange("motivationLetter", e.target.value)}
                  className={cn(
                    "w-full rounded-xl px-4 py-3 resize-none",
                    theme === "dark"
                      ? "bg-[#2A2730] border border-[#3D3A46] text-white placeholder:text-gray-500"
                      : "bg-gray-100 border border-gray-300 text-gray-900 placeholder:text-gray-500",
                  )}
                  placeholder="Почему вы хотите работать в нашей компании?"
                  rows={4}
                />
              </div>
            </div>
          </Card>
          {/* Загрузка резюме */}
          <Card
            className={cn(
              "rounded-3xl p-6",
              theme === "dark" ? "bg-[#1A1A1A] border border-[#333333]" : "bg-white border border-gray-200 shadow-sm",
            )}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-orange-500/20 rounded-xl flex items-center justify-center">
                <FileText className="w-5 h-5 text-orange-400" />
              </div>
              <h2 className={cn("text-xl font-bold", theme === "dark" ? "text-white" : "text-gray-900")}>Резюме</h2>
            </div>
            <div>
              <div
                className={cn(
                  "border-2 border-dashed rounded-xl p-8 text-center hover:border-orange-500/50 transition-colors",
                  theme === "dark" ? "border-[#3D3A46]" : "border-gray-300",
                )}
              >
                <FileText
                  className={cn("w-12 h-12 mx-auto mb-4", theme === "dark" ? "text-gray-400" : "text-gray-600")}
                />
                <p className={cn("mb-2", theme === "dark" ? "text-gray-300" : "text-gray-700")}>
                  Ссылка на ваше резюме
                </p>
                <p className={cn("text-sm mb-4", theme === "dark" ? "text-gray-500" : "text-gray-600")}>
                  Google Drive, Dropbox, OneDrive или другая ссылка
                </p>
                <Input
                  type="url"
                  value={formData.resumeUrl}
                  onChange={handleResumeChange}
                  className={cn(
                    "rounded-xl mb-4 h-12", // Added h-12
                    theme === "dark"
                      ? "bg-[#2A2730] border-[#3D3A46] text-white placeholder:text-gray-500"
                      : "bg-gray-100 border-gray-300 text-gray-900 placeholder:text-gray-500",
                  )}
                  placeholder="https://drive.google.com/file/d/... или другая ссылка"
                />
                {formData.resumeUrl && (
                  <div className="mt-2">
                    <p className="text-green-400 text-sm">✓ Ссылка добавлена</p>
                    <a
                      href={formData.resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-orange-400 hover:text-orange-300 text-sm underline"
                    >
                      Проверить ссылку
                    </a>
                  </div>
                )}
              </div>
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
            <p className={cn("text-sm mt-4", theme === "dark" ? "text-gray-400" : "text-gray-600")}>
              Нажимая &quot;Отправить заявку&quot;, вы соглашаетесь с обработкой персональных данных
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}
