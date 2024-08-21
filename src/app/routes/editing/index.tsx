import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/editing/")({
  beforeLoad: () => {
    throw redirect({ to: "/meetings" });
  },
});
