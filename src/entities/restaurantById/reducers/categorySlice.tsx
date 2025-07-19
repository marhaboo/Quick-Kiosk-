import { createSlice } from "@reduxjs/toolkit";
import { getRestaurantById } from "../api/api";
import { MenuItem, Restaurant, Table } from "@/entities/home/models/types";

const initialState = {
  currentRestaurant: null as Restaurant | null,
  currentRestaurantLoading: false,
  error: "" as string | null,
}

export const resByIdSlice = createSlice({
  name: "resByIdSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRestaurantById.fulfilled, (state, action) => {
        state.currentRestaurant = action.payload.data
        state.currentRestaurantLoading = false
        state.error = null
      })
      .addCase(getRestaurantById.pending, (state) => {
        state.currentRestaurantLoading = true
        state.error = null
      })
      .addCase(getRestaurantById.rejected, (state, action) => {
        state.currentRestaurantLoading = false
        state.error = action.payload as string
      })
  }

})

export default resByIdSlice.reducer