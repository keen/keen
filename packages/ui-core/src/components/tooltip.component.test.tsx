import React from 'react';
import { mount } from 'enzyme';
import Tooltip from './tooltip.component';
import BulletList from './bulletlist.component';

const setup = (overProps: any = {}) => {
  const props = {
    ...overProps,
  };

  const wrapper = mount(<Tooltip {...props} />);

  return {
    wrapper,
    props,
  };
};

describe('<Tooltip />', () => {
  it('should render provided text', () => {
    const children = 'text';
    const { wrapper } = setup({
      children,
    });

    expect(wrapper.text()).toEqual(children);
    expect(wrapper.props().children).toEqual(children);
  });

  it('should render bullet points', () => {
    const bulletList = [
      {
        color: 'red',
        value: 'red',
      },
      {
        color: 'blue',
        value: 'blue',
      },
      {
        color: 'green',
        value: 'green',
      },
      {
        color: 'black',
        value: 'black',
      },
    ];

    const { wrapper } = setup({
      children: <BulletList list={bulletList} />,
    });

    expect(wrapper.find('li').length).toEqual(bulletList.length);
  });

  it('should render `dark-mode`', () => {
    const mode = 'dark';
    const children = 'tooltip';
    const { wrapper } = setup({
      mode,
      children,
    });

    expect(wrapper).toMatchSnapshot();
  });

  it('should not render box shadow', () => {
    const hasShadow = false;
    const children = 'tooltip';
    const { wrapper } = setup({
      hasShadow,
      children,
    });

    expect(wrapper).toMatchSnapshot();
  });
});
