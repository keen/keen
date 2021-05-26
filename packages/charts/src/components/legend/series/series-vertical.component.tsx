import React, { FC, useState, useRef, useEffect } from 'react';
import { Position, Typography } from '@keen.io/ui-core';

import { Layout } from './series-vertical.styles';

import Slider from '../slider';
import Card from '../card';

import { useRenderMode } from '../legend.utils';
import { LegendCardSettings } from '../types';

type Props = {
  children: React.ReactNode;
  typography: Typography;
  card: LegendCardSettings;
  adaptiveHeight: boolean;
  position: Position;
  labelsLength?: number;
};

const SeriesVertical: FC<Props> = ({
  card,
  position,
  adaptiveHeight,
  children,
  labelsLength,
}) => {
  const [fullDimension, setFullDimension] = useState(true);
  const element = useRef(null);
  const { mode } = useRenderMode(
    element,
    'vertical',
    position,
    'list',
    labelsLength
  );

  const renderSlider = mode === 'slider';

  useEffect(() => {
    if (mode === 'list' && !adaptiveHeight) {
      setFullDimension(false);
    }
  }, [mode]);

  return (
    <Card borderPosition="top" fullDimension={fullDimension} {...card}>
      <div ref={element} style={{ overflow: 'hidden', height: '100%' }}>
        {renderSlider ? (
          <Slider mode="vertical" slidesPerRow={1}>
            {children}
          </Slider>
        ) : (
          <Layout>{children}</Layout>
        )}
      </div>
    </Card>
  );
};

export default SeriesVertical;
