import { createSlice } from "@reduxjs/toolkit";
import { getOrder } from "../api/api-order";
import { OrderProps } from "../models/type";


const initialState = {
  orders: [] as OrderProps[],
  loading: false,
  error: null as string | null,
}
export const orderSlice = createSlice({
  name: "OrderSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getOrder.fulfilled, (state, action) => {
      state.orders = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(getOrder.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getOrder.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Ошибка при загрузке запросов";
    });
  },
});

export default orderSlice.reducer