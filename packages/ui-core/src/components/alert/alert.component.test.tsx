import React from 'react';
import { mount } from 'enzyme';

import Alert from './alert.component';

describe('@keen.io/ui-core - <Alert />', () => {
  const children = <span>Message</span>;

  it('should render children', () => {
    const wrapper = mount(<Alert type="error">{children}</Alert>);

    expect(wrapper.contains(children)).toBeTruthy();
  });
});
