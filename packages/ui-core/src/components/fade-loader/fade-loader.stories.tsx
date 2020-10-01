import * as React from 'react';
import { color } from '@storybook/addon-knobs';
import { colors } from '@keen.io/colors';

import { FadeLoader } from './fade-loader.component';

export default {
  title: 'Others/Components/Loaders / Fade',
  parameters: {
    component: FadeLoader,
    componentSubtitle: 'Displays animated brand loader',
  },
};

export const withKnobs = () => (
  <FadeLoader color={color('Color', colors.blue['500'], 'Loader')} />
);
