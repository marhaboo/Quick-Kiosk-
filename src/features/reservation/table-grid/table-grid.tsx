"use client"

import { cn } from "@/shared/utils/cn"
import { Table } from "@/widgets/reservation/table-reservation/table-reservation"


interface TableGridProps {
  tables: Table[]
  selectedTable: string | null
  onTableSelect: (tableId: string) => void
}

export function TableGrid({ tables, selectedTable, onTableSelect }: TableGridProps) {
  const getTableStatusColor = (status: Table["status"], isSelected: boolean) => {
    if (isSelected) return "bg-orange-500 border-orange-400"

    switch (status) {
      case "available":
        return "bg-[#2A2730] border-[#3D3A46] hover:border-green-500/50"
      case "dine-in":
        return "bg-blue-500/20 border-blue-500/50"
      case "reserved":
        return "bg-red-500/20 border-red-500/50"
      case "cleaning":
        return "bg-yellow-500/20 border-yellow-500/50"
      default:
        return "bg-[#2A2730] border-[#3D3A46]"
    }
  }

  const getTableShape = (shape: Table["shape"], seats: number) => {
    switch (shape) {
      case "round":
        return "rounded-full"
      case "rectangle":
        return seats > 4 ? "rounded-2xl w-24 h-16" : "rounded-2xl w-20 h-12"
      case "square":
        return "rounded-2xl w-16 h-16"
      default:
        return "rounded-2xl w-16 h-16"
    }
  }

  return (
    <div className="grid grid-cols-5 gap-8 p-8 bg-[#1A1A1A] rounded-3xl border border-[#3D3A46] min-h-[500px]">
      {tables.map((table) => {
        const isSelected = selectedTable === table.id
        const isClickable = table.status === "available"

        return (
          <div
            key={table.id}
            className="flex items-center justify-center"
            style={{
              gridColumn: table.position.x,
              gridRow: table.position.y,
            }}
          >
            <button
              onClick={() => isClickable && onTableSelect(table.id)}
              disabled={!isClickable}
              className={cn(
                "flex items-center justify-center border-2 transition-all duration-200 relative",
                getTableShape(table.shape, table.seats),
                getTableStatusColor(table.status, isSelected),
                isClickable ? "cursor-pointer hover:scale-105" : "cursor-not-allowed opacity-75",
              )}
            >
              <span className="text-white font-bold text-sm">{table.number}</span>

              {/* Стулья вокруг столика */}
              {table.shape === "rectangle" && table.seats > 4 && (
                <>
                  {/* Стулья сверху и снизу */}
                  <div className="absolute -top-3 left-2 right-2 flex justify-between">
                    <div className="w-4 h-2 bg-[#3D3A46] rounded-sm"></div>
                    <div className="w-4 h-2 bg-[#3D3A46] rounded-sm"></div>
                    <div className="w-4 h-2 bg-[#3D3A46] rounded-sm"></div>
                  </div>
                  <div className="absolute -bottom-3 left-2 right-2 flex justify-between">
                    <div className="w-4 h-2 bg-[#3D3A46] rounded-sm"></div>
                    <div className="w-4 h-2 bg-[#3D3A46] rounded-sm"></div>
                    <div className="w-4 h-2 bg-[#3D3A46] rounded-sm"></div>
                  </div>
                </>
              )}

              {table.shape === "square" && (
                <>
                  {/* Стулья по бокам */}
                  <div className="absolute -left-3 top-1/2 transform -translate-y-1/2 w-2 h-4 bg-[#3D3A46] rounded-sm"></div>
                  <div className="absolute -right-3 top-1/2 transform -translate-y-1/2 w-2 h-4 bg-[#3D3A46] rounded-sm"></div>
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-4 h-2 bg-[#3D3A46] rounded-sm"></div>
                  <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-4 h-2 bg-[#3D3A46] rounded-sm"></div>
                </>
              )}
            </button>
          </div>
        )
      })}
    </div>
  )
}
