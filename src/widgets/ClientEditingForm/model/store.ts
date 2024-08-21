import { create } from "zustand";

export interface StageStore {
  stage: number;
  addStage: () => void;
  setStage: (stage: number) => void;
}

export const useStage = create<StageStore>((set) => ({
  stage: 1,
  addStage: () => set((state) => ({ stage: state.stage + 1 })),
  setStage: (stage) => set({ stage }),
}));
