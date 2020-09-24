import { TO_RADIANS } from '../../constants';

/**
 * Converts degrees to radians.
 * Used by gauge chart gradient value renderer.
 *
 * @param deg - degrees value
 * @return radians
 *
 */
const convertDegreesToRadians = (deg: number) => deg * TO_RADIANS;

export default convertDegreesToRadians;
