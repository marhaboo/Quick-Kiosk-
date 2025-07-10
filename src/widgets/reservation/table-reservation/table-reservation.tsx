"use client"

import { FloorTabs } from "@/features/reservation/floor-tabs/floor-tabs"
import { ReservationHeader } from "@/features/reservation/reservation-header/reservation-table"
import { TableGrid } from "@/features/reservation/table-grid/table-grid"
import { TableStatusLegend } from "@/features/reservation/table-status-legend/table-status-legend"
import { useState } from "react"


export interface Table {
  id: string
  number: string
  status: "available" | "dine-in" | "reserved" | "cleaning"
  seats: number
  shape: "round" | "rectangle" | "square"
  floor: number
  position: { x: number; y: number }
}

const mockTables: Table[] = [
  // 1-й этаж
  { id: "t1", number: "T7", status: "available", seats: 2, shape: "square", floor: 1, position: { x: 1, y: 1 } },
  { id: "t2", number: "T7", status: "reserved", seats: 8, shape: "rectangle", floor: 1, position: { x: 2, y: 1 } },
  { id: "t3", number: "T7", status: "available", seats: 2, shape: "square", floor: 1, position: { x: 3, y: 1 } },
  { id: "t4", number: "T7", status: "available", seats: 6, shape: "rectangle", floor: 1, position: { x: 4, y: 1 } },
  { id: "t5", number: "T7", status: "dine-in", seats: 2, shape: "square", floor: 1, position: { x: 5, y: 1 } },

  { id: "t6", number: "T7", status: "dine-in", seats: 2, shape: "square", floor: 1, position: { x: 1, y: 2 } },
  { id: "t7", number: "T7", status: "available", seats: 4, shape: "square", floor: 1, position: { x: 2, y: 2 } },
  { id: "t8", number: "T7", status: "reserved", seats: 2, shape: "square", floor: 1, position: { x: 3, y: 2 } },
  { id: "t9", number: "T7", status: "dine-in", seats: 4, shape: "square", floor: 1, position: { x: 4, y: 2 } },
  { id: "t10", number: "T7", status: "reserved", seats: 2, shape: "square", floor: 1, position: { x: 5, y: 2 } },

  { id: "t11", number: "T7", status: "reserved", seats: 2, shape: "square", floor: 1, position: { x: 1, y: 3 } },
  { id: "t12", number: "T7", status: "cleaning", seats: 8, shape: "rectangle", floor: 1, position: { x: 2, y: 3 } },
  { id: "t13", number: "T7", status: "dine-in", seats: 2, shape: "square", floor: 1, position: { x: 3, y: 3 } },
  { id: "t14", number: "T7", status: "available", seats: 2, shape: "square", floor: 1, position: { x: 4, y: 3 } },
  { id: "t15", number: "T7", status: "reserved", seats: 6, shape: "rectangle", floor: 1, position: { x: 5, y: 3 } },
]

export function TableReservation() {
  const [selectedFloor, setSelectedFloor] = useState(1)
  const [selectedTable, setSelectedTable] = useState<string | null>(null)

  const currentFloorTables = mockTables.filter((table) => table.floor === selectedFloor)

  const statusCounts = {
    available: currentFloorTables.filter((t) => t.status === "available").length,
    "dine-in": currentFloorTables.filter((t) => t.status === "dine-in").length,
    reserved: currentFloorTables.filter((t) => t.status === "reserved").length,
    cleaning: currentFloorTables.filter((t) => t.status === "cleaning").length,
  }

  const handleTableSelect = (tableId: string) => {
    const table = currentFloorTables.find((t) => t.id === tableId)
    if (table?.status === "available") {
      setSelectedTable(tableId)
    }
  }

  return (
    <div className="p-6 min-h-screen bg-[#0F0F0F]">
      {/* Заголовок */}
      <ReservationHeader />

      {/* Статистика столиков */}
      <TableStatusLegend statusCounts={statusCounts} />

      {/* Вкладки этажей */}
      <FloorTabs selectedFloor={selectedFloor} onFloorChange={setSelectedFloor} floors={[1, 2, 3]} />

      {/* Сетка столиков */}
      <TableGrid tables={currentFloorTables} selectedTable={selectedTable} onTableSelect={handleTableSelect} />
    </div>
  )
}
