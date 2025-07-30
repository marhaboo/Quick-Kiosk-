"use client"
import { useState } from "react"
import {
  BarChart3,
  Users,
  Store,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  Settings,
  Shield,
  FileText,
  Table,
  ShoppingCart,
  ChefHat,
  User,
  DollarSign,
  CreditCard,
} from "lucide-react"
import { Button } from "@/shared/ui/button"
import { cn } from "@/shared/lib/utils"

interface SidebarProps {
  activeTab: string
  onTabChange: (tab: string) => void
  userRole: "super-admin" | "restaurant-owner" | "cashier" | undefined
  userName: string | null
}

// Menu items for Super Admin
const superAdminMenuItems = [
  { id: "dashboard", label: "Dashboard Overview", icon: BarChart3 },
  { id: "restaurants", label: "Restaurant Requests", icon: Store },
  { id: "jobs", label: "Job Applications", icon: Briefcase },
  { id: "users", label: "User Management", icon: Users },
  { id: "settings", label: "System Settings", icon: Settings },
]

// Menu items for Restaurant Owner
const restaurantOwnerMenuItems = [
  { id: "dashboard", label: "Restaurant Dashboard", icon: BarChart3 },
  { id: "menu", label: "Menu Management", icon: ChefHat },
  { id: "tables", label: "Table Management", icon: Table },
  { id: "orders", label: "Order Management", icon: ShoppingCart },
  { id: "staff", label: "Staff Management", icon: Users },
  { id: "analytics", label: "Sales Analytics", icon: FileText },
  { id: "settings", label: "Restaurant Settings", icon: Settings },
]

// Menu items for Cashier
const cashierMenuItems = [
  { id: "dashboard", label: "Cashier Dashboard", icon: BarChart3 },
  { id: "orders", label: "Order Management", icon: ShoppingCart },
  { id: "payments", label: "Payment Processing", icon: CreditCard },
  { id: "profile", label: "Profile Settings", icon: User },
]

export default function Sidebar({ activeTab, onTabChange, userRole, userName }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  // Select menu items and config based on user role
  const getMenuConfig = () => {
    switch (userRole) {
      case "super-admin":
        return {
          menuItems: superAdminMenuItems,
          roleTitle: "Super Admin",
          roleSubtitle: "System Management",
          roleIcon: Shield,
          roleInitials: "SA",
        }
      case "restaurant-owner":
        return {
          menuItems: restaurantOwnerMenuItems,
          roleTitle: "Restaurant Management",
          roleSubtitle: "Owner Dashboard",
          roleIcon: Store,
          roleInitials: "RO",
        }
      case "cashier":
        return {
          menuItems: cashierMenuItems,
          roleTitle: "Cashier Panel",
          roleSubtitle: "Payment & Orders",
          roleIcon: DollarSign,
          roleInitials: "CA",
        }
      default:
        return {
          menuItems: [],
          roleTitle: "Loading...",
          roleSubtitle: "Determining role...",
          roleIcon: BarChart3,
          roleInitials: "...",
        }
    }
  }

  const { menuItems, roleTitle, roleSubtitle, roleIcon: RoleIcon, roleInitials } = getMenuConfig()

  return (
    <div
      className={cn(
        "bg-[#1a1a1a] border-r border-[#333333] transition-all duration-300 ease-in-out h-screen flex flex-col",
        isCollapsed ? "w-16 items-center" : "w-80",
      )}
    >
      {/* Header */}
      <div className="p-6 border-b border-[#333333]">
        <div className="flex items-center">
          {!isCollapsed && (
            <div className="animate-fade-in-up flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <div className="p-2 gradient-orange rounded-lg">
                  <RoleIcon className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white">{roleTitle}</h1>
                  <p className="text-sm text-gray-400">{roleSubtitle}</p>
                </div>
              </div>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-gray-400  hover:text-white hover:bg-gray-700/50 transition-all duration-200 rounded-lg"
            type="button"
          >
            {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1">
        {menuItems.map((item, index) => {
          const Icon = item.icon
          const isActive = activeTab === item.id
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={cn(
                "w-full flex items-center px-3 py-3 text-left rounded-xl transition-all duration-200 group relative animate-fade-in-up",
                isActive
                  ? "bg-gradient-to-r from-orange-500 to-yellow-500 text-white shadow-md"
                  : "text-gray-400 hover:text-white hover:bg-gray-700/50 border border-transparent hover:border-gray-600/30",
                isCollapsed && "justify-center",
              )}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <Icon
                className={cn(
                  "h-5 w-5 transition-all duration-200 flex-shrink-0",
                  isActive ? "text-white" : "text-gray-400 group-hover:text-white",
                  !isCollapsed && "mr-3",
                )}
              />
              {!isCollapsed && <span className="">{item.label}</span>}
            </button>
          )
        })}
      </nav>

      {/* Footer */}
      {!isCollapsed && (
        <div className="p-6 border-t border-[#333333] animate-fade-in-up">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 gradient-orange rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-white">{roleInitials}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{userName}</p>
              <p className="text-xs text-gray-400 truncate">
                {userRole === "super-admin" && "Full system access"}
                {userRole === "restaurant-owner" && "Restaurant management"}
                {userRole === "cashier" && "Payment & order processing"}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
