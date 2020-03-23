import React from 'react';
import { mount } from 'enzyme';

import Sphere from './sphere.component';

describe('@keen.io/charts - <Sphere />', () => {
  it('should set "fill" propety for path element', () => {
    const mockFn = jest.fn() as any;
    const background = 'blue';
    const wrapper = mount(
      <svg>
        <Sphere draw={mockFn} background={background} />
      </svg>
    );

    expect(wrapper.find('path').props()).toMatchObject({ fill: background });
  });

  it('should call "draw" handler with "Sphere" type', () => {
    const mockFn = jest.fn() as any;
    mount(
      <svg>
        <Sphere draw={mockFn} background="blue" />
      </svg>
    );

    expect(mockFn.mock.calls[0][0]).toMatchInlineSnapshot(`
      Object {
        "type": "Sphere",
      }
    `);
  });
});
