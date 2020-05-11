import React from 'react';
import { mount } from 'enzyme';

import TagManager from './tag-manager.component';

const setup = (overProps: any = {}) => {
  const props = {
    tags: [],
    onCreate: jest.fn(),
    onRemove: jest.fn(),
    onError: jest.fn(),
    validator: jest.fn().mockImplementation(() => true),
    ...overProps,
  };

  const wrapper = mount(<TagManager {...props} />);

  return {
    wrapper,
    props,
    getInput: () => wrapper.find('input'),
  };
};

describe('@keen.io/ui-core - <TagManager />', () => {
  const tag = 'email@keen.io';

  it('should call "onCreate" for "enter" key', () => {
    const { props, getInput } = setup();
    const input = getInput();

    const instance = input.instance() as React.Element<HTMLInputElement>;

    instance.value = tag;
    input.simulate('keyPress', { charCode: 13 });

    expect(props.onCreate).toHaveBeenCalledWith(tag);
  });

  it('should call "onCreate" for "comma" key', () => {
    const { props, getInput } = setup();
    const input = getInput();

    const instance = input.instance() as React.Element<HTMLInputElement>;
    instance.value = tag;

    input.simulate('keyPress', { charCode: 44 });

    expect(props.onCreate).toHaveBeenCalledWith(tag);
  });

  it('should call "onCreate" for "blur" event', () => {
    const { props, getInput } = setup();
    const input = getInput();

    const instance = input.instance() as React.Element<HTMLInputElement>;
    instance.value = tag;

    input.simulate('blur');

    expect(props.onCreate).toHaveBeenCalledWith(tag);
  });

  it('should call "onError" handler for not valid tag', () => {
    const { getInput, props } = setup({
      validator: jest.fn().mockImplementation(() => false),
    });
    const input = getInput();

    input.simulate('keyPress', { charCode: 44 });

    expect(props.onError).toHaveBeenCalled();
  });

  it('should call "onRemove" handler with tag name and index arguments', () => {
    const tag = 'keen';
    const { props, wrapper } = setup({
      tags: [tag],
    });

    wrapper.find('div[role="button"]').simulate('click');
    expect(props.onRemove).toHaveBeenCalledWith(tag, 0);
  });

  it('should set placeholder attribute on input element', () => {
    const placeholder = 'Create tags';
    const { getInput } = setup({
      placeholder,
    });

    expect(getInput().props().placeholder).toEqual(placeholder);
  });
});
