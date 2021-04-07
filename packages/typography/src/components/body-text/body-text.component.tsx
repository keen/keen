import styled, { css } from 'styled-components';
import { variant } from 'styled-system';
import { colors } from '@keen.io/colors';

import { Variant } from './types';
import { FontWeight, LineHeight } from '../../types';

import {
  DEFAULT_FONT_WEIGHT,
  DEFAULT_LINE_HEIGHT,
  SHARED_STYLE,
  TEXT_ELLIPSIS,
} from '../../constants';

type Props = {
  /** Headline variant */
  variant: Variant;
  /**  Font weight */
  fontWeight?: FontWeight;
  /** Line height */
  lineHeight?: LineHeight;
  /** Color */
  color?: string;
  /** Text overflow */
  enableTextEllipsis?: boolean;
};

export const BodyText = styled.p<Props>`
  ${SHARED_STYLE};
  font-family: 'Lato', sans-serif;

  ${variant({
    variants: {
      body1: {
        fontSize: '16px',
        fontWeight: DEFAULT_FONT_WEIGHT,
      },
      body2: {
        fontSize: '14px',
        fontWeight: DEFAULT_FONT_WEIGHT,
      },
      body3: {
        fontSize: '12px',
        fontWeight: 600,
      },
    },
  })};

  ${(props) => css`
    color: ${props.color};
    line-height: ${props.lineHeight};
    font-weight: ${props.fontWeight};

    ${props.enableTextEllipsis && TEXT_ELLIPSIS};
  `};
`;

BodyText.defaultProps = {
  lineHeight: DEFAULT_LINE_HEIGHT,
  color: colors.black[100],
  enableTextEllipsis: false,
};

export default BodyText;
