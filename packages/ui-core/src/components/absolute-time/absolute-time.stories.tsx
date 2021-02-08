import * as React from 'react';
import { action } from '@storybook/addon-actions';

import AbsoluteTime from './absolute-time.component';

export default {
  title: 'Components / AbsoluteTime',
  parameters: {
    component: AbsoluteTime,
    componentSubtitle: 'AbsoluteTime component - composed from atomic elements',
  },
};

export const basic = () => {
  return (
    <AbsoluteTime
      id="absolute-time"
      timezone="UTC"
      onChange={action('change')}
      start={new Date().toISOString()}
      end={new Date(Date.now() + 8.64e7).toISOString()}
      startDateLabel="From"
      endDateLabel="to"
    />
  );
};
