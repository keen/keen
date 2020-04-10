import React, { FC } from 'react';

import { Container } from './off-range.styles';

type Props = {
  size: number;
  borderRadius: number;
  position: number;
};

const OffRange: FC<Props> = ({ position, size, borderRadius }) => (
  <Container size={size} borderRadius={borderRadius} position={position} />
);

export default OffRange;
