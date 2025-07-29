import { createSlice } from "@reduxjs/toolkit";
import { getTables } from "../api/api-reservation";
import { TableProps } from "../models/types";

const initialState = {
  tables: [] as TableProps[]
}
export const reservationSlice = createSlice({
  name: "reservationSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTables.fulfilled, (state, action) => {
        state.tables = action.payload.data
      })
  }
}
)


export default reservationSlice.reducer