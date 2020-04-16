import React from 'react';
import { mount } from 'enzyme';
import { colors } from '@keen.io/colors';

import { ChartContext } from '../contexts';

import AxisTitle from './axis-title.component';

const line = { x1: 0, x2: 100, y1: 100, y2: 0 };
const groupBox = { x: 10, y: 10, height: 10 };
const orientation = 'horizontal';
const title = 'Axis Title';

const setup = (overProps: any = {}) => {
  const props = {
    line,
    groupBox,
    orientation,
    ...overProps,
  };

  const context = {
    theme: {
      axisX: {
        tickSize: 10,
        tickPadding: 10,
        labels: {},
        title: {
          alignment: 'center',
          typography: {
            fontStyle: 'normal',
            fontWeight: 'normal',
            fontSize: 14,
            fontFamily: 'Lato Bold, sans-serif',
            fontColor: colors.blue['500'],
          },
        },
      },
    },
    axisY: {
      tickSize: 10,
      tickPadding: 10,
      labels: {},
      title: {
        alignment: 'center',
        typography: {
          fontStyle: 'normal',
          fontWeight: 'normal',
          fontSize: 14,
          fontFamily: 'Lato Bold, sans-serif',
          fontColor: colors.blue['500'],
        },
      },
    },
  };

  const wrapper = mount(
    <ChartContext.Provider value={context}>
      <svg>
        <AxisTitle {...props}>{title}</AxisTitle>
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

  it('should render AxisTitle text', () => {
    const { wrapper } = setup();
    expect(wrapper.find('text').text()).toEqual(title);
  });
});
