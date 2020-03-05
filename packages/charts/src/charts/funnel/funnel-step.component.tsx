import React, { FC } from 'react';
import { motion } from 'framer-motion';
import { ScaleLinear } from 'd3-scale';
import { Layout } from '@keen.io/ui-core';

import FunnelHeader from './funnel-header.component';
import { Container, Header, Step } from './funnel-step.styles';

import { ResponsiveWrapper, ChartBase } from '../../components';

import { calculateStepPoints } from './utils';

import { Margins, Theme } from '../../types';

const createStepMotion = (layout: Layout) => {
  const motionProperty = layout === 'horizontal' ? 'x' : 'y';
  return {
    hidden: {
      opacity: 0,
      [motionProperty]: -100,
    },
    visible: {
      opacity: 1,
      [motionProperty]: 0,
    },
  };
};

const createStepTransition = (idx: number) => ({
  delay: idx * 0.2,
  duration: 0.7,
});

const stepShadow = '10px 20px 24px 8px rgba(29,39,41, .1)';

type Props = {
  scale: ScaleLinear<number, number>;
  theme: Pick<Theme, 'funnel'>;
  index: number;
  label: string;
  layout: Layout;
  value: number | string;
  nextPercentageValue: number;
  percentageValue: number;
  color: string;
  margins: Margins;
  stepsCount: number;
};

export const FunnelStep: FC<Props> = ({
  index,
  label,
  stepsCount,
  value,
  percentageValue,
  nextPercentageValue,
  scale,
  color,
  margins,
  theme,
  layout,
}) => {
  const stepMotion = createStepMotion(layout);
  const {
    funnel: { step, header },
  } = theme;

  return (
    <Step layout={layout} stepsCount={stepsCount}>
      <motion.div
        style={{ width: '100%', height: '100%' }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        whileHover={{
          scale: 1.05,
          boxShadow: stepShadow,
        }}
      >
        <Container layout={layout} backgroundColor={step.backgroundColor}>
          <Header
            centerItems={layout === 'horizontal'}
            fixedWidth={layout === 'vertical'}
            backgroundColor={header.backgroundColor}
          >
            <FunnelHeader
              label={label}
              value={value}
              percentageValue={percentageValue}
              theme={theme}
            />
          </Header>
          <ResponsiveWrapper>
            {(width: number, height: number) => {
              const path = calculateStepPoints({
                layout,
                scale,
                percentageValue,
                nextPercentageValue,
                dimension: { height, width },
                margins,
              });

              return (
                <ChartBase
                  svgDimensions={{ width, height }}
                  margins={margins}
                  theme={theme as Theme}
                >
                  <motion.path
                    fill={color}
                    d={path}
                    transition={createStepTransition(index)}
                    initial="hidden"
                    animate="visible"
                    variants={stepMotion}
                  />
                </ChartBase>
              );
            }}
          </ResponsiveWrapper>
        </Container>
      </motion.div>
    </Step>
  );
};

export default FunnelStep;
