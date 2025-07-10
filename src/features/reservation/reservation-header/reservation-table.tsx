"use client"

import { ArrowLeft } from "lucide-react"
import { Button } from "@/shared/ui/button"

export function ReservationHeader() {
  return (
    <div className="flex items-center gap-4 mb-8">
      <Button
        variant="ghost"
        size="sm"
        className="w-10 h-10 rounded-full bg-[#2A2730] border border-[#3D3A46] text-gray-300 hover:text-white hover:bg-[#2A2730]/80"
      >
        <ArrowLeft className="w-5 h-5" />
      </Button>

      <h1 className="text-2xl font-bold text-white">Выбор столика</h1>
    </div>
  )
}
