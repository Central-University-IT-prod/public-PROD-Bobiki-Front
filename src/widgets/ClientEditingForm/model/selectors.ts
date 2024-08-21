import { StageStore } from "./store";

export const stageSelector = (state: StageStore) => state.stage;
export const addStageSelector = (state: StageStore) => state.addStage;
