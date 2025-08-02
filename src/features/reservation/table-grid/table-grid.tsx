"use client"

import { cn } from "@/shared/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import { Users, Clock, CheckCircle, AlertCircle } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

interface TableProps {
  id: number
  restaurantId: number
  seats: number
  status: string
}

interface TableGridProps {
  tables: TableProps[]
  selectedTable: number | null
  onTableSelect: (tableId: number) => void
}

// Map backend status constants to frontend status
const STATUS_MAP: Record<string, "available" | "dine-in" | "reserved" | "cleaning"> = {
  Available: "available",
  Reserved: "reserved",
  DineIn: "dine-in",
  CleaningIn: "cleaning",
  // Also handle lowercase versions
  available: "available",
  reserved: "reserved",
  "dine-in": "dine-in",
  dinein: "dine-in",
  cleaning: "cleaning",
  cleaningin: "cleaning",
}

const normalizeStatus = (status: string): "available" | "dine-in" | "reserved" | "cleaning" => {
  return STATUS_MAP[status] || STATUS_MAP[status.toLowerCase()] || "available"
}

// Colors for each theme
const statusConfig = {
  available: {
    light: {
      color: "bg-green-100 border-green-300 hover:bg-green-200",
      textColor: "text-green-600",
    },
    dark: {
      color: "bg-green-500/20 border-green-500/50 hover:bg-green-500/30",
      textColor: "text-green-400",
    },
    icon: CheckCircle,
    label: "Available",
  },
  "dine-in": {
    light: {
      color: "bg-blue-100 border-blue-300",
      textColor: "text-blue-600",
    },
    dark: {
      color: "bg-blue-500/20 border-blue-500/50",
      textColor: "text-blue-400",
    },
    icon: Users,
    label: "Occupied",
  },
  reserved: {
    light: {
      color: "bg-orange-100 border-orange-300",
      textColor: "text-orange-600",
    },
    dark: {
      color: "bg-orange-500/20 border-orange-500/50",
      textColor: "text-orange-400",
    },
    icon: Clock,
    label: "Reserved",
  },
  cleaning: {
    light: {
      color: "bg-red-100 border-red-300",
      textColor: "text-red-600",
    },
    dark: {
      color: "bg-red-500/20 border-red-500/50",
      textColor: "text-red-400",
    },
    icon: AlertCircle,
    label: "Cleaning",
  },
}

export function TableGrid({ tables, selectedTable, onTableSelect }: TableGridProps) {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Wait for theme to load to avoid desync
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      <AnimatePresence>
        {tables.map((table, index) => {
          const normalizedStatus = normalizeStatus(table.status)
          const config = statusConfig[normalizedStatus]
          const themeColors = theme === "dark" ? config.dark : config.light
          const Icon = config.icon
          const isSelected = selectedTable === table.id
          const isClickable = normalizedStatus === "available"

          return (
            <motion.div
              key={table.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{
                duration: 0.3,
                delay: index * 0.05,
                ease: "easeOut",
              }}
              whileHover={isClickable ? { scale: 1.05 } : {}}
              whileTap={isClickable ? { scale: 0.95 } : {}}
            >
              <div
                onClick={() => isClickable && onTableSelect(table.id)}
                className={cn(
                  "relative p-4 rounded-2xl border-2 transition-all duration-300 backdrop-blur-sm",
                  themeColors.color,
                  isClickable && "cursor-pointer hover:shadow-lg",
                  !isClickable && "cursor-not-allowed opacity-75",
                  isSelected && "ring-2 ring-orange-500 ring-offset-2",
                  theme === "dark" && isSelected && "ring-offset-gray-900",
                  theme === "light" && isSelected && "ring-offset-white",
                )}
              >
                {/* Status indicator */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Icon className={cn("w-4 h-4", themeColors.textColor)} />
                    <span className={cn("text-xs font-medium", themeColors.textColor)}>{config.label}</span>
                  </div>
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"
                    />
                  )}
                </div>

                {/* Table number */}
                <div className="text-center mb-3">
                  <div
                    className={cn(
                      "text-2xl font-bold mb-1",
                      theme === "dark" ? "text-white" : "text-gray-900",
                      isSelected && "text-orange-500",
                    )}
                  >
                    #{table.id}
                  </div>
                  <div className={cn(theme === "dark" ? "text-gray-400" : "text-gray-600")}>Table</div>
                </div>

                {/* Number of seats */}
                <div
                  className={cn(
                    "flex items-center justify-center gap-2",
                    theme === "dark" ? "text-gray-300" : "text-gray-700",
                  )}
                >
                  <Users className="w-4 h-4" />
                  <span className="text-sm font-medium">
                    {table.seats} {table.seats === 1 ? "seat" : "seats"}
                  </span>
                </div>

                {/* Animated background for selected table */}
                {isSelected && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-orange-600/10 rounded-2xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </div>
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}
