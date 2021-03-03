import { ParserSettings } from '../../../types';
import { choroplethChartTransformation } from './choropleth-transformation';

test('transforms data with multiple group by properties', () => {
  const parserSettings: ParserSettings = {
    fillEmptyIntervalsKeys: false,
    mergePropertiesOrder: null,
    transformation: 'categorical',
  };

  const groupBySettings = ['user.address.country', 'user.gender'];

  const input = [
    {
      'user.gender': 'Trans*Female',
      'user.address.country': 'Bhutan',
      result: 2,
    },
    {
      'user.gender': 'Transmasculine',
      'user.address.country': 'Finland',
      result: 2,
    },
    { 'user.gender': 'Man', 'user.address.country': 'Indonesia', result: 2 },
    {
      'user.gender': 'Transmasculine',
      'user.address.country': 'Indonesia',
      result: 10,
    },
    { 'user.gender': 'Woman', 'user.address.country': 'Indonesia', result: 24 },
  ];

  const expectedResult = {
    data: [
      {
        'keen.key': 'Bhutan',
        'keen.value': 2,
        'keen.elements': {
          'Trans*Female': 2,
        },
      },
      {
        'keen.key': 'Finland',
        'keen.value': 2,
        'keen.elements': {
          Transmasculine: 2,
        },
      },
      {
        'keen.key': 'Indonesia',
        'keen.value': 36,
        'keen.elements': {
          Woman: 24,
          Man: 2,
          Transmasculine: 10,
        },
      },
    ],
    keys: ['keen.value'],
  };

  expect(
    choroplethChartTransformation(input, parserSettings, groupBySettings)
  ).toMatchObject(expectedResult);
});

test('transforms data with double group by settings and ignores additional properties', () => {
  const parserSettings: ParserSettings = {
    fillEmptyIntervalsKeys: false,
    mergePropertiesOrder: null,
    transformation: 'categorical',
  };

  const groupBySettings = [
    'user.address.country',
    'user.gender',
    'user.prefix',
  ];

  const input = [
    {
      'user.prefix': 'Mr',
      'user.gender': 'Trans*Female',
      'user.address.country': 'Bhutan',
      result: 10,
    },
  ];

  const expectedResult = {
    data: [
      {
        'keen.key': 'Bhutan',
        'keen.value': 10,
        'keen.elements': {
          'Trans*Female': 10,
        },
      },
    ],
    keys: ['keen.value'],
  };

  expect(
    choroplethChartTransformation(input, parserSettings, groupBySettings)
  ).toMatchObject(expectedResult);
});
