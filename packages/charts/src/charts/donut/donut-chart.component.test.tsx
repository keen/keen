import React from 'react';
import {
  render as rtlRender,
  fireEvent,
  waitFor,
  act,
} from '@testing-library/react';

import DonutChart from './donut-chart.component';

const render = (overProps: any = {}) => {
  const data = [
    { name: 'Books', buy: 10, sold: 12 },
    { name: 'Apps', buy: 20, sold: 12 },
    { name: 'Games', buy: 5, sold: 34 },
    { name: 'Sounds', buy: 10, sold: 15 },
    { name: 'Cars', buy: 1, sold: 2 },
    { name: 'Bikes', buy: 3, sold: 2 },
  ];
  const svgDimensions = { width: 700, height: 500 };
  const labelSelector = 'name';
  const keys = ['buy', 'sold'];
  const formatTooltip = value => `$${value}`;

  const props = {
    svgDimensions,
    data,
    labelSelector,
    keys,
    formatTooltip,
    ...overProps,
  };

  const wrapper = rtlRender(<DonutChart {...props} />);

  return {
    wrapper,
    props,
  };
};

test('formats tooltip value', async () => {
  const {
    wrapper: { getByTestId, getByText },
  } = render();

  const slice = await waitFor(() => getByTestId('donut-slice-17.5%'));

  act(() => {
    fireEvent.mouseMove(slice.querySelector('path'));
  });

  await waitFor(() => {
    expect(getByText(/Books - \$22/i)).toBeInTheDocument();
  });
});
