import * as React from 'react';
import moment from 'moment-timezone';
import { action } from '@storybook/addon-actions';

import DatePicker from './date-picker.component';

export default {
  title: 'Components / DatePicker',
  parameters: {
    component: DatePicker,
    componentSubtitle: 'DatePicker component - composed from atomic elements',
  },
};

export const basic = () => {
  return (
    <DatePicker
      date={moment.utc()}
      id="datepicker"
      onChange={action('change')}
    />
  );
};
