"use client"

import type { AppDispatch } from "@/app/store/store"
import type React from "react"


import { loginPost } from "@/app/entities/auth/api/api"
import PrimaryButton from "@/shared/primary-button/primary-button"
import { UtensilsCrossed } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useDispatch } from "react-redux"
import { useState } from "react"

const LoginPage = () => {
  const dispatch: AppDispatch = useDispatch()
  const router = useRouter()
  const [userName, setUserName] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setError("")
    setIsLoading(true)

    if (!userName.trim() || !password.trim()) {
      setError("Пожалуйста, заполните все поля")
      setIsLoading(false)
      return
    }

    try {
      const result = await dispatch(loginPost({ userName: userName.trim(), password }))

      console.log("Result:", result)

      if (result.meta.requestStatus === "fulfilled") {
        // Если запрос успешен — перенаправляем
        localStorage.setItem("isLoggedIn", "true")
        router.push("/admin")
      } else {
        // Если ошибка — показываем сообщение
        const errorMessage = result.payload as string
        setError(errorMessage || "Неверный логин или пароль")
      }
    } catch (err) {
      console.error("Login error:", err)
      setError("Произошла ошибка при входе. Попробуйте еще раз.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-[url('/images/bg-of-site.png')] bg-cover bg-center h-screen flex items-center justify-start px-10 md:px-15">
      <div className="flex flex-col items-center justify-evenly gap-6 max-w-[350px] w-full animate-fade-in-up">
        <Link
          href="/"
          className="flex items-center gap-3 group transition-all duration-300 hover:scale-105 animate-fade-in-up"
        >
          <div className="w-10 h-10 gradient-orange rounded-xl flex items-center justify-center transition-all duration-300 group-hover:shadow-lg pulse-orange">
            <UtensilsCrossed className="w-6 h-6 text-white transition-transform duration-300 group-hover:rotate-12" />
          </div>
          <span className="text-white font-bold text-xl transition-all duration-300 group-hover:text-orange-200 text-shadow-glow">
            ResNet
          </span>
        </Link>

        <form
          className="flex flex-col glass-effect bg-black/10 border border-white/20 shadow-xl p-6 px-4 items-center justify-start rounded-2xl w-full text-white transition-all duration-500 hover:bg-black/15 hover:border-white/30 animate-fade-in-up animation-delay-200"
          onSubmit={handleSubmit}
        >
          <p className="mb-4 md:text-2xl text-xl font-bold text-shadow-glow animate-fade-in-up">Имя ресторана</p>

          {error && (
            <div className="mb-4 text-red-400 text-sm text-center bg-red-500/10 border border-red-500/20 rounded-lg p-2 w-full animate-shake">
              {error}
            </div>
          )}

          <label className="mb-1 ml-3 self-start text-white/60">Логин</label>
          <input
            className="mb-4 px-4 w-full py-2 rounded-2xl bg-white/5 border border-white/20 outline-none text-white placeholder:text-white/40 focus:border-orange-500/50 transition-colors glass-effect"
            placeholder="Введите логин"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            disabled={isLoading}
            required
          />

          <label className="mb-1 ml-3 self-start text-white/60">Пароль</label>
          <input
            className="mb-6 px-4 w-full py-2 rounded-2xl bg-white/5 border border-white/20 outline-none text-white placeholder:text-white/40 focus:border-orange-500/50 transition-colors glass-effect"
            placeholder="Введите пароль"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
            required
          />

          <div className="flex self-center justify-between gap-4 w-full">
            <div className="w-full">
              <PrimaryButton text={isLoading ? "Вход..." : "Вход"} disabled={isLoading} isLoading={isLoading} />
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
