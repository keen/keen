/* eslint-disable react-hooks/rules-of-hooks */
import * as React from 'react';
import { colors } from '@keen.io/colors';
import { BodyText } from '@keen.io/typography';

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
  title: 'Components /Interval Slider',
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

withRuler.story = {
  parameters: {
    docs: {
      storyDescription: 'Slider integrated with `<Ruler />` component',
    },
  },
};

const themingIntervals = [{ minimum: 0, maximum: 35, step: 5 }];

const generateRulerSettings = ({ minimum, maximum, step }) => {
  const middlePoints = [];
  const numberOfSteps = Math.floor((maximum - minimum) / step);

  if (numberOfSteps >= 1) {
    for (let i = 1; i <= numberOfSteps; i++) {
      middlePoints.push({
        label: `${minimum + i * step}`,
        position: `${(100 * (minimum + i * step)) / maximum}%`,
      });
    }
  }

  return [
    {
      label: minimum,
      position: '0%',
    },
    ...middlePoints,
    {
      label: maximum,
      position: '100%',
    },
  ];
};

const LabelWrapper = ({ children }) => (
  <div style={{ marginTop: 10 }}>{children}</div>
);

export const withRulerTheming = () => {
  const [intervalOffset, setIntervalOffset] = React.useState(0);
  const onRulerClick = (position: string) => {
    const controlPosition = Math.round(
      (parseFloat(position) / 100) * dimension
    );
    const stepDimension = dimension / themingIntervals.length;
    const index = getIndex(controlPosition, stepDimension);
    const value = calculateIntervalValue({
      controlPosition,
      interval: themingIntervals[index],
      currentIndex: index,
      stepDimension,
    });

    setIntervalOffset(value);
  };
  return (
    <div style={{ width: '240px', margin: '20px' }}>
      <IntervalSlider
        railSettings={{ size: 4, borderRadius: 3 }}
        colorSteps={0}
        colors={[colors.gray[400]]}
        intervals={themingIntervals}
        initialValue={intervalOffset}
        controlSettings={{
          size: 18,
          backgroundColor: colors.white[500],
          borderColor: colors.green[500],
        }}
      />
      <Ruler
        layout="horizontal"
        ticks={generateRulerSettings(themingIntervals[0])}
        onClick={onRulerClick}
        renderLabel={(label) => (
          <LabelWrapper>
            <BodyText
              variant="body3"
              fontWeight={label == intervalOffset ? 'bold' : 'normal'}
            >
              {label}
            </BodyText>
          </LabelWrapper>
        )}
      />
    </div>
  );
};

withRulerTheming.story = {
  parameters: {
    docs: {
      storyDescription:
        'Slider integrated with `<Ruler />` component and theming',
    },
  },
};
