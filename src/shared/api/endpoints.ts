import { v4 } from "uuid";
import { mockApiCall } from "../lib/mock-api-call";
import { Network, Partner } from "./@types";
import { networks, partners } from "./mockData";

export const getAllNetworks = mockApiCall(() => networks);
export const getNetworkPartners = mockApiCall((id: Network["id"]) => {
  return partners.filter((partner) => partner.networkId === id);
});

type PartnerPayload = Pick<Partner, "id"> & Partial<Omit<Partner, "id">>;
export const mutatePartner = mockApiCall((payload: PartnerPayload) => {
  const partnerIndex = partners.findIndex(
    (partner) => partner.id === payload.id
  );

  partners[partnerIndex] = {
    ...partners[partnerIndex],
    ...payload,
  };
});
export const addPartner = mockApiCall((payload: Omit<Partner, "id">) => {
  const id = v4();
  const newPartner: Partner = {
    id,
    ...payload,
  };

  partners.push(newPartner);

  return newPartner;
});
