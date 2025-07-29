"use client"

import React, { useState } from "react"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/shared/ui/button"
import Link from "next/link"
import { BasicInfoStep } from "@/features/add-restaurant/basic-info-step/basic-info-step"
import { ProgressSteps } from "@/features/add-restaurant/progress-steps/progress-steps"
import { WorkingHoursStep } from "@/features/add-restaurant/working-hours-step/working-hours-step"
import { OwnerContactsStep } from "@/features/add-restaurant/owner-contacts/owner-contacts"
import { SuccessPage } from "@/features/add-restaurant/success-page/success-page"
import { RestaurantFormData } from "@/shared/types/restaurant-form"
import { useDispatch } from "react-redux"
import { AppDispatch } from "@/app/store/store"
import { postResRequest } from "@/entities/res-request/api/api"
import { PostRestaurant, WorkingHour } from "@/entities/res-request/models/types"
import { AnimatePresence, motion } from "framer-motion"

const initialFormData: RestaurantFormData = {
  name: "",
  description: "",
  address: "",
  phone: "",
  email: "",
  website: "",
  cuisine: "",
  priceRange: "",
  capacity: "",
  openingHours: {
    monday: { open: "09:00", close: "22:00", closed: false },
    tuesday: { open: "09:00", close: "22:00", closed: false },
    wednesday: { open: "09:00", close: "22:00", closed: false },
    thursday: { open: "09:00", close: "22:00", closed: false },
    friday: { open: "09:00", close: "22:00", closed: false },
    saturday: { open: "09:00", close: "22:00", closed: false },
    sunday: { open: "09:00", close: "22:00", closed: false },
  },
  images: [],
  menu: null,
  ownerName: "",
  ownerPhone: "",
  ownerEmail: "",
}

const stepVariants = {
  initial: { opacity: 0, x: 100 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -100 },
}

export function AddRestaurantForm() {
  const [formData, setFormData] = useState<RestaurantFormData>(initialFormData)
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const dispatch: AppDispatch = useDispatch()

  const transformToPostRestaurant = (data: RestaurantFormData): PostRestaurant => {
    const days: Record<string, string> = {
      monday: "Monday",
      tuesday: "Tuesday",
      wednesday: "Wednesday",
      thursday: "Thursday",
      friday: "Friday",
      saturday: "Saturday",
      sunday: "Sunday",
    }

    const workingHours: WorkingHour[] = Object.entries(data.openingHours).map(
      ([key, value]) => ({
        dayOfWeek: days[key],
        isEnabled: !value.closed,
        from: value.closed ? "00:00:00" : `${value.open}:00`,
        to: value.closed ? "00:00:00" : `${value.close}:00`,
      })
    )

    return {
      Name: data.name,
      Description: data.description,
      Address: data.address,
      Phone: data.phone,
      Cuisine: data.cuisine,
      OwnerFullName: data.ownerName,
      OwnerEmail: data.ownerEmail,
      OwnerPhone: data.ownerPhone,
      CreatedAt: new Date().toISOString(),
      WorkingHours: workingHours,
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const payload = transformToPostRestaurant(formData)

    try {
      await dispatch(postResRequest(payload)).unwrap()
      setIsSubmitted(true)
    } catch (err) { 
      console.error("Ошибка отправки:", err)
    } finally {
      setIsSubmitting(false)
    }
  }

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 3))
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1))

  if (isSubmitted) return <SuccessPage />

  return (
    <div className="min-h-screen bg-[#0F0F0F] p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/">
            <Button
              variant="ghost"
              size="sm"
              className="w-10 h-10 rounded-full bg-[#2A2730] border border-[#3D3A46] text-gray-300 hover:text-white hover:bg-[#2A2730]/80"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-white">Добавить ресторан</h1>
            <p className="text-gray-400">Присоединяйтесь к нашей платформе</p>
          </div>
        </div>

        <ProgressSteps currentStep={currentStep} />

        <form onSubmit={handleSubmit}>
          <AnimatePresence mode="wait" initial={false}>
            {currentStep === 1 && (
              <motion.div
                key="step1"
                variants={stepVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.4 }}
              >
                <BasicInfoStep formData={formData} setFormData={setFormData} />
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div
                key="step2"
                variants={stepVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.4 }}
              >
                <WorkingHoursStep formData={formData} setFormData={setFormData} />
              </motion.div>
            )}

            {currentStep === 3 && (
              <motion.div
                key="step3"
                variants={stepVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.4 }}
              >
                <OwnerContactsStep formData={formData} setFormData={setFormData} />
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex justify-between items-center mt-8">
            {currentStep > 1 ? (
              <Button
                type="button"
                onClick={prevStep}
                variant="ghost"
                className="text-gray-300 hover:text-white hover:bg-[#2A2730] border border-[#3D3A46] px-6 py-2 rounded-xl"
              >
                Назад
              </Button>
            ) : (
              <div />
            )}

            {currentStep < 3 ? (
              <Button
                type="button"
                onClick={nextStep}
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-xl"
              >
                Далее
              </Button>
            ) : (
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold px-8 py-3 rounded-xl disabled:opacity-50"
              >
                {isSubmitting ? "Отправка..." : "Отправить заявку"}
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}
