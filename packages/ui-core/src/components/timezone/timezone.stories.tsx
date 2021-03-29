import * as React from 'react';
import { boolean, select } from '@storybook/addon-knobs';

import Timezone from './timezone.component';
import { timezones } from './timezone.fixtures';
import { DropdownPosition } from './types';

export default {
  title: 'Components / Timezone',
  parameters: {
    component: Timezone,
    componentSubtitle: 'Timezone component - composed from atomic elements',
  },
};

const positionVariants = ['top', 'bottom'];

export const Basic = () => {
  const [timezone, setTimezone] = React.useState(null);
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: 300,
      }}
    >
      <div style={{ width: 300 }}>
        <Timezone
          timezoneLabel="Timezone"
          timezonePlaceholderLabel="Search by timezone name or offset"
          emptySearchLabel="No timezone found with this name"
          onChange={(tz) => setTimezone(tz)}
          timezone={timezone}
          timezones={timezones}
          disableSelection={boolean('Disable selection', false, 'Timezone')}
          dropdownPosition={
            select(
              'Dropdown position',
              positionVariants,
              positionVariants[0],
              'Timezone'
            ) as DropdownPosition
          }
        />
      </div>
    </div>
  );
};
