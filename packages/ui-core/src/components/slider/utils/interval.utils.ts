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
  const absosulteIntervalPosition =
    ((controlPosition - dimensionOffset) / stepDimension) * 100;

  const { minimum, maximum, step } = interval;

  const stepsInInterval = (maximum - minimum) / step;
  const intervalValue = Math.round(
    (absosulteIntervalPosition * stepsInInterval) / 100
  );

  return intervalValue * step + minimum;
};
