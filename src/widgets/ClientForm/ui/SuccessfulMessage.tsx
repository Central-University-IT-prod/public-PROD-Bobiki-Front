import { Title } from "@/shared/ui/Title/Title";
import styles from "./SuccessfulMessage.module.scss";
import { createPortal } from "react-dom";
import { Button } from "@/shared/ui/Button/Button";

export const SuccessfulMessage = ({
  googleCalendatUrl,
}: {
  googleCalendatUrl: string;
}) => {
  return createPortal(
    <div className={styles.successfulMessage}>
      <Title htmlH="1" className={styles.title}>
        Вы назначали встречу!
        <div className={styles.mark}>✔</div>
      </Title>

      <div className={styles.buttons}>
        <Button to="/meetings">Перейти к встречам</Button>
        <Button to={googleCalendatUrl}>Добавить в календарь</Button>
      </div>
    </div>,
    document.body
  );
};
