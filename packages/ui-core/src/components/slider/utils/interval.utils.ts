import { Interval } from '../types';

type Options = {
  controlPosition: number;
  currentIndex: number;
  stepDimension: number;
  interval: Interval;
};

export const calculateIntervalValue = ({
  controlPosition,
  currentIndex,
  stepDimension,
  interval,
}: Options) => {
  const dimensionOffset = currentIndex * stepDimension;
  const absoluteIntervalPosition =
    ((controlPosition - dimensionOffset) / stepDimension) * 100;

  const { minimum, maximum, step } = interval;

  const stepsInInterval = (maximum - minimum) / step;
  const intervalValue = Math.round(
    (absoluteIntervalPosition * stepsInInterval) / 100
  );

  return intervalValue * step + minimum;
};

export const getIndex = (x: number, stepDimension: number) => {
  let index = Math.floor(x / stepDimension);

  if (x !== 0 && x % stepDimension === 0) {
    index -= 1;
  }

  return index;
};

export const getInitialOffset = (
  initialValue: number,
  stepDimension: number,
  intervals: Interval[]
) => {
  let offset = initialValue;
  let index = 0;
  intervals.forEach((interval, idx) => {
    if (initialValue > interval.minimum && initialValue <= interval.maximum) {
      offset =
        (initialValue * stepDimension) / interval.maximum + stepDimension * idx;
      index = idx;
    }
  });

  return {
    offset,
    index,
  };
};
