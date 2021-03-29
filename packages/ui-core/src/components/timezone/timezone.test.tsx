import React from 'react';
import { render as rtlRender, fireEvent } from '@testing-library/react';

import Timezone from './timezone.component';

import { timezones } from './timezone.fixtures';

const render = (overProps: any = {}) => {
  const props = {
    timezones,
    timezone: timezones[0].name,
    timezoneLabel: 'Timezone',
    timezonePlaceholderLabel: 'Placeholder',
    onChange: jest.fn(),
    ...overProps,
  };

  const wrapper = rtlRender(<Timezone {...props} />);

  return {
    props,
    wrapper,
  };
};

test('shows the current timezone', () => {
  const {
    props,
    wrapper: { getByText },
  } = render();

  expect(getByText(props.timezone)).toBeInTheDocument();
});

test('allows user to select timezone', () => {
  const {
    props,
    wrapper: { getByTestId, getByText },
  } = render();

  const field = getByTestId('dropable-container');
  fireEvent.click(field);

  const element = getByText(timezones[1].name);
  fireEvent.click(element);

  expect(props.onChange).toHaveBeenCalledWith(timezones[1].name);
});

test('shows placeholder text when timezone is not selected', () => {
  const {
    props,
    wrapper: { getByText },
  } = render({ timezone: null });

  expect(getByText(props.timezonePlaceholderLabel)).toBeInTheDocument();
});

test('timezones list should not appear when selection is disabled', () => {
  const {
    wrapper: { getByTestId, queryByTestId },
  } = render();

  const field = getByTestId('dropable-container');
  fireEvent.click(field);

  expect(queryByTestId('timezones-list')).toBeNull();
});
