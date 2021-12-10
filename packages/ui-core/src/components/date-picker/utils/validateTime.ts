export const validateTime = (time: string) => {
  const regex = /^\d{2}:\d{2}$/g;
  const isFormatValid = regex.test(time);

  if (!isFormatValid) return false;

  const [hours, minutes] = time.split(':');

  const isHoursValid = Number(hours) >= 0 && Number(hours) < 24;
  const isMinutesValid = Number(minutes) >= 0 && Number(minutes) < 60;

  return isHoursValid && isMinutesValid;
};
