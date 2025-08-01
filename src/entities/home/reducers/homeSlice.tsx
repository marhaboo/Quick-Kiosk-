import { createSlice } from "@reduxjs/toolkit"
import { getRestaurants } from "../api/home-api" 
import type { Restaurant } from "../models/types" 

interface HomeState {
  data: Restaurant[]
  loading: boolean
  selectedCategory: string | null 
}

const initialState: HomeState = {
  data: [],
  loading: false,
  selectedCategory: null, 
}

const homeSlice = createSlice({
  name: "HomeSlice", 
  initialState,
  reducers: {
    setCategoryFilter: (state, action: { payload: string | null }) => {
      state.selectedCategory = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRestaurants.pending, (state) => {
        state.loading = true
      })
      .addCase(getRestaurants.fulfilled, (state, action) => {
        state.data = action.payload.data 
        state.loading = false
      })

  },
})

export const { setCategoryFilter } = homeSlice.actions
export default homeSlice.reducer
