const generateGCal = (
  day: string,
  time: string,
  minutes: number,
  place: string
) => {
  const [startYear, startMonth, startDay] = day.split("-");
  const [startHours, startMinutes] = time.split(":");
  const endDate = new Date(day);
  endDate.setHours(+startHours);
  endDate.setMinutes(+startMinutes);
  endDate.setMinutes(endDate.getMinutes() + minutes);

  const startDate = `${startYear}${startMonth}${startDay}T${startHours}${startMinutes}`;
  const endDateString = `${endDate.getFullYear()}${String(endDate.getMonth() + 1).padStart(2, "0")}${String(endDate.getDate()).padStart(2, "0")}T${String(endDate.getHours()).padStart(2)}${String(endDate.getMinutes()).padStart(2, "0")}`;
  const dates = `${startDate}/${endDateString}`;
  const googleCalendatUrl = `https://calendar.google.com/calendar/r/eventedit?text=Встреча+Tinkoff&dates=${dates}&location=${place}`;

  return googleCalendatUrl;
};

export default generateGCal;
