import { Page } from "@/shared/ui/Page/Page";
import { Meeting } from "@/widgets/Meeting/meeting";

export const MeetingPage = ({ meetingId }: { meetingId: string }) => {
  return (
    <Page>
      <Meeting id={meetingId} />
    </Page>
  );
};
