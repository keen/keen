import React from 'react';
import { render as rtlRender } from '@testing-library/react';

import MetricIcon from './metric-icon.component';

const props: any = {
  position: 'top',
  baseColor: 'black',
  circleStyle: 'solid',
};

test('should render children', () => {
  const Children = () => <span>children</span>;
  const { getByText } = rtlRender(
    <MetricIcon {...props}>
      <Children />
    </MetricIcon>
  );

  expect(getByText('children')).toBeInTheDocument();
});
