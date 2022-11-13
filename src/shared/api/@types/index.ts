export type Partner = {
  id: string;
  name: string;
  approved: boolean;
  accredited: boolean;
  startDate: string; // ISO
  contacts: string;
  segment: Segments;
  blocked: boolean;
  networkId: string;
};

export type Network = {
  id: string;
  name: string;
  blocked: boolean;
  startDate: string; // ISO
};

export enum Segments {
  IT = "Информационные технологии",
  marketing = "Маркетинг",
  realEstate = "Недвижимость",
}
