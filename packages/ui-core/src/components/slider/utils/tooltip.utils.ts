import { Position } from '../../../types';

export const calculateTooltipPosition = (
  x: number,
  y: number,
  position: Position
) => {
  switch (position) {
    case 'top':
      return {
        top: '-6px',
        left: '50%',
        transform: 'translateX(-50%) translateY(-100%)',
      };
    case 'left':
      return {};
    case 'right':
      return {};
    case 'bottom':
      return {
        top: '12px',
        left: '50%',
        transform: 'translateX(-50%) translateY(0%)',
      };

    default:
      return {};
  }
};

/*
    transform: ,

*/

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
