export const getTimeOptions = (length: number) =>
  Array.from({ length }, (_, idx) => ({
    label: idx < 10 ? `0${idx}` : `${idx}`,
    value: idx < 10 ? `0${idx}` : `${idx}`,
  }));
