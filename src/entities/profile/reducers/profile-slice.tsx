import { createSlice } from "@reduxjs/toolkit";
import { getProfile } from "../api/api-profile";
import { Profiole } from "../models/types";

const initialState = {
  profile:{} as Profiole | null,
};


export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProfile.fulfilled, (state, action) => {
      state.profile = action.payload;
    });
    builder.addCase(getProfile.rejected, (state) => {
      state.profile = null;
    });
  } 
})

export default profileSlice.reducer;