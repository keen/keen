import { renderHook as rltRenderHook } from '@testing-library/react-hooks';
import {
  register as registerTimezone,
  unregister as unregisterTimezone,
} from 'timezone-mock';

beforeAll(() => {
  registerTimezone('UTC');
});

afterAll(() => {
  unregisterTimezone();
});

import useDistributedTooltip, {
  TooltipConfig,
} from './use-distributed-tooltip';

const renderHook = (overSettings: Partial<TooltipConfig> = {}) => {
  const settings: TooltipConfig = {
    data: [],
    disabledKeys: [],
    keys: ['keen.value'],
    labelSelector: 'keen.key',
    tooltipSettings: {},
    selectors: [],
    ...overSettings,
  };

  return rltRenderHook(() => useDistributedTooltip(settings));
};

test('set "null" as label for singular data', () => {
  const data = [
    {
      'keen.key': 'Poland',
      'keen.value': 30,
    },
  ];

  const { result } = renderHook({
    data,
    selectors: [{ selector: [0, 'keen.value'], color: 'red' }],
  });

  expect(result.current.label).toBeNull();
});

test('formats date for time precision tooltip', () => {
  const data = [
    {
      'keen.key': '2020-01-01T00:00:00.000Z',
      male: 40,
      female: 100,
    },
  ];

  const tooltipSettings = {
    formatTime: jest.fn().mockImplementation(() => '@formatted-date'),
  };

  const { result } = renderHook({
    data,
    keys: ['male', 'female'],
    selectors: [{ selector: [0, 'keen.value'], color: 'red' }],
    tooltipSettings,
    isTimePrecise: true,
  });

  expect(result.current.label).toEqual('@formatted-date');
});

test('set label as category name for grouped data', () => {
  const data = [
    {
      'keen.key': 'Germany',
      male: 40,
      female: 100,
    },
    {
      'keen.key': 'USA',
      male: 120,
      female: 100,
    },
  ];

  const { result } = renderHook({
    data,
    keys: ['male', 'female'],
    selectors: [{ selector: [0, 'keen.value'], color: 'red' }],
  });

  expect(result.current.label).toEqual('Germany');
});

test('applies pattern formatter for values ', () => {
  const data = [
    {
      'keen.key': 'Germany',
      male: 40,
      female: 100,
    },
  ];

  const tooltipSettings = {
    formatValue: '${number; 0.00a}$',
  };

  const { result } = renderHook({
    data,
    keys: ['male', 'female'],
    selectors: [{ selector: [0, 'female'], color: 'red' }],
    tooltipSettings,
  });

  const [firstItem] = result.current.items;

  expect(firstItem).toMatchInlineSnapshot(`
    Object {
      "color": "red",
      "data": Object {
        "label": "female",
        "value": "100.00$",
      },
    }
  `);
});

test('applies function formatter for the values ', () => {
  const data = [
    {
      'keen.key': 'Germany',
      female: 100,
    },
  ];

  const tooltipSettings = {
    formatValue: jest.fn().mockImplementation(() => '@formatted-value'),
  };

  const { result } = renderHook({
    data,
    keys: ['male', 'female'],
    selectors: [{ selector: [0, 'female'], color: 'red' }],
    tooltipSettings,
  });

  const [firstItem] = result.current.items;

  expect(firstItem).toMatchInlineSnapshot(`
    Object {
      "color": "red",
      "data": Object {
        "label": "female",
        "value": "@formatted-value",
      },
    }
  `);
});

test('calculates total value for multiple selectors', () => {
  const data = [
    {
      'keen.key': 'Germany',
      male: 40,
      female: 100,
    },
    {
      'keen.key': 'USA',
      male: 120,
      female: 100,
    },
  ];

  const { result } = renderHook({
    data,
    isStacked: true,
    keys: ['male', 'female'],
    disabledKeys: ['female'],
    selectors: [
      { selector: [0, 'male'], color: 'red' },
      { selector: [0, 'female'], color: 'blue' },
    ],
  });

  expect(result.current.totalValue).toEqual(40);
});

test('calculates percentage value for records', () => {
  const data = [
    {
      'keen.key': 'Germany',
      male: 40,
      female: 60,
    },
  ];

  const { result } = renderHook({
    data,
    keys: ['male', 'female'],
    isPercentage: true,
    isStacked: true,
    selectors: [
      { selector: [0, 'male'], color: 'red' },
      { selector: [0, 'female'], color: 'blue' },
    ],
  });

  const items = [
    {
      color: 'red',
      data: {
        change: '(40)',
        label: 'male',
        value: '40.0%',
      },
    },
    {
      color: 'blue',
      data: {
        change: '(60)',
        label: 'female',
        value: '60.0%',
      },
    },
  ];

  expect(result.current.items).toEqual(items);
});
