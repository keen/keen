import React, { FC, memo } from 'react';
import dayjs from 'dayjs';
import timezonePlugin from 'dayjs/plugin/timezone';

import { Timeframe } from '@keen.io/query';

import { Container, TimeLabel, TimeRow } from './absolute-time.styles';

import { ReactCalendar } from '../date-picker';

dayjs.extend(timezonePlugin);

type Props = {
  /** Unique identifer */
  id: string;
  /** Time start */
  start: string;
  /** Time end */
  end: string;
  /** Absolute time change event handler */
  onChange: (time: Timeframe) => void;
  /** Timezone value */
  timezone: string;
  /** Start date label */
  startDateLabel: string;
  /** End date label */
  endDateLabel: string;
};

const AbsoluteTime: FC<Props> = memo(
  ({ id, start, end, timezone, startDateLabel, endDateLabel, onChange }) => {
    const startDate = dayjs(start).tz(timezone).toDate();
    const endDate = dayjs(end).tz(timezone).toDate();

    return (
      <Container data-testid="absolute-time">
        <TimeRow>
          <TimeLabel>{startDateLabel}</TimeLabel>
          <ReactCalendar
            id={`${id}-start`}
            date={startDate}
            onChange={(date) => onChange({ start: date.toISOString(), end })}
          />
        </TimeRow>
        <TimeRow>
          <TimeLabel>{endDateLabel}</TimeLabel>
          <ReactCalendar
            id={`${id}-end`}
            date={endDate}
            onChange={(date) => onChange({ start, end: date.toISOString() })}
          />
        </TimeRow>
      </Container>
    );
  }
);

AbsoluteTime.displayName = 'AbsoluteTime';

export default AbsoluteTime;
