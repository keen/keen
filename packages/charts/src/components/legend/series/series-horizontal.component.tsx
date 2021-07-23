import React, { FC, useRef, useState, useEffect } from 'react';
import { Position, Alignment, Typography } from '@keen.io/ui-core';
import { hasContentOverflow } from '@keen.io/charts-utils';

import { Container, Layout } from './series-horizontal.styles';

import Card from '../card';
import Label, { MAX_LABEL_WIDTH } from '../label';

import ShiftGroup from './shift-group';

import { DataSerie } from './types';

import { LegendCardSettings, RenderMode } from '../types';

type Props = {
  /** Labels typography */
  typography: Typography;
  /** Card settings */
  card: LegendCardSettings;
  /* Component position */
  position: Position;
  /* Legend container alignment */
  alignment?: Alignment;
  /* Color palette */
  colorPalette: string[];
  /* Collection of data series */
  dataSeries: DataSerie[];
  /** Update visibile data series offset */
  onOffsetUpdate: (offset: [number, number]) => void;
};

const SeriesHorizontal: FC<Props> = ({
  card,
  position,
  typography,
  dataSeries,
  colorPalette,
}) => {
  const containerRef = useRef(null);
  const [dataSeriesOffset, setDataSeriesOffset] = useState<[number, number]>([
    0,
    0,
  ]);

  const [renderMode, setRenderMode] = useState<RenderMode>('list');
  const [sliderDimension, setSliderDimension] = useState<[number, number]>([0, 0]);

  const [startOffset, endOffset] = dataSeriesOffset;
  const [sliderWidth, sliderHeight] = sliderDimension;

  useEffect(() => {
    if (renderMode === 'slider') {
      const colorPaletteCapacity = colorPalette.length;

      const containerWidth = containerRef.current.offsetWidth;
      const containerHeight = containerRef.current.offsetHeight;


      const SLIDER_CONTROL_WIDTH = 15;

      const itemsFit = Math.floor(
        (containerWidth - 30) / (MAX_LABEL_WIDTH + 10)
      );
      const itemsInSlider =
        itemsFit > colorPaletteCapacity ? colorPaletteCapacity : itemsFit;

      // nie może być większy niż containerWidth
      const sliderWidth =
        itemsInSlider * (MAX_LABEL_WIDTH + 10) + 2 * SLIDER_CONTROL_WIDTH;

      console.log(sliderWidth, 'sliderWidth', containerHeight);

      setSliderDimension(([, height]) => [sliderWidth, height]);
      setDataSeriesOffset([0, itemsInSlider]);
    }
  }, [renderMode]);

  useEffect(() => {
    const colorPaletteMatch = dataSeries.length <= colorPalette.length;
    const overflow = hasContentOverflow('horizontal', containerRef.current);

      const containerHeight = containerRef.current.offsetHeight;

    setSliderDimension([0, containerHeight]);

    if (overflow || !colorPaletteMatch) {
      setRenderMode('slider');
    }
  }, []);

  return (
    <div
      style={{ background: 'transparent', width: '100%', position: 'relative' }}
    >
      <Container ref={containerRef}>
        <Card borderPosition="left" {...card} backgroundColor="#fff">
          {renderMode === 'list' ? (
            <Layout>
              {dataSeries
                .slice(0, colorPalette.length)
                .map(({ name, color }: DataSerie, idx: number) => (
                  <div key={name}>
                    <Label
                      typography={typography}
                      markColor={color}
                      onClick={(disabled, label) => {}}
                      onMouseEnter={(label) => {}}
                      onMouseLeave={() => {}}
                      text={name}
                    />
                  </div>
                ))}
            </Layout>
          ) : (
            <div style={{ width: `${sliderWidth}px`, height: `${sliderHeight}px` }}>
              <div
                style={{ position: 'absolute', left: 0, top: 0, zIndex: 9999 }}
                onClick={() => {
                  if (startOffset === 0) {
                    return;
                  }

                  setDataSeriesOffset((state) => {
                    const [offsetA, offsetB] = state;

                    return [offsetA - 1, offsetB - 1];
                  });
                }}
              >{`<`}</div>
              <ShiftGroup nodeWidth={MAX_LABEL_WIDTH} gapWidth={10}>
                  {dataSeries
                    .slice(dataSeriesOffset[0], dataSeriesOffset[1])
                    .map(({ name, color }, idx) => (
                      <div
                        key={`${name}`}
                      >
                        <Label
                          typography={typography}
                          markColor={color}
                          onClick={(disabled, label) => {}}
                          onMouseEnter={(label) => {}}
                          onMouseLeave={() => {}}
                          text={name}
                        />
                      </div>
                    ))}
                      </ShiftGroup>
              <div
                style={{ position: 'absolute', right: 0, top: 0 }}
                onClick={() => {
                  if (endOffset === dataSeries.length) {
                    return;
                  }

                  setDataSeriesOffset((state) => {
                    const [offsetA, offsetB] = state;

                    return [offsetA + 1, offsetB + 1];
                  });
                }}
              >{`>`}</div>
            </div>
          )}
        </Card>
      </Container>
    </div>
  );
};

export default SeriesHorizontal;
