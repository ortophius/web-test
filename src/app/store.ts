import { configureStore } from "@reduxjs/toolkit";
import { networksReducer } from "../entities/network";
import { partnersReducer } from "../entities/partner";
import { userReducer } from "../entities/user/model";

export const store = configureStore({
  reducer: {
    networks: networksReducer,
    partners: partnersReducer,
    user: userReducer,
  },
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
