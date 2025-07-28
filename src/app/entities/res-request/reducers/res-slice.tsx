import { createSlice } from "@reduxjs/toolkit"
import { getResRequest } from "../api/api"
import { RestaurantRequest } from "../models/types"

const initialState = {
  requests: [] as RestaurantRequest[],
  loading: false,
  error: null as string | null,
}

export const resRequestSlice = createSlice({
  name: "resRequestSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getResRequest.fulfilled, (state, action) => {
      state.requests = action.payload
      state.loading = false
      state.error = null
    }),
      builder.addCase(getResRequest.pending, (state) => {
        state.loading = true
        state.error = null
      }),
      builder.addCase(getResRequest.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Ошибка при загрузке запросов"
      })
  }
})

export default resRequestSlice.reducer
