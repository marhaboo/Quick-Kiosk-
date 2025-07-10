"use client"

interface TableStatusLegendProps {
  statusCounts: {
    available: number
    "dine-in": number
    reserved: number
    cleaning: number
  }
}

export function TableStatusLegend({ statusCounts }: TableStatusLegendProps) {
  const statusItems = [
    { key: "available", label: "Доступно", count: statusCounts.available, color: "bg-green-500" },
    { key: "dine-in", label: "Занято", count: statusCounts["dine-in"], color: "bg-blue-500" },
    { key: "reserved", label: "Забронировано", count: statusCounts.reserved, color: "bg-red-500" },
    { key: "cleaning", label: "Уборка", count: statusCounts.cleaning, color: "bg-yellow-500" },
  ]

  return (
    <div className="flex flex-wrap items-center gap-6 mb-6 p-4 bg-[#1A1A1A] rounded-2xl border border-[#3D3A46]">
      {statusItems.map((item) => (
        <div key={item.key} className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
          <span className="text-gray-300 text-sm font-medium">
            {item.label}: <span className="text-white font-bold">{item.count}</span>
          </span>
        </div>
      ))}
    </div>
  )
}
