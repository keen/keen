import React from 'react';
import { mount } from 'enzyme';

import BarValues from './bar-values.component';

import { theme } from '../../theme';
import { ChartContext } from '../../contexts';

const setup = (overProps: any = {}) => {
  const bars = [
    {
      x: 10,
      y: 10,
      width: 100,
      height: 100,
      color: 'black',
      key: 'marketing',
      value: 20,
    },
  ];

  const props = {
    autocolor: false,
    bars,
    groupMode: 'grouped',
    layout: 'vertical',
    ...overProps,
  };

  const wrapper = mount(
    <ChartContext.Provider value={{ theme }}>
      <svg>
        <BarValues {...props} />
      </svg>
    </ChartContext.Provider>
  );

  return {
    wrapper,
    props,
  };
};

describe('@keen.io/charts - <BarValues />', () => {
  it('should set "fill" property for <text> element based on theme', () => {
    const { wrapper } = setup();
    const text = wrapper.find('text').first().props();

    expect(text.fill).toEqual(theme.bar.values.typography.fontColor);
  });

  it('should automatically set "fill" property for <text> element', () => {
    const { wrapper } = setup({ autocolor: true });
    const text = wrapper.find('text').first().props();

    expect(text.fill).toMatchInlineSnapshot(`"hsl(0, 0%, 80%)"`);
  });
});
