import React, { FC } from 'react';
import styled, { css } from 'styled-components';
import { colors } from '@keen.io/colors';

import { Variant } from './types';
import { FontWeight, LineHeight } from '../../types';

import { HEADER_STYLE } from './constants';

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

const StyledH1 = styled.h1<Partial<Props>>`
  ${HEADER_STYLE};

  font-size: 36px;
  color: ${colors.black[500]};

  ${(props) => css`
    color: ${props.color};
    line-height: ${props.lineHeight};
    font-weight: ${props.fontWeight};
  `};
`;

const StyledH2 = styled.h2<Partial<Props>>`
  ${HEADER_STYLE};

  font-size: 30px;
  color: ${colors.black[500]};

  ${(props) => css`
    color: ${props.color};
    line-height: ${props.lineHeight};
    font-weight: ${props.fontWeight};
  `};
`;

const StyledH3 = styled.h3<Partial<Props>>`
  ${HEADER_STYLE};

  font-size: 20px;
  color: ${colors.black[400]};

  ${(props) => css`
    color: ${props.color};
    line-height: ${props.lineHeight};
    font-weight: ${props.fontWeight};
  `};
`;

const StyledH4 = styled.h4<Partial<Props>>`
  ${HEADER_STYLE};

  font-size: 16px;
  color: ${colors.black[400]};

  ${(props) => css`
    color: ${props.color};
    line-height: ${props.lineHeight};
    font-weight: ${props.fontWeight};
  `};
`;

export const Headline: FC<Props> = ({
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
    case 'h4':
      return (
        <StyledH4 fontWeight={fontWeight} lineHeight={lineHeight} color={color}>
          {children}
        </StyledH4>
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
