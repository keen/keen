import React from 'react';
import { mount } from 'enzyme';

import Line from './line.component';

describe('@keen/charts - <Line />', () => {
  const props = {
    x1: 10,
    x2: 15,
    y1: 10,
    y2: 30,
    color: 'white',
  };

  it('should render svg <line /> element', () => {
    const wrapper = mount(
      <svg>
        <Line {...props} />
      </svg>
    );

    expect(wrapper.find('line').length).toEqual(1);
  });

  it('should inherit color', () => {
    const wrapper = mount(
      <svg>
        <Line {...props} color={undefined} />
      </svg>
    );

    expect(wrapper.find('line').props().style.stroke).toEqual('currentColor');
  });

  it('should set proper <line /> element properties', () => {
    const wrapper = mount(
      <svg>
        <Line {...props} />
      </svg>
    );

    expect(wrapper.find('line').props()).toMatchInlineSnapshot(`
      Object {
        "style": Object {
          "stroke": "white",
          "strokeWidth": 1,
        },
        "x1": 10,
        "x2": 15,
        "y1": 10,
        "y2": 30,
      }
    `);
  });
});
