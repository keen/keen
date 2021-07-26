import React, { FC, useRef, useState, useEffect } from 'react';
import { Position, Alignment } from '@keen.io/ui-core';
import { hasContentOverflow } from '@keen.io/charts-utils';

import {
  Container,
  AlignmentContainer,
  Layout,
} from './series-horizontal.styles';

import Card from '../card';
import Slider from '../slider';

import { BUTTON_DIMENSION } from '../slider-button';
import { DataSerie } from './types';
import { LegendCardSettings, RenderMode } from '../types';

type Props = {
  /** Card settings */
  card: LegendCardSettings;
  /* Component position */
  position: Position;
  /* Legend container alignment */
  alignment: Alignment;
  /* Color palette */
  colorPalette: string[];
  /* Collection of data series */
  dataSeries: DataSerie[];
  /** Update visibile data series offset */
  onOffsetUpdate: (offset: [number, number]) => void;
  /** Legend item width */
  itemWidth?: number;
  /** Space between items */
  itemGap?: number;
  /** Render legend nodes */
  renderNodes: (
    series: DataSerie[],
    elementRef: React.MutableRefObject<any>,
    itemWidth?: number
  ) => JSX.Element[];
};

const SeriesHorizontal: FC<Props> = ({
  card,
  alignment,
  dataSeries,
  colorPalette,
  itemWidth = 65,
  itemGap = 10,
  renderNodes,
}) => {
  const containerRef = useRef(null);
  const elementRef = useRef(null);
  const [dataSeriesOffset, setDataSeriesOffset] = useState<[number, number]>([
    0,
    0,
  ]);

  const [renderMode, setRenderMode] = useState<RenderMode>('list');
  const [sliderDimension, setSliderDimension] = useState<[number, number]>([
    0,
    0,
  ]);

  const [startOffset, endOffset] = dataSeriesOffset;

  useEffect(() => {
    if (renderMode === 'slider') {
      const colorsInPallete = colorPalette.length;
      const containerWidth = containerRef.current.offsetWidth;

      const dimensionCapacity = Math.floor(
        (containerWidth - 2 * BUTTON_DIMENSION) / (itemWidth + itemGap)
      );

      const itemsInSlider =
        dimensionCapacity > colorsInPallete
          ? colorsInPallete
          : dimensionCapacity;

      const sliderWidth =
        itemsInSlider * (itemWidth + itemGap) + 2 * BUTTON_DIMENSION;

      setSliderDimension(([, height]) => [sliderWidth, height]);
      setDataSeriesOffset([0, itemsInSlider]);
    }
  }, [renderMode]);

  useEffect(() => {
    const notEnoughColors = dataSeries.length > colorPalette.length;
    const contentOverflow = hasContentOverflow(
      'horizontal',
      containerRef.current
    );

    if (contentOverflow || notEnoughColors) {
      const sliderHeight = containerRef.current.offsetHeight;

      setSliderDimension([0, sliderHeight]);
      setRenderMode('slider');
    }
  }, []);

  return (
    <div
      style={{ background: 'transparent', width: '100%', position: 'relative' }}
    >
      <Container ref={containerRef}>
        <AlignmentContainer alignment={alignment}>
          <Card borderPosition="left" {...card}>
            {renderMode === 'list' ? (
              <Layout itemSpace={itemGap}>
                {renderNodes(
                  dataSeries.slice(0, colorPalette.length),
                  elementRef,
                  itemWidth
                )}
              </Layout>
            ) : (
              <Slider
                mode="horizontal"
                dimension={sliderDimension}
                nextDisabled={endOffset === dataSeries.length}
                previousDisabled={startOffset === 0}
                animation={(itemIndex) => {
                  const itemPosition =
                    itemIndex * (itemWidth + itemGap) + BUTTON_DIMENSION;
                  return {
                    initial: {
                      opacity: 0,
                      x: itemPosition,
                      y: '-50%',
                      top: '50%',
                    },
                    animate: { x: itemPosition, opacity: 1 },
                    exit: { x: '-50%', opacity: 0 },
                  };
                }}
                onNextSlide={() =>
                  setDataSeriesOffset(([startOffset, endOffset]) => [
                    startOffset + 1,
                    endOffset + 1,
                  ])
                }
                onPreviousSlide={() =>
                  setDataSeriesOffset(([startOffset, endOffset]) => [
                    startOffset - 1,
                    endOffset - 1,
                  ])
                }
              >
                {renderNodes(
                  dataSeries.slice(dataSeriesOffset[0], dataSeriesOffset[1]),
                  elementRef,
                  itemWidth
                )}
              </Slider>
            )}
          </Card>
        </AlignmentContainer>
      </Container>
    </div>
  );
};

export default SeriesHorizontal;
