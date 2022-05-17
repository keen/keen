import React from 'react';
import { render as rtlRender } from '@testing-library/react';

import MetricIcon from './metric-icon.component';

test('should render children', () => {
  const Children = () => <span>children</span>;
  const { getByText } = rtlRender(
    <MetricIcon position="top" baseColor="black" circleStyle="solid">
      <Children />
    </MetricIcon>
  );

  expect(getByText('children')).toBeInTheDocument();
});
