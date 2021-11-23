/* eslint-disable react-hooks/rules-of-hooks */
import * as React from 'react';

import AbsoluteTime from './absolute-time.component';

export default {
  title: 'Components / AbsoluteTime',
  parameters: {
    component: AbsoluteTime,
    componentSubtitle: 'AbsoluteTime component - composed from atomic elements',
  },
};

export const basic = () => {
  const [date, setDate] = React.useState({
    start: '2021-10-01T00:00:00Z',
    end: '2021-12-01T12:00:00Z',
  });

  return (
    <AbsoluteTime
      id="absolute-time"
      timezone="UTC"
      onChange={(dates) => setDate(dates)}
      start={date.start}
      end={date.end}
      startDateLabel="From"
      endDateLabel="to"
    />
  );
};
