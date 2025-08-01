"use client"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useTheme } from "next-themes"
import { cn } from "@/shared/lib/utils" // твоя утилита для условных классов

import type { AppDispatch, RootState } from "@/app/store/store"
import { getTables } from "@/entities/reservation/api/api-reservation"
import { ReservationHeader } from "@/features/reservation/reservation-header/reservation-header"
import { TableGrid } from "@/features/reservation/table-grid/table-grid"
import { TableStatusLegend } from "@/features/reservation/table-status-legend/table-status-legend"

export interface TableProps {
  id: number
  restaurantId: number
  seats: number
  status: string
}

export const isValidStatus = (status: string): status is "available" | "dine-in" | "reserved" | "cleaning" =>
  ["available", "dine-in", "reserved", "cleaning"].includes(status)

export const normalizeStatus = (status: string): "available" | "dine-in" | "reserved" | "cleaning" =>
  isValidStatus(status) ? status : "available"

export function TableReservation() {
  const { tables } = useSelector((state: RootState) => state.reserv)
  const { currentRestaurant } = useSelector((state: RootState) => state.resById)
  const dispatch: AppDispatch = useDispatch()

  const [selectedTable, setSelectedTable] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const { theme } = useTheme()

  useEffect(() => {
    if (currentRestaurant?.id !== undefined) {
      setIsLoading(true)
      dispatch(getTables(currentRestaurant.id)).finally(() => setIsLoading(false))
    }
  }, [currentRestaurant?.id, dispatch])

  const statusCounts = {
    available: tables?.filter((t) => normalizeStatus(t.status) === "available").length || 0,
    "dine-in": tables?.filter((t) => normalizeStatus(t.status) === "dine-in").length || 0,
    reserved: tables?.filter((t) => normalizeStatus(t.status) === "reserved").length || 0,
    cleaning: tables?.filter((t) => normalizeStatus(t.status) === "cleaning").length || 0,
  }

  const handleTableSelect = (tableId: number) => {
    const table = tables?.find((t) => t.id === tableId)
    if (table && normalizeStatus(table.status) === "available") {
      setSelectedTable(tableId)
    }
  }

  return (
    <div
      className={cn(
        "p-6 min-h-screen bg-no-repeat bg-cover bg-center relative",
        theme === "dark"
          ? "bg-[#0F0F0F] bg-[url('/placeholder.svg?height=1080&width=1920')]"
          : "bg-white bg-[url('/placeholder-light.svg?height=1080&width=1920')]"
      )}
    >
      <div className={cn("absolute inset-0 z-0", theme === "dark" ? "bg-black/50" : "bg-white/40")} />

      <div className="relative z-10">
        {/* Заголовок */}
        <div className="animate-fade-in-up">
          <ReservationHeader />
        </div>

        {/* Статистика столиков */}
        <div className="animate-fade-in-up animation-delay-200">
          <TableStatusLegend statusCounts={statusCounts} />
        </div>

        {/* Информация о ресторане */}
        {currentRestaurant && (
          <div className="mb-8 animate-fade-in-up animation-delay-200">
            <div
              className={cn(
                "rounded-2xl p-6 border",
                theme === "dark"
                  ? "bg-[#1A1A1A]/80 border-[#3D3A46] glass-effect"
                  : "bg-gray-100 border-gray-300"
              )}
            >
              <h2
                className={cn(
                  "text-2xl font-bold mb-2",
                  theme === "dark" ? "text-white text-shadow-glow" : "text-gray-900"
                )}
              >
                {currentRestaurant.name || "Ресторан"}
              </h2>
              <p className={cn(theme === "dark" ? "text-gray-300" : "text-gray-700")}>
                Всего столиков:{" "}
                <span
                  className={cn(
                    "font-semibold",
                    theme === "dark" ? "text-orange-500 pulse-orange" : "text-orange-600"
                  )}
                >
                  {tables?.length || 0}
                </span>
              </p>
            </div>
          </div>
        )}

        {/* Загрузка */}
        {isLoading && (
          <div className="flex items-center justify-center py-20">
            <div
              className={cn(
                "animate-spin rounded-full h-12 w-12 border-b-2 pulse-orange",
                theme === "dark"
                  ? "border-orange-500"
                  : "border-orange-600"
              )}
            />
          </div>
        )}

        {/* Сетка столиков */}
        {!isLoading && (
          <div className="animate-fade-in-up animation-delay-200">
            <TableGrid tables={tables || []} selectedTable={selectedTable} onTableSelect={handleTableSelect} />
          </div>
        )}

        {/* Пустое состояние */}
        {!isLoading && (!tables || tables.length === 0) && (
          <div className={cn("text-center py-20 animate-fade-in-up", theme === "dark" ? "text-white" : "text-gray-900")}>
            <div className="text-6xl mb-4">🍽️</div>
            <h3 className="text-xl font-semibold mb-2 text-shadow-glow">Столики не найдены</h3>
            <p className={theme === "dark" ? "text-gray-400" : "text-gray-700"}>
              В данном ресторане пока нет доступных столиков
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
