import React from 'react';
import { mount } from 'enzyme';

import ContentSeparator from './content-separator.component';

describe('@keen.io/ui-core - <ContentSeparator />', () => {
  it('should render children', () => {
    const text = 'lorem ipsum';
    const wrapper = mount(<ContentSeparator>{text}</ContentSeparator>);

    expect(wrapper.text()).toEqual(text);
  });
});
