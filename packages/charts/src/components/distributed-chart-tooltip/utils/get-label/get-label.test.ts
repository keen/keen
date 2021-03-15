import getLabel from './get-label';

test('applies pattern formatter for record label', () => {
  const data = [
    {
      'keen.key': 'Germany',
      male: 40,
      female: 100,
    },
  ];

  const result = getLabel({
    data,
    percentageData: [],
    selector: [0, 'female'],
    formatValue: '${number; 0.00a}$',
  });

  expect(result).toMatchInlineSnapshot(`
    Object {
      "value": "100.00$",
    }
  `);
});

test('applies function formatter for record label', () => {
  const data = [
    {
      'keen.key': 'Germany',
      male: 40,
      female: 100,
    },
  ];

  const result = getLabel({
    data,
    percentageData: [],
    selector: [0, 'female'],
    formatValue: jest.fn().mockImplementationOnce(() => '@formatted-value'),
  });

  expect(result).toMatchInlineSnapshot(`
    Object {
      "value": "@formatted-value",
    }
  `);
});

test('returns percentage data', () => {
  const data = [
    {
      'keen.key': 'Germany',
      male: 40,
      female: 100,
    },
  ];

  const result = getLabel({
    data,
    isPercentage: true,
    percentageData: [
      {
        male: 40,
        female: 60,
      },
    ],
    selector: [0, 'female'],
    formatValue: '${number; 0.00a}$',
  });

  expect(result).toMatchInlineSnapshot(`
    Object {
      "change": "(100.00$)",
      "value": "60.0%",
    }
  `);
});
