const getTime = (datetime: string) => {
  const [day, time] = datetime.split(" ");
  const [hours, minutes] = time.split(":").map((el) => +el);

  const date = new Date(day);
  date.setHours(hours);
  date.setMinutes(minutes);

  const dateString = date.toLocaleString("ru-RU", {
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
  return dateString;
};

export default getTime;
