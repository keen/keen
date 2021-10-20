import { setColumnsOrder } from './setColumnsOrder';

describe('setColumnsOrder()', () => {
  const data = [
    {
      price: 0.5,
      province: 'Liaoning',
      city: 'Shenyang',
      country: 'China',
    },
    {
      price: 0.5,
      province: 'West Virginia',
      city: 'Parsons',
      country: 'United States',
    },
  ];

  test('set columns order based on provided settings', () => {
    const orderSettings = ['city', 'province', 'country', 'invalid-key-name'];
    const [firstSeries] = setColumnsOrder(orderSettings, data);

    expect(Object.keys(firstSeries)).toMatchInlineSnapshot(`
      Array [
        "city",
        "province",
        "country",
        "price",
      ]
    `);
  });
});
