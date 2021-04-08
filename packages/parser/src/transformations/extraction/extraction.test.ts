import { transformExtraction } from './extraction';

const result = [
  { keen: { id: '@event/01' }, user: { name: 'John', surname: null } },
  { keen: { id: '@event/02' } },
];

test('transform extraction results', () => {
  expect(transformExtraction({ result })).toMatchInlineSnapshot(`
    Object {
      "data": Array [
        Object {
          "keen.id": "@event/01",
          "user.name": "John",
          "user.surname": null,
        },
        Object {
          "keen.id": "@event/02",
          "user.name": "",
          "user.surname": "",
        },
      ],
      "keys": Array [
        "keen.id",
        "user.name",
        "user.surname",
      ],
    }
  `);
});

test('all keys should be strings', () => {
  const result = [
    { keen: { id: '@event/01' }, 100: { 200: 'John', 300: null } },
    { keen: { id: '@event/02' }, 400: 'Nathan' },
  ];

  const keys = transformExtraction({ result }).keys;

  expect(keys.every((key) => typeof key === 'string')).toBeTruthy();
});
