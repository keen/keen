export type Projection =
  | 'mercator'
  | 'orthographic'
  | 'azimuthalEqualArea'
  | 'equalEarth'
  | 'naturalEarth';

export type ProjectionState = {
  rotation: [number, number, number];
};

export type TooltipMeta = {
  color: string;
  label: string;
  value: number;
};
