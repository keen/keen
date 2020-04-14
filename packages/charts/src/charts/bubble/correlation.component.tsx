import React, { FC } from 'react';
import { Text, Typography } from '@keen.io/ui-core';

import {
  Header,
  Container,
  Value,
  Point,
  SizeContainer,
} from './correlation.styles';

type Props = {
  typography: Typography;
  correlations: { name: string; value: number | string }[];
  title: string;
  color: string;
  valueKey: string;
};

const Correlation: FC<Props> = ({
  title,
  correlations,
  color,
  typography,
  valueKey = '',
}) => {
  const size = correlations.find(({ name }) => name === valueKey);
  const labels = correlations
    .filter(({ name }) => name !== valueKey)
    .map(({ name, value }, idx) => (
      <Container key={`${name}-${idx}`}>
        <div>{name}</div>
        <Value>{value}</Value>
      </Container>
    ));
  return (
    <Text {...typography}>
      <Header>
        <Point color={color} />
        {title}
      </Header>
      {labels}
      {size && (
        <SizeContainer key={size.name}>
          <div>{size.name}</div>
          <Value>{size.value}</Value>
        </SizeContainer>
      )}
    </Text>
  );
};

export default Correlation;
