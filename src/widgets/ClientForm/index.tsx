import { PersonsStage } from "./ui/PersonsStage";
import { ProductsStage } from "./ui/ProductsStage";
import { TimeCoordStage } from "./ui/TimeCoordStage";
import { stageSelector } from "./model/selectors";
import { useStage } from "./model/store";

const STAGES = {
  1: <ProductsStage />,
  2: <PersonsStage />,
  3: <TimeCoordStage />,
};
export const ClientForm = () => {
  const stage = useStage(stageSelector);
  return STAGES[stage as keyof typeof STAGES];
};

export default ClientForm;
export { stageSelector, useStage };
