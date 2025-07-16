import { createSlice } from "@reduxjs/toolkit";
import { getRestaurants, getRestaurantById } from "../api/home-api";
import { MenuItem, Restaurant, Table } from "../models/types";

const initialState = {
  data: [] as Restaurant[],
  menu: [] as MenuItem[],
  tables: [] as Table[],
  loading: false,
  currentRestaurant: null as Restaurant | null,
  currentRestaurantLoading: false,
  error: null as string | null
}

export const homeSlice = createSlice({
  name: "HomeSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRestaurants.fulfilled, (state, action) => {
        state.data = action.payload.data
        state.tables = action.payload.tables
        state.menu = action.payload.menu
        state.loading = false
      })
      .addCase(getRestaurants.pending, (state) => {
        state.loading = true
      })
      .addCase(getRestaurantById.fulfilled, (state, action) => {
        state.currentRestaurant = action.payload
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

export default homeSlice.reducer