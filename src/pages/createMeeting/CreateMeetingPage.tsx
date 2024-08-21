import styles from './CreateMeetingPage.module.scss'
import { Page } from "@/shared/ui/Page/Page";
import ClientForm from "@/widgets/ClientForm";
import StageIndicator from "@/widgets/StageIndicator";

export const CreateMeetingPage = () => {
  return (
    <Page center extraClass={styles.page}>
      <StageIndicator />
      <ClientForm />
    </Page>
  );
};
