import React, { FC, memo } from 'react';

type Props = {
  path: string;
  fill: string;
  strokeWidth: string;
  stroke: string;
};

const MapPath: FC<Props> = memo(({ fill, path, stroke }) => (
  <path d={path} fill={fill} strokeWidth="0.5" stroke={stroke} />
));

MapPath.displayName = 'MapPath';

export default MapPath;
