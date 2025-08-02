import { axiosRequest } from "@/shared/utils/axiosRequest";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Reservation } from "../models/types";

export const getTables = createAsyncThunk("getTables", async (id: number) => {
  const { data } = await axiosRequest.get(`/restaurants/${id}/tables`)
  return data
})

export const reservTable = createAsyncThunk(
  "reserveTable",
  async (
    { data, resId }: { data: Reservation; resId: number }, 
    { dispatch }
  ) => {
    await axiosRequest.post(`/Booking`, data)
    dispatch(getTables(resId))
    return data
  }
)
