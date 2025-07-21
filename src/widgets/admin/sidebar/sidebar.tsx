"use client"

import { useState } from "react"
import { BarChart3, Users, Store, Briefcase, TableIcon, MenuIcon, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/shared/ui/button"
import { cn } from "@/shared/lib/utils"

interface SidebarProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

const menuItems = [
  { id: "dashboard", label: "Дашборд", icon: BarChart3 },
  { id: "restaurants", label: "Запросы ресторанов", icon: Store },
  { id: "jobs", label: "Заявки на работу", icon: Briefcase },
  { id: "tables", label: "Управление столиками", icon: TableIcon },
  { id: "menu", label: "Управление меню", icon: MenuIcon },
  { id: "users", label: "Управление пользователями", icon: Users },
]

function SidebarSkeleton() {
  return (
    <div className="w-64 bg-[#1a1a1a] border-r border-[#333333] animate-pulse">
      <div className="p-6">
        <div className="h-8 bg-gray-700 rounded mb-2" />
        <div className="h-4 bg-gray-700 rounded w-3/4" />
      </div>
      <nav className="mt-6">
        <div className="px-6 space-y-2">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="h-10 bg-gray-700 rounded-lg" />
          ))}
        </div>
      </nav>
    </div>
  )
}

export default function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isLoading] = useState(false)

  if (isLoading) {
    return <SidebarSkeleton />
  }

  return (
    <div
      className={cn(
        "bg-[#1a1a1a] border-r border-[#333333] transition-all duration-300 ease-in-out",
        isCollapsed ? "w-16" : "w-64",
      )}
    >
      <div className="p-6">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="animate-fade-in-up">
              <h1 className="text-2xl font-bold text-white text-shadow-glow">Админ Панель</h1>
              <p className="text-gray-400">Управление рестораном</p>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-gray-400 hover:text-white hover:bg-gray-700/50 transition-all duration-200"
          >
            {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      <nav className="mt-6">
        <div className="px-6 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = activeTab === item.id

            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={cn(
                  "w-full flex items-center px-4 py-3 text-left rounded-xl transition-all duration-300 group",
                  isActive
                    ? "gradient-orange text-white shadow-lg pulse-orange"
                    : "text-gray-400 hover:text-white hover:bg-gray-700/50 glass-effect border border-transparent hover:border-gray-600/30",
                  isCollapsed && "justify-center",
                )}
              >
                <Icon
                  className={cn(
                    "h-5 w-5 transition-all duration-200",
                    isActive && "text-orange-400",
                    !isCollapsed && "mr-3",
                  )}
                />
                {!isCollapsed && <span className="animate-fade-in-up font-medium">{item.label}</span>}
              </button>
            )
          })}
        </div>
      </nav>
    </div>
  )
}
