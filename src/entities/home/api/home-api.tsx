import { axiosRequest } from "@/shared/utils/axiosRequest";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getRestaurants = createAsyncThunk("getRestaurants", async () => {
  const { data } = await axiosRequest.get("/Restaurant")
  return data
})