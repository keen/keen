import { mapKeys } from './keys.utils';

describe('@keen.io/parser - mappings', () => {
  describe('mapKeys()', () => {
    it('should map keys based on provided declarations', () => {
      const map = {
        '0.value': 'tickets',
      };
      const keys = ['0.value'];
      const data = [
        {
          title: 'Harry Potter',
          '0.value': 12,
        },
        {
          title: 'Lord of the Rings',
          '0.value': 16,
        },
      ];

      expect(mapKeys(map, keys, data)).toMatchInlineSnapshot(`
        Object {
          "keys": Array [
            "tickets",
          ],
          "results": Array [
            Object {
              "tickets": 12,
              "title": "Harry Potter",
            },
            Object {
              "tickets": 16,
              "title": "Lord of the Rings",
            },
          ],
        }
      `);
    });
  });
});
