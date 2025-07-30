"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/shared/ui/button"
import { useDispatch } from "react-redux"
import type { AppDispatch } from "@/app/store/store"
import { postUser } from "@/entities/auth/api/api"
import type { User } from "@/entities/user/models/types"
import { X, UserPlus } from "lucide-react"

interface AddUserModalProps {
  onClose: () => void
  onSubmit?: (data: User) => void
}

const AddUserModal: React.FC<AddUserModalProps> = ({ onClose }) => {
  const [form, setForm] = useState<User>({
    username: "",
    fullName: "",
    email: "",
    imageUrl: "",
    phoneNumber: "",
    role: "Cashier",
    password: "",
  })
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const dispatch: AppDispatch = useDispatch()

  // Validation logic
  const validate = () => {
    const newErrors: { [key: string]: string } = {}
    if (!form.fullName.trim() || !form.fullName.includes(" ")) {
      newErrors.fullName = "Full name must contain a space (first and last name)"
    }
    if (!form.password || form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    }
    if (/^\d+$/.test(form.password)) {
      newErrors.password = "Password cannot consist only of numbers"
    }
    return newErrors
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const validationErrors = validate()
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length > 0) return

    setIsSubmitting(true)
    try {
      await dispatch(postUser(form)).unwrap()
      onClose()
    } catch {
      setErrors({ submit: "Error adding user" })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-[#18181b]/90 to-[#23272f]/90 animate-fade-in-up">
      <div className="rounded-2xl shadow-2xl p-0 w-full max-w-lg animate-fade-in-up bg-black/60 border border-white/20 backdrop-blur-2xl flex flex-col items-center justify-center">
        <form
          autoComplete="off"
          className="flex flex-col max-w-[400px] mx-auto bg-black/30 backdrop-blur-lg border border-white/20 shadow p-8 items-center justify-center rounded-2xl w-full text-white"
          onSubmit={handleSubmit}
        >
          <div className="flex items-center justify-between w-full mb-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 gradient-orange rounded-lg">
                <UserPlus className="h-5 w-5 text-white" />
              </div>
              <p className="text-xl font-bold">Add New User</p>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-gray-400 hover:text-white"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <input
            className="mb-2 px-4 w-full py-2 rounded-xl bg-white/10 focus:bg-white/20 border border-white/20 outline-none text-white placeholder:text-white/40 transition-colors duration-300"
            placeholder="Username"
            type="text"
            value={form.username}
            onChange={(e) => setForm((f) => ({ ...f, username: e.target.value }))}
            required
          />

          <input
            className={`mb-2 px-4 w-full py-2 rounded-xl bg-white/10 focus:bg-white/20 border border-white/20 outline-none text-white placeholder:text-white/40 transition-colors duration-300 ${
              errors.fullName ? "border-red-500" : ""
            }`}
            placeholder="Full Name"
            type="text"
            value={form.fullName}
            onChange={(e) => setForm((f) => ({ ...f, fullName: e.target.value }))}
            required
          />
          {errors.fullName && <div className="text-red-400 text-xs mb-2 w-full">{errors.fullName}</div>}

          <input
            className="mb-2 px-4 w-full py-2 rounded-xl bg-white/10 focus:bg-white/20 border border-white/20 outline-none text-white placeholder:text-white/40 transition-colors duration-300"
            placeholder="Email"
            type="email"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            required
          />

          <input
            className="mb-2 px-4 w-full py-2 rounded-xl bg-white/10 focus:bg-white/20 border border-white/20 outline-none text-white placeholder:text-white/40 transition-colors duration-300"
            placeholder="Image URL (optional)"
            type="text"
            value={form.imageUrl}
            onChange={(e) => setForm((f) => ({ ...f, imageUrl: e.target.value }))}
          />

          <input
            className="mb-2 px-4 w-full py-2 rounded-xl bg-white/10 focus:bg-white/20 border border-white/20 outline-none text-white placeholder:text-white/40 transition-colors duration-300"
            placeholder="Phone Number"
            type="text"
            value={form.phoneNumber}
            onChange={(e) => setForm((f) => ({ ...f, phoneNumber: e.target.value }))}
          />

          <div className="mb-2 w-full relative">
            <select
              className="w-full px-4 py-2 rounded-xl bg-white/10 focus:bg-white/20 border border-white/20 outline-none text-white transition-colors duration-300 appearance-none pr-8"
              value={form.role}
              onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))}
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg width='16' height='16' fill='white' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M4 6l4 4 4-4'/%3E%3C/svg%3E\")",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 0.75rem center",
                backgroundSize: "1.25em 1.25em",
              }}
            >
              <option value="Cashier" className="text-black">
                Owner
              </option>
              <option value="Admin" className="text-black">
                Super Admin
              </option>
            </select>
          </div>

          <input
            className={`mb-2 px-4 w-full py-2 rounded-xl bg-white/10 focus:bg-white/20 border border-white/20 outline-none text-white placeholder:text-white/40 transition-colors duration-300 ${
              errors.password ? "border-red-500" : ""
            }`}
            placeholder="Password"
            type="password"
            value={form.password}
            onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
            required
          />
          {errors.password && <div className="text-red-400 text-xs mb-2 w-full">{errors.password}</div>}

          {errors.submit && <div className="text-red-400 text-xs mb-2 w-full">{errors.submit}</div>}

          <div className="flex gap-4 w-full justify-center mt-2">
            <Button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-600 hover:bg-gray-700 text-white transition-all duration-200"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 gradient-orange text-white transition-all duration-200"
            >
              {isSubmitting ? "Adding..." : "Add User"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddUserModal
