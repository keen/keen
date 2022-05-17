import React, { ComponentProps } from 'react';
import { fireEvent, render as rtlRender } from '@testing-library/react';
import MockDate from 'mockdate';
import dayjs from 'dayjs';
import timezonePlugin from 'dayjs/plugin/timezone';
import utcPlugin from 'dayjs/plugin/utc';
import 'jest-styled-components';

import AbsoluteTime from './absolute-time.component';

dayjs.extend(timezonePlugin);
dayjs.extend(utcPlugin);

beforeEach(() => {
  MockDate.set(new Date());
});

afterEach(() => {
  MockDate.reset();
});

const render = (
  overProps: Partial<ComponentProps<typeof AbsoluteTime>> = {}
) => {
  const props = {
    id: 'date',
    start: '2020-07-29T12:00:00Z',
    end: '2020-07-30T00:00:00Z',
    timezone: 'UTC',
    startDateLabel: 'from',
    endDateLabel: 'to',
    onChange: jest.fn(),
    ...overProps,
  };

  const wrapper = rtlRender(<AbsoluteTime {...props} />);

  return {
    props,
    wrapper,
  };
};

test('renders date picker for timeframe start', () => {
  const {
    wrapper: { getByTestId, getByDisplayValue },
  } = render();
  const input = getByDisplayValue('2020-07-29');
  fireEvent.click(input);

  const container = getByTestId('date-start');

  expect(container).toMatchSnapshot();
});

test('renders date picker for timeframe end', () => {
  const {
    wrapper: { getByTestId, getByDisplayValue },
  } = render();

  const input = getByDisplayValue('2020-07-30');
  fireEvent.click(input);

  const container = getByTestId('date-end');

  expect(container).toMatchSnapshot();
});
