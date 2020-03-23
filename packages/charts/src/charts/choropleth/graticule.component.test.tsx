import React from 'react';
import { mount } from 'enzyme';

import Graticule from './graticule.component';

describe('@keen.io/charts - <Graticule />', () => {
  let draw;
  let graticule;

  beforeEach(() => {
    draw = jest.fn(coordinates => coordinates);
    graticule = jest.fn(() => 'value');
  });

  it('should create "path" element', () => {
    const wrapper = mount(
      <svg>
        <Graticule stroke="black" draw={draw} graticule={graticule} />
      </svg>
    );

    expect(wrapper.find('path').length).toEqual(1);
  });

  it('should call "graticule" generator handler', () => {
    mount(
      <svg>
        <Graticule stroke="black" draw={draw} graticule={graticule} />
      </svg>
    );

    expect(graticule).toHaveBeenCalled();
  });

  it('should call "draw" handler and set path "d" property', () => {
    const wrapper = mount(
      <svg>
        <Graticule stroke="black" draw={draw} graticule={graticule} />
      </svg>
    );

    expect(draw).toHaveBeenCalledWith('value');
    expect(wrapper.find('path').props()).toMatchObject({ d: 'value' });
  });

  it('should set "stroke" for path element', () => {
    const stroke = 'white';
    const wrapper = mount(
      <svg>
        <Graticule stroke={stroke} draw={draw} graticule={graticule} />
      </svg>
    );

    expect(draw).toHaveBeenCalledWith('value');
    expect(wrapper.find('path').props()).toMatchObject({ stroke });
  });
});
