import React from 'react';
import styled from 'styled-components';
import { color, text, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { PaginatedTable } from '@keen.io/ui-core';
import { ChartEvents } from '@keen.io/charts';
import { PubSub } from '@keen.io/pubsub';

import { data } from './table.fixtures';

import TableChart from './table-chart.component';

import { theme } from '../../theme';

export default {
  title: 'Visualizations /Table Chart / Plot',
  parameters: {
    component: TableChart,
  },
};

const Container = styled.div`
  width: 700px;
  height: 500px;
`;

export const Plot = () => {
  return (
    <Container>
      <TableChart
        data={data}
        theme={{
          ...theme,
          table: {
            ...theme.table,
            mainColor: color('Main color', '#27566d', 'Chart'),
          },
        }}
        onResize={action('onResize')}
        formatValue={{
          platform: (val) => (Array.isArray(val) ? 'Multi-platform' : val),
          price: text(
            'Format price values',
            '${number; 0.00; add; 100}$',
            'Chart'
          ),
        }}
      />
    </Container>
  );
};
const pubsub = new PubSub();
const chartEvents = new ChartEvents({ pubsub });

chartEvents.subscribe(({ eventName, meta }) => console.log(eventName, meta));

export const Paginated = () => {
  return (
    <Container>
      <button
        onClick={() =>
          chartEvents.publish({ eventName: '@table/deselect-columns' })
        }
      >
        Clear selection
      </button>
      <PaginatedTable
        data={data}
        theme={{
          ...theme,
          table: {
            ...theme.table,
            mainColor: color('Main color', '#27566d', 'Chart'),
          },
        }}
        formatValue={{
          price: text(
            'Format price values',
            '${number; 0.00; add; 100}$',
            'Chart'
          ),
        }}
        enableEditMode={boolean('Edit mode', false, 'Chart')}
        chartEvents={chartEvents}
      />
    </Container>
  );
};
