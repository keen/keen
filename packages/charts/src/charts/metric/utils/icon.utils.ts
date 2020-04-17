import { transparentize } from 'polished';

import { MAX_RADIUS, RADIUS_DIFFERENCE } from '../constants';

type IconCircle = {
  radius: number;
  opacity: number;
  color: string;
};

const solidOpacities = [0.01, 0.01, 0.02, 0.02, 0.03, 0.03, 0.04];

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
