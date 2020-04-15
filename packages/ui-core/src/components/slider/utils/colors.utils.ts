export const stringifyColors = (colors: string[], colorSteps: number) => {
  const newColors = colors.slice(0, colorSteps);
  return newColors.join(', ');
};
