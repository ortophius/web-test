import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Network } from "../../shared/api/@types";
import { getAllNetworks } from "../../shared/api/endpoints";
import { useAppSelector } from "../../shared/lib/hooks";

const initialState: Network[] = [];
const SLICE_NAME = "networks";

export const fetchAllNetworks = createAsyncThunk(
  `${SLICE_NAME}/fetchAll`,
  async () => {
    const payload = await getAllNetworks();
    return payload;
  }
);

export type ChangeNetworkPayload = Pick<Network, "id"> &
  Partial<Omit<Network, "id">>;

const networksSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    updateNetwork: (
      state,
      { payload }: PayloadAction<ChangeNetworkPayload>
    ) => {
      const { id } = payload;
      const networkIndex = state.findIndex((network) => network.id === id);

      if (networkIndex < 0) return;

      state[networkIndex] = {
        ...state[networkIndex],
        ...payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchAllNetworks.fulfilled,
      (state, { payload }) => (state = payload)
    );
  },
});

export const { reducer: networksReducer } = networksSlice;
export const { updateNetwork } = networksSlice.actions;
export const useNetworksSelector = () =>
  useAppSelector(({ networks }) => networks);
