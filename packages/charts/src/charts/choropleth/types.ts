import { Formatter } from '@keen.io/charts-utils';

export type Projection =
  | 'mercator'
  | 'geoAlbersUsa'
  | 'orthographic'
  | 'azimuthalEqualArea'
  | 'equalEarth'
  | 'naturalEarth';

export type ProjectionState = {
  translation: [number, number];
  scale: number;
  rotation: [number, number, number];
};

export type TooltipMeta = {
  color: string;
  label: string;
  value: number;
};

export type TooltipSettings = {
  formatValue?: Formatter;
};
