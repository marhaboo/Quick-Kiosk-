"use client"

import { cn } from "@/shared/utils/cn"

interface FloorTabsProps {
  selectedFloor: number
  onFloorChange: (floor: number) => void
  floors: number[]
}

export function FloorTabs({ selectedFloor, onFloorChange, floors }: FloorTabsProps) {
  return (
    <div className="flex gap-2 mb-8">
      {floors.map((floor) => (
        <button
          key={floor}
          onClick={() => onFloorChange(floor)}
          className={cn(
            "px-4 py-2 rounded-xl font-medium transition-all duration-200",
            selectedFloor === floor
              ? "bg-orange-500 text-white shadow-lg shadow-orange-500/20"
              : "bg-[#2A2730] text-gray-300 hover:text-white hover:bg-[#2A2730]/80 border border-[#3D3A46]",
          )}
        >
          {floor}-й этаж
        </button>
      ))}
    </div>
  )
}
