import { validateOptions } from './validate-options';

test('throws error for missing "type" property', () => {
  expect(() =>
    validateOptions({ container: '#chart' } as any)
  ).toThrowErrorMatchingInlineSnapshot(
    `"@keen.io/dataviz - type property is required"`
  );
});

test('throws error for missing "container" property', () => {
  expect(() =>
    validateOptions({ type: 'bar' } as any)
  ).toThrowErrorMatchingInlineSnapshot(
    `"@keen.io/dataviz - container property is required"`
  );
});

test('throws error about invalid "container" property type', () => {
  expect(() =>
    validateOptions({ type: 'bar', container: 20 } as any)
  ).toThrowErrorMatchingInlineSnapshot(
    `"@keen.io/dataviz - container property must be instance of HTMLElement or DOM Element selector"`
  );
});

test('not throws error for HTMLElement reference', () => {
  const container = document.createElement('div');

  expect(() => validateOptions({ type: 'pie', container })).not.toThrow();
});
