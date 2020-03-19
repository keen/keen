import React, { memo, FC } from 'react';
import { GeoPath, GeoPermissibleObjects, GeoGraticuleGenerator } from 'd3-geo';

type Props = {
  draw: GeoPath<any, GeoPermissibleObjects>;
  graticule: GeoGraticuleGenerator;
  stroke: string;
};

const Graticule: FC<Props> = memo(({ draw, graticule, stroke }) => (
  <path fill="none" strokeWidth="0.5" stroke={stroke} d={draw(graticule())} />
));

Graticule.displayName = 'Graticule';

export default Graticule;
