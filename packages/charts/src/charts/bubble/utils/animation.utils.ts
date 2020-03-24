export const randomizeVector = () => {
  const min = -10;
  const max = 10;
  return [
    Math.floor(Math.random() * (max - min + 1)) + min,
    Math.floor(Math.random() * (max - min + 1)) + min,
  ];
};
