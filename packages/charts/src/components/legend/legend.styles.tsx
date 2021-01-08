import styled, { css } from 'styled-components';

import { Layout, Alignment, Position, CardSettings } from '@keen.io/ui-core';
import { colors } from '@keen.io/colors';

import { RenderMode } from './legend.utils';

const borderMixin = (layout: Layout) => css`
  border-${layout === 'vertical' ? 'top' : 'left'}: solid 3px ${
  colors.blue['500']
};
`;

export const LegendItem = styled.div`
  outline: none;
`;

export const LegendCard = styled.div<
  {
    layout: Layout;
    renderMode: RenderMode;
    alignment: Alignment;
    position: Position;
  } & CardSettings
>`
  ${(props) =>
    (props.renderMode === 'list' || props.renderMode === 'group') &&
    css`
      padding: 15px;
    `}

  ${(props) =>
    props.renderMode === 'slider' &&
    css`
      width: 100%;
      height: 100%;
    `}

  position: relative;
  box-sizing: border-box;
  background: ${(props) => props.backgroundColor};
  border: ${(props) => props.border};
  border-radius: ${(props) => props.borderRadius};
  box-shadow: ${(props) =>
    props.hasShadow ? '0px 2px 4px 0px rgba(29,39,41,0.15)' : 'none'};

  ${(props) => !props.border && borderMixin(props.layout)}
`;

LegendCard.defaultProps = {
  backgroundColor: colors.white['500'],
  hasShadow: true,
};

export const LegendLayout = styled.div<{
  type: Layout;
}>`
  padding: 15px;
  display: grid;
  grid-gap: 8px 10px;
  justify-content: flex-start
    ${(props) =>
      props.type === 'horizontal' &&
      css`
        grid-auto-flow: column;
      `}
    ${(props) =>
      props.type === 'vertical' &&
      css`
        grid-auto-flow: row;
      `};
`;

export const LegendGroup = styled.div`
  display: grid;
  justify-content: flex-start;
  grid-auto-flow: row;
  grid-row-gap: 8px;
`;
