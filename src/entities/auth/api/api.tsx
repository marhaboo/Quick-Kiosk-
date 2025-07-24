import { axiosRequest } from "@/shared/utils/axiosRequest";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { LoginProps } from "../models/types";

export const loginPost = createAsyncThunk("loginPost", async (data: LoginProps) => {
  axiosRequest.post("/Account/login", data)
})