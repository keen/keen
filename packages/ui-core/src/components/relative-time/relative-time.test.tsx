import React, { ComponentProps } from 'react';
import { render as rtlRender, fireEvent } from '@testing-library/react';

import RelativeTime from './relative-time.component';
import { KEYBOARD_KEYS } from '../../constants';

const render = (
  overProps: Partial<ComponentProps<typeof RelativeTime>> = {}
) => {
  const props = {
    relativity: 'this',
    value: 14,
    units: 'days',
    timeLabel: 'Last',
    unitsPlaceholderLabel: 'Units',
    relativityTitleForTodayLabel: 'Include Today',
    relativityTitleLabel: 'Include current',
    onChange: jest.fn(),
    ...overProps,
  };

  const wrapper = rtlRender(<RelativeTime {...props} />);

  return {
    props,
    wrapper,
  };
};

test('allows user to include the current day in timeframe', () => {
  const {
    props,
    wrapper: { getByText },
  } = render({ relativity: 'previous' });

  const checkbox = getByText(props.relativityTitleForTodayLabel);
  fireEvent.click(checkbox);

  expect(props.onChange).toHaveBeenCalledWith('this_14_days');
});

test('allows user to exclude the current day from timeframe', () => {
  const {
    props,
    wrapper: { getByText },
  } = render();

  const checkbox = getByText(props.relativityTitleForTodayLabel);
  fireEvent.click(checkbox);

  expect(props.onChange).toHaveBeenCalledWith('previous_14_days');
});

test('allows user to exclude the current day from timeframe using keyboard', () => {
  const {
    props,
    wrapper: { getByText },
  } = render();

  const checkbox = getByText(props.relativityTitleForTodayLabel);
  fireEvent.keyDown(checkbox, { key: 'Enter', keyCode: KEYBOARD_KEYS.ENTER });

  expect(props.onChange).toHaveBeenCalledWith('previous_14_days');
});

test('renders correct checkbox label for different interval', () => {
  const {
    props,
    wrapper: { getByText },
  } = render({ units: 'months' });

  const checkbox = getByText(`${props.relativityTitleLabel} month`);
  expect(checkbox).toBeInTheDocument();
});
