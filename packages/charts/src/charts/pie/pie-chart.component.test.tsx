import React from 'react';
import {
  render as rtlRender,
  fireEvent,
  waitFor,
} from '@testing-library/react';

import { chartData as data } from './pie-chart.fixtures';

import PieChart from './pie-chart.component';

const render = (overProps: any = {}) => {
  const svgDimensions = { width: 700, height: 500 };
  const labelSelector = 'name';
  const keys = ['buy', 'sold'];
  const formatTooltip = (value) => `$${value}`;

  const props = {
    svgDimensions,
    data,
    labelSelector,
    keys,
    formatTooltip,
    ...overProps,
  };

  const wrapper = rtlRender(<PieChart {...props} />);

  return {
    wrapper,
    props,
  };
};

jest.useFakeTimers();

test('formats tooltip value', async () => {
  const {
    wrapper: { getByTestId, getByText },
    props: { data, formatTooltip, labelSelector, keys },
  } = render();

  jest.runAllTimers();

  const [firstSeries] = data;
  const label = firstSeries[labelSelector];
  const result = keys.reduce((acc, val) => acc + firstSeries[val], 0);

  const slice = getByTestId(label);
  fireEvent.mouseMove(slice.querySelector('path'));

  await waitFor(() => {
    expect(getByText(label)).toBeInTheDocument();

    expect(getByText(`${formatTooltip(result)}`)).toBeInTheDocument();
  });
});
