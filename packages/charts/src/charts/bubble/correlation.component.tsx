import React, { FC } from 'react';
import { Text, Typography } from '@keen.io/ui-core';

import { Header, Container, Value, Point } from './correlation.styles';

type Props = {
  typography: Typography;
  correlations: { name: string; value: number | string }[];
  title: string;
  color: string;
};

const Correlation: FC<Props> = ({ title, correlations, color, typography }) => (
  <Text {...typography}>
    <Header>
      <Point color={color} />
      {title}
    </Header>
    {correlations.map(({ name, value }, idx) => (
      <Container key={`${name}-${idx}`}>
        <div>{name}</div>
        <Value>{value}</Value>
      </Container>
    ))}
  </Text>
);

export default Correlation;
