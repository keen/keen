import styled, { css } from 'styled-components';

import { Position, Alignment } from '@keen.io/ui-core';

const flexDirection: Record<Position, string> = {
  top: 'column',
  bottom: 'column-reverse',
  left: 'row',
  right: 'row-reverse',
};

export const Layout = styled.div<{
  legendPosition: Position;
}>`
  display: flex;
  flex: 1;
  flex-direction: ${(props) => flexDirection[props.legendPosition]};
  min-height: 0;
  min-width: 0;
`;

export const TitleSocket = styled.div`
  display: flex;
  flexdirection: column;
  flexgrow: 0;
`;

export const LegendSocket = styled.div<{
  layout: 'vertical' | 'horizontal';
  alignment: Alignment;
  position: Position;
}>`
  display: flex;
  position: relative;
  align-items: center;

  ${(props) =>
    props.alignment === 'left' &&
    css`
      align-items: flex-start;
    `}

  ${(props) =>
    props.alignment === 'center' &&
    css`
      align-items: center;
    `}

  ${(props) =>
    props.alignment === 'right' &&
    css`
      align-items: flex-end;
    `}


  ${(props) =>
    (props.position === 'top' || props.position === 'bottom') &&
    props.layout === 'vertical' &&
    css`
      max-height: 30%;
    `}

  ${(props) =>
    props.position === 'right' &&
    css`
      margin-left: 15px;
    `};

  ${(props) =>
    props.position === 'left' &&
    css`
      margin-right: 15px;
    `};

  ${(props) =>
    (props.position === 'left' || props.position === 'right') &&
    css`
      max-width: 25%;
    `}

  ${(props) =>
    props.alignment === 'center' &&
    (props.position === 'left' || props.position === 'right') &&
    css`
      top: 50%;
      transform: translateY(-50%);
    `}

    ${(props) =>
    props.alignment === 'right' &&
    (props.position === 'left' || props.position === 'right') &&
    css`
      top: 100%;
      transform: translateY(-100%);
    `}
`;
