import { axiosRequest } from "@/shared/utils/axiosRequest";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { LoginProps } from "../models/types";

export const loginPost = createAsyncThunk(
  "auth/loginPost",
  async (data: LoginProps, { rejectWithValue }) => {
    try {
      const response = await axiosRequest.post("/Account/login", data);

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Ошибка входа");
    }
  }
);
