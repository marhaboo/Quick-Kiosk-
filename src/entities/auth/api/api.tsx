import { createAsyncThunk } from "@reduxjs/toolkit"
import type { LoginProps, User, UserGet } from "../models/types"
import Cookies from "js-cookie"
import { axiosRequest } from "@/shared/utils/axiosRequest"
import axios from "axios"
import { getUsers } from "@/entities/user/api/api"


export const loginPost = createAsyncThunk(
  "auth/loginPost",
  async (data: LoginProps, { rejectWithValue }) => {
    try {
      const response = await axiosRequest.post("/Account/login", data)

      console.log("Login response:", response.data) 

      const token = response.data?.data?.token
      const user = response.data?.data?.user ?? null
      const userData = data.userName
      localStorage.setItem("user", JSON.stringify(userData))

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


export const postUser = createAsyncThunk<UserGet, User>(
  "user/postUser",
  async (userData, { dispatch, rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const { data } = await axiosRequest.post("/Account/add-user", userData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch(getUsers());

      return data.data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message || "Не удалось создать пользователя");
    }
  }
);