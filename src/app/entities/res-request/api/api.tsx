import { axiosRequest } from "@/shared/utils/axiosRequest";
import { createAsyncThunk } from "@reduxjs/toolkit";

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
  async (id: number) => {
    const token = localStorage.getItem("token");

    const { data } = await axiosRequest.delete(`/RestaurantRequest/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  }
);

export const putResRequest = createAsyncThunk(
  "putResRequest",
  async ({ id, status }: { id: number; status: string }) => {
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

    return data;
  }
);