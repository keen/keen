import styled, { css } from 'styled-components';
import { Position, CardSettings } from '@keen.io/ui-core';
import { colors } from '@keen.io/colors';

export const LegendCard = styled.div<
  { borderPosition: Position; fullDimension: boolean } & CardSettings
>`
  width: 100%;

  ${props =>
    props.fullDimension &&
    css`
      height: 100%;
    `}

  position: relative;
  box-sizing: border-box;
  background: ${props => props.backgroundColor};
  border: ${props => props.border};
  border-radius: ${props => props.borderRadius};
  box-shadow: ${props =>
    props.hasShadow ? '0px 2px 4px 0px rgba(29,39,41,0.15)' : 'none'};

  ${props =>
    !props.border &&
    css`
    border-${props.borderPosition}: solid 3px ${colors.blue['500']}
  `}
`;
