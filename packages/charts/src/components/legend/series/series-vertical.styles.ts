import styled, { css } from 'styled-components';
import { Alignment } from '@keen.io/ui-core';

export const Container = styled.div<{ alignment: Alignment; calculationReady?: boolean }>`
  overflow: hidden;
  outline: none;
  display: flex;
  flex-direction: column;
  height: 100%;

  ${props => props.calculationReady && css`
    overflow: visible;
  `};

  ${(props) =>
    props.alignment === 'center' &&
    css`
      justify-content: center;
    `};

  ${(props) =>
    props.alignment === 'right' &&
    css`
      justify-content: flex-end;
    `};
`;

export const Layout = styled.div<{
  itemSpace: number;
}>`
  flex-direction: column;
  padding: 15px;
  grid-gap: ${(props) => props.itemSpace}px 10px;
  display: flex;
`;
