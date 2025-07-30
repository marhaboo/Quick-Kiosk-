"use client"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card"
import { Button } from "@/shared/ui/button"
import { Badge } from "@/shared/ui/badge"
import {
  Briefcase,
  User,
  Phone,
  Mail,
  Calendar,
  MapPin,
  CheckCircle,
  XCircle,
  AlertCircle,
  FileText,
} from "lucide-react"

interface JobApplication {
  id: string
  applicantName: string
  email: string
  phone: string
  position: string
  restaurant: string
  experience: string
  status: "pending" | "approved" | "rejected"
  appliedDate: string
  location: string
  salary: string
  resume?: string
}

interface JobTableProps {
  isLoading: boolean
}

export default function JobTable({ isLoading }: JobTableProps) {
  const [applications] = useState<JobApplication[]>([
    {
      id: "1",
      applicantName: "Елена Смирнова",
      email: "e.smirnova@email.ru",
      phone: "+7 (495) 123-45-67",
      position: "Повар",
      restaurant: "Ресторан «Золотая Рыбка»",
      experience: "5 лет",
      status: "pending",
      appliedDate: "2024-01-15",
      location: "Москва",
      salary: "80,000 ₽",
      resume: "resume_elena.pdf",
    },
    {
      id: "2",
      applicantName: "Михаил Петров",
      email: "m.petrov@email.ru",
      phone: "+7 (812) 234-56-78",
      position: "Официант",
      restaurant: "Пиццерия «Мама Мия»",
      experience: "2 года",
      status: "approved",
      appliedDate: "2024-01-12",
      location: "Санкт-Петербург",
      salary: "45,000 ₽",
    },
    {
      id: "3",
      applicantName: "Анна Козлова",
      email: "a.kozlova@email.ru",
      phone: "+7 (343) 345-67-89",
      position: "Менеджер зала",
      restaurant: "Кафе «Уютный Уголок»",
      experience: "3 года",
      status: "rejected",
      appliedDate: "2024-01-10",
      location: "Екатеринбург",
      salary: "60,000 ₽",
      resume: "resume_anna.pdf",
    },
    {
      id: "4",
      applicantName: "Дмитрий Волков",
      email: "d.volkov@email.ru",
      phone: "+7 (383) 456-78-90",
      position: "Су-шеф",
      restaurant: "Суши-бар «Сакура»",
      experience: "7 лет",
      status: "pending",
      appliedDate: "2024-01-14",
      location: "Новосибирск",
      salary: "95,000 ₽",
      resume: "resume_dmitry.pdf",
    },
    {
      id: "5",
      applicantName: "Ольга Иванова",
      email: "o.ivanova@email.ru",
      phone: "+7 (843) 567-89-01",
      position: "Бармен",
      restaurant: "Стейк-хаус «Мясной Король»",
      experience: "4 года",
      status: "approved",
      appliedDate: "2024-01-08",
      location: "Казань",
      salary: "55,000 ₽",
    },
  ])

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {Array.from({ length: 4 }).map((_, index) => (
            <Card key={index} className="border border-[#333333] bg-[#1a1a1a] animate-pulse">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="h-6 bg-gray-700 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-700 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-700 rounded w-2/3"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "rejected":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      case "pending":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="h-4 w-4" />
      case "rejected":
        return <XCircle className="h-4 w-4" />
      case "pending":
        return <AlertCircle className="h-4 w-4" />
      default:
        return <AlertCircle className="h-4 w-4" />
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "approved":
        return "Принят"
      case "rejected":
        return "Отклонен"
      case "pending":
        return "На рассмотрении"
      default:
        return status
    }
  }

  const getPositionColor = (position: string) => {
    switch (position) {
      case "Повар":
      case "Су-шеф":
        return "border-orange-500/30 text-orange-400"
      case "Официант":
        return "border-blue-500/30 text-blue-400"
      case "Менеджер зала":
        return "border-purple-500/30 text-purple-400"
      case "Бармен":
        return "border-green-500/30 text-green-400"
      default:
        return "border-gray-500/30 text-gray-400"
    }
  }

  const handleApprove = (id: string) => {
    console.log(`Принятие заявки ${id}`)
  }

  const handleReject = (id: string) => {
    console.log(`Отклонение заявки ${id}`)
  }

  const statusCounts = {
    pending: applications.filter((app) => app.status === "pending").length,
    approved: applications.filter((app) => app.status === "approved").length,
    rejected: applications.filter((app) => app.status === "rejected").length,
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-white">Заявки на Работу</h1>
          <p className="text-gray-400 mt-1">Управление заявками соискателей на трудоустройство</p>
        </div>
      </div>

      {/* Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border border-[#333333] bg-[#1a1a1a]">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-400">{statusCounts.pending}</div>
            <div className="text-sm text-gray-400">На рассмотрении</div>
          </CardContent>
        </Card>
        <Card className="border border-[#333333] bg-[#1a1a1a]">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-400">{statusCounts.approved}</div>
            <div className="text-sm text-gray-400">Принято</div>
          </CardContent>
        </Card>
        <Card className="border border-[#333333] bg-[#1a1a1a]">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-400">{statusCounts.rejected}</div>
            <div className="text-sm text-gray-400">Отклонено</div>
          </CardContent>
        </Card>
      </div>

      {/* Applications Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {applications.map((application) => (
          <Card
            key={application.id}
            className="border border-[#333333] bg-[#1a1a1a] hover:border-orange-500/30 transition-all duration-300"
          >
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-500/20 border border-blue-500/30 rounded-lg">
                    <Briefcase className="h-5 w-5 text-blue-400" />
                  </div>
                  <div>
                    <CardTitle className="text-lg text-white">{application.applicantName}</CardTitle>
                    <p className="text-sm text-gray-400">{application.restaurant}</p>
                  </div>
                </div>
                <div
                  className={`px-3 py-1 rounded-full text-xs font-medium border flex items-center space-x-1 ${getStatusColor(application.status)}`}
                >
                  {getStatusIcon(application.status)}
                  <span>{getStatusText(application.status)}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-sm text-gray-300">
                  <User className="h-4 w-4 text-gray-400" />
                  <span>Опыт работы: {application.experience}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-300">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <span>{application.phone}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-300">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <span>{application.email}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-300">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <span>{application.location}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-300">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <span>Подано: {new Date(application.appliedDate).toLocaleDateString("ru-RU")}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-gray-700">
                <div>
                  <p className="text-sm text-gray-400">Должность:</p>
                  <Badge variant="outline" className={getPositionColor(application.position)}>
                    {application.position}
                  </Badge>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-400">Зарплата:</p>
                  <p className="text-lg font-bold text-green-400">{application.salary}</p>
                </div>
              </div>

              {application.resume && (
                <div className="pt-2 border-t border-gray-700">
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Скачать резюме
                  </Button>
                </div>
              )}

              {application.status === "pending" && (
                <div className="flex space-x-2 pt-2">
                  <Button
                    size="sm"
                    className="flex-1 bg-green-500 hover:bg-green-600"
                    onClick={() => handleApprove(application.id)}
                  >
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Принять
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 border-red-600 text-red-400 hover:bg-red-900/20 bg-transparent"
                    onClick={() => handleReject(application.id)}
                  >
                    <XCircle className="h-4 w-4 mr-1" />
                    Отклонить
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
