export const stringifyColors = (colors: string[], zeroPoint: number) => {
  const newColors = colors.map((color) => {
    if (color === '#FFFFFF') return `${color} ${zeroPoint}%`;
    return color;
  });
  return newColors.join(', ');
};
