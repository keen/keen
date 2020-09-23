import formatScaleLabel from './format-scale-label';

test('returns original value', () => {
  const value = 'marketing';
  const result = formatScaleLabel(value, { type: 'band' });

  expect(result).toEqual(value);
});

test('applies scale settings formatter function', () => {
  const value = 'formatted';
  const formatFunction = () => 'formatted';
  const result = formatScaleLabel(100, {
    type: 'band',
    formatLabel: formatFunction,
  });

  expect(result).toEqual(value);
});

test('formats "Date" instance as ISO string', () => {
  const value = new Date('2020-09-12:12:00:00Z+2');
  const result = formatScaleLabel(value);

  expect(result).toMatchInlineSnapshot(
    `"Sat Sep 12 2020 12:00:00 GMT+0200 (GMT+02:00)"`
  );
});
