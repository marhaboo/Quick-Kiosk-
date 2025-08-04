"use client"

import { useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card"
import { Button } from "@/shared/ui/button"
import { User, Phone, Mail, Calendar, MapPin, CheckCircle, XCircle, AlertCircle, Briefcase, Trash2 } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "@/app/store/store"
import { getJobApplication } from "@/entities/job-application/api/job-application-api"
import { delJobApplication, updateJobApplicationStatus } from "@/entities/job-application/api/job-application-api"
import type { JobAppGet } from "@/entities/job-application/models/type"

interface JobTableProps {
  isLoading: boolean
}

export default function VakanciTable({ isLoading }: JobTableProps) {
  const dispatch: AppDispatch = useDispatch()
  const { jobs } = useSelector((state: RootState) => state.jobApplication)

  useEffect(() => {
    dispatch(getJobApplication())
  }, [dispatch])

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
      case "Accepted":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "Rejected":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      case "Pending":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Accepted":
        return <CheckCircle className="h-4 w-4" />
      case "Rejected":
        return <XCircle className="h-4 w-4" />
      case "Pending":
        return <AlertCircle className="h-4 w-4" />
      default:
        return <AlertCircle className="h-4 w-4" />
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "Accepted":
        return "Принято"
      case "Rejected":
        return "Отклонено"
      case "Pending":
        return "На рассмотрении"
      default:
        return status
    }
  }

  const handleApprove = (id: number) => {
    dispatch(updateJobApplicationStatus({ id, status: "Accepted" }))
  }

  const handleReject = (id: number) => {
    dispatch(updateJobApplicationStatus({ id, status: "Rejected" }))
  }

  const handleDelete = (id: number) => {
    dispatch(delJobApplication(id))
  }

  const statusCounts = {
    pending: jobs.filter((job: JobAppGet) => job.status === "Pending").length,
    approved: jobs.filter((job: JobAppGet) => job.status === "Accepted").length,
    rejected: jobs.filter((job: JobAppGet) => job.status === "Rejected").length,
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-white">Отклики на вакансии</h1>
          <p className="text-gray-400 mt-1">Управление заявками от соискателей в рестораны</p>
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
        {jobs.map((job: JobAppGet) => (
          <Card
            key={job.id}
            className="border border-[#333333] bg-[#1a1a1a] hover:border-orange-500/30 transition-all duration-300"
          >
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-500/20 border border-blue-500/30 rounded-lg">
                    <User className="h-5 w-5 text-blue-400" />
                  </div>
                  <div>
                    <CardTitle className="text-lg text-white">
                      {job.firstName} {job.lastName}
                    </CardTitle>
                    <p className="text-sm text-gray-400">{job.desiredPosition}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div
                    className={`px-3 py-1 rounded-full text-xs font-medium border flex items-center space-x-1 ${getStatusColor(job.status)}`}
                  >
                    {getStatusIcon(job.status)}
                    <span>{getStatusText(job.status)}</span>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleDelete(job.id)}
                    className="text-gray-400 hover:text-red-400 hover:bg-red-900/20"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-sm text-gray-300">
                  <Briefcase className="h-4 w-4 text-gray-400" />
                  <span>{job.restaurantName}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-300">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <span>{job.phone}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-300">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <span>{job.email}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-300">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <span>{job.address}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-300">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <span>Подано: {new Date(job.createdAt).toLocaleDateString("ru-RU")}</span>
                </div>
              </div>

              {job.status === "Pending" && (
                <div className="flex space-x-2 pt-2">
                  <Button
                    size="sm"
                    className="flex-1 bg-green-500 hover:bg-green-600"
                    onClick={() => handleApprove(job.id)}
                  >
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Принять
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 border-red-600 text-red-400 hover:bg-red-900/20 bg-transparent"
                    onClick={() => handleReject(job.id)}
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
