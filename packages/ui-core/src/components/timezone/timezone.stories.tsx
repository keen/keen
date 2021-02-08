import * as React from 'react';
import { action } from '@storybook/addon-actions';

import Timezone from './timezone.component';

export default {
  title: 'Components / Timezone',
  parameters: {
    component: Timezone,
    componentSubtitle: 'Timezone component - composed from atomic elements',
  },
};

export const basic = () => {
  return (
    <Timezone
      timezoneLabel="Timezone"
      timezonePlaceholderLabel="Select your timezone"
      onChange={action('click')}
    />
  );
};
