import formatNumber from './format-number';

test('formats "decimal" values', () => {
  const value = 0.253;
  expect(formatNumber(value)).toMatchInlineSnapshot(`"250m"`);
});

test('formats "dozens" values', () => {
  const value = 19;
  expect(formatNumber(value)).toMatchInlineSnapshot(`"19"`);
});

test('formats "hundreds" values', () => {
  const value = 134;
  expect(formatNumber(value)).toMatchInlineSnapshot(`"130"`);
});

test('formats "thousand" values', () => {
  const value = 1200;
  expect(formatNumber(value)).toMatchInlineSnapshot(`"1.2k"`);
});

test('formats "thousand" values wtesth custom precision', () => {
  const value = 5244;
  expect(formatNumber(value, 3)).toMatchInlineSnapshot(`"5.24k"`);
});

test('formats "milion" values', () => {
  const value = 1200000;
  expect(formatNumber(value)).toMatchInlineSnapshot(`"1.2M"`);
});
