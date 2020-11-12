import calculateRotation from './calculate-rotation';

test('calculates width and height of the element after rotation of 90 degrees', () => {
  const degrees = 90;
  const result = calculateRotation(100, 100, degrees);

  expect(result).toMatchInlineSnapshot(`
    Object {
      "height": 100,
      "width": 100,
    }
  `);
});

test('calculates width and height of the element after rotation of 45 degrees', () => {
  const degrees = 45;
  const result = calculateRotation(100, 100, degrees);

  expect(result).toMatchInlineSnapshot(`
    Object {
      "height": 141.4213562373095,
      "width": 141.4213562373095,
    }
  `);
});
