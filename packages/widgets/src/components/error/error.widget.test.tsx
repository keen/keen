import React, { ComponentProps } from 'react';
import { render as rtlRender } from '@testing-library/react';

import ErrorWidget from './error.widget';
import text from './text.json';

import { widgetSettings } from '../../widget-settings';

const render = (
  overProps: Partial<ComponentProps<typeof ErrorWidget>> = {}
) => {
  const props = {
    ...widgetSettings,
    ...overProps,
    message: 'message',
  };

  const wrapper = rtlRender(<ErrorWidget {...props} />);

  return {
    wrapper,
    props,
  };
};

test('shows error message', () => {
  const {
    props,
    wrapper: { getByText },
  } = render();

  expect(getByText(props.message)).toBeInTheDocument();
});

test('shows error title', () => {
  const {
    wrapper: { getByText },
  } = render();

  expect(getByText(text.renderError)).toBeInTheDocument();
});
