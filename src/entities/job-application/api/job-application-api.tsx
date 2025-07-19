import { axiosRequest } from "@/shared/utils/axiosRequest";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { JobApplicationItems } from "../models/type";
import { AxiosError } from "axios";

export const postJobApplication = createAsyncThunk(
  "jobApplication/post",
  async (data: JobApplicationItems, { rejectWithValue }) => {
    try {
      const response = await axiosRequest.post("/job-applications", data);
      return response.data;
    } catch (error) {
      const err = error as AxiosError
      return rejectWithValue(err.response?.data || "Ошибка при отправке заявки");
    }
  }
);
