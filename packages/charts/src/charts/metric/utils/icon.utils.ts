import { transparentize } from 'polished';

type IconCircle = {
  radius: number;
  opacity: number;
  color: string;
};

export const generateCircles = ({
  color,
  circleStyle,
}: {
  color: string;
  circleStyle: 'solid' | 'regular';
}): IconCircle[] => {
  return circleStyle === 'solid'
    ? [
        { radius: 225, opacity: 0.01, color },
        { radius: 200, opacity: 0.01, color },
        { radius: 175, opacity: 0.02, color },
        { radius: 150, opacity: 0.02, color },
        { radius: 125, opacity: 0.03, color },
        { radius: 100, opacity: 0.03, color },
        { radius: 75, opacity: 0.04, color },
      ]
    : [
        { radius: 225, opacity: 0.01, color: transparentize(1, color) },
        { radius: 200, opacity: 0.02, color: transparentize(0.95, color) },
        { radius: 175, opacity: 0.03, color: transparentize(0.9, color) },
        { radius: 150, opacity: 0.04, color: transparentize(0.85, color) },
        { radius: 125, opacity: 0.05, color: transparentize(0.8, color) },
        { radius: 100, opacity: 0.08, color: transparentize(0.75, color) },
        { radius: 75, opacity: 0.1, color: transparentize(0.7, color) },
      ];
};
