import { Providers } from "@/app/providers";
import { Outlet } from "@tanstack/react-router";

export const RootLayout = () => {
  return (
    <Providers>
      <Outlet />
    </Providers>
  );
};
