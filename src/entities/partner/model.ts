import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Network, Partner } from "../../shared/api/@types";
import { addPartner, getNetworkPartners } from "../../shared/api/endpoints";
import { useAppSelector } from "../../shared/lib/hooks";

type PartnersState = Record<Partner["id"], Partner>;
export type UpdatePartnerPayload = Pick<Partner, "id"> &
  Partial<Omit<Partner, "id">>;

const initialState: PartnersState = {};
const SLICE_NAME = "partners";

export const fetchPartnersByNetworkId = createAsyncThunk(
  `${SLICE_NAME}/fetchByNetworkId`,
  async (id: Network["id"]) => {
    const payload = await getNetworkPartners(id);
    return payload;
  }
);

export const createPartner = createAsyncThunk(
  `${SLICE_NAME}/createPartner`,
  async (params: Omit<Partner, "id">) => {
    const payload = await addPartner(params);
    return payload;
  }
);

export const partnersSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    updatePartner: (
      state,
      { payload }: PayloadAction<UpdatePartnerPayload>
    ) => {
      const { id } = payload;

      if (!state[id]) return;

      state[id] = {
        ...state[id],
        ...payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchPartnersByNetworkId.fulfilled,
      (state, { payload }) => {
        console.log(payload);
        payload.forEach((partner) => {
          state[partner.id] = partner;
        });
      }
    );

    builder.addCase(createPartner.fulfilled, (state, { payload }) => {
      state[payload.id] = payload;
    });
  },
});

export const { reducer: partnersReducer } = partnersSlice;
export const { updatePartner } = partnersSlice.actions;

export const usePartnersSelector = () =>
  useAppSelector((state) => state[SLICE_NAME]);

export const usePartnerSelectorByNetworkId = (id: Network["id"]) => {
  const partners = usePartnersSelector();
  return Object.values(partners).filter((partner) => partner.networkId === id);
};

export const usePartnerSelectorById = (id: Partner["id"]) =>
  useAppSelector((state) => state[SLICE_NAME][id]);
