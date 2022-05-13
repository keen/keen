import React, { ComponentProps } from 'react';
import { render as rtlRender } from '@testing-library/react';

import TooltipItem from './tooltip-item.component';

const render = (
  overProps: Partial<ComponentProps<typeof TooltipItem>> = {}
) => {
  const props = {
    data: 'value',
    ...overProps,
  };

  const wrapper = rtlRender(<TooltipItem {...props} />);

  return {
    wrapper,
    props,
  };
};

test('renders content from string', () => {
  const {
    wrapper: { getByText },
    props,
  } = render();

  expect(getByText(props.data)).toBeInTheDocument();
});

test('renders content from object', () => {
  const data = {
    label: 'Label',
    value: '10',
    change: '(1%)',
  };
  const {
    wrapper: { getByText },
  } = render({ data });

  Object.keys(data).forEach((key) =>
    expect(getByText(data[key])).toBeInTheDocument()
  );
});
