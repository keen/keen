import React from 'react';
import { mount } from 'enzyme';

import Button from './button.component';

import { Gradient } from './button.styles';

const setup = (overProps: any = {}) => {
  const props = {
    ...overProps,
    onClick: jest.fn(),
    variant: 'horizontal',
    position: 'top',
    shadow: '0px 10px',
    disabled: false,
    gradientTransmition: 'top left',
  };

  const wrapper = mount(<Button {...props} />);

  return {
    props,
    wrapper,
  };
};

describe('@keen.io/charts - <Button />', () => {
  it('should call "onClick" handler', () => {
    const { wrapper, props } = setup();
    wrapper.simulate('click');

    expect(props.onClick).toHaveBeenCalled();
  });

  it('should render <Gradient /> component', () => {
    const { wrapper } = setup();
    wrapper.simulate('mouseEnter');

    expect(wrapper.find(Gradient).length).toBeTruthy();
  });

  it('shoul set properties for <Gradient /> component', () => {
    const { wrapper } = setup();
    wrapper.simulate('mouseEnter');

    expect(wrapper.find(Gradient).props()).toMatchInlineSnapshot(`
      Object {
        "animate": Object {
          "opacity": 1,
        },
        "exit": Object {
          "opacity": 0,
        },
        "initial": Object {
          "opacity": 0,
        },
        "transmition": "top left",
        "variant": "horizontal",
      }
    `);
  });
});
