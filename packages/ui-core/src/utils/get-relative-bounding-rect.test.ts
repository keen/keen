import { getRelativeBoundingRect } from './get-relative-bounding-rect';

test('calculates correctly HTML rectangle', () => {
  const parentElement: any = {
    getBoundingClientRect: jest.fn().mockReturnValue({
      top: 100,
      bottom: 40,
      right: 20,
      left: 30,
      width: 40,
    }),
  };

  jest.spyOn(document, 'getElementById').mockReturnValueOnce(parentElement);

  const childElement: any = {
    getBoundingClientRect: jest.fn().mockReturnValue({
      top: 120,
      bottom: 50,
      right: 30,
      left: 50,
      width: 55,
    }),
  };

  expect(getRelativeBoundingRect('dropdown-container', childElement))
    .toMatchInlineSnapshot(`
    Object {
      "bottom": 10,
      "left": 20,
      "right": 10,
      "top": 20,
      "width": 55,
    }
  `);
});
