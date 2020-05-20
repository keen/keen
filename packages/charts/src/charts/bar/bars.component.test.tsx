import React from 'react';
import { render as rtlRender, fireEvent, screen } from '@testing-library/react';

import Bars, { Props } from './bars.component';
import { bars } from './bar-chart.fixtures';

import { theme } from '../../theme';
import { ChartContext } from '../../contexts';

const render = (overProps: any = {}) => {
  const props = {
    bars,
    onBarMouseEnter: jest.fn(),
    onBarMouseLeave: jest.fn(),
    layout: 'vertical',
    stackMode: 'normal',
    groupMode: 'grouped',
    showValues: false,
    valuesAutocolor: false,
    ...overProps,
  } as Props;

  const wrapper = rtlRender(
    <ChartContext.Provider
      value={{
        theme,
      }}
    >
      <svg>
        <Bars {...props} />
      </svg>
    </ChartContext.Provider>
  );

  return {
    wrapper,
    props,
  };
};

test('renders <rect /> SVG elements based on "bars" property', () => {
  const {
    wrapper: { container },
    props,
  } = render();
  const barElements = container.querySelectorAll('rect');

  expect(barElements.length).toEqual(props.bars.length);
});

test('calls "onBarMouseEnter" handler', () => {
  const {
    wrapper: { container },
    props,
  } = render();
  const barElement = container.querySelector('rect');

  fireEvent.mouseEnter(barElement);

  expect(props.onBarMouseEnter).toHaveBeenCalled();
});

test('calls "onBarMouseLeave" handler', () => {
  const {
    wrapper: { container },
    props,
  } = render();
  const barElement = container.querySelector('rect');

  fireEvent.mouseLeave(barElement);

  expect(props.onBarMouseLeave).toHaveBeenCalled();
});

test('shows values on bars', () => {
  render({ showValues: true });

  expect(screen.getByText('100')).toBeInTheDocument();
  expect(screen.getByText('150')).toBeInTheDocument();
});
