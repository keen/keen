import React, { FC } from 'react';
import { Layout, CardSettings } from '@keen.io/ui-core';

import { Container } from './legend-base.styles';

import Card from './card';

type Props = {
  fullDimension?: boolean;
  layout: Layout;
  card: CardSettings;
  children: React.ReactNode;
};

const LegendBase: FC<Props> = ({
  card,
  layout,
  children,
  fullDimension = false,
}) => {
  const borderPosition = layout === 'vertical' ? 'top' : 'left';
  return (
    <Card
      borderPosition={borderPosition}
      fullDimension={fullDimension}
      {...card}
    >
      <Container>{children}</Container>
    </Card>
  );
};

export default LegendBase;
