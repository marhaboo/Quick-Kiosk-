import { axiosRequest } from "@/shared/utils/axiosRequest";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getRestaurants = createAsyncThunk("getRestaurants", async () => {
  const { data } = await axiosRequest.get("/Restaurant")
  return data
})
export const getRestaurantById = createAsyncThunk("getRestaurantById", async (id: string) => {
  const { data } = await axiosRequest.get(`/Restaurant/${id}`)
  return data
})