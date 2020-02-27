import React from 'react';
import { motion } from 'framer-motion';
import { mount } from 'enzyme';

import Bar from './bar.component';

describe('@keen.io/charts - <Bar />', () => {
  const props = {
    x: 10,
    y: 10,
    width: 100,
    height: 100,
    color: 'red',
  };

  it('should render "animated" rect element', () => {
    const wrapper = mount(
      <svg>
        <Bar {...props} />
      </svg>
    );

    expect(wrapper.find(motion.rect).length).toBeTruthy();
  });

  it('should render rect element', () => {
    const wrapper = mount(
      <svg>
        <Bar {...props} animate={false} />
      </svg>
    );

    expect(wrapper.find('rect').length).toBeTruthy();
  });

  it('should set "rect" element properties', () => {
    const wrapper = mount(
      <svg>
        <Bar {...props} animate={false} />
      </svg>
    );

    expect(wrapper.find('rect').props()).toMatchInlineSnapshot(`
      Object {
        "fill": "red",
        "height": 100,
        "style": Object {
          "transition": "fill .2s ease-in",
        },
        "width": 100,
        "x": 10,
        "y": 10,
      }
    `);
  });
});
