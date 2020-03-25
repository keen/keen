import { validateOptions } from './visualizer.utils';

describe('@keen.io/dataviz - utils', () => {
  describe('validateOptions()', () => {
    it('should throw error for missing "type" property', () => {
      expect(() =>
        validateOptions({ container: '#chart' } as any)
      ).toThrowErrorMatchingInlineSnapshot(
        `"@keen.io/dataviz - type property is required"`
      );
    });

    it('should throw error for missing "container" property', () => {
      expect(() =>
        validateOptions({ type: 'bar' } as any)
      ).toThrowErrorMatchingInlineSnapshot(
        `"@keen.io/dataviz - container property is required"`
      );
    });

    it('should throw error about invalid "container" property type', () => {
      expect(() =>
        validateOptions({ type: 'bar', container: 20 } as any)
      ).toThrowErrorMatchingInlineSnapshot(
        `"@keen.io/dataviz - container property must be instance of HTMLElement or DOM Element selector"`
      );
    });

    it('should not throw error for HTMLElement reference', () => {
      const container = document.createElement('div');

      expect(() => validateOptions({ type: 'pie', container })).not.toThrow();
    });
  });
});
