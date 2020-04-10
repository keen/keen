import * as React from 'react';

import { IntervalSlider } from './interval-slider.component';

import Ruler from '../../ruler';

const intervals = [
  { minimum: 0, maximum: 100, step: 1 },
  { minimum: 100, maximum: 1000, step: 100 },
  { minimum: 1000, maximum: 10000, step: 1000 },
];

const sasa = intervals.map((_x, idx) => ({
  position: `${(100 / intervals.length) * (idx + 1)}%`,
  label: 'kaczka',
}));

const rulerSettings = [
  {
    label: '0',
    position: '0%',
  },
  ...sasa,
];

export default {
  title: 'Components|Interval Slider',
  parameters: {
    component: IntervalSlider,
    componentSubtitle: 'Slider that operates on custom intervals and steps',
  },
};

export const basic = () => (
  <div style={{ width: '300px' }}>
    <IntervalSlider colors={['red', 'blue']} intervals={intervals} />
  </div>
);

export const withRuler = () => (
  <div style={{ width: '300px', marginTop: '40px', marginLeft: '50px' }}>
    <IntervalSlider colors={['red', 'blue']} intervals={intervals} />
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
