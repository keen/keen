import { TooltipPinPlacements } from '../types';

export const getTooltipTranslation = (position: TooltipPinPlacements) => {
  switch (position) {
    case 'top-left':
      return { x: '-100%', y: '-100%' };
    case 'top-right':
      return { x: '0', y: '-100%' };
    case 'bottom-left':
      return { x: '-100%', y: '0' };
    case 'bottom-right':
      return { x: '0', y: '0' };
  }
};
