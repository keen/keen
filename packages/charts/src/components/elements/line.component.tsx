import React, { memo } from 'react';

import { Line as LineType } from '../../types';

type Props = {
  color?: string;
} & LineType;

const Line = ({ color = 'currentColor', ...props }: Props) => (
  <line {...props} style={{ stroke: color, strokeWidth: 1 }} />
);

export default memo(Line);
