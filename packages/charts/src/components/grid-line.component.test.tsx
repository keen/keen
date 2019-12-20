import React from 'react';
import { mount } from 'enzyme';

import GridLine from './grid-line.component';

describe('@keen/charts - <GridLine />', () => {
  const props = {
    x1: 10,
    x2: 15,
    y1: 10,
    y2: 30,
    color: 'white',
  };

  it('should render svg line element', () => {
    const wrapper = mount(
      <svg>
        <GridLine {...props} />
      </svg>
    );

    expect(wrapper.find('line').length).toEqual(1);
  });

  it('should set proper <line /> element properties', () => {
    const wrapper = mount(
      <svg>
        <GridLine {...props} />
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
