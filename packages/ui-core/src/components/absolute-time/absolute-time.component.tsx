import React, { FC, memo } from 'react';
import moment from 'moment-timezone';

import { Container, TimeLabel, TimeRow } from './absolute-time.styles';

import DatePicker from '../date-picker';

import { Timeframe, Timezones } from '../../types';

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
  timezone: Timezones;
  /** Start date label */
  startDateLabel: string;
  /** End date label */
  endDateLabel: string;
};

const AbsoluteTime: FC<Props> = memo(
  ({ id, start, end, timezone, startDateLabel, endDateLabel, onChange }) => {
    const startDate = moment(start).tz(timezone);
    const endDate = moment(end).tz(timezone);

    return (
      <Container data-testid="absolute-time">
        <TimeRow>
          <TimeLabel>{startDateLabel}</TimeLabel>
          <DatePicker
            id={`${id}-start`}
            date={startDate}
            onChange={(date) => onChange({ start: date, end })}
          />
        </TimeRow>
        <TimeRow>
          <TimeLabel>{endDateLabel}</TimeLabel>
          <DatePicker
            id={`${id}-end`}
            date={endDate}
            onChange={(date) => onChange({ start, end: date })}
          />
        </TimeRow>
      </Container>
    );
  }
);

AbsoluteTime.displayName = 'AbsoluteTime';

export default AbsoluteTime;
