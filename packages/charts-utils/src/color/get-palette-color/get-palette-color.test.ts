import getPaletteColor from './get-palette-color';

const colors = ['red', 'green', 'blue'];

describe('getPaletteColor()', () => {
  test('should return green color', () => {
    const result = getPaletteColor(1, colors);

    expect(result).toBe('green');
  });

  test('should return black color', () => {
    const result = getPaletteColor(3, colors);

    expect(result).toBe('rgba(205,207,211,0.5)');
  });
});
