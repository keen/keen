import React, { FC, memo } from 'react';
import dayjs from 'dayjs';
import utcPlugin from 'dayjs/plugin/utc';
import timezonePlugin from 'dayjs/plugin/timezone';

import { Timeframe } from '@keen.io/query';
import { setTimezoneOffset } from '@keen.io/time-utils';

import { Container, TimeLabel, TimeRow } from './absolute-time.styles';

import { ReactCalendar } from '../date-picker';

dayjs.extend(utcPlugin);
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
    const startDate = new Date(start.substring(0, 19));
    const endDate = new Date(end.substring(0, 19));

    return (
      <Container data-testid="absolute-time">
        <TimeRow>
          <TimeLabel>{startDateLabel}</TimeLabel>
          <ReactCalendar
            id={`${id}-start`}
            date={startDate}
            onChange={(date) =>
              onChange({
                start: dayjs(setTimezoneOffset(date.toString(), timezone))
                  .utc()
                  .tz(timezone)
                  .format(),
                end,
              })
            }
          />
        </TimeRow>
        <TimeRow>
          <TimeLabel>{endDateLabel}</TimeLabel>
          <ReactCalendar
            id={`${id}-end`}
            date={endDate}
            onChange={(date) =>
              onChange({
                start,
                end: dayjs(setTimezoneOffset(date.toString(), timezone))
                  .utc()
                  .tz(timezone)
                  .format(),
              })
            }
          />
        </TimeRow>
      </Container>
    );
  }
);

AbsoluteTime.displayName = 'AbsoluteTime';

export default AbsoluteTime;
