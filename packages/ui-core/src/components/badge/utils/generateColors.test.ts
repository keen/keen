import generateColors from './generateColors';

test('generate colors for "white" variant', () => {
  const result = generateColors('white');

  expect(result).toMatchInlineSnapshot(`
    Object {
      "bgColor": "#D8D8D8",
      "textColor": "#FFFFFF",
    }
  `);
});

test('generate colors for "black" variant', () => {
  const result = generateColors('white');

  expect(result).toMatchInlineSnapshot(`
    Object {
      "bgColor": "#D8D8D8",
      "textColor": "#FFFFFF",
    }
  `);
});

test('generate colors for "white" variant', () => {
  const result = generateColors('gray');

  expect(result).toMatchInlineSnapshot(`
    Object {
      "bgColor": "#EDEDED",
      "textColor": "#4F5B5F",
    }
  `);
});
