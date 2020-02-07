/* eslint-disable react/no-children-prop */
import React from 'react';
import { mount } from 'enzyme';

import ColorAdjuster from './color-adjuster.component';

describe('@keen.io/ui-core - <ColorAdjuster />', () => {
  let mockFn: any;

  beforeEach(() => {
    mockFn = jest.fn().mockImplementation(() => <div />);
  });

  it('should adjust color for light base', () => {
    const baseColor = '#fff';
    mount(<ColorAdjuster baseColor={baseColor} children={mockFn} />);

    const callArguments = mockFn.mock.calls[0][0];

    expect(callArguments).toMatchInlineSnapshot(`"hsl(0, 0%, 20%)"`);
    expect(mockFn).toHaveBeenCalled();
  });

  it('should adjust color for dark base', () => {
    const baseColor = '#000';
    mount(<ColorAdjuster baseColor={baseColor} children={mockFn} />);

    const callArguments = mockFn.mock.calls[0][0];

    expect(callArguments).toMatchInlineSnapshot(`"hsl(0, 0%, 80%)"`);
    expect(mockFn).toHaveBeenCalled();
  });
});
