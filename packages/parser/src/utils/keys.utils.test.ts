/* eslint-disable @typescript-eslint/naming-convention */
import { mapKeys } from './keys.utils';

describe('@keen.io/parser - mappings', () => {
  describe('mapKeys()', () => {
    it('should map labels based on provided selector', () => {
      const labelSelector = 'title';
      const map = {
        invalid_tickets: 'Invalid tickets',
        valid_tickets: 'Valid tickets',
      };

      const keys = ['0.value'];
      const data = [
        {
          title: 'invalid_tickets',
          '0.value': 17,
        },
        {
          title: 'valid_tickets',
          '0.value': 19,
        },
      ];

      expect(mapKeys(map, keys, data, labelSelector)).toMatchInlineSnapshot(`
        Object {
          "keys": Array [
            "0.value",
          ],
          "results": Array [
            Object {
              "0.value": 17,
              "title": "Invalid tickets",
            },
            Object {
              "0.value": 19,
              "title": "Valid tickets",
            },
          ],
        }
      `);
    });

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
