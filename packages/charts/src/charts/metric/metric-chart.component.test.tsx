import React from 'react';
import { render as rtlRender } from '@testing-library/react';

import MetricChart from './metric-chart.component';
import { theme as defaultTheme } from '../../theme';

import { chartData } from './metric-chart.fixtures';

const render = (overProps: any = {}) => {
  const props = {
    data: chartData,
    labelSelector: 'day',
    keys: ['users'],
    ...overProps,
  };

  const wrapper = rtlRender(<MetricChart {...props} />);

  return {
    wrapper,
    props,
  };
};

test('applies format function', () => {
  const mockFn = jest.fn().mockImplementation((value) => `Total ${value}`);

  const {
    wrapper: { getByText },
  } = render({ formatValue: mockFn });

  expect(mockFn).toHaveBeenCalled();
  expect(getByText('Total 3281')).toBeInTheDocument();
});

test('applies format pattern', () => {
  const pattern = '${number; 0a}';
  const {
    wrapper: { getByText },
  } = render({ formatValue: pattern });

  expect(getByText('3k')).toBeInTheDocument();
});

test('renders <Excerpt /> component with percent difference', () => {
  const {
    wrapper: { getByText },
  } = render({ type: 'difference', usePercentDifference: true });

  expect(getByText('49.14%')).toBeInTheDocument();
});

test('renders <Excerpt /> component with value difference', () => {
  const {
    wrapper: { getByText },
  } = render({ type: 'difference' });

  expect(getByText('1.1k')).toBeInTheDocument();
});

test('renders <Excerpt /> component with compared value', () => {
  const {
    wrapper: { getByText },
  } = render({ type: 'comparison' });

  expect(getByText('1.1k')).toBeInTheDocument();
});

test('not renders <Excerpt /> component for metric with single data serie', () => {
  const [firstSerie] = chartData;
  const {
    wrapper: { queryByTestId },
  } = render({
    data: [firstSerie],
  });

  expect(queryByTestId('metric-excerpt-value')).toBeNull();
});

test('applies "typography" theming properties on metric value', () => {
  const {
    wrapper: { getByText },
  } = render();
  const { metric } = defaultTheme;
  const el = getByText('3281');

  expect(el.getAttribute('font-style')).toEqual(
    metric.value.typography.fontStyle
  );
  expect(el.getAttribute('font-weight')).toEqual(
    metric.value.typography.fontWeight
  );
  expect(el.getAttribute('font-size')).toEqual(
    metric.value.typography.fontSize.toString()
  );
  expect(el.getAttribute('font-family')).toEqual(
    metric.value.typography.fontFamily
  );
});

test('applies "typography" theming properties on excerpt label', () => {
  const {
    wrapper: { getByText },
  } = render({ type: 'difference' });
  const el = getByText('1.1k');
  const { metric } = defaultTheme;

  expect(el.getAttribute('font-style')).toEqual(
    metric.excerpt.typography.fontStyle
  );
  expect(el.getAttribute('font-weight')).toEqual(
    metric.excerpt.typography.fontWeight
  );
  expect(el.getAttribute('font-size')).toEqual(
    metric.excerpt.typography.fontSize.toString()
  );
  expect(el.getAttribute('font-family')).toEqual(
    metric.excerpt.typography.fontFamily
  );
});

test('renders prefix if provided', () => {
  const valuePrefix = 'prefix';
  const {
    wrapper: { getByText },
  } = render({ valuePrefix });

  expect(getByText(valuePrefix)).toBeInTheDocument();
});

test('applies "fontSize" property on prefix', () => {
  const valuePrefix = 'prefix';
  const {
    wrapper: { getByText },
  } = render({ valuePrefix });
  const el = getByText(valuePrefix);
  const { metric } = defaultTheme;

  expect(el.getAttribute('font-size')).toEqual(
    metric.prefix.typography.fontSize.toString()
  );
});

test('renders suffix if provided', () => {
  const valueSuffix = 'suffix';
  const {
    wrapper: { getByText },
  } = render({ valueSuffix });

  expect(getByText(valueSuffix)).toBeInTheDocument();
});

test('applies "fontSize" property on suffix', () => {
  const valueSuffix = 'suffix';
  const {
    wrapper: { getByText },
  } = render({ valueSuffix });
  const el = getByText(valueSuffix);
  const { metric } = defaultTheme;

  expect(el.getAttribute('font-size')).toEqual(
    metric.suffix.typography.fontSize.toString()
  );
});
