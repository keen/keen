import formatDate from './format-date';

test('formats date with default pattern and "America/New_York" timezone', () => {
  const result = formatDate('2021-03-31T00:00:00-04:00', 'America/New_York');

  expect(result).toMatchInlineSnapshot(`"2021-03-31 00:00"`);
});

test('formats date with default pattern and "UTC" timezone', () => {
  const result = formatDate('2021-03-02T12:00:00Z', 'UTC');

  expect(result).toMatchInlineSnapshot(`"2021-03-02 12:00"`);
});
