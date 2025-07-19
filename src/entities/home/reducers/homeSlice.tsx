import { createSlice } from "@reduxjs/toolkit";
import { getRestaurants } from "../api/home-api";
import { Restaurant } from "../models/types";

const initialState = {
  data: [] as Restaurant[],
  loading: false,
}

export const homeSlice = createSlice({
  name: "HomeSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRestaurants.fulfilled, (state, action) => {
        state.data = action.payload.data
        state.loading = false
      })
  }

})

export default homeSlice.reducer