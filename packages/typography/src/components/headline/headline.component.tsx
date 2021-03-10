import React, { FC } from 'react';
import styled from 'styled-components';
import { typography, TypographyProps, color, ColorProps } from 'styled-system';
import { colors } from '@keen.io/colors';

import { Variant } from './types';
import { FontWeight, LineHeight } from '../../types';

import { resetSpacing } from '../../utils';
import { DEFAULT_LINE_HEIGHT } from '../../constants';

type Props = {
  /** Headline variant */
  variant: Variant;
  /**  Font weight */
  fontWeight?: FontWeight;
  /** Line height */
  lineHeight?: LineHeight;
  /** Color */
  color?: string;
  /** Children */
  children: React.ReactNode;
};

const StyledH1 = styled.h1<TypographyProps & ColorProps>`
  ${resetSpacing()}

  font-family: 'Gangster Grotesk', sans-serif;
  font-size: 36px;

  font-weight: bold;
  line-height: ${DEFAULT_LINE_HEIGHT};
  color: ${colors.black[500]};

  ${typography};
  ${color};
`;

const StyledH2 = styled.h2<TypographyProps & ColorProps>`
  ${resetSpacing()}

  font-family: 'Gangster Grotesk', sans-serif;
  font-size: 30px;

  font-weight: bold;
  line-height: ${DEFAULT_LINE_HEIGHT};
  color: ${colors.black[500]};

  ${typography};
  ${color};
`;

const StyledH3 = styled.h3<TypographyProps & ColorProps>`
  ${resetSpacing()}

  font-family: 'Gangster Grotesk', sans-serif;
  font-size: 20px;

  font-weight: bold;
  line-height: ${DEFAULT_LINE_HEIGHT};
  color: ${colors.black[400]};

  ${typography};
  ${color};
`;

const Headline: FC<Props> = ({
  variant = 'h1',
  fontWeight,
  lineHeight,
  color,
  children,
}) => {
  switch (variant) {
    case 'h2':
      return (
        <StyledH2 fontWeight={fontWeight} lineHeight={lineHeight} color={color}>
          {children}
        </StyledH2>
      );
    case 'h3':
      return (
        <StyledH3 fontWeight={fontWeight} lineHeight={lineHeight} color={color}>
          {children}
        </StyledH3>
      );
    default:
      return (
        <StyledH1 fontWeight={fontWeight} lineHeight={lineHeight} color={color}>
          {children}
        </StyledH1>
      );
  }
};
export default Headline;
