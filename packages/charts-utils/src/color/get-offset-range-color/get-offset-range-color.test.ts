import getOffsetRangeColor from './get-offset-range-color';

const colors = ['red', 'green', 'blue'];

test('should return color when in offset', () => {
  const color = getOffsetRangeColor(0, colors, [0, 1]);

  expect(color).toMatchInlineSnapshot(`"red"`);
});

test('should return color when in offset and another round is going', () => {
  const color = getOffsetRangeColor(4, colors, [3, 5]);

  expect(color).toMatchInlineSnapshot(`"green"`);
});

test('should return color when not in offset with default color', () => {
  const color = getOffsetRangeColor(2, colors, [0, 1]);

  expect(color).toMatchInlineSnapshot(`"rgba(205,207,211,0.5)"`);
});

test('should return color when not in offset with new default color', () => {
  const color = getOffsetRangeColor(1, colors, [0, 1], 'black');

  expect(color).toMatchInlineSnapshot(`"black"`);
});
