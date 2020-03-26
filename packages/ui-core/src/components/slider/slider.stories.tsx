import * as React from 'react';
import {
  number,
  select,
  array,
  color,
  text,
  boolean,
} from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import styled from 'styled-components';

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

const tooltipHorizontalOpts = {
  top: 'top',
  bottom: 'bottom',
};

const tooltipHorizontal = (
  namespace: string,
  defaultValue: string = tooltipHorizontalOpts[2]
) => select('Position', tooltipHorizontalOpts, defaultValue, namespace);

const tooltipVerticalOpts = {
  left: 'left',
  right: 'right',
};

const tooltipVertical = (
  namespace: string,
  defaultValue: string = tooltipVerticalOpts[1]
) => select('Position', tooltipVerticalOpts, defaultValue, namespace);

const colors = [
  '#FFFFFF',
  '#85B4C3',
  '#CB5623',
  '#E29B1E',
  '#487650',
  '#F4A083',
];

const Container = styled.div`
  width: 500px;
  height: 300px;
  padding 50px;
`;

export const horizontal = () => (
  <Container>
    <Slider
      min={number('Min', 0, {}, 'Slider')}
      max={number('Max', 100, {}, 'Slider')}
      steps={number('Steps', 0, {}, 'Slider')}
      colors={array('Colors', colors, ', ', 'Slider')}
      colorSteps={number('Color steps', 2, {}, 'Slider')}
      onChange={action('onChange')}
      size={number('Size', 4, {}, 'Slider')}
      tooltip={{
        enabled: boolean('Enabled', true, 'Tooltip'),
        position: tooltipHorizontal('Tooltip', 'bottom') as any,
      }}
      controls={{
        number: controlKnobs('Controls', 1) as any,
        size: number('Size', 16, {}, 'Controls'),
        background: color('Background', '#fff', 'Controls'),
        border: text('Border', '2px solid #CA8917', 'Controls'),
      }}
      offRange={{
        background: color('Background', '#E1E2E4', 'Off Range'),
      }}
      ruler={boolean('Ruler', true, 'Slider')}
    />
  </Container>
);

export const vertical = () => (
  <Container>
    <Slider
      min={number('Min', 0, {}, 'Slider')}
      max={number('Max', 100, {}, 'Slider')}
      steps={number('Steps', 0, {}, 'Slider')}
      colors={array('Colors', colors, ', ', 'Slider')}
      colorSteps={number('Color steps', 2, {}, 'Slider')}
      onChange={action('onChange')}
      size={number('Size', 4, {}, 'Slider')}
      layout="vertical"
      tooltip={{
        enabled: boolean('Enabled', true, 'Tooltip'),
        position: tooltipVertical('Tooltip', 'right') as any,
      }}
      controls={{
        number: controlKnobs('Controls', 1) as any,
        size: number('Size', 16, {}, 'Controls'),
        background: color('Background', '#fff', 'Controls'),
        border: text('Border', '2px solid #CA8917', 'Controls'),
      }}
      offRange={{
        background: color('Background', '#E1E2E4', 'Off Range'),
      }}
      ruler={boolean('Ruler', true, 'Slider')}
    />
  </Container>
);
