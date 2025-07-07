import { createSlice } from "@reduxjs/toolkit";
import { CategoriesType, MyState } from "../models/type";
import { getCategories } from "../api/api";


const initialState: MyState = {
  categories: [] as CategoriesType[]
}
export const categorySlice = createSlice({
  name: "categorySlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.fulfilled, (state, action) => {
        state.categories = action.payload
      })

  }
})

export default categorySlice.reducer