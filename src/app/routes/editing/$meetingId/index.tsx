import { EditingPage } from "@/pages/editing/EditingPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(`/editing/$meetingId/`)({
  component: Component,
});

function Component() {
  const { meetingId } = Route.useParams();
  return <EditingPage id={meetingId} />;
}
