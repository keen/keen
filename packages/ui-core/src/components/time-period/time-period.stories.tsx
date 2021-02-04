import * as React from 'react';
import { action } from '@storybook/addon-actions';

import TimePeriod from './time-period.component';

export default {
  title: 'Components / TimePeriod',
  parameters: {
    component: TimePeriod,
    componentSubtitle: 'TimePeriod component - composed from atomic elements',
  },
};

export const basic = () => {
  return (
    <TimePeriod
      label="Time"
      unitsPlaceholder="Units"
      relativity="this"
      value={14}
      units="days"
      onChange={action('change')}
    />
  );
};
