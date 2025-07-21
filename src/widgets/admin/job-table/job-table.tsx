"use client"

import { useState } from "react"
import { Card, CardContent } from "@/shared/ui/card"
import { Button } from "@/shared/ui/button"
import { Badge } from "@/shared/ui/badge"
import { CheckCircle, XCircle, User } from "lucide-react"

interface JobApplication {
  id: number
  name: string
  position: string
  restaurant: string
  status: string
  experience: string
}

interface JobTableProps {
  isLoading?: boolean
}

function JobTableSkeleton() {
  return (
    <Card className="border border-[#333333] bg-[#1a1a1a] animate-pulse glass-effect transition-all duration-300">
      <CardContent className="p-0">
        <div className="p-6">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="flex items-center justify-between py-4 border-b border-[#333333] last:border-b-0"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gray-700 rounded-full" />
                <div className="space-y-2">
                  <div className="h-4 bg-gray-700 rounded w-32" />
                  <div className="h-3 bg-gray-700 rounded w-24" />
                  <div className="h-3 bg-gray-700 rounded w-20" />
                </div>
              </div>
              <div className="flex space-x-2">
                <div className="h-8 w-8 bg-gray-700 rounded-full" />
                <div className="h-8 w-8 bg-gray-700 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default function JobTable({ isLoading }: JobTableProps) {
  const [jobApplications, setJobApplications] = useState<JobApplication[]>([
    {
      id: 1,
      name: "Елена Волкова",
      position: "Официант",
      restaurant: "Bella Vista",
      status: "pending",
      experience: "2 года",
    },
    {
      id: 2,
      name: "Дмитрий Орлов",
      position: "Повар",
      restaurant: "Sushi Master",
      status: "approved",
      experience: "5 лет",
    },
    {
      id: 3,
      name: "Ольга Зайцева",
      position: "Бармен",
      restaurant: "Pizza Corner",
      status: "pending",
      experience: "3 года",
    },
  ])

  const updateJobStatus = (id: number, status: string) => {
    setJobApplications(jobApplications.map((j) => (j.id === id ? { ...j, status } : j)))
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return (
          <Badge className="bg-green-500/20 text-green-400 border border-green-500/30 transition-all duration-300">
            Одобрено
          </Badge>
        )
      case "rejected":
        return (
          <Badge className="bg-red-500/20 text-red-400 border border-red-500/30 transition-all duration-300">
            Отклонено
          </Badge>
        )
      case "pending":
        return (
          <Badge className="bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 transition-all duration-300">
            Ожидает
          </Badge>
        )
      default:
        return (
          <Badge className="bg-gray-500/20 text-gray-400 border border-gray-500/30 transition-all duration-300">
            {status}
          </Badge>
        )
    }
  }

  if (isLoading) {
    return <JobTableSkeleton />
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-white">Заявки на работу</h2>
      </div>

      <Card className="border border-[#333333] bg-[#1a1a1a] overflow-hidden glass-effect transition-all duration-300">
        <CardContent className="p-0">
          <div className="divide-y divide-[#333333]">
            {jobApplications.map((application, index) => (
              <div
                key={application.id}
                className="p-6 hover:bg-gray-800/30 transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `200ms` }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-gray-700/50 border border-gray-600/30 flex items-center justify-center">
                      <User className="h-6 w-6 text-gray-400" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-lg">{application.name}</h3>
                      <p className="text-gray-400">
                        {application.position} • {application.restaurant}
                      </p>
                      <p className="text-gray-500 text-sm">Опыт: {application.experience}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    {getStatusBadge(application.status)}
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        onClick={() => updateJobStatus(application.id, "approved")}
                        className="w-10 h-10 rounded-full bg-green-500/20 border border-green-500/30 text-green-400 hover:text-green-300 hover:bg-green-500/30 transition-all duration-300 hover:scale-110"
                      >
                        <CheckCircle className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => updateJobStatus(application.id, "rejected")}
                        className="w-10 h-10 rounded-full bg-red-500/20 border border-red-500/30 text-red-400 hover:text-red-300 hover:bg-red-500/30 transition-all duration-300 hover:scale-110"
                      >
                        <XCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
