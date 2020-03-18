export const calculatePercentage = (
  x: number,
  sliderWidth: number,
  max: number,
  min: number,
  step?: number
) =>
  Math.round(
    Math.round((((x * 100) / sliderWidth / 100) * (max - min)) / step) * step
  );

export const colorsString = (colors: string[], colorSteps: number) => {
  const newColors = colors.slice(0, colorSteps);
  return newColors.join(', ');
};

export const onChangeValue = (
  controls: number,
  valMin: number,
  valMax: number
) => (controls === 2 ? { min: valMin, max: valMax } : valMin);

export const calculateValueStep = (x: number, step: number) =>
  Math.round(x / step) * step;
