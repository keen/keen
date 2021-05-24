import React, { FC } from 'react';
import { Layout } from '@keen.io/ui-core';

import { Container, Spacing } from './legend-base.styles';

import Card from './card';

import { LegendCardSettings } from './types';

type Props = {
  layout: Layout;
  card: LegendCardSettings;
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
