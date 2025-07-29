import { axiosRequest } from "@/shared/utils/axiosRequest";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserGet, User } from "../models/types";
import axios from "axios";

export const getUsers = createAsyncThunk(
  "user/getUsers",
  async (userData?: string | null) => {
    const token = localStorage.getItem("token");
    const { data } = await axiosRequest.get("/User", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: userData ? { Username: userData } : undefined,
    });
    return data.data;
  }
);

export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (id: string, { dispatch }) => {
    const token = localStorage.getItem("token");
    await axiosRequest.delete(`/User/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(getUsers());
    return id;
  }
);

export const updateUserRole = createAsyncThunk(
  "user/updateUserRole",
  async ({ id, role }: { id: string; role: string }, { dispatch }) => {
    const token = localStorage.getItem("token");
    await axiosRequest.put(
      `/User/${id}/role`,
      { role }, // вместо JSON.stringify(role)
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch(getUsers());
    return { id, role };
  }
);

export const postUser = createAsyncThunk<UserGet, User>(
  "user/postUser",
  async (userData, { dispatch, rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const { data } = await axiosRequest.post("/Account/add-user", userData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch(getUsers());

      return data.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data?.message || "Не удалось создать пользователя"
        );
      }
      return rejectWithValue("Неизвестная ошибка при создании пользователя");
    }
  }
);
