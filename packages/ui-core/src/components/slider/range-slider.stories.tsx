import * as React from 'react';
import { colors } from '@keen.io/colors';

import { RangeSlider } from './range-slider.component';
import Ruler from '../ruler';

export default {
  title: 'Others/Components/Range Slider',
  parameters: {
    component: RangeSlider,
    componentSubtitle: 'Slider that operates on range custom range values',
  },
};

export const horizontal = () => (
  <div style={{ width: '300px', margin: '20px' }}>
    <RangeSlider
      colorSteps={3}
      colors={Object.values(colors.lightBlue)}
      minimum={0}
      maximum={500}
    />
  </div>
);

export const horizontalWithRuler = () => (
  <div style={{ width: '300px', margin: '20px' }}>
    <RangeSlider
      colors={Object.values(colors.blue)}
      colorSteps={5}
      minimum={0}
      maximum={500}
    />
    <Ruler
      layout="horizontal"
      ticks={[
        { position: '0%', label: 'Start' },
        { position: '50%', label: 'Middle' },
        { position: '100%', label: '±' },
      ]}
    />
  </div>
);

horizontalWithRuler.parameters = {
  docs: {
    storyDescription: 'Range slider integrated with `<Ruler />` component',
  },
};

export const vertical = () => (
  <div style={{ height: '160px', margin: '20px' }}>
    <RangeSlider
      layout="vertical"
      tooltipSettings={{
        enabled: true,
        position: 'right',
      }}
      colors={Object.values(colors.green)}
      minimum={50}
      maximum={150}
    />
  </div>
);

export const verticalWithRuler = () => (
  <div style={{ display: 'flex', height: '160px', margin: '20px' }}>
    <RangeSlider
      layout="vertical"
      tooltipSettings={{
        enabled: true,
        position: 'right',
      }}
      colorSteps={4}
      colors={Object.values(colors.orange)}
      minimum={50}
      maximum={150}
    />
    <Ruler
      layout="vertical"
      ticks={[
        { position: '0%', label: '0' },
        { position: '50%', label: '50%' },
        { position: '100%', label: '±' },
      ]}
    />
  </div>
);

verticalWithRuler.parameters = {
  docs: {
    storyDescription: 'Range slider integrated with `<Ruler />` component',
  },
};
