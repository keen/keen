import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import { ChartContext } from '../../contexts';

import BarTooltip from './bar-tooltip-content.component';

const render = (overProps: any = {}) => {
  const data = [
    { name: 'Windows', users: 3, licenses: 52, shops: 12 },
    { name: 'MacOS', users: 19, licenses: 82, shops: 15 },
    { name: 'Linux', users: 20, licenses: -15, shops: 23 },
    { name: 'Android', users: 63, licenses: -15, shops: -30 },
  ];
  const keys = ['users', 'licenses', 'shops'];
  const selectors = [
    {
      color: '#85B4C3',
      selector: [3, 'users'],
    },
  ];
  const formatTooltip = value => `$${value}`;
  const props = {
    data,
    keys,
    selectors,
    groupMode: 'normal',
    stackMode: 'grouped',
    isList: false,
    formatTooltip,
    ...overProps,
  };

  const wrapper = rtlRender(
    <ChartContext.Provider
      value={{ theme: { tooltip: { labels: { typography: {} } } } }}
    >
      <BarTooltip {...props} />
    </ChartContext.Provider>
  );

  return {
    wrapper,
    props,
  };
};

test('formats tooltip value', () => {
  const {
    wrapper: { getByText },
    props: { data, formatTooltip },
  } = render();
  const value = data[3].users;
  const formattedValue = formatTooltip(value);

  expect(getByText(formattedValue)).toBeInTheDocument();
});

test('formats toolip displayed as a list', () => {
  const data = [
    {
      'keen.key': '2019-12-01T00:00:00.000Z',
      'Love, Anger, Madness Edwidge Danticat': 105,
      'Game of Thrones George R. R. Martin': 79,
      'Harry Potter J.K. Rowling': 102,
      'It Stephen King': 47,
      'The Shining Stephen King': 0,
    },
    {
      'keen.key': '2020-01-01T00:00:00.000Z',
      'Love, Anger, Madness Edwidge Danticat': 95,
      'Game of Thrones George R. R. Martin': 719,
      'Harry Potter J.K. Rowling': 112,
      'It Stephen King': 2059,
      'The Shining Stephen King': 6,
    },
    {
      'keen.key': '2020-02-01T00:00:00.000Z',
      'Love, Anger, Madness Edwidge Danticat': 2,
      'Game of Thrones George R. R. Martin': 11,
      'Harry Potter J.K. Rowling': 1,
      'It Stephen King': 45,
      'The Shining Stephen King': 0,
    },
  ];
  const keys = [
    'Love, Anger, Madness Edwidge Danticat',
    'Game of Thrones George R. R. Martin',
    'Harry Potter J.K. Rowling',
    'It Stephen King',
    'The Shining Stephen King',
  ];
  const disabledKeys = [];
  const selectors = [
    {
      selector: [2, 'Love, Anger, Madness Edwidge Danticat'],
      color: '#85B4C3',
    },
    { selector: [2, 'Game of Thrones George R. R. Martin'], color: '#CB5623' },
    { selector: [2, 'Harry Potter J.K. Rowling'], color: '#E29B1E' },
    { selector: [2, 'It Stephen King'], color: '#487650' },
    { selector: [2, 'The Shining Stephen King'], color: '#27566D' },
  ];
  const stackMode = 'percent';
  const groupMode = 'stacked';
  const isList = true;

  const { wrapper } = render({
    data,
    keys,
    disabledKeys,
    selectors,
    stackMode,
    groupMode,
    isList,
  });
  expect(wrapper).toMatchSnapshot();
});
