import React from 'react';
import styled from 'styled-components';
import { color, text, boolean } from '@storybook/addon-knobs';
import { PubSub } from '@keen.io/pubsub';

import { theme } from '../../theme';
import { ChartEvents } from '../../events';
import { data } from './table-chart.fixtures';
import TableChart from './table-chart.component';

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

const pubsub = new PubSub();
const chartEvents = new ChartEvents({ pubsub });

chartEvents.subscribe(({ eventName, meta }) => console.log(eventName, meta));

export const Plot = () => {
  return (
    <Container>
      <button
        onClick={() =>
          chartEvents.publish({ eventName: '@table/deselect-columns' })
        }
      >
        Clear selection
      </button>
      <TableChart
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
        columnsNamesMapping={{
          platform: 'Platform renamed',
        }}
        enableEditMode={boolean('Edit mode', false, 'Chart')}
        rowsSelection={boolean('Rows selection', true, 'Chart')}
        chartEvents={chartEvents}
      />
    </Container>
  );
};
