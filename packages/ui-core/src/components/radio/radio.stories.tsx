import * as React from 'react';
import { boolean } from '@storybook/addon-knobs';

import { Radio } from './radio.component';

export default {
  title: 'Components / Forms / Radio',
  parameters: {
    component: Radio,
    componentSubtitle: 'Component used to describe a set of related options.',
  },
};

export const withKnobs = () => <Radio isActive={boolean('Active', false)} />;
