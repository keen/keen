import React, { FC, useRef, useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Position, Alignment, Typography } from '@keen.io/ui-core';
import { hasContentOverflow } from '@keen.io/charts-utils';

import { Container, Layout } from './series-horizontal.styles';

import Card from '../card';
import Label, { MAX_LABEL_WIDTH } from '../label';

import { DataSerie } from './types';

import { LegendCardSettings, RenderMode } from '../types';

type Props = {
  typography: Typography;
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

// Color pallete = data series or series lare ower than color palette and all fits then leave list

// slider
/*
a) maximum rendered items eq colorPallete.length
b)
*/

// jeżeli slider z powodu braku kolorow ale overflow = false to rederujemy slider z N items eq ilosc kolorow

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
  const [sliderWidth, setSliderWidth] = useState<number>(0);

  const [startOffset, endOffset] = dataSeriesOffset;

  useEffect(() => {
    if (renderMode === 'slider') {
      const colorPaletteCapacity = colorPalette.length;

      const containerWidth = containerRef.current.offsetWidth;
      const SLIDER_CONTROL_WIDTH = 15;

      const itemsFit = Math.floor(
        (containerWidth - 30) / (MAX_LABEL_WIDTH + 10)
      );
      const itemsInSlider =
        itemsFit > colorPaletteCapacity ? colorPaletteCapacity : itemsFit;

      // nie może być większy niż containerWidth
      const sliderWidth =
        itemsInSlider * (MAX_LABEL_WIDTH + 10) + 2 * SLIDER_CONTROL_WIDTH;

      console.log(sliderWidth, 'sliderWidth');

      setSliderWidth(sliderWidth);
      setDataSeriesOffset([0, itemsInSlider]);
    }
  }, [renderMode]);

  useEffect(() => {
    const colorPaletteMatch = dataSeries.length <= colorPalette.length;
    const overflow = hasContentOverflow('horizontal', containerRef.current);

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
            <div style={{ width: `${sliderWidth}px` }}>
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
              <Layout>
                <AnimatePresence>
                  {dataSeries
                    .slice(dataSeriesOffset[0], dataSeriesOffset[1])
                    .map(({ name, color }, idx) => (
                      <motion.div
                        key={`${name}`}
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2 }}
                        exit={{}}
                      >
                        <Label
                          typography={typography}
                          markColor={color}
                          onClick={(disabled, label) => {}}
                          onMouseEnter={(label) => {}}
                          onMouseLeave={() => {}}
                          text={name}
                        />
                      </motion.div>
                    ))}
                </AnimatePresence>
              </Layout>
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
