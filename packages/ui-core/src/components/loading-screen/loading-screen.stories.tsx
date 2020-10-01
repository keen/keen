import * as React from 'react';

import LoadingScreen from './loading-screen.component';

export default {
  title: 'Others/Components/Loading Screen',
  parameters: {
    component: LoadingScreen,
    componentSubtitle: 'Loading Screen component',
  },
};

export const basic = () => (
  <div style={{ width: '400px', height: '400px' }}>
    <LoadingScreen title="Loading" />
  </div>
);
