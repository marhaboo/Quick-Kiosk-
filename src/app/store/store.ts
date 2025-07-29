import resByIdReducer from "@/entities/restaurantById/reducers/categorySlice";
import homeReducer from "@/entities/home/reducers/homeSlice";
import { configureStore } from "@reduxjs/toolkit";
import reservationReducer from "@/entities/reservation/reducers/reservation-slice";
import resRequestReducer from "../../entities/res-request/reducers/res-slice";
import  jobAppReducer  from "@/entities/job-application/reducers/job-application-slice";
import  UserReducer  from "@/entities/user/reducers/user-slice";

export function makeStore() {
  return configureStore({
    reducer: {
      resById: resByIdReducer,
      home: homeReducer,
      reserv: reservationReducer,
      resRequest: resRequestReducer,
      jobApplication: jobAppReducer,
      users: UserReducer,
    },
  });
}
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<ReturnType<typeof makeStore>["getState"]>;
export type AppDispatch = ReturnType<typeof makeStore>["dispatch"];
