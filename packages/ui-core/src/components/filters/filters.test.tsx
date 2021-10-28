import React from 'react';
import { mockAllIsIntersecting } from 'react-intersection-observer/test-utils';

import {
  render as rtlRender,
  fireEvent,
  waitFor,
} from '@testing-library/react';

import Filters from './filters';

const render = (overProps: any = {}) => {
  const props = {
    activeFilters: [],
    filters: [],
    specialFilters: ['special_filter_1'],
    onUpdateFilters: jest.fn(),
    onClearFilters: jest.fn(),
    ...overProps,
  };

  const wrapper = rtlRender(<Filters {...props} isOpen={true} />);

  return {
    props,
    wrapper,
  };
};

mockAllIsIntersecting(true);

test('allows user to filter queries based on cache criteria', async () => {
  const {
    wrapper: { getByText },
    props,
  } = render();

  await waitFor(() => {
    const cacheFilter = getByText('special_filter_1');
    fireEvent.click(cacheFilter);

    expect(props.onUpdateFilters).toHaveBeenCalledWith(['special_filter_1']);
  });
});

test('allows user to filter queries based on selected tags', async () => {
  const {
    wrapper: { getByText },
    props,
  } = render({
    filters: ['marketing', 'it'],
  });

  await waitFor(() => {
    const filter = getByText('marketing');
    fireEvent.click(filter);

    expect(props.onUpdateFilters).toHaveBeenCalledWith(['marketing']);
  });
});

test('allows user to clear filters', async () => {
  const {
    wrapper: { getByText },
    props,
  } = render();

  await waitFor(() => {
    const element = getByText('Clear filters');
    fireEvent.click(element);

    expect(props.onClearFilters).toHaveBeenCalled();
  });
});
