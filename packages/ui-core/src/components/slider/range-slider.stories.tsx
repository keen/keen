import * as React from 'react';
import { colors } from '@keen.io/colors';

import { RangeSlider } from './range-slider.component';

export default {
  title: 'Components|Range Slider',
  parameters: {
    component: RangeSlider,
    componentSubtitle: 'Slider that operates on range',
  },
};

export const horizontal = () => (
  <div style={{ width: '300px', margin: '20px' }}>
    <RangeSlider
      colors={Object.values(colors.purple)}
      minimum={0}
      maximum={500}
    />
  </div>
);

export const horizontalWithRuler = () => (
  <div style={{ width: '300px', margin: '20px' }}>
    <RangeSlider
      colors={Object.values(colors.purple)}
      minimum={0}
      maximum={500}
    />
  </div>
);

export const vertical = () => (
  <div style={{ height: '300px', margin: '20px' }}>
    <RangeSlider
      layout="vertical"
      colors={Object.values(colors.orange)}
      minimum={50}
      maximum={150}
    />
  </div>
);
