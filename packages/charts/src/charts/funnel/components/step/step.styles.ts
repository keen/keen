import styled, { css } from 'styled-components';
import { Layout } from '@keen.io/ui-core';

export const HeaderContainer = styled.div<{
  backgroundColor: string;
  fixedWidth: boolean;
  centerItems: boolean;
}>`
  padding: 10px;
  background: ${(props) => props.backgroundColor};
  ${(props) =>
    props.fixedWidth &&
    css`
      width: 30%;
      min-width: 0;
    `};
  ${(props) =>
    props.centerItems &&
    css`
      text-align: center;
    `};

  -webkit-font-smoothing: antialiased;
`;

export const StepContainer = styled.div<{
  layout: Layout;
  stepsCount: number;
}>`
  display: flex;
  flex: 1 1 auto;
  box-sizing: border-box;

  ${(props) => {
    if (props.layout === 'vertical') {
      return css`
        padding: 3px 0;
        width: 100%;
        height: ${100 / props.stepsCount}%;
      `;
    }

    if (props.layout === 'horizontal') {
      return css`
        padding: 0 3px;
        width: ${100 / props.stepsCount}%;
        height: 100%;
      `;
    }
  }}
`;

export const Container = styled.div<{
  layout: Layout;
  backgroundColor: string;
}>`
  display: flex;
  height: 100%;
  width: 100%;
  flex-grow: 1;
  background: ${(props) => props.backgroundColor};
  ${(props) =>
    props.layout === 'horizontal' &&
    css`
      flex-direction: column;
    `}
  ${(props) =>
    props.layout === 'vertical' &&
    css`
      flex-direction: row;
    `};
`;
