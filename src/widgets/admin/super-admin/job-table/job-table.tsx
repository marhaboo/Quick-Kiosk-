"use client"

import { useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card"
import { Button } from "@/shared/ui/button"
import { Badge } from "@/shared/ui/badge"
import { CheckCircle, XCircle, User, Briefcase, Clock } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "@/app/store/store"
import {
  getJobApplication,
  updateJobApplicationStatus,
  delJobApplication,
} from "@/entities/job-application/api/job-application-api"

interface JobTableProps {
  isLoading?: boolean
}

function JobTableSkeleton() {
  return (
    <Card className="border border-[#333333] bg-[#1a1a1a] animate-pulse glass-effect">
      <CardHeader>
        <div className="h-8 bg-gray-700 rounded w-48" />
      </CardHeader>
      <CardContent className="space-y-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="flex items-center justify-between p-4 rounded-xl bg-gray-800/30">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gray-700 rounded-full" />
              <div className="space-y-2">
                <div className="h-4 bg-gray-700 rounded w-32" />
                <div className="h-3 bg-gray-700 rounded w-24" />
              </div>
            </div>
            <div className="flex space-x-2">
              <div className="h-8 w-8 bg-gray-700 rounded-full" />
              <div className="h-8 w-8 bg-gray-700 rounded-full" />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

export default function JobTable({ isLoading }: JobTableProps) {
  const dispatch: AppDispatch = useDispatch()
  const { jobs, loading } = useSelector((state: RootState) => state.jobApplication)

  useEffect(() => {
    dispatch(getJobApplication())
  }, [dispatch])

  const handleStatusUpdate = (id: number, status: "Accepted" | "Rejected") => {
    dispatch(updateJobApplicationStatus({ id, status }))
  }

  const handleDelete = (id: number) => {
    dispatch(delJobApplication(id))
  }

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "accepted":
        return (
          <Badge className="bg-green-500/20 text-green-400 border border-green-500/30 transition-all duration-300">
            Approved
          </Badge>
        )
      case "rejected":
        return (
          <Badge className="bg-red-500/20 text-red-400 border border-red-500/30 transition-all duration-300">
            Rejected
          </Badge>
        )
      case "pending":
        return (
          <Badge className="bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 transition-all duration-300">
            Pending
          </Badge>
        )
      default:
        return (
          <Badge className="bg-gray-500/20 text-gray-400 border border-gray-500/30 transition-all duration-300">
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        )
    }
  }

  if (isLoading || loading) {
    return <JobTableSkeleton />
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h2 className="text-3xl font-bold text-white text-shadow-glow">Job Applications</h2>
        <p className="text-gray-300">Manage employment applications</p>
      </div>

      <Card className="border border-[#333333] bg-[#1a1a1a] overflow-hidden glass-effect transition-all duration-300">
        <CardHeader className="pb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-500/20 border border-purple-500/30 rounded-lg">
              <Briefcase className="h-5 w-5 text-purple-400" />
            </div>
            <div>
              <CardTitle className="text-xl font-semibold text-white">Employment Applications</CardTitle>
              <p className="text-sm text-gray-400 mt-1">{jobs.length} total applications</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="divide-y divide-[#333333]">
            {jobs.length === 0 ? (
              <div className="text-center py-12">
                <Briefcase className="h-16 w-16 mx-auto text-gray-600 mb-4" />
                <p className="text-gray-400">No job applications found</p>
              </div>
            ) : (
              jobs.map((application, index) => (
                <div
                  key={application.id}
                  className="p-6 hover:bg-gray-800/30 transition-all duration-300 animate-fade-in-up"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-full bg-gray-700/50 border border-gray-600/30 flex items-center justify-center">
                        <User className="h-6 w-6 text-gray-400" />
                      </div>
                      <div>
                        <h3 className="text-white font-semibold text-lg">
                          {application.firstName} {application.lastName}
                        </h3>
                        <p className="text-gray-400">{application.desiredPosition}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Clock className="h-3 w-3 text-gray-500" />
                          <p className="text-sm text-gray-500">{application.createdAt.slice(0, 10)}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      {getStatusBadge(application.status)}
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          onClick={() => handleStatusUpdate(application.id, "Accepted")}
                          className="w-10 h-10 rounded-full bg-green-500/20 border border-green-500/30 text-green-400 hover:text-green-300 hover:bg-green-500/30 transition-all duration-300 hover:scale-110"
                        >
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handleStatusUpdate(application.id, "Rejected")}
                          className="w-10 h-10 rounded-full bg-red-500/20 border border-red-500/30 text-red-400 hover:text-red-300 hover:bg-red-500/30 transition-all duration-300 hover:scale-110"
                        >
                          <XCircle className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handleDelete(application.id)}
                          className="w-10 h-10 rounded-full bg-gray-500/20 border border-gray-500/30 text-gray-400 hover:text-gray-300 hover:bg-gray-500/30 transition-all duration-200"
                          title="Delete application"
                        >
                          <XCircle className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
