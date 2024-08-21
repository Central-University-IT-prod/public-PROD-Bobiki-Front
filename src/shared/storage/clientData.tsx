import { create } from "zustand";
import { User } from "../types/api";

export type StoragePerson = Omit<User, "id">;
export interface IClientDataStorage {
  mainPerson: StoragePerson | undefined;
  persons: StoragePerson[];
  products: string[];
  sumMintuesOfProductsTime: number; // minutes
  place: string;
  time: string; // 00:00
  day: string; // 2024-01-01
  setPlace: (place: string) => void;
  setProducts: (products: string[]) => void;
  setPersons: (persons: StoragePerson[]) => void;
  setTime: (time: string) => void;
  setDay: (day: string) => void;
  setMainPerson: (person: StoragePerson) => void;
  setProductsTime: (minutes: number) => void;
}
export const useClientData = create<IClientDataStorage>((set) => ({
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
