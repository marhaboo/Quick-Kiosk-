import { axiosRequest } from "@/shared/utils/axiosRequest"
import { createAsyncThunk } from "@reduxjs/toolkit"
import type { LoginProps } from "../models/types"
 import Cookies from "js-cookie"

export const loginPost = createAsyncThunk(
  "auth/loginPost",
  async (data: LoginProps, { rejectWithValue }) => {
    try {
      const response = await axiosRequest.post("/Account/login", data)

      console.log("Login response:", response.data) // Для отладки

      // Извлекаем token и user из ответа
      const token = response.data?.data?.token
      const user = response.data?.data?.user ?? null

      // Проверяем наличие токена
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
    } catch (error: any) {
      console.error("Login error:", error) // Для отладки

      if (error.response) {
        const status = error.response.status
        const message = error.response.data?.message || error.response.data

        if (status === 400 || status === 401) {
          return rejectWithValue("Неверный логин или пароль")
        } else if (status >= 500) {
          return rejectWithValue("Ошибка сервера. Попробуйте позже")
        } else {
          return rejectWithValue(
            typeof message === "string" ? message : "Ошибка входа"
          )
        }
      } else if (error.request) {
        return rejectWithValue("Ошибка сети. Проверьте подключение к интернету")
      } else {
        return rejectWithValue("Произошла неожиданная ошибка")
      }
    }
  }
)
