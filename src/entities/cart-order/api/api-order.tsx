import { createAsyncThunk } from "@reduxjs/toolkit";
import { OrderItems } from "../models/type";
import { axiosRequest } from "@/shared/utils/axiosRequest";

export const postOrder = createAsyncThunk("postOrder", async (orderData:OrderItems) => {
await axiosRequest.post("/Order",orderData)
})