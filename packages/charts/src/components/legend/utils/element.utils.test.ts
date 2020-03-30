import { getElementOffset } from './element.utils';

describe('@keen.io/charts - <Legend />', () => {
  describe('getElementOffset()', () => {
    it('should return offset for "vertical" mode', () => {
      const element = {
        offsetHeight: 50,
        scrollHeight: 100,
      };

      expect(getElementOffset(element as HTMLElement, 'vertical'))
        .toMatchInlineSnapshot(`
        Object {
          "offset": 50,
          "scroll": 100,
        }
      `);
    });

    it('should return offset for "horizontal" mode', () => {
      const element = {
        offsetWidth: 30,
        scrollWidth: 0,
      };

      expect(getElementOffset(element as HTMLElement, 'horizontal'))
        .toMatchInlineSnapshot(`
        Object {
          "offset": 30,
          "scroll": 0,
        }
      `);
    });
  });
});
