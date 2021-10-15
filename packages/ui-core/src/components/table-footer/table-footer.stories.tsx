import * as React from 'react';

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
    <div style={{ width: '400px', height: '300px' }}>
      <TableFooter rows={100} />
    </div>
  );
};
