import { colors as palette } from '@keen.io/colors';
import { stringifyColors } from './colors.utils';

test('should return string of colors without zeroPoint', () => {
  const colors = [
    palette.lightBlue[500],
    palette.green[500],
    palette.orange[400],
    palette.blue[500],
  ];
  const newColors = stringifyColors(colors, 10);

  expect(newColors).toMatchInlineSnapshot(
    `"#85B4C3, #487650, #D95B24, #27566D"`
  );
});

test('should return string of colors with zeroPoint', () => {
  const colors = [
    palette.lightBlue[500],
    palette.white[500],
    palette.orange[400],
    palette.blue[500],
  ];
  const newColors = stringifyColors(colors, 10);

  expect(newColors).toMatchInlineSnapshot(
    `"#85B4C3, #FFFFFF 10%, #D95B24, #27566D"`
  );
});
