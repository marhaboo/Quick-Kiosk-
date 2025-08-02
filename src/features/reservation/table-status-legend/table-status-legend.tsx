"use client"

import { motion } from "framer-motion"
import { Users, Clock, CheckCircle, AlertCircle } from "lucide-react"
import { useTheme } from "next-themes"
import { cn } from "@/shared/lib/utils"

interface TableStatusLegendProps {
  statusCounts: StatusCounts
}

interface StatusCounts {
  available: number
  "dine-in": number
  reserved: number
  cleaning: number
}

const statusConfig = [
  {
    key: "available" as const,
    label: "Available",
    icon: CheckCircle,
    colorClass: "text-green-500",
    bgLight: "bg-green-50",
    bgDark: "bg-green-500/10",
    borderLight: "border-green-200",
    borderDark: "border-green-500/20",
    progressColor: "bg-green-500",
  },
  {
    key: "dine-in" as const,
    label: "Occupied",
    icon: Users,
    colorClass: "text-blue-500",
    bgLight: "bg-blue-50",
    bgDark: "bg-blue-500/10",
    borderLight: "border-blue-200",
    borderDark: "border-blue-500/20",
    progressColor: "bg-blue-500",
  },
  {
    key: "reserved" as const,
    label: "Reserved",
    icon: Clock,
    colorClass: "text-orange-500",
    bgLight: "bg-orange-50",
    bgDark: "bg-orange-500/10",
    borderLight: "border-orange-200",
    borderDark: "border-orange-500/20",
    progressColor: "bg-orange-500",
  },
  {
    key: "cleaning" as const,
    label: "Cleaning",
    icon: AlertCircle,
    colorClass: "text-red-500",
    bgLight: "bg-red-50",
    bgDark: "bg-red-500/10",
    borderLight: "border-red-200",
    borderDark: "border-red-500/20",
    progressColor: "bg-red-500",
  },
]

export function TableStatusLegend({ statusCounts }: TableStatusLegendProps) {
  const { theme } = useTheme()
  const totalTables = statusCounts.available + statusCounts["dine-in"] + statusCounts.reserved + statusCounts.cleaning

  return (
    <div className="mb-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {statusConfig.map((status, index) => {
          const Icon = status.icon
          const count = statusCounts[status.key]
          const percentage = totalTables > 0 ? (count / totalTables) * 100 : 0

          const bgColor = theme === "dark" ? status.bgDark : status.bgLight
          const borderColor = theme === "dark" ? status.borderDark : status.borderLight

          return (
            <motion.div
              key={status.key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: "easeOut",
              }}
              className={cn(
                "p-4 rounded-xl border-2 transition-all duration-300 hover:shadow-lg backdrop-blur-sm",
                bgColor,
                borderColor,
              )}
            >
              {/* Header with icon and label */}
              <div className="flex items-center gap-3 mb-3">
                <div className={cn("p-2 rounded-lg", theme === "dark" ? "bg-white/10" : "bg-white/50")}>
                  <Icon className={cn("w-4 h-4", status.colorClass)} />
                </div>
                <span className={cn("font-medium text-sm", theme === "dark" ? "text-gray-200" : "text-gray-700")}>
                  {status.label}
                </span>
              </div>

              {/* Count and percentage */}
              <div className="flex items-end justify-between mb-3">
                <motion.span
                  className={cn("text-3xl font-bold", theme === "dark" ? "text-white" : "text-gray-900")}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1 + 0.2,
                    type: "spring",
                    stiffness: 200,
                  }}
                >
                  {count}
                </motion.span>
                <span className={cn("text-xs font-medium mb-1", theme === "dark" ? "text-gray-400" : "text-gray-500")}>
                  {percentage.toFixed(0)}%
                </span>
              </div>

              {/* Progress bar */}
              <div className={cn("h-2 rounded-full overflow-hidden", theme === "dark" ? "bg-gray-700" : "bg-gray-200")}>
                <motion.div
                  className={cn("h-full rounded-full", status.progressColor)}
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{
                    duration: 1,
                    delay: index * 0.1 + 0.5,
                    ease: "easeOut",
                  }}
                />
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Total tables summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className={cn(
          "mt-6 p-4 rounded-xl border-2 text-center backdrop-blur-sm",
          theme === "dark" ? "bg-gray-800/50 border-gray-700" : "bg-gray-50/50 border-gray-200",
        )}
      >
        <div className={cn("text-sm font-medium mb-1", theme === "dark" ? "text-gray-300" : "text-gray-600")}>
          Total Tables
        </div>
        <div className={cn("text-2xl font-bold", theme === "dark" ? "text-white" : "text-gray-900")}>{totalTables}</div>
      </motion.div>
    </div>
  )
}
