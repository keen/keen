import * as React from 'react';
import { object, number } from '@storybook/addon-knobs';

import TableFooter from './table-footer.component';

export default {
  title: 'Components / Table Footer',
  parameters: {
    component: TableFooter,
    componentSubtitle: 'TableFooter component',
  },
};

export const Basic = () => {
  return (
    <div style={object('Container size', { width: '600px', height: '300px' })}>
      <TableFooter
        rows={1000}
        onItemsPerPageChange={(option) => console.log(option)}
        onPageChange={(page) => console.log(page)}
        totalPages={number('Total pages', 10)}
        page={number('Current page', 4)}
      />
    </div>
  );
};
