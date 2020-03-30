import React, { FC, useState, useRef, useEffect } from 'react';
import { CardSettings, Position, Typography } from '@keen.io/ui-core';

import { Layout } from './series-vertical.styles';

import Slider from '../slider';
import Card from '../card';

import { useRenderMode } from '../legend.utils';

type Props = {
  children: React.ReactNode;
  typography: Typography;
  card: CardSettings;
  adaptiveHeight: boolean;
  position: Position;
};

const SeriesVertical: FC<Props> = ({
  card,
  position,
  adaptiveHeight,
  children,
}) => {
  const [fullDimension, setFullDimension] = useState(true);
  const element = useRef(null);
  const { mode } = useRenderMode(element, 'vertical', position, 'list');

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
