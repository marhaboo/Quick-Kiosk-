import { createSlice } from "@reduxjs/toolkit";
import { JobAppGet } from "../models/type";
import { getJobApplication } from "../api/job-application-api";

const initialState = {
  jobs: [] as JobAppGet[],
  loading: false,
  error: null as string | null,
}
export const jobAppSlice = createSlice({
  name: "JobAppSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getJobApplication.fulfilled, (state, action) => {
      state.jobs = action.payload
      state.loading = false
      state.error = null
    }),
      builder.addCase(getJobApplication.pending, (state) => {
        state.loading = true
        state.error = null
      }),
      builder.addCase(getJobApplication.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Ошибка при загрузке запросов"
      })

  }
}
)

export default jobAppSlice.reducer