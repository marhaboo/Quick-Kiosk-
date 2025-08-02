import { axiosRequest } from "@/shared/utils/axiosRequest";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getProfile = createAsyncThunk("getProfile", async () => {
  const token = localStorage.getItem("token")
  const {data} = await axiosRequest.get("/profile/me",{
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  return data.data

})