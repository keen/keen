import { calculateIntervalValue } from '@keen.io/ui-core';

type Interval = {
  minimum: number;
  maximum: number;
  step: number;
};

export const getIndex = (x: number, stepDimension: number) => {
  let index = Math.floor(x / stepDimension);

  if (x !== 0 && x % stepDimension === 0) {
    index -= 1;
  }

  return index;
};

export const convertPositionToValue = (
  position: string,
  intervals: Interval[],
  sliderDimension: number
) => {
  const controlPosition = (parseFloat(position) / 100) * sliderDimension;
  const stepDimension = sliderDimension / intervals.length;
  const index = getIndex(controlPosition, stepDimension);
  const value = calculateIntervalValue({
    controlPosition,
    interval: intervals[index],
    currentIndex: index,
    stepDimension,
  });

  return value;
};
