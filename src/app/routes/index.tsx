import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: () => "Main page",
  beforeLoad: () => {
    throw redirect({ to: "/create" });
  },
});
