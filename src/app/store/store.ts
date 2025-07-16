import categoryReducer from "@/entities/categories/reducers/categorySlice";
import homeReducer from "@/entities/home/reducers/homeSlice";
import { configureStore } from "@reduxjs/toolkit";

export function makeStore() {
  return configureStore({
    reducer: { 
      category: categoryReducer, 
      home: homeReducer },
  });
}
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<ReturnType<typeof makeStore>["getState"]>;
export type AppDispatch = ReturnType<typeof makeStore>["dispatch"];
