import * as React from 'react';
import moment from 'moment-timezone';
import { action } from '@storybook/addon-actions';

import DatePicker from './date-picker.component';
import ReactCalendar from './datePicker.component';

export default {
  title: 'Components / DatePicker',
  parameters: {
    component: DatePicker,
    componentSubtitle: 'DatePicker component - composed from atomic elements',
  },
};

export const Basic = () => {
  const [date, setDate] = React.useState(new Date());

  return (
    <>
      <DatePicker
        date={moment.utc()}
        id="datepicker"
        onChange={action('change')}
      />
      <div style={{ marginTop: 20 }}>
        <ReactCalendar
          id="reactCalendar"
          onChange={(date) => setDate(date)}
          date={date}
        />
      </div>
    </>
  );
};
