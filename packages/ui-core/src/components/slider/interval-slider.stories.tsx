import * as React from 'react';
import { colors } from '@keen.io/colors';

import { IntervalSlider } from './interval-slider.component';

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

export default {
  title: 'Components|Interval Slider',
  parameters: {
    component: IntervalSlider,
    componentSubtitle: 'Slider that operates on custom intervals and steps',
  },
};

export const basic = () => (
  <div style={{ width: '300px', margin: '20px' }}>
    <IntervalSlider
      colorSteps={5}
      colors={Object.values(colors.orange)}
      intervals={intervals}
    />
  </div>
);

export const withRuler = () => (
  <div style={{ width: '300px', margin: '20px' }}>
    <IntervalSlider
      railSettings={{ size: 6, borderRadius: 3 }}
      colorSteps={5}
      colors={Object.values(colors.lightBlue)}
      intervals={intervals}
    />
    <Ruler layout="horizontal" ticks={rulerSettings} />
  </div>
);

withRuler.story = {
  parameters: {
    docs: {
      storyDescription: 'Slider integrated with `<Ruler />` component',
    },
  },
};
