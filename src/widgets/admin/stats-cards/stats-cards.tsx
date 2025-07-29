"use client"

import { RootState } from "@/app/store/store"
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card"
import { Store, Briefcase, Users } from "lucide-react"
import { useSelector } from "react-redux"

interface StatsCardsProps {
  isLoading?: boolean
}

function StatCardSkeleton() {
  return (
    <Card className="border border-[#333333] bg-[#1a1a1a] animate-pulse">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="h-4 bg-gray-700 rounded w-24" />
        <div className="h-4 w-4 bg-gray-700 rounded" />
      </CardHeader>
      <CardContent>
        <div className="h-8 bg-gray-700 rounded w-16 mb-2" />
        <div className="h-3 bg-gray-700 rounded w-20" />
      </CardContent>
    </Card>
  )
}

export default function StatsCards({ isLoading }: StatsCardsProps) {
  const { data } = useSelector((state: RootState) => state.home)

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {Array.from({ length: 4 }).map((_, index) => (
          <StatCardSkeleton key={index} />
        ))}
      </div>
    )
  }

  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const resLength = data.length
  const thisMonthRes = data.filter(item => {
    const created = new Date(item.createdAt);
    return created.getMonth() === currentMonth && created.getFullYear() === currentYear;
  }).length;

  const stats = [
    {
      title: "Всего ресторанов",
      value: resLength,
      change: thisMonthRes > 0 ? `+${thisMonthRes} за этот месяц` : "Нет новых за месяц",
      icon: Store,
      color: "text-blue-400",
    },
    {
      title: "Заявки на работу",
      value: "156",
      change: "+12 за неделю",
      icon: Briefcase,
      color: "text-green-400",
    },
    {
      title: "Zakaz",
      value: "342",
      change: "+18 за месяц",
      icon: Users,
      color: "text-purple-400",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => {
        const Icon = stat.icon
        return (
          <Card
            key={index}
            className="border border-[#333333] bg-[#1a1a1a] hover:border-orange-500/30 transition-all duration-300 group animate-fade-in-up glass-effect"
            style={{ animationDelay: `${index * 200}ms` }}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">{stat.title}</CardTitle>
              <Icon
                className={`h-4 w-4 ${stat.color} group-hover:scale-110 transition-all duration-300 group-hover:drop-shadow-lg`}
              />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white mb-1 group-hover:text-shadow-glow transition-all duration-300">
                {stat.value}
              </div>
              <p className="text-xs text-gray-500">{stat.change}</p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  ) }