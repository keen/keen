import styled, { css } from 'styled-components';
import { Layout } from '@keen.io/ui-core';

export type Spacing = 'normal' | 'thin';

export const Container = styled.div<{
  fullDimension: boolean;
  layout: Layout;
  spacing: Spacing;
}>`
  padding: 15px;
  box-sizing: border-box;
  ${(props) =>
    props.fullDimension &&
    css`
      height: 100%;
    `}

  ${(props) =>
    props.spacing === 'thin' &&
    css`
      padding: ${props.layout === 'horizontal' ? '10px 15px;' : '15px 10px'};
    `}
`;
