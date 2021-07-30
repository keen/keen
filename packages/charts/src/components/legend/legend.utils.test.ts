import { createSliderTransition } from './legend.utils';

test('should create horizontal slider transitions', () => {
  const transition = createSliderTransition('horizontal', 0, 100, 10);

  expect(transition).toMatchInlineSnapshot(`
    Object {
      "animate": Object {
        "x": 39,
      },
      "exit": [Function],
      "initial": [Function],
    }
  `);
});

test('should create vertical slider transitions', () => {
  const transition = createSliderTransition('vertical', 0, 100, 10);

  expect(transition).toMatchInlineSnapshot(`
    Object {
      "animate": Object {
        "y": 39,
      },
      "exit": [Function],
      "initial": [Function],
    }
  `);
});
