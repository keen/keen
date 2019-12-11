import React from 'react';
import { LegendProps } from 'recharts';

import { Title, Box } from '@keen/ui-core';

const Legend = ({ payload }: LegendProps) => {
  return (
    <ul>
      {payload.map((entry, index) => (
        <li key={`item-${index}`}>
          <Box>
            <Title level={6}>{entry.value}</Title>
          </Box>
        </li>
      ))}
    </ul>
  );
};

export default Legend;
