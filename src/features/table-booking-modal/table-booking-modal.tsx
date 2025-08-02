"use client"

import type React from "react"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { motion, AnimatePresence } from "framer-motion"
import { X, Calendar, Users, Phone, User } from "lucide-react"
import { useTheme } from "next-themes"
import { cn } from "@/shared/lib/utils"
import type { AppDispatch } from "@/app/store/store"
import { reservTable } from "@/entities/reservation/api/api-reservation"

interface TableBookingModalProps {
  isOpen: boolean
  onClose: () => void
  tableId: number | null
  tableSeats?: number
  resId: number
}

// Use your existing Reservation interface
interface Reservation {
  tableId: number
  fullName: string
  phoneNumber: string
  bookingFrom: string
  bookingTo: string
  guests: number
}

type FormData = Omit<Reservation, "tableId">

type FormErrors = Partial<Record<keyof FormData, string>>

export function TableBookingModal({ isOpen, resId, onClose, tableId, tableSeats = 2 }: TableBookingModalProps) {
  const dispatch: AppDispatch = useDispatch()
  const { theme } = useTheme()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    phoneNumber: "",
    bookingFrom: "",
    bookingTo: "",
    guests: 1,
  })

  const [errors, setErrors] = useState<FormErrors>({})

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required"
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required"
    } else if (!/^\+?[\d\s-()]+$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Please enter a valid phone number"
    }

    if (!formData.bookingFrom) {
      newErrors.bookingFrom = "Start time is required"
    }

    if (!formData.bookingTo) {
      newErrors.bookingTo = "End time is required"
    }

    if (formData.bookingFrom && formData.bookingTo) {
      const fromDate = new Date(formData.bookingFrom)
      const toDate = new Date(formData.bookingTo)

      if (fromDate >= toDate) {
        newErrors.bookingTo = "End time must be after start time"
      }

      if (fromDate < new Date()) {
        newErrors.bookingFrom = "Booking time cannot be in the past"
      }
    }

    if (formData.guests < 1) {
      newErrors.guests = "At least 1 guest is required"
    } else if (formData.guests > tableSeats) {
      newErrors.guests = `Maximum ${tableSeats} guests for this table`
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!tableId || !validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      const bookingData: Reservation = {
        tableId,
        fullName: formData.fullName.trim(),
        phoneNumber: formData.phoneNumber.trim(),
        bookingFrom: new Date(formData.bookingFrom).toISOString(),
        bookingTo: new Date(formData.bookingTo).toISOString(),
        guests: formData.guests,
      }

      await dispatch(reservTable({ data: bookingData, resId }))

      // Reset form and close modal on success
      setFormData({
        fullName: "",
        phoneNumber: "",
        bookingFrom: "",
        bookingTo: "",
        guests: 1,
      })
      setErrors({})
      onClose()
    } catch (error) {
      console.error("Booking failed:", error)
      // You might want to show an error toast here
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: keyof FormData, value: string) => {
    if (field === "guests") {
      const numValue = Number.parseInt(value, 10)
      if (!isNaN(numValue)) {
        setFormData((prev) => ({ ...prev, [field]: numValue }))
      }
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }))
    }

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  // Get current date and time for min values
  const now = new Date()
  const minDateTime = now.toISOString().slice(0, 16)

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className={cn(
            "relative w-full max-w-md rounded-2xl border p-6 shadow-xl",
            theme === "dark" ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200",
          )}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className={cn("text-xl font-bold", theme === "dark" ? "text-white" : "text-gray-900")}>
              Book Table #{tableId}
            </h2>
            <button
              onClick={onClose}
              className={cn(
                "p-2 rounded-lg transition-colors",
                theme === "dark" ? "hover:bg-gray-800 text-gray-400" : "hover:bg-gray-100 text-gray-600",
              )}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <label
                className={cn("block text-sm font-medium mb-2", theme === "dark" ? "text-gray-200" : "text-gray-700")}
              >
                <User className="w-4 h-4 inline mr-2" />
                Full Name
              </label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => handleInputChange("fullName", e.target.value)}
                className={cn(
                  "w-full px-3 py-2 rounded-lg border transition-colors",
                  theme === "dark"
                    ? "bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-orange-500"
                    : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-orange-500",
                  errors.fullName && "border-red-500",
                )}
                placeholder="Enter your full name"
              />
              {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
            </div>

            {/* Phone Number */}
            <div>
              <label
                className={cn("block text-sm font-medium mb-2", theme === "dark" ? "text-gray-200" : "text-gray-700")}
              >
                <Phone className="w-4 h-4 inline mr-2" />
                Phone Number
              </label>
              <input
                type="tel"
                value={formData.phoneNumber}
                onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                className={cn(
                  "w-full px-3 py-2 rounded-lg border transition-colors",
                  theme === "dark"
                    ? "bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-orange-500"
                    : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-orange-500",
                  errors.phoneNumber && "border-red-500",
                )}
                placeholder="+992"
              />
              {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>}
            </div>

            {/* Booking From */}
            <div>
              <label
                className={cn("block text-sm font-medium mb-2", theme === "dark" ? "text-gray-200" : "text-gray-700")}
              >
                <Calendar className="w-4 h-4 inline mr-2" />
                Booking From
              </label>
              <input
                type="datetime-local"
                value={formData.bookingFrom}
                min={minDateTime}
                onChange={(e) => handleInputChange("bookingFrom", e.target.value)}
                className={cn(
                  "w-full px-3 py-2 rounded-lg border transition-colors",
                  theme === "dark"
                    ? "bg-gray-800 border-gray-600 text-white focus:border-orange-500"
                    : "bg-white border-gray-300 text-gray-900 focus:border-orange-500",
                  errors.bookingFrom && "border-red-500",
                )}
              />
              {errors.bookingFrom && <p className="text-red-500 text-sm mt-1">{errors.bookingFrom}</p>}
            </div>

            {/* Booking To */}
            <div>
              <label
                className={cn("block text-sm font-medium mb-2", theme === "dark" ? "text-gray-200" : "text-gray-700")}
              >
                <Calendar className="w-4 h-4 inline mr-2" />
                Booking To
              </label>
              <input
                type="datetime-local"
                value={formData.bookingTo}
                min={formData.bookingFrom || minDateTime}
                onChange={(e) => handleInputChange("bookingTo", e.target.value)}
                className={cn(
                  "w-full px-3 py-2 rounded-lg border transition-colors",
                  theme === "dark"
                    ? "bg-gray-800 border-gray-600 text-white focus:border-orange-500"
                    : "bg-white border-gray-300 text-gray-900 focus:border-orange-500",
                  errors.bookingTo && "border-red-500",
                )}
              />
              {errors.bookingTo && <p className="text-red-500 text-sm mt-1">{errors.bookingTo}</p>}
            </div>

            {/* Number of Guests */}
            <div>
              <label
                className={cn("block text-sm font-medium mb-2", theme === "dark" ? "text-gray-200" : "text-gray-700")}
              >
                <Users className="w-4 h-4 inline mr-2" />
                Number of Guests
              </label>
              <input
                type="number"
                min="1"
                max={tableSeats}
                value={formData.guests}
                onChange={(e) => handleInputChange("guests", e.target.value)}
                className={cn(
                  "w-full px-3 py-2 rounded-lg border transition-colors",
                  theme === "dark"
                    ? "bg-gray-800 border-gray-600 text-white focus:border-orange-500"
                    : "bg-white border-gray-300 text-gray-900 focus:border-orange-500",
                  errors.guests && "border-red-500",
                )}
              />
              {errors.guests && <p className="text-red-500 text-sm mt-1">{errors.guests}</p>}
              <p className={cn("text-xs mt-1", theme === "dark" ? "text-gray-400" : "text-gray-500")}>
                Maximum {tableSeats} guests for this table
              </p>
            </div>

            {/* Submit Button */}
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className={cn(
                  "flex-1 px-4 py-2 rounded-lg font-medium transition-colors",
                  theme === "dark"
                    ? "bg-gray-700 text-gray-200 hover:bg-gray-600"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300",
                )}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className={cn(
                  "flex-1 px-4 py-2 rounded-lg font-medium transition-colors",
                  "bg-orange-500 text-white hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed",
                )}
              >
                {isSubmitting ? "Booking..." : "Book Table"}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
