/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { mount } from 'enzyme';
import { Typography } from '@keen.io/ui-core';

import PieLabel from './pie-label.component';

describe('@keen.io/charts - <PieLabel />', () => {
  const typography: Typography = {
    fontSize: 12,
    fontFamily: 'sans-serif',
    fontColor: '#000',
    fontStyle: 'normal',
    fontWeight: 'normal',
  };

  it('should render "text" element with typography font color', () => {
    const wrapper = mount(
      <svg>
        <PieLabel {...typography} sliceBackground="#fff" autocolor={false}>
          50%
        </PieLabel>
      </svg>
    );

    expect(wrapper.find('text').props().fill).toEqual(typography.fontColor);
  });

  it('should set typography for "text" element', () => {
    const { fontColor, ...typographySettings } = typography;
    const wrapper = mount(
      <svg>
        <PieLabel {...typography} sliceBackground="#fff" autocolor={false}>
          50%
        </PieLabel>
      </svg>
    );

    expect(wrapper.find('text').props().style).toMatchObject(
      typographySettings
    );
  });

  it('should render "text" element with adjusted font color', () => {
    const wrapper = mount(
      <svg>
        <PieLabel {...typography} sliceBackground="#fff" autocolor={true}>
          95%
        </PieLabel>
      </svg>
    );

    expect(wrapper.find('text').props().fill).toMatchInlineSnapshot(
      `"hsl(0, 0%, 20%)"`
    );
  });

  it('should set typography for autocolor "text" element', () => {
    const { fontColor, ...typographySettings } = typography;
    const wrapper = mount(
      <svg>
        <PieLabel {...typography} sliceBackground="#fff" autocolor={true}>
          100%
        </PieLabel>
      </svg>
    );

    expect(wrapper.find('text').props().style).toMatchObject(
      typographySettings
    );
  });
});
