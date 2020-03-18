import * as React from 'react';
import { number, select, array, color, text } from '@storybook/addon-knobs';

import { Slider } from './slider.component';

export default {
  title: 'Components|Slider',
  parameters: {
    component: Slider,
    componentSubtitle: 'Slider component for charts',
  },
};

const controlsOptions = {
  1: 1,
  2: 2,
};

const controlKnobs = (
  namespace: string,
  defaultValue: number = controlsOptions[1]
) => select('Controls', controlsOptions, defaultValue, namespace);

const colors = [
  '#FFFFFF',
  '#85B4C3',
  '#CB5623',
  '#E29B1E',
  '#487650',
  '#F4A083',
];

export const slider = () => (
  <>
    <Slider
      steps={number('Steps', 0, {}, 'Slider')}
      colors={array('Colors', colors, ', ', 'Slider')}
      colorSteps={number('Color steps', 2, {}, 'Slider')}
      onChange={res => {
        console.log(res);
      }}
      controls={{
        number: controlKnobs('Slider', 1) as any,
        size: number('Size', 12, {}, 'Controls'),
        background: color('Background', '#fff', 'Controls'),
        border: text('Border', '2px solid #CA8917', 'Controls'),
      }}
      offRange={{
        background: color('Background', '#E1E2E4', 'Off Range'),
      }}
    />
  </>
);
