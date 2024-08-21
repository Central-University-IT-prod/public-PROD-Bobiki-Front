import { useEffect, useState } from "react";
import styles from "./TimeCoordStage.module.scss";
import { Title } from "@/shared/ui/Title/Title";
import { Button } from "@/shared/ui/Button/Button";
import { PatchData } from "@/shared/types/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "@/shared/api";
import { SuccessfulMessage } from "./SuccessfulMessage";
import { Input } from "@/shared/ui/Input/Input";
import {
  FieldError,
  UseFormRegister,
  UseFormSetValue,
  useForm,
} from "react-hook-form";
import { useClientEditingData } from "@/shared/storage/clientDataEditing";
import generateGCal from "@/shared/helpers/generateGoogleCalendar";
import { useMediaQuery } from "usehooks-ts";

const getTime = (time: Date) => {
  if (time.toString() === "Invalid Date") return "";
  return `${String(time.getHours()).padStart(2, "0")}:${String(time.getMinutes()).padStart(2, "0")}`;
};
const getDate = (date: Date) => {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
};
const TimeChooseComponent = ({ selectedDay }: { selectedDay: Date }) => {
  const minutes = useClientEditingData(
    (state) => state.sumMintuesOfProductsTime
  );
  const setTime = useClientEditingData((state) => state.setTime);
  const { isLoading, data } = useQuery({
    queryKey: ["time", selectedDay.toISOString()],
    queryFn: () =>
      api.getFreeTime(
        `${selectedDay.getFullYear()}-${String(selectedDay.getMonth() + 1).padStart(2, "0")}-${String(selectedDay.getDate()).padStart(2, "0")}`,
        minutes
      ),
    select: (data) => data.data,
  });

  const [selectedTime, setSelectedTime] = useState("");
  useEffect(() => {
    setSelectedTime(data?.free_slots[0] || "");
    setTime(getTime(new Date(data?.free_slots[0] || "")));
  }, [selectedDay]);

  return (
    <>
      {isLoading ? (
        "Загрузка..."
      ) : (
        <>
          <Title htmlH="2" className={styles.timeTitle}>
            Выберите время
          </Title>
          {!data || data?.free_slots.length === 0 ? (
            "Нет cвободных слотов"
          ) : (
            <div className={styles.timesOfMeeting}>
              {data?.free_slots.map((startTime) => {
                const startTimeDate = new Date(startTime);
                const endTimeDate = new Date(
                  startTimeDate.getTime() + minutes * 60 * 1000
                );
                return (
                  <div
                    key={startTime}
                    className={styles.timeOfMeeting}
                    data-selected={selectedTime === startTime}
                    onClick={() => {
                      setSelectedTime(startTime);
                      setTime(getTime(startTimeDate));
                    }}
                  >
                    {getTime(startTimeDate)} - {getTime(endTimeDate)}
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}
    </>
  );
};

const FUTURE_DAYS_AMOUNT = 10;
const DayChooseComponent = ({
  register,
  error,
  setValue,
}: {
  register: UseFormRegister<{
    address: string;
  }>;
  error: FieldError;
  setValue: UseFormSetValue<{
    address: string;
  }>;
}) => {
  const today = new Date(Date.now() + 1000 * 60 * 60 * 24);
  today.setHours(0, 0, 0, 0);
  const days = Array.from({ length: FUTURE_DAYS_AMOUNT }, () => {
    const day = new Date(today);
    today.setDate(today.getDate() + 1);
    return day;
  });
  const setDay = useClientEditingData((state) => state.setDay);
  const address = useClientEditingData((state) => state.place);
  const step = useMediaQuery("(max-width: 580px)") ? 2 : 4;
  const [selectedDay, setSelectedDay] = useState(days[0]);
  const [index, setIndex] = useState(0);
  const selectedTime = useClientEditingData((state) => state.time);
  useEffect(() => {
    setValue("address", address);
    setSelectedDay(days[0]);
    setDay(getDate(days[0]));
  }, []);

  return (
    <>
      <div className={styles.timeContainer}>
        <div className={styles.addressInput}>
          <Title htmlH="2" className={styles.addressTitle}>
            Введите адрес <small>(в 10 км от Москвы)</small>
          </Title>
          <Input
            className={styles.input}
            register={register("address", {
              required: "Введите что-нибудь",
              minLength: {
                value: 3,
                message: "Нужно минимум 3 символа",
              },
            })}
            placeholder="Город, улица, строение"
            errorText={error?.message}
          />
        </div>
        <div className={styles.daysSwitcher}>
          <Title htmlH="2" className={styles.dayTitle}>
            Выберите день
          </Title>

          <div className={styles.days}>
            {days.slice(index, index + step).map((day) => {
              const selected = selectedDay.getTime() === day.getTime();

              return (
                <div
                  className={styles.day}
                  data-selected={selected}
                  onClick={() => {
                    setSelectedDay(day);
                    setDay(getDate(day));
                  }}
                  key={day.getTime()}
                >
                  {day.toLocaleDateString("ru", {
                    day: "numeric",
                    month: "long",
                  })}
                </div>
              );
            })}
            {index !== 0 && (
              <button
                type="button"
                className={styles.buttonBack}
                onClick={() => setIndex(index - step)}
              >
                &#8592;
              </button>
            )}
            {index < days.length - step && (
              <button
                type="button"
                className={styles.buttonForward}
                onClick={() => setIndex(index + step)}
              >
                &#8594;
              </button>
            )}
          </div>
        </div>
        <TimeChooseComponent selectedDay={selectedDay} />
      </div>
      <Button type="submit" disabled={!selectedTime}>
        Изменить встречу
      </Button>
    </>
  );
};

export const TimeCoordStage = ({ id }: { id: string }) => {
  const clientData = useClientEditingData();
  const { mutate, isSuccess, isError, isPending } = useMutation({
    mutationFn: (patchData: PatchData) => api.editMeeting(id, patchData),
  });
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<{ address: string }>();

  if (isError) {
    return <>Не удалось отправить данные 😞</>;
  }
  if (isPending) {
    return <>Отправляем данные... 🕓</>;
  }
  if (isSuccess) {
    return (
      <SuccessfulMessage
        googleCalendarUrl={generateGCal(
          clientData.day,
          clientData.time,
          clientData.sumMintuesOfProductsTime,
          clientData.place
        )}
      />
    );
  }
  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit((data: { address: string }) => {
        const { day, time, products, persons } = clientData;
        const patchData: PatchData = {
          start_datetime: `${day} ${time}`,
          additional_users: [],
          products: products.map((product) => ({
            name: product,
          })),
          place: data.address,
        };
        for (const person of persons) {
          const personNormal = {
            ...person,
            passport_data: "",
            role: "",
          };
          patchData.additional_users.push(personNormal);
        }
        console.log(patchData);
        mutate(patchData);
      })}
    >
      <DayChooseComponent
        register={register}
        error={errors.address!}
        setValue={setValue}
      />
    </form>
  );
};
