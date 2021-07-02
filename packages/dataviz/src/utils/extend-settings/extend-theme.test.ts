import { extendTheme } from './extend-theme';

test('replaces theme values for colors configuration', () => {
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

test('overrides single nested theme property', () => {
  const axisX = {
    labels: { enabled: false },
  };
  const theme = extendTheme({ axisX } as any);

  expect(theme.axisX.labels).toMatchInlineSnapshot(`
    Object {
      "enabled": false,
      "radiusAngle": 0,
      "typography": Object {
        "fontColor": "#1D2729",
        "fontFamily": "Gangster Grotesk, sans-serif",
        "fontSize": 10,
        "fontStyle": "normal",
        "fontWeight": "normal",
      },
    }
  `);
});
