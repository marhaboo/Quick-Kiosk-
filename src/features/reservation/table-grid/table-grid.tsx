"use client"

import { cn } from "@/shared/utils/cn"
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

// Type guard и нормализация
const isValidStatus = (status: string): status is "available" | "dine-in" | "reserved" | "cleaning" => {
  return ["available", "dine-in", "reserved", "cleaning"].includes(status)
}

const normalizeStatus = (status: string): "available" | "dine-in" | "reserved" | "cleaning" => {
  if (isValidStatus(status)) {
    return status
  }
  return "available"
}

// Цвета для каждой темы
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
    label: "Свободен",
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
    label: "Занят",
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
    label: "Забронирован",
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
    label: "Уборка",
  },
}

export function TableGrid({ tables, selectedTable, onTableSelect }: TableGridProps) {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Ждём, пока тема загрузится, чтобы избежать рассинхрона
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
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div
                onClick={() => isClickable && onTableSelect(table.id)}
                className={cn(
                  "relative p-4 rounded-2xl border-2 transition-all duration-300 glass-effect",
                  themeColors.color,
                  isClickable && "cursor-pointer hover:shadow-lg",
                  !isClickable && "cursor-not-allowed opacity-75",
                  isSelected && "ring-2 ring-orange-500 ring-offset-2 ring-offset-[#0F0F0F] gradient-orange",
                  isClickable && "pulse-orange",
                )}
              >
                {/* Статус индикатор */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Icon className={cn("w-4 h-4", themeColors.textColor)} />
                    <span className={cn("text-xs font-medium", themeColors.textColor)}>{config.label}</span>
                  </div>
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-2 h-2 bg-orange-500 rounded-full pulse-orange"
                    />
                  )}
                </div>

                {/* Номер столика */}
                <div className="text-center mb-3">
                  <div
                    className={cn(
                      "text-2xl font-bold mb-1",
                      isSelected ? "text-white text-shadow-glow" : "text-white"
                    )}
                  >
                    #{table.id}
                  </div>
                  <div className={cn(theme === "dark" ? "text-gray-400" : "text-gray-600")}>Столик</div>
                </div>

                {/* Количество мест */}
                <div className={cn("flex items-center justify-center gap-2", theme === "dark" ? "text-gray-300" : "text-gray-700")}>
                  <Users className="w-4 h-4" />
                  <span className="text-sm font-medium">
                    {table.seats} {table.seats === 1 ? "место" : table.seats < 5 ? "места" : "мест"}
                  </span>
                </div>

                {/* Анимированный фон для выбранного столика */}
                {isSelected && (
                  <motion.div
                    className="absolute inset-0 gradient-orange rounded-2xl opacity-20"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.2 }}
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
