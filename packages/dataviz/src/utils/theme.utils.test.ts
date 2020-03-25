import { extendTheme } from './theme.utils';

describe('@keen.io/dataviz - theme utils', () => {
  describe('extendTheme()', () => {
    it('should replace theme values for colors "array"', () => {
      const colors = ['blue', 'violet', 'green'];
      const theme = extendTheme({ colors });

      expect(theme.colors).toMatchInlineSnapshot(`
        Array [
          "blue",
          "violet",
          "green",
        ]
      `);
    });

    it('should override single nested theme property', () => {
      const axisX = {
        labels: { enabled: false },
      };
      const theme = extendTheme({ axisX } as any);

      expect(theme.axisX.labels).toMatchObject({
        radiusAngle: expect.any(Number),
        typography: {
          fontStyle: expect.any(String),
          fontWeight: expect.any(String),
          fontSize: expect.any(Number),
          fontFamily: expect.any(String),
          fontColor: expect.any(String),
        },
      });
      expect(theme.axisX.labels.enabled).toBeFalsy();
    });
  });
});
