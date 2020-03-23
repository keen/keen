import styled, { css } from 'styled-components';

import { Layout, Alignment, Position, CardSettings } from '@keen.io/ui-core';
import { colors } from '@keen.io/colors';

import { RenderMode } from './legend.utils';

const borderMixin = (layout: Layout) => css`
  border-${layout === 'vertical' ? 'top' : 'left'}: solid 3px ${
  colors.blue['500']
};
`;

export const LegendCard = styled.div<
  {
    layout: Layout;
    renderMode: RenderMode;
    alignment: Alignment;
    position: Position;
  } & CardSettings
>`
${props =>
  (props.renderMode === 'list' || props.renderMode === 'group') &&
  css`
    padding: 15px;
  `}

  position: relative;
  background: ${props => props.backgroundColor};
  border: ${props => props.border};
  border-radius: ${props => props.borderRadius};
  box-shadow: ${props =>
    props.hasShadow ? '0px 2px 4px 0px rgba(29,39,41,0.15)' : 'none'};

  ${props => !props.border && borderMixin(props.layout)}

  ${props =>
    props.alignment === 'center' &&
    (props.position === 'left' || props.position === 'right') &&
    css`
      top: 50%;
      transform: translateY(-50%);
    `}

  ${props =>
    props.alignment === 'right' &&
    (props.position === 'left' || props.position === 'right') &&
    css`
      top: 100%;
      transform: translateY(-100%);
    `}
`;

LegendCard.defaultProps = {
  backgroundColor: colors.white['500'],
  hasShadow: true,
};

export const LegendLayout = styled.div<{
  type: Layout;
}>`
  display: flex;

  ${props =>
    props.type === 'horizontal' &&
    css`
      flex-direction: row;
    `}

  ${props =>
    props.type === 'vertical' &&
    css`
      flex-direction: column;
    `}
`;

export const LegendGroup = styled.div`
  flex-shrink: 0;
  margin-right: 10px;
`;

export const LegendItem = styled.div`
  flex-shrink: 0;
  margin-right: 10px;
  margin-bottom: 8px;
  outline: none;

  &:last-child {
    margin-bottom: 0;
  }
`;
