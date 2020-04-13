import { Position } from '../../../types';

export const arrowReverse = (position: Position) => {
  switch (position) {
    case 'top':
      return 'bottom';
    case 'left':
      return 'right';
    case 'right':
      return 'left';
    case 'bottom':
      return 'top';

    default:
      return position;
  }
};
