import React, { FC } from 'react';

import { Container } from './off-range.styles';

type Props = {
  borderRadius: number;
  styles?: React.CSSProperties;
};

const OffRange: FC<Props> = ({ styles, borderRadius }) => (
  <Container borderRadius={borderRadius} style={styles} />
);

export default OffRange;
