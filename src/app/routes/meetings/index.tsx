import { MeetingsPage } from "@/pages/meetings/MeetingsPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/meetings/")({
  component: MeetingsPage,
});
