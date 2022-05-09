import React from 'react';
import { render as rtlRender, fireEvent } from '@testing-library/react';

import Ruler from './ruler.component';

const render = (overProps: any = {}) => {
  const ticks = [
    { label: 0, position: '0%' },
    { label: 50, position: '50%' },
    { label: 100, position: '100%' },
  ];
  const props = {
    layout: 'vertical',
    ticks,
    ...overProps,
  } as any;

  const wrapper = rtlRender(<Ruler {...props} />);

  return {
    wrapper,
    props,
  };
};

test('should render ruler with ticks', () => {
  const {
    wrapper: { getByText },
    props: { ticks },
  } = render();

  for (const { label } of ticks) {
    expect(getByText(label.toString())).toBeInTheDocument();
  }
});

test('should use custom label "renderer"', () => {
  const renderLabel = (value) => <div className="custom">{value}</div>;
  const {
    wrapper: { container },
    props: { ticks },
  } = render({ renderLabel });

  expect(container.querySelectorAll('.custom').length).toEqual(ticks.length);
});

test('should call onClick when provided', () => {
  const onClick = jest.fn();
  const {
    wrapper: { getByText },
    props: { ticks },
  } = render({ onClick });
  const element = getByText(ticks[0].label.toString());

  fireEvent.click(element);
  expect(onClick).toHaveBeenCalled();
});
