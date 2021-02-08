import * as React from 'react';
import { action } from '@storybook/addon-actions';

import RelativeTime from './relative-time.component';

export default {
  title: 'Components / RelativeTime',
  parameters: {
    component: RelativeTime,
    componentSubtitle: 'RelativeTime component - composed from atomic elements',
  },
};

export const basic = () => {
  return (
    <RelativeTime
      onChange={action('change')}
      relativity="this"
      value={14}
      units="days"
      timeLabel="Last"
      unitsPlaceholderLabel="Units"
      relativityTitleForTodayLabel="Include Today"
      relativityTitleLabel="Include current"
    />
  );
};
