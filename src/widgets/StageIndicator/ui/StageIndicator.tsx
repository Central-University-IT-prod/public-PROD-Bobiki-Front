import { FC, PropsWithChildren, useEffect, useRef } from "react";
import styles from "./StageIndicator.module.scss";
import { useStage } from "@/widgets/ClientForm";

export const Stage: FC<PropsWithChildren> = ({ children }) => {
  return <button className={styles.stage} data-title={children} />;
};
export const StageIndicator = () => {
  const indicatorRef = useRef<HTMLDivElement>(null);
  const stage = useStage((state) => state.stage);
  const setStage = useStage((state) => state.setStage);
  useEffect(() => {
    indicatorRef.current?.style.setProperty(
      "--stage-amount",
      `${indicatorRef.current.children.length}`
    );
    for (let i = 0; i < indicatorRef.current!.children.length; i++) {
      indicatorRef.current?.children[i]?.classList.remove(styles.completed);
      indicatorRef.current?.children[i]?.classList.remove(styles.active);
    }

    indicatorRef.current?.children[stage - 1]?.classList.add(styles.active);
    for (let i = 0; i < stage - 1; i++) {
      indicatorRef.current?.children[i]?.classList.add(styles.completed);
      indicatorRef.current?.children[i]?.addEventListener("click", () => {
        setStage(i + 1);
      });
    }
  }, [stage, setStage]);
  return (
    <div className={styles.stageIndicator} ref={indicatorRef}>
      <Stage>Выбор продуктов</Stage>
      <Stage>Добавление участников</Stage>
      <Stage>Выбор места и адреса</Stage>
    </div>
  );
};
