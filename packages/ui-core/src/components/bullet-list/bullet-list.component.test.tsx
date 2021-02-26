import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import BulletList from './bullet-list.component';

const render = (overProps: any = {}) => {
  const list = [
    { color: 'red', value: 12, label: 'Label-1', change: '(+5)' },
    { color: 'blue', value: 22, label: 'Label-2', change: '(+11)' },
  ];
  const props = {
    list,
    ...overProps,
  };

  const wrapper = rtlRender(<BulletList {...props} />);
  return {
    wrapper,
    props,
  };
};

test('renders list items', () => {
  const {
    wrapper: { getByText },
    props,
  } = render();

  props.list.forEach((item) => {
    expect(getByText(item.value)).toBeInTheDocument();
    expect(getByText(item.label)).toBeInTheDocument();
    expect(getByText(item.change)).toBeInTheDocument();
  });
});
