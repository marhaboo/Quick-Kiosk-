"use client"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useTheme } from "next-themes"
import { cn } from "@/shared/lib/utils"
import type { AppDispatch, RootState } from "@/app/store/store"
import { getTables } from "@/entities/reservation/api/api-reservation"
import { ReservationHeader } from "@/features/reservation/reservation-header/reservation-header"
import { TableGrid } from "@/features/reservation/table-grid/table-grid"
import { TableStatusLegend } from "@/features/reservation/table-status-legend/table-status-legend"
import { TableBookingModal } from "@/features/table-booking-modal/table-booking-modal"

export interface TableProps {
  id: number
  restaurantId: number
  seats: number
  status: string
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

export const isValidStatus = (status: string): status is "available" | "dine-in" | "reserved" | "cleaning" => {
  const normalizedStatus = STATUS_MAP[status] || STATUS_MAP[status.toLowerCase()]
  return normalizedStatus !== undefined
}

export const normalizeStatus = (status: string): "available" | "dine-in" | "reserved" | "cleaning" => {
  return STATUS_MAP[status] || STATUS_MAP[status.toLowerCase()] || "available"
}

export function TableReservation() {
  const { tables } = useSelector((state: RootState) => state.reserv)
  const { currentRestaurant } = useSelector((state: RootState) => state.resById)
  const dispatch: AppDispatch = useDispatch()
  const [selectedTable, setSelectedTable] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)
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

  const handleBookTable = () => {
    if (selectedTable) {
      setIsBookingModalOpen(true)
    }
  }

  const handleCloseBookingModal = () => {
    setIsBookingModalOpen(false)
  }

  const clearSelection = () => {
    setSelectedTable(null)
  }

  const selectedTableData = tables?.find((t) => t.id === selectedTable)

  console.log("Status counts:", statusCounts)

  return (
    <div
      className={cn(
        "p-6 min-h-screen bg-no-repeat bg-cover bg-center relative",
        theme === "dark"
          ? "bg-gray-900 bg-[url('/placeholder.svg?height=1080&width=1920&text=Dark+Restaurant+Background')]"
          : "bg-gray-50 bg-[url('/placeholder.svg?height=1080&width=1920&text=Light+Restaurant+Background')]",
      )}
    >
      <div className={cn("absolute inset-0 z-0", theme === "dark" ? "bg-black/30" : "bg-white/30")} />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="animate-fade-in-up mb-8">
          <ReservationHeader />
        </div>

        {/* Status Legend */}
        <div className="animate-fade-in-up mb-8" style={{ animationDelay: "200ms" }}>
          <TableStatusLegend statusCounts={statusCounts} />
        </div>

        {/* Restaurant Info */}
        {currentRestaurant && (
          <div className="mb-8 animate-fade-in-up" style={{ animationDelay: "300ms" }}>
            <div
              className={cn(
                "rounded-2xl p-6 border backdrop-blur-sm",
                theme === "dark" ? "bg-gray-900/80 border-gray-700" : "bg-white/80 border-gray-200",
              )}
            >
              <h2 className={cn("text-2xl font-bold mb-2", theme === "dark" ? "text-white" : "text-gray-900")}>
                {currentRestaurant.name || "Restaurant"}
              </h2>
              <p className={cn(theme === "dark" ? "text-gray-300" : "text-gray-700")}>
                Total Tables:{" "}
                <span className={cn("font-semibold", theme === "dark" ? "text-orange-400" : "text-orange-600")}>
                  {tables?.length || 0}
                </span>
              </p>
            </div>
          </div>
        )}

        {/* Selected Table Info */}
        {selectedTable && (
          <div className="mb-6 animate-fade-in-up">
            <div
              className={cn(
                "p-4 rounded-lg border",
                theme === "dark"
                  ? "bg-orange-900/20 border-orange-800 text-orange-200"
                  : "bg-orange-50 border-orange-200 text-orange-800",
              )}
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-medium">Table #{selectedTable} selected</span>
                  {selectedTableData && (
                    <span className="ml-2 text-sm opacity-75">({selectedTableData.seats} seats)</span>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleBookTable}
                    className={cn(
                      "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                      "bg-orange-500 hover:bg-orange-600 text-white",
                    )}
                  >
                    Book Table
                  </button>
                  <button
                    onClick={clearSelection}
                    className={cn(
                      "px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                      theme === "dark"
                        ? "bg-orange-800 hover:bg-orange-700 text-orange-100"
                        : "bg-orange-200 hover:bg-orange-300 text-orange-800",
                    )}
                  >
                    Clear
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-20">
            <div
              className={cn(
                "animate-spin rounded-full h-12 w-12 border-b-2",
                theme === "dark" ? "border-orange-500" : "border-orange-600",
              )}
            />
          </div>
        )}

        {/* Table Grid */}
        {!isLoading && tables && tables.length > 0 && (
          <div className="animate-fade-in-up" style={{ animationDelay: "400ms" }}>
            <TableGrid tables={tables} selectedTable={selectedTable} onTableSelect={handleTableSelect} />
          </div>
        )}

        {/* Empty State */}
        {!isLoading && (!tables || tables.length === 0) && (
          <div
            className={cn("text-center py-20 animate-fade-in-up", theme === "dark" ? "text-white" : "text-gray-900")}
          >
            <div className="text-6xl mb-4">🍽️</div>
            <h3 className="text-xl font-semibold mb-2">No Tables Found</h3>
            <p className={theme === "dark" ? "text-gray-400" : "text-gray-700"}>
              There are no tables available in this restaurant yet
            </p>
          </div>
        )}
      </div>

      {/* Booking Modal - Only render when we have a valid restaurant ID */}
      {currentRestaurant?.id && (
        <TableBookingModal
          resId={currentRestaurant.id}
          isOpen={isBookingModalOpen}
          onClose={handleCloseBookingModal}
          tableId={selectedTable}
          tableSeats={selectedTableData?.seats}
        />
      )}
    </div>
  )
}
