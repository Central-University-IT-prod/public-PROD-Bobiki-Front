import type { ReactNode } from "react";
import styles from "./Page.module.scss";
import clsx from "@/shared/helpers/clsx";

interface PageProps {
  center?: boolean;
  column?: boolean;
  children: ReactNode;
  extraClass?: string;
}
export const Page = ({
  extraClass = "",
  children,
  center = false,
  column = true,
}: PageProps) => {
  const className = clsx(
    styles.page,
    { [styles.center]: center, [styles.column]: column },
    [extraClass]
  );
  return <div className={className}>{children}</div>;
};
