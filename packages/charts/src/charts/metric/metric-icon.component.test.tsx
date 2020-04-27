import React from 'react';
import { mount } from 'enzyme';

import MetricIcon from './metric-icon.component';

describe('@keen.io/charts - <MetricIcon />', () => {
  const props: any = {
    position: 'top',
    baseColor: 'black',
    circleStyle: 'solid',
  };

  it('should render children', () => {
    const Component = () => <div />;
    const wrapper = mount(
      <MetricIcon {...props}>
        <Component />
      </MetricIcon>
    );

    expect(wrapper.find(Component).length).toBeTruthy();
  });
});
