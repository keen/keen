import * as React from 'react';

import { Ruler } from './ruler.component';

export default {
  title: 'Components|Ruler',
  parameters: {
    component: Ruler,
    componentSubtitle: 'Displays customized "ruler" with labels',
  },
};

export const horizontal = () => (
  <div style={{ width: '300px' }}>
    <Ruler
      layout="horizontal"
      ticks={[
        { position: '0%', label: '0' },
        { position: '50%', label: 'Middle' },
        { position: '100%', label: '±' },
      ]}
    />
  </div>
);

export const vertical = () => (
  <div style={{ height: '200px' }}>
    <Ruler
      layout="vertical"
      ticks={[
        { position: '0%', label: '±' },
        { position: '50%', label: 150 },
        { position: '100%', label: '%' },
      ]}
    />
  </div>
);
