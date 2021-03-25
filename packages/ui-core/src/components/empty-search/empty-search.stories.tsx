import * as React from 'react';

import EmptySearch from './empty-search.component';

export default {
  title: 'Components /Empty Search',
  parameters: {
    component: EmptySearch,
    componentSubtitle: 'Empty Search component',
  },
};

export const basic = () => (
  <div style={{ width: '400px', height: '400px' }}>
    <EmptySearch message="Lorem ipsum dolor sit amet consectetur adipisicing elit." />
  </div>
);
