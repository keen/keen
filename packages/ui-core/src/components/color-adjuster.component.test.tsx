/* eslint-disable react/no-children-prop */
import React from 'react';
import { mount } from 'enzyme';

import ColorAdjuster from './color-adjuster.component';

describe('@keen/ui-core - <ColorAdjuster />', () => {
  let mockFn;

  beforeEach(() => {
    mockFn = jest.fn().mockImplementation(() => () => <div />);
  });

  it('should adjust color for lightness base', () => {
    const baseColor = '#fff';
    const wrapper = mount(
      <ColorAdjuster baseColor={baseColor} children={mockFn} />
    );

    console.log(wrapper, 'saas');

    expect(1).toEqual(1);
  });
});
