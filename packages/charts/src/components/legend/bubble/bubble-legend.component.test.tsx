import React from 'react';
import { render as rtlRender } from '@testing-library/react';

import BubbleLegend from './bubble-legend.component';

const render = (overProps: Record<string, any> = {}) => {
  const props = {
    typography: {
      fontSize: 12,
      fontFamily: 'Lato Regular',
      fontColor: 'black',
      fontWeight: 'normal',
      fontStyle: 'normal',
    },
    domain: [100, 2000],
    title: {
      value: 'Title',
      typography: {
        fontSize: 12,
        fontFamily: 'Lato Regular',
        fontColor: 'black',
        fontWeight: 'normal',
        fontStyle: 'normal',
      },
    },
    minRadius: 10,
    maxRadius: 20,
    ...overProps,
  };

  const wrapper = rtlRender(
    <svg>
      <BubbleLegend {...props} />
    </svg>
  );

  return {
    wrapper,
    props,
  };
};

test('should render component', () => {
  const {
    wrapper: { getByTestId },
  } = render();

  const element = getByTestId('bubble-legend');
  expect(element).toBeInTheDocument();
});

test('should render Title', () => {
  const {
    wrapper: { getByText },
    props,
  } = render();

  const title = getByText(props.title.value);
  expect(title).toBeInTheDocument();
});

test('should render valid number of bubbles', () => {
  const {
    wrapper: { container },
  } = render();
  expect(container.querySelectorAll('circle').length).toEqual(3);
});

test('should render valid number of labels', () => {
  const {
    wrapper: { container },
  } = render();
  expect(container.querySelectorAll('text').length).toEqual(3);
});
