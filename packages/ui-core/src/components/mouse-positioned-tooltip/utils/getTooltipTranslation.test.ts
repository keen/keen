import { getTooltipTranslation } from './getTooltipTranslation';

describe('@keen.io/ui-core - mouse positioned tooltip - translation for tooltip placement', () => {
  describe('getTooltipTranslation()', () => {
    it('should return correct x and y translation for "top-left" tooltip placement', () => {
      const result = getTooltipTranslation('top-left');
      expect(result).toStrictEqual({ x: '-100%', y: '-100%' });
    });

    it('should return correct x and y translation for "bottom-left" tooltip placement', () => {
      const result = getTooltipTranslation('bottom-left');
      expect(result).toStrictEqual({ x: '-100%', y: '0' });
    });

    it('should return correct x and y translation for "top-right" tooltip placement', () => {
      const result = getTooltipTranslation('top-right');
      expect(result).toStrictEqual({ x: '0', y: '-100%' });
    });

    it('should return correct x and y translation for "bottom-left" tooltip placement', () => {
      const result = getTooltipTranslation('bottom-right');
      expect(result).toStrictEqual({ x: '0', y: '0' });
    });
  });
});
