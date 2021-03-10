import styled, { css } from 'styled-components';
import { variant } from 'styled-system';
import { colors } from '@keen.io/colors';

import { Variant } from './types';
import { FontWeight, LineHeight } from '../../types';

import { resetSpacing } from '../../utils';
import { DEFAULT_FONT_WEIGHT, DEFAULT_LINE_HEIGHT } from '../../constants';

type Props = {
  /** Headline variant */
  variant: Variant;
  /**  Font weight */
  fontWeight?: FontWeight;
  /** Line height */
  lineHeight?: LineHeight;
  /** Color */
  color?: string;
};

const BodyText = styled.p<Props>`
  ${resetSpacing()}
  font-family: 'Lato', sans-serif;

  ${(props) =>
    props.color &&
    css`
      color: ${props.color};
    `};
  ${(props) =>
    props.lineHeight &&
    css`
      line-height: ${props.lineHeight};
    `};
  ${(props) =>
    props.fontWeight &&
    css`
      font-weight: ${props.fontWeight};
    `};

  ${variant({
    variants: {
      body1: {
        fontSize: '16px',
      },
      body2: {
        fontSize: '14px',
      },
      body3: {
        fontSize: '12px',
        fontWeight: 600,
      },
    },
  })}
`;

BodyText.defaultProps = {
  fontWeight: DEFAULT_FONT_WEIGHT,
  lineHeight: DEFAULT_LINE_HEIGHT,
  color: colors.black[100],
};

export default BodyText;
