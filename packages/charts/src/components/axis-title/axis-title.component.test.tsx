import React from 'react';
import { mount } from 'enzyme';

import AxisTitle from './axis-title.component';

import { ChartContext } from '../../contexts';

const x = { value: 'xTitle' };
const y = { value: 'yTitle' };

const setup = (overProps: any = {}) => {
  const props = {
    x,
    y,
    ...overProps,
  };

  const context = {
    margins: { top: 10, bottom: 10, left: 10, right: 10 },
    svgDimensions: { width: 100, height: 100 },
    theme: {
      axisX: {
        tickSize: 10,
        tickPadding: 10,
        labels: {
          typography: {
            fontSize: 10,
          },
        },
      },
      axisY: {
        tickSize: 10,
        tickPadding: 10,
        labels: {
          typography: {
            fontSize: 10,
          },
        },
      },
    },
  };

  const wrapper = mount(
    <ChartContext.Provider value={context}>
      <svg>
        <AxisTitle {...props} />
      </svg>
    </ChartContext.Provider>
  );

  return { wrapper, props };
};

describe('<AxisTitle />', () => {
  it('should render AxisTitle', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('should render AxisTitle values', () => {
    const { wrapper } = setup();
    expect(
      wrapper
        .find('text')
        .first()
        .text()
    ).toEqual(x.value);
    expect(
      wrapper
        .find('text')
        .last()
        .text()
    ).toEqual(y.value);
  });
});
