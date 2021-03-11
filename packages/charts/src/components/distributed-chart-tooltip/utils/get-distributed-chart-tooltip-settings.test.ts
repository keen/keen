import { ScaleSettings } from '@keen.io/charts-utils';
import { getDistributedChartTooltipSettings } from './index';

const chartData = [
  {
    name: '2020-01-01T00:00:00.000Z',
    users: -3,
    licenses: -52,
    shops: -12,
    books: -54,
  },
  {
    name: '2020-02-01T00:00:00.000Z',
    users: 6,
    licenses: 54,
    shops: 34,
    books: 89,
  },
  {
    name: '2020-03-01T00:00:00.000Z',
    users: 2,
    licenses: 2,
    shops: 2,
    books: 2,
  },
  {
    name: '2020-04-01T00:00:00.000Z',
    users: 20,
    licenses: -25,
    shops: -25,
    books: 12,
  },
];

const inputParams = {
  data: chartData,
  keys: ['users', 'books', 'licenses', 'shops'],
  disabledKeys: [],
  labelSelector: 'name',
  scaleSettings: { type: 'time', precision: 'month' } as ScaleSettings,
  isPercentage: true,
  selectors: [
    {
      color: '#85B4C3',
      selector: [2, 'books'],
    },
  ],
};

describe('getDistributedChartTooltipSettings()', () => {
  test('Should count percent value if isPercentage flag is set', () => {
    const { percentValue } = getDistributedChartTooltipSettings(inputParams);
    expect(percentValue).toEqual(25);
  });

  test('Should return total value if multiple selectors are provided', () => {
    const paramsWithMultipleSelectors = {
      ...inputParams,
      isPercentage: false,
      selectors: [
        {
          selector: [3, 'licenses'],
          color: '#CB5623',
        },
        {
          selector: [3, 'shops'],
          color: '#E29B1E',
        },
      ],
    };
    const { totalValue } = getDistributedChartTooltipSettings(
      paramsWithMultipleSelectors
    );
    expect(totalValue).toEqual(-18);
  });

  test('Should return selected values and format them when format pattern is provided', () => {
    const paramsWithFormatValue = {
      ...inputParams,
      isPercentage: false,
      selectors: [
        {
          selector: [3, 'licenses'],
          color: '#CB5623',
        },
        {
          selector: [3, 'shops'],
          color: '#E29B1E',
        },
      ],
      formatValue: '${number; 0.00a}',
    };
    const resp = getDistributedChartTooltipSettings(paramsWithFormatValue);
    expect(resp.items.length).toEqual(2);
    expect(resp.items[0].data.value).toEqual('-25.00');
  });

  test('Should return function to get tooltip label', () => {
    const { getTooltipLabel } = getDistributedChartTooltipSettings(inputParams);
    expect(getTooltipLabel()).toEqual('2020-03-01T00:00:00.000Z');
  });
});
