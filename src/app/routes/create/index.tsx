import { CreateMeetingPage } from "@/pages/createMeeting/CreateMeetingPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/create/")({
  component: CreateMeetingPage,
});
