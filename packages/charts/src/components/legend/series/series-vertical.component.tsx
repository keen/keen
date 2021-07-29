import React, { FC, useEffect, useRef, useState } from 'react';
import { Position, Alignment } from '@keen.io/ui-core';
import { hasContentOverflow } from '@keen.io/charts-utils';

import { Container, Layout } from './series-vertical.styles';

import Slider from '../slider';
import Card from '../card';

import { createSliderTransition } from '../legend.utils';

import { BUTTON_DIMENSION, BUTTON_SHADOW_SIZE } from '../slider-button';
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
  /** Legend item width */
  itemWidth?: number;
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
  itemWidth = 100,
  itemGap = 10,
}) => {
  const containerRef = useRef(null);
  const elementRef = useRef(null);
  const [calculationReady, setCalculationReady] = useState(false);

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
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    if (renderMode === 'slider') {
      const colorsInPallete = colorPalette.length;
      const containerHeight = containerRef.current.offsetHeight;

      const dimensionCapacity = Math.floor(
        (containerHeight - 2 * (BUTTON_DIMENSION + BUTTON_SHADOW_SIZE)) /
          (elementHeight + itemGap)
      );

      const itemsInSlider =
        dimensionCapacity > colorsInPallete
          ? colorsInPallete
          : dimensionCapacity;

      const sliderHeight =
        itemsInSlider * (elementHeight + itemGap) +
        2 * (BUTTON_DIMENSION + BUTTON_SHADOW_SIZE) -
        itemGap;

      setSliderDimension(([width]) => [width, sliderHeight]);
      setDataSeriesOffset([0, itemsInSlider]);
      setCalculationReady(true);
    }
  }, [renderMode]);

  useEffect(() => {
    const notEnoughColors = dataSeries.length > colorPalette.length;
    const contentOverflow = hasContentOverflow(
      'vertical',
      containerRef.current
    );

    if (contentOverflow || notEnoughColors) {
      const { height } = elementRef.current.getBoundingClientRect();
      setElementHeight(height);

      const sliderHeight = containerRef.current.offsetHeight;
      const sliderWidth = containerRef.current.offsetWidth;

      setSliderDimension([sliderWidth, sliderHeight]);
      setRenderMode('slider');
    } else {
      setCalculationReady(true);
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
      <Container
        calculationReady={calculationReady}
        alignment={alignment}
        ref={containerRef}
      >
        <Card borderPosition="top" {...card}>
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
              mode="vertical"
              dimension={sliderDimension}
              nextDisabled={endOffset === dataSeries.length}
              previousDisabled={startOffset === 0}
              direction={direction}
              animation={(itemIndex) =>
                createSliderTransition(
                  'vertical',
                  itemIndex,
                  elementHeight,
                  itemGap
                )
              }
              onNextSlide={() => {
                setDataSeriesOffset(([startOffset, endOffset]) => [
                  startOffset + 1,
                  endOffset + 1,
                ]);
                setDirection(1);
              }}
              onPreviousSlide={() => {
                setDataSeriesOffset(([startOffset, endOffset]) => [
                  startOffset - 1,
                  endOffset - 1,
                ]);
                setDirection(-1);
              }}
            >
              {renderNodes(
                dataSeries.slice(dataSeriesOffset[0], dataSeriesOffset[1]),
                elementRef,
                itemWidth
              )}
            </Slider>
          )}
        </Card>
      </Container>
    </div>
  );
};

export default SeriesVertical;
