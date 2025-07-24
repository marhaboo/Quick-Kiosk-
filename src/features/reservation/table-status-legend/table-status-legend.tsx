"use client"

import { motion } from "framer-motion"
import { Users, Clock, CheckCircle, AlertCircle } from "lucide-react"

interface StatusCounts {
  available: number
  "dine-in": number
  reserved: number
  cleaning: number
}

interface TableStatusLegendProps {
  statusCounts: StatusCounts
}

const statusConfig = [
  {
    key: "available" as const,
    label: "Свободные",
    color: "text-green-400",
    bgColor: "bg-green-500/20",
    borderColor: "border-green-500/50",
    icon: CheckCircle,
  },
  {
    key: "dine-in" as const,
    label: "Занятые",
    color: "text-blue-400",
    bgColor: "bg-blue-500/20",
    borderColor: "border-blue-500/50",
    icon: Users,
  },
  {
    key: "reserved" as const,
    label: "Забронированные",
    color: "text-orange-400",
    bgColor: "bg-orange-500/20",
    borderColor: "border-orange-500/50",
    icon: Clock,
  },
  {
    key: "cleaning" as const,
    label: "Уборка",
    color: "text-red-400",
    bgColor: "bg-red-500/20",
    borderColor: "border-red-500/50",
    icon: AlertCircle,
  },
]

export function TableStatusLegend({ statusCounts }: TableStatusLegendProps) {
  const totalTables = Object.values(statusCounts).reduce((sum, count) => sum + count, 0)

  return (
    <div className="mb-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {statusConfig.map((status, index) => {
          const Icon = status.icon
          const count = statusCounts[status.key]
          const percentage = totalTables > 0 ? (count / totalTables) * 100 : 0

          return (
            <motion.div
              key={status.key}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`p-4 rounded-2xl border glass-effect ${status.bgColor} ${status.borderColor} animate-fade-in-up hover:shadow-lg transition-all duration-300`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center gap-3 mb-2">
                <Icon className={`w-5 h-5 ${status.color}`} />
                <span className="text-white font-medium text-sm text-shadow-glow">{status.label}</span>
              </div>

              <div className="flex items-end gap-2">
                <motion.span
                  className="text-2xl font-bold text-white text-shadow-glow pulse-orange"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                >
                  {count}
                </motion.span>
                <span className="text-xs text-gray-400 mb-1">({percentage.toFixed(0)}%)</span>
              </div>

              {/* Прогресс бар */}
              <div className="mt-2 h-1 bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                  className={`h-full ${status.color.replace("text-", "bg-")} pulse-orange`}
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
                />
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
