/* eslint-disable react/no-children-prop */
import React from 'react';
import { mount } from 'enzyme';

import Modal from './modal.component';

describe('@keen.io/ui-core - <Modal />', () => {
  let onClose;
  let children;

  beforeEach(() => {
    onClose = jest.fn();
    children = jest.fn();
  });

  it('should call "children" renderer', () => {
    mount(<Modal isOpen={true} onClose={onClose} children={children} />);

    expect(children).toHaveBeenCalled();
  });

  it('should call "onClose" handler for "ESC" key press', () => {
    const eventsMap: any = {};
    document.addEventListener = jest.fn().mockImplementation((event, cb) => {
      eventsMap[event] = cb;
    });

    mount(<Modal isOpen={true} onClose={onClose} children={children} />);

    eventsMap.keydown({ key: 'ESC', keyCode: 27 });

    expect(onClose).toHaveBeenCalled();
  });

  it('should call "onClose" handler', () => {
    const wrapper = mount(
      <Modal isOpen={true} onClose={onClose} children={children} />
    );
    wrapper.find('svg').simulate('click');

    expect(onClose).toHaveBeenCalled();
  });
});
