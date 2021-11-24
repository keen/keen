import * as React from 'react';

import DatePicker from './date-picker.component';

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
        id="datepicker"
        onChange={(date) => setDate(date)}
        date={date}
      />
    </>
  );
};
