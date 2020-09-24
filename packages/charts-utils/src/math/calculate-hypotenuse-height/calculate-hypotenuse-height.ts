/**
 * Calculates hypotenuse height based on provided points.
 *
 * @param x - point x
 * @param y - point y
 * @return hypotenuse height
 *
 */
const calculateHypotenuseHeight = (x: number, y: number): number =>
  Math.sqrt(x * x + y * y);

export default calculateHypotenuseHeight;
