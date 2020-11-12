/**
 * Get dimension of rotated element by calculating
 * extreme points.
 *
 * @param width - width of element
 * @param height - height of element
 * @param degrees - rotation degrees
 * @return width and height of rotated element
 *
 */
const calculateRotation = (width: number, height: number, degrees: number) => {
  const angle = (degrees * Math.PI) / 180;
  const sin = Math.sin(angle);
  const cos = Math.cos(angle);

  const x1 = cos * width,
    y1 = sin * width;

  const x2 = -sin * height,
    y2 = cos * height;

  const x3 = cos * width - sin * height,
    y3 = sin * width + cos * height;

  const minX = Math.min(0, x1, x2, x3),
    maxX = Math.max(0, x1, x2, x3),
    minY = Math.min(0, y1, y2, y3),
    maxY = Math.max(0, y1, y2, y3);

  return {
    width: maxX - minX,
    height: maxY - minY,
  };
};

export default calculateRotation;
