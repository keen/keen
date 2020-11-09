import React from 'react';
import { mount } from 'enzyme';

import AxisTitle from './axis-title.component';

const line = { x1: 0, x2: 100, y1: 100, y2: 0 };
const groupBox = { x: 10, y: 10, height: 10 };
const orientation = 'horizontal';
const title = 'Axis Title';

import { theme } from '../theme';

const setup = (overProps: any = {}) => {
  const props = {
    line,
    groupBox,
    orientation,
    titleSettings: theme.axisX.title,
    ...overProps,
  };

  const wrapper = mount(
    <svg>
      <AxisTitle {...props}>{title}</AxisTitle>
    </svg>
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

  it('should render horizontal title with theme props', () => {
    const { wrapper } = setup();
    expect(wrapper.find('text')).toMatchInlineSnapshot(`
      <text
        data-elementid="horizontal-axis-title"
        fill="#27566D"
        fontFamily="Lato Bold, sans-serif"
        fontSize={14}
        fontStyle="normal"
        fontWeight="normal"
        style={Object {}}
        textAnchor="middle"
        x={50}
        y={40}
      >
        Axis Title
      </text>
    `);
  });

  it('should render vertical title with theme props', () => {
    const { wrapper } = setup({ orientation: 'vertical' });
    expect(wrapper.find('text')).toMatchInlineSnapshot(`
      <text
        data-elementid="vertical-axis-title"
        fill="#27566D"
        fontFamily="Lato Bold, sans-serif"
        fontSize={14}
        fontStyle="normal"
        fontWeight="normal"
        style={
          Object {
            "transform": "rotate(-90deg)",
          }
        }
        textAnchor="middle"
        x={-50}
        y={-10}
      >
        Axis Title
      </text>
    `);
  });
});
