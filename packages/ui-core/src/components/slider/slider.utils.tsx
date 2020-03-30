import { Position } from '../../types';

export const calculatePercentage = (
  x: number,
  sliderSize: number,
  max: number,
  min: number,
  step?: number
) =>
  Math.round(
    Math.round((((x * 100) / sliderSize / 100) * (max - min)) / step) * step
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

export const calculateTicks = (
  min: number,
  max: number,
  steps: number,
  sliderSize: number,
  labelSize: number
) => {
  const ticks = [];
  const step = steps
    ? sliderSize / steps > labelSize
      ? steps
      : Math.round(sliderSize / labelSize)
    : 4;
  const tickSize = sliderSize / step;
  const valueSize = (max - min) / step;
  for (let i = 0; i < step + 1; i++) {
    ticks.push({
      pos: i * tickSize,
      val: Math.round(i * valueSize) + min,
    });
  }
  return ticks;
};

export const arrowReverse = (position: Position) => {
  switch (position) {
    case 'top':
      return 'bottom';
    case 'left':
      return 'right';
    case 'right':
      return 'left';
    case 'bottom':
      return 'top';

    default:
      return position;
  }
};
