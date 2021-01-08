import React from 'react';
import { mount } from 'enzyme';

import BulletList from './bullet-list.component';

import { Text } from '../../typography';

const setup = (overProps: any = {}) => {
  const list = [
    { color: 'red', value: 12 },
    { color: 'blue', value: 22 },
  ];

  const props = {
    ...overProps,
    list,
    typography: {
      fontSize: 12,
      fontFamily: 'Lato Regular',
      fontColor: 'black',
      fontWeight: 'normal',
      fontStyle: 'normal',
    },
  };

  const wrapper = mount(<BulletList {...props} />);

  return {
    wrapper,
    props,
  };
};

describe('@keen.io/ui-core - <BulletList />', () => {
  it('should render render list', () => {
    const { wrapper, props } = setup();

    expect(wrapper.find('li').length).toEqual(props.list.length);
  });

  it('should apply "typography" to list element', () => {
    const { wrapper, props } = setup();

    expect(wrapper.find(Text).first().props()).toMatchObject(props.typography);
  });
});
