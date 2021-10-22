/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import { mockAllIsIntersecting } from 'react-intersection-observer/test-utils';
import { ChartEvents } from '@keen.io/charts';
import 'jest-styled-components';

jest.mock('@keen.io/charts', () => ({
  ...jest.requireActual('@keen.io/charts'),
  ChartEvents: jest.fn().mockImplementation(() => ({
    subscribe: jest.fn().mockImplementation(() => function () {}),
  })),
}));

import { TableChartWidget } from './table-chart.widget';

import { widgetSettings } from '../../widget-settings';
import { chartData } from './table-chart.widget.fixtures';

const render = (overProps: any = {}) => {
  const props = {
    data: chartData,
    ...widgetSettings,
    ...overProps,
  };

  const wrapper = rtlRender(<TableChartWidget {...props} />);

  return {
    wrapper,
    props,
  };
};

mockAllIsIntersecting(true);

beforeEach(() => jest.clearAllMocks());

test('do not renders widget heading section', () => {
  const {
    wrapper: { queryByTestId },
  } = render();

  expect(queryByTestId('widget-heading')).not.toBeInTheDocument();
});

test('renders widget title', () => {
  const title = {
    ...widgetSettings.title,
    content: 'title',
  };
  const {
    wrapper: { getByText },
  } = render({ title });
  const titleElement = getByText(title.content);

  expect(titleElement).toBeInTheDocument();
  expect(titleElement).toMatchSnapshot();
});

test('renders widget subtitle', () => {
  const subtitle = {
    ...widgetSettings.subtitle,
    content: 'subtitle',
  };
  const {
    wrapper: { getByText },
  } = render({ subtitle });
  const titleElement = getByText(subtitle.content);

  expect(titleElement).toBeInTheDocument();
  expect(titleElement).toMatchSnapshot();
});

test('renders table plot component', () => {
  const {
    wrapper: { getByTestId },
  } = render();

  expect(getByTestId('table-chart-plot')).toBeInTheDocument();
});

test('creates ChartEvents class instance when table is rendered in edit mode', () => {
  const eventBus = jest.fn();

  const {} = render({
    inEditMode: true,
    eventBus,
  });

  expect(ChartEvents).toHaveBeenCalledTimes(1);
});

test('do not creates ChartEvents class instance', () => {
  const eventBus = jest.fn();

  const {} = render({
    inEditMode: false,
    eventBus,
  });

  expect(ChartEvents).not.toHaveBeenCalled();
});
