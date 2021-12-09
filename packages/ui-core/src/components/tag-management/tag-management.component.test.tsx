import React from 'react';
import { mockAllIsIntersecting } from 'react-intersection-observer/test-utils';

import { render as rtlRender, fireEvent, act } from '@testing-library/react';
import TagManagement from './tag-management.component';

const render = (overProps: any = {}) => {
  const props = {
    onRemoveTag: jest.fn(),
    onAddTag: jest.fn(),
    tags: [],
    newTagLabel: 'newTagLabel',
    tagsLabel: 'tagsLabel',
    placeholderLabel: 'placeholderLabel',
    ...overProps,
  };

  const wrapper = rtlRender(<TagManagement {...props} />);

  return {
    props,
    wrapper,
  };
};

mockAllIsIntersecting(true);
jest.useFakeTimers();

test('allows user to add tag', () => {
  const {
    wrapper: { getByTestId, getByText },
    props: { onAddTag, newTagLabel },
  } = render();

  const input = getByTestId('management-labels-input');
  fireEvent.change(input, { target: { value: 'marketing' } });

  act(() => {
    jest.runAllTimers();
  });

  const element = getByText(`marketing ${newTagLabel}`);
  fireEvent.click(element);

  expect(onAddTag).toHaveBeenCalledWith('marketing');
});

test('allows user to add tag that is a part of one of existing tags', () => {
  const {
    wrapper: { getByTestId, getByText },
    props: { onAddTag, newTagLabel },
  } = render({ tags: ['new tag'] });

  const input = getByTestId('management-labels-input');
  fireEvent.change(input, { target: { value: 'new' } });

  act(() => {
    jest.runAllTimers();
  });

  const element = getByText(`new ${newTagLabel}`);
  fireEvent.click(element);

  expect(onAddTag).toHaveBeenCalledWith('new');
});

test('do not allows user to add already existing tag', () => {
  const {
    wrapper: { getByTestId, getAllByText },
    props,
  } = render({
    tagsPool: ['marketing'],
    tags: ['marketing'],
  });

  const input = getByTestId('management-labels-input');
  fireEvent.change(input, { target: { value: 'marketing' } });

  act(() => {
    jest.runAllTimers();
  });

  const [listElement] = getAllByText('marketing');
  fireEvent.click(listElement);

  expect(props.onAddTag).not.toHaveBeenCalled();
});

test('allows user to remove existing tag', () => {
  const {
    wrapper: { getByTestId },
    props,
  } = render({
    tags: ['marketing'],
  });

  const tagElement = getByTestId('badge-remove');
  fireEvent.click(tagElement);

  expect(props.onRemoveTag).toHaveBeenCalledWith('marketing');
});
