import React from 'react';
import { mount } from 'enzyme';

import Label from './label.component';

describe('@keen.io/ui-core - <Label />', () => {
  it('should render children', () => {
    const text = 'email';
    const wrapper = mount(<Label hasError={false}>{text}</Label>);

    expect(wrapper.text()).toEqual(text);
  });
});
