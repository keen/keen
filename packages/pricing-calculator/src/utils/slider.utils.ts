export type Interval = {
  minimum: number;
  maximum: number;
  step: number;
};

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

export const getIndex = (x: number, stepDimension: number) => {
  let index = Math.floor(x / stepDimension);

  if (x !== 0 && x % stepDimension === 0) {
    index -= 1;
  }

  return index;
};
