import { Documents } from "@/entities/Documents";
import styles from "./meeting.module.scss";
import { Title } from "@/shared/ui/Title/Title";

import getTime from "@/shared/helpers/getTime";
import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "@/shared/api";
import { useNavigate } from "@tanstack/react-router";
import { Button } from "@/shared/ui/Button/Button";

interface MeetingProps {
  id: string;
}
export const Meeting = ({ id }: MeetingProps) => {
  const navigate = useNavigate();
  const { data, isLoading, error } = useQuery({
    queryFn: () => api.getUserMeeting(id),
    queryKey: ["meeting", id],
    select: (data) => data.data,
  });
  const {
    mutate,
    isSuccess: isSuccessDelete,
    isError: isErrorDelete,
    isPending: isPendingDelete,
  } = useMutation({
    mutationFn: () => api.deleteMeeting(id),
  });

  if (isSuccessDelete) {
    navigate({ to: "/meetings" });
  }

  if (isErrorDelete) {
    return <div>Произошла ошибка</div>;
  }

  if (isPendingDelete) {
    return <div>Удаляем...</div>;
  }

  return (
    <div className={styles.meeting}>
      {isLoading ? (
        "Загрузка..."
      ) : error ? (
        "Произошла ошибка"
      ) : (
        <>
          <Title htmlH="1">Назначеная встреча</Title>
          <div className={styles.meetingInfo}>
            <div className={styles.meetingInfoBlock}>
              <Title htmlH="2">Продукты</Title>
              <p>
                <b>
                  {data?.products.map((product) => product.name).join(", ")}
                </b>
              </p>
            </div>
            <div className={styles.meetingInfoBlock}>
              <Title htmlH="2">Документы</Title>
              <b>
                <Documents
                  products={data?.products.map((product) => product.id) || []}
                />
              </b>
            </div>
            <div className={styles.meetingInfoBlock}>
              <Title htmlH="2">Адрес:</Title>
              <p>
                <b>{data?.meeting.place}</b>
              </p>
            </div>
            <div className={styles.meetingInfoBlock}>
              <Title htmlH="2">Время встречи:</Title>
              <p>
                <b>{`${getTime(data?.meeting.start_datetime || "")}-${data?.meeting.end_datetime.split(" ")[1]}`}</b>
              </p>
            </div>
            <div className={styles.meetingInfoBlock}>
              <Title htmlH="2">Наш представитель:</Title>
              <div className={styles.courierInfo}>
                <Title htmlH="3" className={styles.noFlex}>
                  ФИО:{" "}
                  <b>
                    {data?.courier.name} {data?.courier.surname}{" "}
                    {data?.courier.middle_name}
                  </b>
                </Title>

                <Title htmlH="3" className={styles.noFlex}>
                  Номер телефона: <b>{data?.courier.phone_number}</b>
                </Title>
              </div>
            </div>
          </div>
          <div className={styles.controlButtons}>
            <Button
              onClick={() =>
                navigate({
                  to: `/editing/$meetingId`,
                  params: { meetingId: id },
                })
              }
            >
              Редактировать встречу
            </Button>
            <Button onClick={() => mutate()}>Отменить встречу</Button>
          </div>
        </>
      )}
    </div>
  );
};
