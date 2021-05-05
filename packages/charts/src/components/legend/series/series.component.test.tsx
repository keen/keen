import React from 'react';
import { render as rtlRender, fireEvent } from '@testing-library/react';
import { Typography } from '@keen.io/ui-core';

import Series from './series.component';

const render = (overProps: any = {}) => {
  const labels = [
    { name: 'e-mails', color: 'navy' },
    { name: 'calls', color: 'green' },
  ];

  const props = {
    layout: 'vertical',
    position: 'top',
    card: {},
    labels,
    typography: {
      fontSize: 12,
      fontColor: 'black',
      fontStyle: 'normal',
      fontWeight: 'normal',
    } as Typography,
    onClick: jest.fn(),
    onActivate: jest.fn(),
    onDeactivate: jest.fn(),
    ...overProps,
  };

  const wrapper = rtlRender(<Series {...props} />);

  return {
    wrapper,
    props,
  };
};

test('calls "onClick" handler and deactivates active serie', () => {
  const {
    wrapper: { getByText },
    props: { onClick, onDeactivate },
  } = render();

  const element = getByText('e-mails');
  fireEvent.click(element);

  expect(onClick).toHaveBeenCalledWith('e-mails', true, 0);
  expect(onDeactivate).toHaveBeenCalled();
});

test('calls "onActivate" handler', () => {
  const {
    wrapper: { getByText },
    props: { onActivate },
  } = render();

  const element = getByText('e-mails');
  fireEvent.mouseEnter(element);

  expect(onActivate).toHaveBeenCalledWith('e-mails');
});
