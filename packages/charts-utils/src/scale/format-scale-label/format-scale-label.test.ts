import formatScaleLabel from './format-scale-label';

const RealDate = Date;

beforeAll(() => {
  global.Date = jest.fn().mockImplementation(date => new RealDate(date));
  global.Date.UTC = jest
    .fn()
    .mockImplementation(date => new RealDate(date).getUTCDate());
});

afterAll(() => {
  global.Date = RealDate;
});

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
  const value = new Date('2020-09-12:12:00:00Z');
  const result = formatScaleLabel(value);

  expect(result).toMatchInlineSnapshot(`2020-09-12T12:00:00.000Z`);
});
