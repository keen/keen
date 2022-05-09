import React from 'react';
import { render as rtlRender, fireEvent } from '@testing-library/react';

import TagManager from './tag-manager.component';
import { KeyCodes } from './types';

const tag = 'email@keen.io';
const render = (overProps: any = {}) => {
  const props = {
    tags: [],
    onCreate: jest.fn(),
    onRemove: jest.fn(),
    onError: jest.fn(),
    validator: jest.fn().mockImplementation(() => true),
    ...overProps,
  } as any;

  const wrapper = rtlRender(<TagManager {...props} />);

  return {
    wrapper,
    props,
  };
};

test('should call "onCreate" for "enter" key', () => {
  const {
    wrapper: { container },
    props: { onCreate },
  } = render();
  const input = container.querySelector('input');

  fireEvent.change(input, { target: { value: tag } });
  fireEvent.keyPress(input, { key: 'Enter', charCode: KeyCodes.ENTER });

  expect(onCreate).toHaveBeenCalledWith(tag);
});

test('should call "onCreate" for "comma" key', () => {
  const {
    wrapper: { container },
    props: { onCreate },
  } = render();
  const input = container.querySelector('input');

  fireEvent.change(input, { target: { value: tag } });
  fireEvent.keyPress(input, { key: ',', charCode: KeyCodes.COMMA });

  expect(onCreate).toHaveBeenCalledWith(tag);
});

test('should call "onCreate" for "blur" event', () => {
  const {
    wrapper: { container },
    props: { onCreate },
  } = render();
  const input = container.querySelector('input');

  fireEvent.change(input, { target: { value: tag } });
  fireEvent.blur(input);

  expect(onCreate).toHaveBeenCalledWith(tag);
});

test('should call "onError" handler for not valid tag', () => {
  const {
    wrapper: { container },
    props: { onError },
  } = render({
    validator: jest.fn().mockImplementation(() => false),
  });
  const input = container.querySelector('input');

  fireEvent.keyPress(input, { key: ',', charCode: KeyCodes.COMMA });

  expect(onError).toHaveBeenCalled();
});

test('should call "onRemove" handler with tag name and index arguments', () => {
  const tag = 'keen';
  const {
    wrapper: { getByRole },
    props: { onRemove },
  } = render({
    tags: [tag],
  });

  const button = getByRole('button');
  fireEvent.click(button);

  expect(onRemove).toHaveBeenCalledWith(tag, 0);
});

test('should set placeholder attribute on input element', () => {
  const placeholder = 'Create tags';
  const {
    wrapper: { getByPlaceholderText },
  } = render({
    placeholder,
  });

  expect(getByPlaceholderText(placeholder)).toBeInTheDocument();
});
