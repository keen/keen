import styled, { css } from 'styled-components';
import { Position } from '@keen.io/ui-core';
import { colors } from '@keen.io/colors';
import { LegendCardSettings } from '../types';

export const LegendCard = styled.div<
  { borderPosition: Position; fullDimension: boolean } & LegendCardSettings
>`
  display: inline-block;
  position: relative;

  background: ${(props) => props.backgroundColor};
  border: ${(props) => props.border};
  border-radius: ${(props) => props.borderRadius};
  box-shadow: ${(props) =>
    props.hasShadow ? '0px 2px 4px 0px rgba(29,39,41,0.15)' : 'none'};

  ${(props) =>
    !props.border &&
    css`
    border-${props.borderPosition}: solid 3px ${colors.blue['500']}
  `}
`;
