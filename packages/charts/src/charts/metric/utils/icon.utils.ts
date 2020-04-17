import { transparentize } from 'polished';

import { MAX_RADIUS, RADIUS_DIFFERENCE } from '../constants';

type IconCircle = {
  radius: number;
  opacity: number;
  color: string;
};

const solidOpacities = [0.01, 0.01, 0.02, 0.02, 0.03, 0.03, 0.04];

/*





    [
        { radius: 225, opacity: 0.01, color: transparentize(1, color) },
        { radius: 200, opacity: 0.02, color: transparentize(0.95, color) },
        { radius: 175, opacity: 0.03, color: transparentize(0.9, color) },
        { radius: 150, opacity: 0.04, color: transparentize(0.85, color) },
        { radius: 125, opacity: 0.05, color: transparentize(0.8, color) },
        { radius: 100, opacity: 0.08, color: transparentize(0.75, color) },
        { radius: 75, opacity: 0.1, color: transparentize(0.7, color) },
      ];


*/

const regularOpacities = [
  [0.01, 1],
  [0.02, 0.95],
  [0.03, 0.9],
  [0.04, 0.85],
  [0.05, 0.8],
  [0.08, 0.75],
  [0.01, 0.7],
];

export const generateCircles = ({
  color,
  circleStyle,
}: {
  color: string;
  circleStyle: 'solid' | 'regular';
}): IconCircle[] =>
  circleStyle === 'solid'
    ? solidOpacities.map((opacity, idx) => ({
        opacity,
        color,
        radius: MAX_RADIUS - idx * RADIUS_DIFFERENCE,
      }))
    : regularOpacities.map(([fillOpacity, colorOpacity], idx) => ({
        opacity: fillOpacity,
        color: transparentize(colorOpacity, color),
        radius: MAX_RADIUS - idx * RADIUS_DIFFERENCE,
      }));
