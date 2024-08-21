import { ReactNode } from "@tanstack/react-router";
import styles from "./ErrorMessage.module.scss";
interface ErrorMessageProps {
  id: string;
  children: ReactNode;
}
export const ErrorMessage = ({ children, id }: ErrorMessageProps) => {
  return (
    <>
      {children ? (
        <p id={id} className={styles.errorMessage}>
          {children}
        </p>
      ) : null}
    </>
  );
};
