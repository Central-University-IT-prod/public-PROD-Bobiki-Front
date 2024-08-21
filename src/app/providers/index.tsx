import type { FC, PropsWithChildren } from "react";
import { QueryProvider } from "./QueryProvider";

export const Providers: FC<PropsWithChildren> = ({ children }) => {
  return <QueryProvider>{children}</QueryProvider>;
};
