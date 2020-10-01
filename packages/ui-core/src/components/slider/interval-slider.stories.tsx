/* eslint-disable react-hooks/rules-of-hooks */
import * as React from 'react';
import { colors } from '@keen.io/colors';

import { IntervalSlider } from './interval-slider.component';
import { calculateIntervalValue, getIndex } from './utils';

import Ruler from '../ruler';

const intervals = [
  { minimum: 0, maximum: 100, step: 1 },
  { minimum: 100, maximum: 1000, step: 100 },
  { minimum: 1000, maximum: 10000, step: 1000 },
];

const rulerSettings = [
  {
    label: '0',
    position: '0%',
  },
  ...intervals.map(({ maximum }, idx) => ({
    position: `${(100 / intervals.length) * (idx + 1)}%`,
    label: maximum,
  })),
];

const dimension = 300;

export default {
  title: 'Others/Components/Interval Slider',
  parameters: {
    component: IntervalSlider,
    componentSubtitle: 'Slider that operates on custom intervals and steps',
  },
};

export const basic = () => (
  <div style={{ width: `${dimension}px`, margin: '20px' }}>
    <IntervalSlider
      colorSteps={5}
      colors={Object.values(colors.orange)}
      intervals={intervals}
    />
  </div>
);

export const withRuler = () => {
  const [intervalOffset, setIntervalOffset] = React.useState(0);
  const onRulerClick = (position: string) => {
    const controlPosition = Math.round(
      (parseFloat(position) / 100) * dimension
    );
    const stepDimension = dimension / intervals.length;
    const index = getIndex(controlPosition, stepDimension);
    const value = calculateIntervalValue({
      controlPosition,
      interval: intervals[index],
      currentIndex: index,
      stepDimension,
    });

    setIntervalOffset(value);
  };
  return (
    <div style={{ width: `${dimension}px`, margin: '20px' }}>
      <IntervalSlider
        railSettings={{ size: 6, borderRadius: 3 }}
        colorSteps={5}
        colors={Object.values(colors.lightBlue)}
        intervals={intervals}
        initialValue={intervalOffset}
      />
      <Ruler layout="horizontal" ticks={rulerSettings} onClick={onRulerClick} />
    </div>
  );
};

withRuler.parameters = {
  docs: {
    storyDescription: 'Slider integrated with `<Ruler />` component',
  },
};
