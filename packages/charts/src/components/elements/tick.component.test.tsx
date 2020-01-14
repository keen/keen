import React from 'react';
import { mount } from 'enzyme';

import Tick from './tick.component';

import { Orientation } from '../../types';

describe('@keen.io/charts - <Tick />', () => {
  it('should set svg group coordinates', () => {
    const wrapper = mount(
      <svg>
        <Tick orientation={Orientation.VERTICAL} x={10} y={25} size={10} />
      </svg>
    );

    expect(wrapper.find('g').props().transform).toMatchInlineSnapshot(
      `"translate(10, 25)"`
    );
  });

  it('should set line position for vertical orientation', () => {
    const wrapper = mount(
      <svg>
        <Tick orientation={Orientation.VERTICAL} x={10} y={25} size={10} />
      </svg>
    );

    expect(wrapper.find('line').props()).toMatchInlineSnapshot(`
      Object {
        "stroke": "currentColor",
        "y2": 10,
      }
    `);
  });

  it('should set line position for horizontal orientation', () => {
    const wrapper = mount(
      <svg>
        <Tick orientation={Orientation.HORIZONTAL} x={10} y={25} size={10} />
      </svg>
    );

    expect(wrapper.find('line').props()).toMatchInlineSnapshot(`
      Object {
        "stroke": "currentColor",
        "x2": -10,
      }
    `);
  });

  it('should render children', () => {
    const wrapper = mount(
      <svg>
        <Tick orientation={Orientation.VERTICAL} x={10} y={25} size={10}>
          <text />
        </Tick>
      </svg>
    );

    expect(wrapper.find('text')).toBeDefined();
  });
});
