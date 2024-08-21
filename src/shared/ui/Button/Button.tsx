import styles from "./Button.module.scss";
import { Link, ReactNode } from "@tanstack/react-router";
import { ButtonHTMLAttributes } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  to?: string;
}
export const Button = ({ children, to, ...props }: ButtonProps) => {
  return (
    <>
      {to ? (
        <Link className={styles.button} to={to}>
          {children}
        </Link>
      ) : (
        <button className={styles.button} {...props}>
          {children}
        </button>
      )}
    </>
  );
};
