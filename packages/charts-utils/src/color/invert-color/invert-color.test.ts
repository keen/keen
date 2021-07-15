import invertColor from './invert-color';

test('should return inverted color for #7F8C8D', () => {
  const invertedColor = invertColor('#7F8C8D');

  expect(invertedColor).toBe('#807372');
});

test('should return  inverted color for #DAF7A6', () => {
  const invertedColor = invertColor('#DAF7A6');

  expect(invertedColor).toBe('#250859');
});

test('should return  inverted color for #C70039', () => {
  const invertedColor = invertColor('#C70039');

  expect(invertedColor).toBe('#38ffc6');
});
