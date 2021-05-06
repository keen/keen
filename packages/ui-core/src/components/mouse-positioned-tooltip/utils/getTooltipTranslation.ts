import { TooltipPinPlacements } from '../types';

export const getTooltipTranslation = (position: TooltipPinPlacements) => {
  let translation = { x: '0', y: '0' };
  switch (position) {
    case 'top-left':
      translation = { x: '-100%', y: '-100%' };
      break;
    case 'top-right':
      translation.y = '-100%';
      break;
    case 'bottom-left':
      translation.x = '-100%';
  }
  return translation;
};
