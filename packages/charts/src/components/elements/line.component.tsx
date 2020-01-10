import React, { memo } from 'react';

import { Line as LineType } from '../../types';

type Props = {
  color?: string;
  stroke?: number;
} & LineType;

const Line = ({ color = 'currentColor', stroke = 1, ...props }: Props) => (
  <line {...props} style={{ stroke: color, strokeWidth: stroke }} />
);

export default memo(Line);
