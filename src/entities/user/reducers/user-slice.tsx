import { createSlice } from "@reduxjs/toolkit"
import { UserGet } from "../models/types"
import { getUsers } from "../api/api"

export const initialState = {
  users: [] as UserGet[],
  loading: false,
  error: null as string | null,
}
export const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(getUsers.fulfilled, (state,action) => {
      state.users = action.payload
      state.loading = false
      state.error = null
    })
    .addCase(getUsers.pending, (state) => {
      state.loading = true
      state.error = null
    })
    .addCase(getUsers.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message || "Failed to fetch users"
    }
    )
  }
})

export default UserSlice.reducer