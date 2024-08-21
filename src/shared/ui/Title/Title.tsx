import { HTMLAttributes } from "react";
import styles from "./Title.module.scss";
import { ReactNode } from "@tanstack/react-router";
import clsx from "@/shared/helpers/clsx";

interface TitleProps extends HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode;
  htmlH: "1" | "2" | "3" | "4" | "5";
}
export const Title = ({ htmlH, children, ...props }: TitleProps) => {
  const className = clsx(styles.title, {}, [props.className || ""]);
  if (htmlH === "1") {
    return <h1 className={className}>{children}</h1>;
  }
  if (htmlH === "2") {
    return <h2 className={className}>{children}</h2>;
  }
  if (htmlH === "3") {
    return <h3 className={className}>{children}</h3>;
  }
  if (htmlH === "4") {
    return <h4 className={className}>{children}</h4>;
  }
  if (htmlH === "5") {
    return <h5 className={className}>{children}</h5>;
  }
};
