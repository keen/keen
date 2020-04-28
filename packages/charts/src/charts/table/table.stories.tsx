import React from 'react';
import styled from 'styled-components';
import { color } from '@storybook/addon-knobs';
import { data } from './table.fixtures';
import { action } from '@storybook/addon-actions';

import TableChart from './table-chart.component';

export default {
  title: 'Visualizations|Table Chart|Plot',
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
        color={color('Main color', '#27566d', 'Chart')}
        onResize={action('onResize')}
      />
    </Container>
  );
};
