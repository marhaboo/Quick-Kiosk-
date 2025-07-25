import  resByIdReducer from "@/app/entities/restaurantById/reducers/categorySlice";
import homeReducer from "@/app/entities/home/reducers/homeSlice";
import { configureStore } from "@reduxjs/toolkit";
import  reservationReducer from "@/app/entities/reservation/reducers/reservation-slice";

export function makeStore() {
  return configureStore({
    reducer: { 
      resById: resByIdReducer , 
      home: homeReducer,
      reserv: reservationReducer   
  }});
}
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<ReturnType<typeof makeStore>["getState"]>;
export type AppDispatch = ReturnType<typeof makeStore>["dispatch"];
