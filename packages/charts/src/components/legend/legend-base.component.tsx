import React, { FC } from 'react';
import { Layout, CardSettings } from '@keen.io/ui-core';

import { Container, Spacing } from './legend-base.styles';

import Card from './card';

type Props = {
  layout: Layout;
  card: CardSettings;
  children: React.ReactNode;
  spacing?: Spacing;
  fullDimension?: boolean;
};

const LegendBase: FC<Props> = ({
  card,
  layout,
  children,
  spacing = 'normal',
  fullDimension = false,
}) => {
  const borderPosition = layout === 'vertical' ? 'top' : 'left';
  return (
    <Card
      borderPosition={borderPosition}
      fullDimension={fullDimension}
      {...card}
    >
      <Container
        layout={layout}
        spacing={spacing}
        fullDimension={fullDimension}
      >
        {children}
      </Container>
    </Card>
  );
};

export default LegendBase;
