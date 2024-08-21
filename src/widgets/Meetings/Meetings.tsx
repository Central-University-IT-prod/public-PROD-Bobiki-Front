import styles from "./Meetings.module.scss";
import { api } from "@/shared/api";
import getTime from "@/shared/helpers/getTime";
import { AllMeetingsMeeting } from "@/shared/types/api";
import { Button } from "@/shared/ui/Button/Button";
import { Title } from "@/shared/ui/Title/Title";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";

interface MeetingProps {
  index: number;
  meetingRecord: [string, AllMeetingsMeeting];
}

const Meeting = ({ index, meetingRecord }: MeetingProps) => {
  const { products, meeting: appointedMeeting } = meetingRecord[1];
  const productsString = products.map((product) => product.name).join(", ");

  const { start_datetime, end_datetime, place } = appointedMeeting;

  const startTime = getTime(start_datetime);
  return (
    <div className={styles.meeting}>
      <Link
        to={"/meetings/$meetingId"}
        params={{ meetingId: meetingRecord[0] }}
        className={styles.meetingLink}
      ></Link>
      <div>
        <Title htmlH="2">
          <b>Встреча {index}</b>
        </Title>
      </div>
      <div className={styles.meetingInfo}>
        <p>
          Продукты: <b>{productsString}</b>
        </p>

        <p>
          Адрес: <b>{place}</b>
        </p>
        <p>
          Время:{" "}
          <b>
            {startTime} - {end_datetime.split(" ")[1]}
          </b>
        </p>
      </div>
    </div>
  );
};
export const Meetings = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["meetings"],
    queryFn: () => api.getUserMeetings(),
    select: (data) => data.data,
  });
  const meetings: [string, AllMeetingsMeeting][] = Object.entries(data || {});

  if (isError) {
    return "Произошла ошибка... Попробуйте позже";
  }
  return (
    <>
      {isLoading ? (
        <>Загрузка...</>
      ) : meetings && meetings.length !== 0 ? (
        <div className={styles.meetings}>
          {meetings?.map((meeting, index) => (
            <Meeting
              key={meeting[0]}
              index={index + 1}
              meetingRecord={meeting}
            />
          ))}
        </div>
      ) : (
        <div className={styles.notFound}>
          <h2>У вас нет запланированных встреч</h2>
          <Button to="/create">Назначить</Button>
        </div>
      )}
    </>
  );
};
