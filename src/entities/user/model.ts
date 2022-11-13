import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useAppSelector } from "../../shared/lib/hooks";
import { User, UserRoles } from "./types";

const SLICE_NAME = "user";
const initialState: User = {
  role: UserRoles.manager,
};
const userSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    changeUserRole: (state, { payload }: PayloadAction<UserRoles>) => {
      state.role = payload;
    },
  },
});

export const { reducer: userReducer } = userSlice;
export const { changeUserRole } = userSlice.actions;
export const useUserSelector = () =>
  useAppSelector((state) => state[SLICE_NAME]);
