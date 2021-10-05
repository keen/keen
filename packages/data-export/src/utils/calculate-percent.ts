export const calculatePercent = (value: number, totalValue: number) => {
  if (!value) return 0;
  if (totalValue === 0) return 0;
  return parseFloat((Math.round(value * 100) / totalValue).toFixed(1));
};
