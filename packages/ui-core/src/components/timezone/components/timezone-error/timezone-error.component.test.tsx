import React, { ComponentProps } from 'react';
import { render as rtlRender, fireEvent } from '@testing-library/react';

import TimezoneError from './timezone-error.component';

const render = (
  overProps: Partial<ComponentProps<typeof TimezoneError>> = {}
) => {
  const props = {
    label: 'Timezone',
    placeholder: 'Placeholder',
    tooltipMessage: 'Tooltip message',
    ...overProps,
  };

  const wrapper = rtlRender(<TimezoneError {...props} />);

  return {
    props,
    wrapper,
  };
};

test('renders tooltip when users hovers on label', () => {
  const {
    wrapper: { getByText, getByTestId },
    props,
  } = render();

  const labelElement = getByText(props.label);
  fireEvent.mouseEnter(labelElement);

  expect(getByTestId('dynamic-portal')).toBeInTheDocument();
});

test('renders disable select', () => {
  const {
    wrapper: { getByTestId },
  } = render();

  expect(getByTestId('dropable-container')).toBeInTheDocument();
});
