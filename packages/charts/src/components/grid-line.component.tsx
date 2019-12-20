import React, { memo } from 'react';

import { GridLine as LineProps } from './cartesian-grid.utils';

type Props = {
  color: string;
} & LineProps;

const GridLine = ({ color, ...props }: Props) => (
  <line {...props} style={{ stroke: color, strokeWidth: 1 }} />
);

export default memo(GridLine);
