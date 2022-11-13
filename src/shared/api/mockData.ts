import { v4 } from "uuid";
import { Network, Partner, Segments } from "./@types";

const networkId = v4();

export const networks: Network[] = [
  {
    id: networkId,
    name: "Wemakefab",
    blocked: false,
    startDate: new Date().toISOString(),
  },
];

export const partners: Partner[] = [
  {
    id: v4(),
    name: "Wemakefab",
    accredited: true,
    approved: true,
    blocked: false,
    contacts: "+7 123 456 78 90",
    segment: Segments.IT,
    startDate: new Date().toISOString(),
    networkId,
  },
  {
    id: v4(),
    name: "AWG",
    accredited: true,
    approved: false,
    blocked: false,
    contacts: "+7 123 456 78 90",
    segment: Segments.marketing,
    startDate: new Date().toISOString(),
    networkId,
  },
  {
    id: v4(),
    name: "MockPartner",
    accredited: false,
    approved: true,
    blocked: true,
    contacts: "+7 123 456 78 90",
    segment: Segments.realEstate,
    startDate: new Date().toISOString(),
    networkId,
  },
];
