import React, { ComponentProps } from 'react';
import { render as rtlRender, fireEvent } from '@testing-library/react';
import { Alignment, Layout, Position, Typography } from '@keen.io/ui-core';

import SeriesLegend from './series.component';

const render = (
  overProps: Partial<ComponentProps<typeof SeriesLegend>> = {}
) => {
  const dataSeries = [
    { name: 'e-mails', color: 'navy' },
    { name: 'calls', color: 'green' },
  ];

  const colorPalette = ['red, blue', 'green'];

  const props = {
    layout: 'vertical' as Layout,
    position: 'top' as Position,
    alignment: 'left' as Alignment,
    card: {},
    dataSeries,
    colorPalette,
    disabledKeys: [],
    typography: {
      fontSize: 12,
      fontColor: 'black',
      fontStyle: 'normal',
      fontWeight: 'normal',
    } as Typography,
    onClick: jest.fn(),
    onActivate: jest.fn(),
    onDeactivate: jest.fn(),
    onOffsetUpdate: jest.fn(),
    ...overProps,
  };

  const wrapper = rtlRender(<SeriesLegend {...props} />);

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
