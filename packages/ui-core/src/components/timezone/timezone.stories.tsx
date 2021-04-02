import * as React from 'react';
import { boolean, text, number } from '@storybook/addon-knobs';

import Timezone from './timezone.component';
import { TimezoneError } from './components';
import { timezones } from './timezone.fixtures';
import { colors } from '@keen.io/colors';

export default {
  title: 'Components / Timezone',
  parameters: {
    component: Timezone,
    componentSubtitle: 'Timezone component - composed from atomic elements',
  },
};

export const Basic = () => {
  const [timezone, setTimezone] = React.useState(null);
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: text('Container height', '500px', 'Timezone'),
        background: colors.gray[100],
      }}
    >
      <div style={{ width: text('Control width', '300px', 'Timezone') }}>
        <Timezone
          timezoneLabel="Timezone"
          timezonePlaceholderLabel="Search by timezone name or offset"
          emptySearchLabel="No timezone found with this name"
          onChange={(tz) => setTimezone(tz)}
          timezone={timezone}
          timezones={timezones}
          disableSelection={boolean('Disable selection', false, 'Timezone')}
          dropdownHeight={number('Dropdown height', 150, {}, 'Timezone')}
        />
      </div>
    </div>
  );
};

export const Error = () => (
  <>
    <TimezoneError
      label="Timezone"
      placeholder={text('Placeholder', 'Select timezone', 'Timezone')}
      tooltipMessage={text(
        'Tooltip message',
        'We cannot load list of time zones. Try again later if you need to check data for specific time zone',
        'Timezone'
      )}
    />
  </>
);

Error.story = {
  parameters: {
    docs: {
      description: {
        story: 'Timezone select in error state',
      },
    },
  },
};
