import { createAsyncThunk } from "@reduxjs/toolkit";
import { OrderItems } from "../models/type";
import { axiosRequest } from "@/shared/utils/axiosRequest";

export const postOrder = createAsyncThunk("postOrder", async (orderData:OrderItems) => {
await axiosRequest.post("/Order",orderData)
})

export const getOrder = createAsyncThunk("getOrder", async () => {
    const token = localStorage.getItem("token")
  const {data} = await axiosRequest.get("/Order" 
    , {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  );

  return data.data;
});