import React from 'react';
import { mount } from 'enzyme';

import Ruler from './ruler.component';

import { Tick, PositionContainer } from './ruler.styles';

describe('@keen.io/ui-core - <Ruler />', () => {
  const ticks = [
    { label: 0, position: '0%' },
    { label: 50, position: '50%' },
    { label: 100, position: '100%' },
  ];

  it('should render ruler with ticks', () => {
    const wrapper = mount(<Ruler layout="vertical" ticks={ticks} />);

    expect(wrapper.find(Tick).length).toEqual(ticks.length);
  });

  it('should use custom label "renderer"', () => {
    const renderLabel = value => <div className="custom">{value}</div>;
    const wrapper = mount(
      <Ruler layout="vertical" renderLabel={renderLabel} ticks={ticks} />
    );

    expect(wrapper.find('.custom').length).toEqual(ticks.length);
  });

  it('should call onClick when provided', () => {
    const onClick = jest.fn();
    const wrapper = mount(
      <Ruler layout="vertical" ticks={ticks} onClick={onClick} />
    );
    wrapper
      .find(PositionContainer)
      .first()
      .simulate('click');

    expect(onClick).toHaveBeenCalled();
  });
});
