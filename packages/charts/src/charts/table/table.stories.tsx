import React from 'react';
import styled from 'styled-components';
import { color, text } from '@storybook/addon-knobs';
import { data } from './table.fixtures';
import { action } from '@storybook/addon-actions';

import TableChart from './table-chart.component';

import { theme } from '../../theme';
// import { PaginatedTable } from '@keen.io/ui-core';

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
//
// export const Paginated = () => {
//   return (
//     <Container>
//       <PaginatedTable
//         data={data}
//         theme={{
//           ...theme,
//           table: {
//             ...theme.table,
//             mainColor: color('Main color', '#27566d', 'Chart'),
//           },
//         }}
//         formatValue={{
//           price: text(
//             'Format price values',
//             '${number; 0.00; add; 100}$',
//             'Chart'
//           ),
//         }}
//       />
//     </Container>
//   );
// };
