import * as React from 'react';
import { number, color } from '@storybook/addon-knobs';
import { colors } from '@keen.io/colors';

import Loader from './loader.component';

export default {
  title: 'Components|Loader',
  parameters: {
    component: Loader,
    componentSubtitle: 'Displays animated brand loader',
  },
};

export const withKnobs = () => (
  <Loader
    fill={color('Color', colors.blue['500'], 'Loader')}
    width={number('Width', 50, {}, 'Loader')}
    height={number('Height', 50, {}, 'Loader')}
  />
);
