import React, { FC } from 'react';
import { Text } from '@keen.io/ui-core';

import { Wrapper, TitleWrapper } from './bubble-legend.styles';

import { Typography } from '@keen.io/ui-core';

import { Circles } from './bubble-circles.component';
import { Labels } from './bubble-labels.component';

type Props = {
  /** typography styles */
  typography: Typography;
  /** Radius range of chart bubbles */
  minRadius: number;
  maxRadius: number;
  /** Chart domain [min, max] */
  domain: [number, number];
  /** Legend title settings */
  title: {
    value?: string;
    typography?: Typography;
  };
};

export const BubbleLegend: FC<Props> = ({
  typography,
  domain,
  title,
  minRadius = 5,
  maxRadius = 40,
}) => {
  const { fontSize } = typography;

  return (
    <Wrapper>
      <TitleWrapper>
        <Text {...title?.typography}>{title?.value}</Text>
      </TitleWrapper>
      <svg preserveAspectRatio="xMinYMin" width="100%" height="100%">
        <Circles domain={domain} offsetTop={fontSize} />
        <Labels
          domain={domain}
          typography={typography}
          minRadius={minRadius}
          maxRadius={maxRadius}
        />
      </svg>
    </Wrapper>
  );
};

export default BubbleLegend;
