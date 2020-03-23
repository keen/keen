import React, { FC } from 'react';
import { GeoPath, GeoPermissibleObjects } from 'd3-geo';

type Props = {
  draw: GeoPath<any, GeoPermissibleObjects>;
  background: string;
};

const Sphere: FC<Props> = ({ draw, background }) => (
  <path pointerEvents="none" fill={background} d={draw({ type: 'Sphere' })} />
);

export default Sphere;
