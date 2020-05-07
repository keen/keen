import React from 'react';
import { Typography } from '@keen.io/ui-core';
import { mount } from 'enzyme';

import GaugeProgress from './gauge-progress.component';

describe('@keen.io/charts - <GaugeProgress />', () => {
  const typography: Typography = {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 14,
    fontFamily: 'Lato Regular, sans-serif',
    fontColor: 'black',
  };

  it('should apply "typography" on SVG text element', () => {
    const wrapper = mount(
      <svg>
        <GaugeProgress
          typography={typography}
          progressType="percent"
          minimum={0}
          maximum={200}
          value={50}
        />
      </svg>
    );

    const { fontColor, ...styles } = typography;
    const componentProps = wrapper.find('text').props();

    expect(componentProps.style).toMatchObject(styles);
    expect(componentProps.fill).toEqual(fontColor);
  });

  it('should calculate and display percentage value', () => {
    const wrapper = mount(
      <svg>
        <GaugeProgress
          typography={typography}
          progressType="percent"
          minimum={0}
          maximum={200}
          value={50}
        />
      </svg>
    );

    expect(wrapper.find('text').text()).toEqual('0.0%');
  });

  it('should display progress value', () => {
    const wrapper = mount(
      <svg>
        <GaugeProgress
          typography={typography}
          progressType="normal"
          minimum={0}
          maximum={200}
          value={50}
        />
      </svg>
    );

    expect(wrapper.find('text').text()).toEqual('0');
  });
});
