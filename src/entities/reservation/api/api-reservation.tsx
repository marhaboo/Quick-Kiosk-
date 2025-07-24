import { axiosRequest } from "@/shared/utils/axiosRequest";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getTables = createAsyncThunk("getTables", async (id: number) => {
  const { data } = await axiosRequest.get(`/restaurants/${id}/tables`)
  return data
})