"use client"

import type { AppDispatch, RootState } from "@/app/store/store"
import { getTables } from "@/entities/reservation/api/api-reservation"
import { ReservationHeader } from "@/features/reservation/reservation-header/reservation-header"
import { TableGrid } from "@/features/reservation/table-grid/table-grid"
import { TableStatusLegend } from "@/features/reservation/table-status-legend/table-status-legend"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

export interface TableProps {
  id: number
  restaurantId: number
  seats: number
  status: string
}

// Добавьте type guard для проверки статуса
export const isValidStatus = (status: string): status is "available" | "dine-in" | "reserved" | "cleaning" => {
  return ["available", "dine-in", "reserved", "cleaning"].includes(status)
}

// Функция для нормализации статуса
export const normalizeStatus = (status: string): "available" | "dine-in" | "reserved" | "cleaning" => {
  if (isValidStatus(status)) {
    return status
  }
  // Возвращаем дефолтный статус если статус неизвестен
  return "available"
}

export function TableReservation() {
  const { tables } = useSelector((state: RootState) => state.reserv)
  const { currentRestaurant } = useSelector((state: RootState) => state.resById)
  const dispatch: AppDispatch = useDispatch()
  const [selectedTable, setSelectedTable] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (currentRestaurant?.id !== undefined) {
      setIsLoading(true)
      dispatch(getTables(currentRestaurant.id)).finally(() => {
        setIsLoading(false)
      })
    }
  }, [currentRestaurant?.id, dispatch])

  // Подсчет статистики столиков
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
    <div className="p-6 min-h-screen bg-[#0F0F0F] bg-[url('/placeholder.svg?height=1080&width=1920')] bg-no-repeat bg-cover bg-center relative">
      <div className="absolute inset-0 bg-black/50 z-0" />

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
            <div className="bg-[#1A1A1A]/80 glass-effect rounded-2xl p-6 border border-[#3D3A46]">
              <h2 className="text-2xl font-bold text-white mb-2 text-shadow-glow">
                {currentRestaurant.name || "Ресторан"}
              </h2>
              <p className="text-gray-300">
                Всего столиков:{" "}
                <span className="text-orange-500 font-semibold pulse-orange">{tables?.length || 0}</span>
              </p>
            </div>
          </div>
        )}

        {/* Загрузка */}
        {isLoading && (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 pulse-orange"></div>
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
          <div className="text-center py-20 animate-fade-in-up">
            <div className="text-6xl mb-4">🍽️</div>
            <h3 className="text-xl font-semibold text-white mb-2 text-shadow-glow">Столики не найдены</h3>
            <p className="text-gray-400">В данном ресторане пока нет доступных столиков</p>
          </div>
        )}
      </div>
    </div>
  )
}
