import React from 'react';
import { mount } from 'enzyme';

import BubbleLegend from './bubble-legend.component';

const setup = (overProps: Record<string, any> = {}) => {
  const props = {
    typography: {
      fontSize: 12,
      fontFamily: 'Lato Regular',
      fontColor: 'black',
      fontWeight: 'normal',
      fontStyle: 'normal',
    },
    domain: [100, 2000],
    title: {
      value: 'Title',
      typography: {
        fontSize: 12,
        fontFamily: 'Lato Regular',
        fontColor: 'black',
        fontWeight: 'normal',
        fontStyle: 'normal',
      },
    },
    minRadius: 10,
    maxRadius: 20,
    ...overProps,
  };

  const wrapper = mount(
    <svg>
      <BubbleLegend {...props} />
    </svg>
  );

  return {
    wrapper,
    props,
  };
};

describe('@keen.io/components - <BubbleLegend />', () => {
  it('should render component', () => {
    const { wrapper } = setup();
    expect(wrapper.find(BubbleLegend).length).toBeTruthy();
  });

  it('should render Title', () => {
    const { wrapper, props } = setup();
    expect(wrapper.html().includes(props.title.value)).toBeTruthy();
  });

  it('should render valid number of bubbles', () => {
    const { wrapper } = setup();
    expect(wrapper.find('circle').length).toEqual(3);
  });

  it('should render valid number of labels', () => {
    const { wrapper } = setup();
    expect(wrapper.find('text').length).toEqual(3);
  });
});
