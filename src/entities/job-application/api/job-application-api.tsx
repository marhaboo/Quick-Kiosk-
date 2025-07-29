import { axiosRequest } from "@/shared/utils/axiosRequest";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { JobApplicationItems } from "../models/type";
import { AxiosError } from "axios";

export const postJobApplication = createAsyncThunk(
  "jobApplication/post",
  async (data: JobApplicationItems, { rejectWithValue }) => {
    try {
      const response = await axiosRequest.post("/JobApplication", data);
      return response.data;
    } catch (error) {
      const err = error as AxiosError
      return rejectWithValue(err.response?.data || "Ошибка при отправке заявки");
    }
  }
);

export const getJobApplication = createAsyncThunk("getJobApplication", async () => {
  const token = localStorage.getItem("token");
  const { data } = await axiosRequest.get("/JobApplication", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return data.data
})




export const delJobApplication = createAsyncThunk(
  "delJobApplication",
  async (id: number, {dispatch}) => {
    const token = localStorage.getItem("token");

    const { data } = await axiosRequest.delete(`/JobApplication/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(getJobApplication())

    return data;
  }
);

export const updateJobApplicationStatus = createAsyncThunk(
  "updateJobApplicationStatus",
  async ({ id, status }: { id: number; status: string }, {dispatch}) => {
    const token = localStorage.getItem("token");

    const { data } = await axiosRequest.put(
      `/JobApplication/${id}`,
      { status },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    dispatch(getJobApplication())
    return data;
  }
);
