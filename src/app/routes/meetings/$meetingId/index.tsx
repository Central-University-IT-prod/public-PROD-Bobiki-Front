import { MeetingPage } from "@/pages/meeting/MeetingPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/meetings/$meetingId/")({
  component: Component,
});

function Component() {
  const { meetingId } = Route.useParams();

  return <MeetingPage meetingId={meetingId} />;
}
