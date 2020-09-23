import calculateHypotenuseHeight from '../calculate-hypotenuse-height';

/**
 * Calculates hypotenuse based on provided points.
 *
 * @param x - point x
 * @param y - point y
 * @return hypotenuse
 *
 */
const calculateHypotenuse = (
  x: number,
  y: number,
  radius: number
): [number, number] => {
  const height = calculateHypotenuseHeight(x, y);
  return [(x / height) * radius, (y / height) * radius];
};

export default calculateHypotenuse;
