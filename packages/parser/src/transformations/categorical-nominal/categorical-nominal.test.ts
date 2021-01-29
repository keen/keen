import { transformCategoricalNominal } from './categorical-nominal';

test('transform categorized nominal results', () => {
  const result = [
    {
      'user.country': 'Afghanistan',
      result: ['Mr.', 'Mrs.', 'Ms.'],
    },
    { 'user.country': 'Belize', result: ['Dr.', 'Ms.'] },
    {
      'user.country': 'Guernsey',
      result: ['Dr.'],
    },
  ];

  expect(transformCategoricalNominal({ result })).toMatchInlineSnapshot(`
    Object {
      "data": Array [
        Object {
          "keen.value": Array [
            "Mr.",
            "Mrs.",
            "Ms.",
          ],
          "user.country": "Afghanistan",
        },
        Object {
          "keen.value": Array [
            "Dr.",
            "Ms.",
          ],
          "user.country": "Belize",
        },
        Object {
          "keen.value": Array [
            "Dr.",
          ],
          "user.country": "Guernsey",
        },
      ],
      "keys": Array [
        "keen.value",
        "user.country",
      ],
    }
  `);
});
