"use client"

import { Button } from "@/shared/ui/button"
import { Card } from "@/shared/ui/card"
import { useTheme } from "next-themes"
import { cn } from "@/shared/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle, Clock, Truck, Calendar, X, Sparkles } from "lucide-react"
import { useEffect, useState } from "react"

interface SuccessOrderProps {
  orderType: "Pickup" | "Delivery" | "AtTable"
  orderNumber?: string
  estimatedTime?: string
  onClose: () => void
}

export function SuccessOrder({ orderType, orderNumber = "ORD-2024-001", estimatedTime, onClose }: SuccessOrderProps) {
  const { theme } = useTheme()
  const [showConfetti, setShowConfetti] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 3000)
    return () => clearTimeout(timer)
  }, [])

  const getOrderTypeConfig = () => {
    switch (orderType) {
      case "Pickup":
        return {
          icon: Clock,
          title: "Order Confirmed!",
          subtitle: "Ready for pickup",
          message: "Your order will be ready in 15-20 minutes",
          time: estimatedTime || "15-20 min",
          color: "text-orange-400",
          bgColor: "bg-orange-500/20",
          borderColor: "border-orange-500/30",
        }
      case "Delivery":
        return {
          icon: Truck,
          title: "Order Confirmed!",
          subtitle: "On the way",
          message: "Your order will be delivered in 30-45 minutes",
          time: estimatedTime || "30-45 min",
          color: "text-blue-400",
          bgColor: "bg-blue-500/20",
          borderColor: "border-blue-500/30",
        }
      case "AtTable":
        return {
          icon: Calendar,
          title: "Table Reserved!",
          subtitle: "Reservation confirmed",
          message: "Your table is reserved for the specified time",
          time: estimatedTime || "As scheduled",
          color: "text-green-400",
          bgColor: "bg-green-500/20",
          borderColor: "border-green-500/30",
        }
    }
  }

  const config = getOrderTypeConfig()
  const IconComponent = config.icon

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={cn(
          "fixed inset-0 z-50 flex items-center justify-center p-6 backdrop-blur-sm",
          theme === "dark" ? "bg-black/60" : "bg-gray-900/20",
        )}
        onClick={onClose}
      >
        {/* Confetti Effect */}
        {showConfetti && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-gradient-to-r from-orange-400 to-pink-400 rounded-full"
                initial={{
                  x: Math.random() * window.innerWidth,
                  y: -10,
                  rotate: 0,
                  scale: Math.random() * 0.5 + 0.5,
                }}
                animate={{
                  y: window.innerHeight + 10,
                  rotate: 360,
                  transition: {
                    duration: Math.random() * 2 + 2,
                    ease: "linear",
                  },
                }}
              />
            ))}
          </div>
        )}

        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 20 }}
          transition={{ type: "spring", duration: 0.5 }}
          onClick={(e) => e.stopPropagation()}
        >
          <Card
            className={cn(
              "rounded-3xl p-8 text-center max-w-md w-full relative overflow-hidden",
              theme === "dark"
                ? "bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] border border-[#333333] shadow-2xl"
                : "bg-gradient-to-br from-white to-gray-50 border border-gray-200 shadow-2xl",
            )}
          >
            {/* Close Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className={cn(
                "absolute top-4 right-4 w-8 h-8 p-0 rounded-full",
                theme === "dark" ? "hover:bg-gray-800 text-gray-400" : "hover:bg-gray-100 text-gray-600",
              )}
            >
              <X className="w-4 h-4" />
            </Button>

            {/* Animated Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                className="w-full h-full"
              >
                <Sparkles className="w-full h-full" />
              </motion.div>
            </div>

            {/* Success Icon with Animation */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className={cn(
                "w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 relative",
                config.bgColor,
              )}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4, type: "spring", stiffness: 300 }}
              >
                <CheckCircle className="w-10 h-10 text-green-400 absolute" />
              </motion.div>
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className={cn(
                  "w-6 h-6 absolute bottom-1 right-1 rounded-full flex items-center justify-center",
                  config.bgColor,
                )}
              >
                <IconComponent className={cn("w-4 h-4", config.color)} />
              </motion.div>

              {/* Pulse Effect */}
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                className={cn("absolute inset-0 rounded-full", config.bgColor)}
              />
            </motion.div>

            {/* Title with Animation */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className={cn("text-3xl font-bold mb-2", theme === "dark" ? "text-white" : "text-gray-900")}
            >
              {config.title}
            </motion.h2>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className={cn("text-lg font-medium mb-4", config.color)}
            >
              {config.subtitle}
            </motion.p>

            {/* Order Number */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className={cn(
                "inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 border",
                theme === "dark"
                  ? "bg-gray-800/50 border-gray-700 text-gray-300"
                  : "bg-gray-100/50 border-gray-200 text-gray-700",
              )}
            >
              <span className="text-sm font-medium">Order #</span>
              <span className="text-sm font-bold">{orderNumber}</span>
            </motion.div>

            {/* Message */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className={cn("text-base mb-2", theme === "dark" ? "text-gray-300" : "text-gray-700")}
            >
              {config.message}
            </motion.p>

            {/* Estimated Time */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className={cn(
                "inline-flex items-center gap-2 px-3 py-1 rounded-full mb-8",
                config.bgColor,
                config.borderColor,
                "border",
              )}
            >
              <Clock className={cn("w-4 h-4", config.color)} />
              <span className={cn("text-sm font-medium", config.color)}>{config.time}</span>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col gap-3"
            >
              <Button
                onClick={onClose}
                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Place New Order
              </Button>

              <Button
                variant="outline"
                onClick={onClose}
                className={cn(
                  "px-6 py-2 rounded-xl font-medium transition-all duration-200",
                  theme === "dark"
                    ? "border-gray-600 text-gray-300 hover:bg-gray-800 hover:border-gray-500"
                    : "border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400",
                )}
              >
                Track Order
              </Button>
            </motion.div>

            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 via-pink-400 to-purple-400" />

            {/* Floating Particles */}
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className={cn("absolute w-1 h-1 rounded-full", config.color.replace("text-", "bg-"))}
                style={{
                  left: `${20 + i * 15}%`,
                  top: `${10 + i * 5}%`,
                }}
                animate={{
                  y: [-5, 5, -5],
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                  duration: 2 + i * 0.5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />
            ))}
          </Card>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
