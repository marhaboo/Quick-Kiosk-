import { axiosRequest } from "@/shared/utils/axiosRequest";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { JobApplicationItems } from "../models/type";

export const postJobApplication = createAsyncThunk(
  "jobApplication/post",
  async (data: JobApplicationItems, { rejectWithValue }) => {
    try {
      const response = await axiosRequest.post("/job-applications", data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Ошибка при отправке заявки");
    }
  }
);
