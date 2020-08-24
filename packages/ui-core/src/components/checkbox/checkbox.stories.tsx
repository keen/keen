import * as React from 'react';
import { boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import { Checkbox } from './checkbox.component';

export default {
  title: 'Components| Forms / Checkbox',
  parameters: {
    component: Checkbox,
    componentSubtitle: 'Checkbox component',
  },
};

export const primary = () => (
  <Checkbox
    id="checkbox"
    onChange={action('onChange')}
    checked={boolean('Checked', false)}
  />
);

export const secondary = () => (
  <Checkbox
    id="checkbox"
    type="secondary"
    onChange={action('onChange')}
    checked={boolean('Checked', false)}
  />
);
