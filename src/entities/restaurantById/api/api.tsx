import { axiosRequest } from "@/shared/utils/axiosRequest";
import { createAsyncThunk } from "@reduxjs/toolkit";


export const getRestaurantById = createAsyncThunk("getRestaurantById", async (id: string) => {
  const { data } = await axiosRequest.get(`/Restaurant/${id}`)
  return data
})

export const updateRestaurantById = createAsyncThunk("updateRestaurantById", async (restaurantData: any) => {
  const { data } = await axiosRequest.put(`/Restaurant/${restaurantData.id}`, restaurantData)
  return data
})

export const deleteRestaurantById = createAsyncThunk("deleteRestaurantById", async (id: number) => {
  const token = localStorage.getItem("token")
  const { data } = await axiosRequest.delete(`/Product/${id}` ,
    {
      headers: {
        Authorization: `Bearer ${token}`

    }
  }
   )

  return data
})