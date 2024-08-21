import { queryClient } from "@/shared/api/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import type { FC, PropsWithChildren } from "react";

export const QueryProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
