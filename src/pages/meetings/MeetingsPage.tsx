import { Page } from "@/shared/ui/Page/Page";
import { Title } from "@/shared/ui/Title/Title";
import { Meetings } from "@/widgets/Meetings/Meetings";

export const MeetingsPage = () => {
  return (
    <Page center>
      <Title htmlH="1">Назначеные встречи</Title>
      <Meetings />
    </Page>
  );
};
