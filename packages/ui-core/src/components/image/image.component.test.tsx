import React from 'react';
import { mount } from 'enzyme';
import 'jest-styled-components';

import { Loader } from '@keen.io/ui-core';

import Image from './image.component';

describe('@keen.io/ui-core - <Image />', () => {
  it('should render image', () => {
    const wrapper = mount(<Image name="test" />);

    expect(wrapper).toMatchSnapshot();
  });

  it('should render image from provided src', () => {
    const src = 'http://image.com';
    const wrapper = mount(<Image name="test" src={src} />);

    expect(wrapper.html()).toEqual(`<img src="${src}">`);
  });

  it('should render loader once image is not loaded yet', () => {
    const src = 'http://image.com';
    const wrapper = mount(<Image name="test" src={src} useLoader />);

    expect(wrapper.find(Loader).length).toBeTruthy();
  });
});
