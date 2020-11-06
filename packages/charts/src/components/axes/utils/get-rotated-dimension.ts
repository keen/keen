import { calculateRotation } from '@keen.io/charts-utils';

type Options = {
  radiusAngle: number;
  dimension: {
    width: number;
    height: number;
  };
};

/**
 * Calculates dimension of rotated element
 *
 * @param radiusAngle - rotation degrees
 * @param dimension - width and height of element
 * @return width and height of rotated element
 *
 */
const getRotatedDimension = ({ radiusAngle, dimension }: Options) => {
  if (radiusAngle === 0) return dimension;

  if (Math.abs(radiusAngle) === 90) {
    return {
      height: dimension.width,
      width: dimension.height,
    };
  }

  return calculateRotation(dimension.width, dimension.height, radiusAngle);
};

export default getRotatedDimension;
