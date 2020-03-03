import styled, { css } from 'styled-components';
import { Layout } from '@keen.io/ui-core';

export const Header = styled.div<{
  backgroundColor: string;
  fixedWidth: boolean;
  centerItems: boolean;
}>`
  padding: 10px;
  background: ${props => props.backgroundColor};
  ${props =>
    props.fixedWidth &&
    css`
      width: 30%;
    `};
  ${props =>
    props.centerItems &&
    css`
      text-align: center;
    `};
`;

export const Container = styled.div<{
  layout: Layout;
  backgroundColor: string;
}>`
  display: flex;
  height: 100%;
  width: 100%;
  flex-grow: 1;
  background: ${props => props.backgroundColor};
  ${props =>
    props.layout === 'horizontal' &&
    css`
      flex-direction: column;
    `}
  ${props =>
    props.layout === 'vertical' &&
    css`
      flex-direction: row;
    `};
`;
