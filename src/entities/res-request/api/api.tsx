import { axiosRequest } from "@/shared/utils/axiosRequest";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { PostRestaurant } from "../models/types";

export const getResRequest = createAsyncThunk("getResRequest", async () => {
  const token = localStorage.getItem("token");
  const { data } = await axiosRequest.get("/RestaurantRequest", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return data.data
})

export const delResRequest = createAsyncThunk(
  "delResRequest",
  async (id: string, {dispatch}) => {
    const token = localStorage.getItem("token");

    const { data } = await axiosRequest.delete(`/RestaurantRequest/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(getResRequest())

    return data;
  }
);

export const putResRequest = createAsyncThunk(
  "putResRequest",
  async ({ id, status }: { id: string; status: string }, {dispatch}) => {
    const token = localStorage.getItem("token");

    const { data } = await axiosRequest.put(
      `/RestaurantRequest/${id}`,
      { status },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    dispatch(getResRequest())
    return data;
  }
);

export const postResRequest = createAsyncThunk("postResRequest", async (data:PostRestaurant) => {
  await axiosRequest.post("/RestaurantRequest", data)
})