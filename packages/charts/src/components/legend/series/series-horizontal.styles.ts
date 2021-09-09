import styled, { css } from 'styled-components';
import { Alignment } from '@keen.io/ui-core';

export const Container = styled.div<{ calculationReady?: boolean }>`
  overflow: hidden;
  outline: none;
  display: flex;
  visibility: hidden;

  ${(props) =>
    props.calculationReady &&
    css`
      overflow: visible;
      visibility: visible;
    `};
`;

export const AlignmentContainer = styled.div<{ alignment: Alignment }>`
  ${(props) =>
    props.alignment === 'center' &&
    css`
      margin: 0 auto;
    `};

  ${(props) =>
    props.alignment === 'right' &&
    css`
      margin-left: auto;
    `};
`;

export const Layout = styled.div<{
  itemSpace: number;
}>`
  padding: 15px;
  display: grid;
  gap: 8px ${(props) => props.itemSpace}px;
  grid-auto-flow: column;
  -webkit-box-pack: start;
  justify-content: flex-start;
`;
