import { PersonsStage } from "./ui/PersonsStage";
import { ProductsStage } from "./ui/ProductsStage";
import { TimeCoordStage } from "./ui/TimeCoordStage";
import { stageSelector } from "./model/selectors";
import { useStage } from "./model/store";

const STAGES = {
  1: <ProductsStage />,
  2: <PersonsStage />,
};
export const ClientEditingForm = ({ id }: { id: string }) => {
  const stage = useStage(stageSelector);
  if (stage === 3) return <TimeCoordStage id={id} />;
  return STAGES[stage as keyof typeof STAGES];
};

export default ClientEditingForm;
export { stageSelector, useStage };
