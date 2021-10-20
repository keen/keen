import { createColumnSelectionEvent } from './column-selection-event';

test('creates event structure for single column selection with applied formatter', () => {
  const formatters = {
    createdAt: '${datetime; YYYY-MM; hidden}',
  };

  const selectedColumns = [
    {
      columnName: 'createdAt',
      index: 0,
    },
  ];

  const data = [
    {
      createdAt: '2012-03-11',
    },
    {
      createdAt: '2021-11-01',
    },
    {
      createdAt: null,
    },
  ];

  const event = createColumnSelectionEvent({
    data,
    formatters,
    selectedColumns,
  });

  expect(event).toEqual({
    eventName: '@table/columns-selected',
    meta: {
      selection: [
        {
          name: 'createdAt',
          formatter: '${datetime; YYYY-MM; hidden}',
          dataType: 'datetime',
        },
      ],
    },
  });
});

test('creates event structure for single column selection without applied formatter', () => {
  const selectedColumns = [
    {
      columnName: 'createdAt',
      index: 0,
    },
  ];

  const data = [
    {
      createdAt: '2012-03-11',
    },
    {
      createdAt: '2021-11-01',
    },
    {
      createdAt: null,
    },
  ];

  const event = createColumnSelectionEvent({
    data,
    formatters: {},
    selectedColumns,
  });

  expect(event).toEqual({
    eventName: '@table/columns-selected',
    meta: {
      selection: [
        {
          name: 'createdAt',
          formatter: null,
          dataType: 'datetime',
        },
      ],
    },
  });
});

test('creates event structure for multiple column selection and ignores formatters', () => {
  const formatters = {
    createdAt: '${datetime; YYYY-MM; hidden}',
  };

  const selectedColumns = [
    {
      columnName: 'createdAt',
      index: 0,
    },
    {
      columnName: 'company',
      index: 1,
    },
  ];

  const data = [
    {
      createdAt: '2012-03-11',
      company: 'Apple',
    },
    {
      createdAt: '2021-11-01',
      company: 'Microsoft',
    },
    {
      createdAt: null,
      company: 'Comarch',
    },
  ];

  const event = createColumnSelectionEvent({
    data,
    formatters,
    selectedColumns,
  });

  expect(event).toEqual({
    eventName: '@table/columns-selected',
    meta: {
      selection: [
        {
          name: 'createdAt',
          formatter: '${datetime; YYYY-MM; hidden}',
          dataType: 'datetime',
        },
        {
          name: 'company',
          formatter: null,
          dataType: 'string',
        },
      ],
    },
  });
});
