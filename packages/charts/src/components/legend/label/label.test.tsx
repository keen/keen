import React from 'react';
import { render as rtlRender, fireEvent } from '@testing-library/react';
import { Typography } from '@keen.io/ui-core';

import Label from './label.component';

const render = (overProps: any = {}) => {
  const props = {
    typography: {
      fontSize: 12,
      fontColor: 'black',
      fontStyle: 'normal',
      fontWeight: 'normal',
    } as Typography,
    text: '@text',
    markColor: 'green',
    onClick: jest.fn(),
    ...overProps,
  };

  const wrapper = rtlRender(<Label {...props} />);

  return {
    wrapper,
    props,
  };
};

test('calls "onClick" handler', () => {
  const {
    wrapper: { getByText },
    props: { text, onClick },
  } = render();

  const element = getByText(text);
  fireEvent.click(element);

  expect(onClick).toHaveBeenCalledWith(true, text);
});

test('performs "boolean" type conversion to "string"', () => {
  const {
    wrapper: { getByText },
    props: { onClick },
  } = render({
    text: true,
  });

  const element = getByText('true');
  fireEvent.click(element);

  expect(onClick).toHaveBeenCalledWith(true, 'true');
});
