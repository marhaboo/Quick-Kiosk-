"use client"

import { useTheme } from "next-themes" // Import useTheme
import { cn } from "@/shared/lib/utils" // Import cn

interface ProgressStepsProps {
  currentStep: number
}

export function ProgressSteps({ currentStep }: ProgressStepsProps) {
  const { theme } = useTheme() // Get current theme

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        {[1, 2, 3].map((step) => (
          <div key={step} className="flex items-center">
            <div
              className={cn(
                `w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold`,
                step <= currentStep
                  ? "bg-orange-500 text-white"
                  : theme === "dark"
                    ? "bg-[#2A2730] text-gray-400 border border-[#3D3A46]"
                    : "bg-gray-200 text-gray-700 border border-gray-300",
              )}
            >
              {step}
            </div>
            {step < 3 && ( // Changed from step < 4 to step < 3 as there are only 3 steps
              <div
                className={cn(
                  `w-16 h-1 mx-2`,
                  step < currentStep ? "bg-orange-500" : theme === "dark" ? "bg-[#2A2730]" : "bg-gray-300",
                )}
              />
            )}
          </div>
        ))}
      </div>
      <div className={cn("flex justify-between text-sm", theme === "dark" ? "text-gray-400" : "text-gray-700")}>
        <span>Основная информация</span>
        <span>Время работы</span>
        <span>Контакты владельца</span>
      </div>
    </div>
  )
}
