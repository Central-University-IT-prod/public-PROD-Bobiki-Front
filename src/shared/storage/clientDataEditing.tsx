import { create } from "zustand";
import { IClientDataStorage } from "./clientData";

export const useClientEditingData = create<IClientDataStorage>((set) => ({
  mainPerson: undefined,
  persons: [],
  products: [],
  place: "",
  sumMintuesOfProductsTime: 0,
  time: "",
  day: "",
  setDay: (day: string) => set({ day }),
  setProductsTime: (minutes) => set({ sumMintuesOfProductsTime: minutes }),
  setMainPerson: (person) => set({ mainPerson: person }),
  setProducts: (products) => set({ products }),
  setPersons: (persons) => set({ persons }),
  setPlace: (place) => set({ place }),
  setTime: (time) => set({ time }),
}));
