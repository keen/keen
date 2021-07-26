import React, { FC, useEffect, useRef, useState } from 'react';
import { Position, Alignment } from '@keen.io/ui-core';
import { hasContentOverflow } from '@keen.io/charts-utils';

import { Container, Layout } from './series-vertical.styles';

import Slider from '../slider';
import Card from '../card';

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
  /** Space between items */
  itemGap?: number;
  /** Update visibile data series offset */
  onOffsetUpdate: (offset: [number, number]) => void;
  /** Render legend nodes */
  renderNodes: (
    series: DataSerie[],
    elementRef: React.MutableRefObject<any>,
    itemWidth?: number
  ) => JSX.Element[];
};

const SeriesVertical: FC<Props> = ({
  card,
  alignment,
  colorPalette,
  dataSeries,
  renderNodes,
  itemGap = 8,
}) => {
  const containerRef = useRef(null);
  const elementRef = useRef(null);

  const [dataSeriesOffset, setDataSeriesOffset] = useState<[number, number]>([
    0,
    0,
  ]);

  const [renderMode, setRenderMode] = useState<RenderMode>('list');
  const [elementHeight, setElementHeight] = useState<number>(0);
  const [sliderDimension, setSliderDimension] = useState<[number, number]>([
    0,
    0,
  ]);

  useEffect(() => {
    if (renderMode === 'slider') {
      const colorsInPallete = colorPalette.length;
      const containerHeight = containerRef.current.offsetHeight;

      const dimensionCapacity = Math.floor(
        (containerHeight - 2 * BUTTON_DIMENSION) / (elementHeight + 10)
      );

      const itemsInSlider =
        dimensionCapacity > colorsInPallete
          ? colorsInPallete
          : dimensionCapacity;

      const sliderHeight =
        itemsInSlider * (elementHeight + 10) + 2 * BUTTON_DIMENSION;

      setSliderDimension(([width]) => [width, sliderHeight]);
      setDataSeriesOffset([0, itemsInSlider]);
    }
  }, [renderMode]);

  useEffect(() => {
    const notEnoughColors = dataSeries.length > colorPalette.length;
    const contentOverflow = hasContentOverflow(
      'vertical',
      containerRef.current
    );

    console.log(contentOverflow,notEnoughColors, 'notEnoughColors' )

    if (contentOverflow || notEnoughColors) {
      const { height } = elementRef.current.getBoundingClientRect();
      setElementHeight(height);

      const sliderHeight = containerRef.current.offsetHeight;
      const sliderWidth = containerRef.current.offsetWidth;

      setSliderDimension([sliderWidth, sliderHeight]);
      setRenderMode('slider');
    }
  }, []);

  const [startOffset, endOffset] = dataSeriesOffset;

  return (
    <div
      style={{
        height: '100%',
        maxWidth: '100%',
        position: 'relative',
      }}
    >
      <Container alignment={alignment}   ref={containerRef}>
        <Card borderPosition="top" {...card}>
          {renderMode === 'list' ? (
            <Layout itemSpace={itemGap}>
              {renderNodes(
                dataSeries.slice(0, colorPalette.length),
                elementRef
              )}
            </Layout>
          ) : (
            <Slider
              mode="vertical"
              dimension={sliderDimension}
              nextDisabled={endOffset === dataSeries.length}
              previousDisabled={startOffset === 0}
              animation={(itemIndex) => {
                const itemPosition =
                  itemIndex * (elementHeight + itemGap) + BUTTON_DIMENSION;
                return {
                  initial: { opacity: 0, y: itemPosition, x: 15 },
                  animate: { y: itemPosition, opacity: 1 },
                  exit: { y: '50%', opacity: 0 },
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
                elementRef
              )}
            </Slider>
          )}
        </Card>
      </Container>
    </div>
  );
};

export default SeriesVertical;
