import { createAsyncThunk } from "@reduxjs/toolkit"
import type { LoginProps } from "../models/types"
import Cookies from "js-cookie"
import { axiosRequest } from "@/shared/utils/axiosRequest"
import axios from "axios"

//  тип ответа от сервера
interface LoginResponse {
  data: {
    token: string
    user: {
      id: number
      name: string
      email: string
    }
  }
}

export const loginPost = createAsyncThunk(
  "auth/loginPost",
  async (data: LoginProps, { rejectWithValue }) => {
    try {
      const response = await axiosRequest.post<LoginResponse>("/Account/login", data)

      console.log("Login response:", response.data) // Для отладки

      const token = response.data?.data?.token
      const user = response.data?.data?.user ?? null

      if (token) {
        Cookies.set("token", token, { expires: 7, path: "/" })
        localStorage.setItem("token", token)

        if (user) {
          localStorage.setItem("user", JSON.stringify(user))
        }

        return {
          token,
          user,
          success: true,
        }
      } else {
        return rejectWithValue("Имя пользователя или пароль неверны")
      }
    } catch (error: unknown) {
      console.error("Login error:", error)

      if (axios.isAxiosError(error)) {
        const status = error.response?.status
        const message = error.response?.data?.message || error.response?.data

        if (status === 400 || status === 401) {
          return rejectWithValue("Неверный логин или пароль")
        } else if (status && status >= 500) {
          return rejectWithValue("Ошибка сервера. Попробуйте позже")
        } else {
          return rejectWithValue(
            typeof message === "string" ? message : "Ошибка входа"
          )
        }
      } else {
        return rejectWithValue("Произошла неожиданная ошибка")
      }
    }
  }
)
