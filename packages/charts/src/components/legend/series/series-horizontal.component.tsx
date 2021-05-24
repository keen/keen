import React, { FC, useRef } from 'react';
import { Group, Position, Typography } from '@keen.io/ui-core';

import { Layout, GroupedSeries } from './series-horizontal.styles';

import Card from '../card';
import Slider from '../slider';

import { useRenderMode } from '../legend.utils';
import { LegendCardSettings } from '../types';

type Props = {
  children: React.ReactNode;
  typography: Typography;
  card: LegendCardSettings;
  position: Position;
  labelsLength?: number;
};

const SeriesHorizontal: FC<Props> = ({
  card,
  position,
  children,
  labelsLength,
}) => {
  const element = useRef(null);
  const { mode } = useRenderMode(
    element,
    'horizontal',
    position,
    'list',
    labelsLength
  );

  const renderSlider = mode === 'slider';

  return (
    <Card borderPosition="left" {...card}>
      <div ref={element} style={{ overflow: 'hidden' }}>
        {renderSlider ? (
          <Slider mode="horizontal" slidesPerRow={2}>
            {children}
          </Slider>
        ) : (
          <Layout>
            {mode === 'list' && children}
            {mode === 'group' && (
              <Group groupNode={GroupedSeries}>{children}</Group>
            )}
          </Layout>
        )}
      </div>
    </Card>
  );
};

export default SeriesHorizontal;
