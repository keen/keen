import React, { FC, memo } from 'react';

type Props = {
  onMouseEnter: (e: React.MouseEvent) => void;
  onMouseMove: (e: React.MouseEvent) => void;
  onMouseLeave: (e: React.MouseEvent) => void;
  path: string;
  fill: string;
  strokeWidth: string;
  stroke: string;
};

const MapPath: FC<Props> = memo(
  ({ fill, path, stroke, onMouseEnter, onMouseMove, onMouseLeave }) => (
    <path
      d={path}
      fill={fill}
      strokeWidth="0.5"
      stroke={stroke}
      onMouseEnter={onMouseEnter}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    />
  )
);

MapPath.displayName = 'MapPath';

export default MapPath;
