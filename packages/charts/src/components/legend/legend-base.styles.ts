import styled, { css } from 'styled-components';

export const Container = styled.div<{
  fullDimension: boolean;
}>`
  padding: 15px;
  box-sizing: border-box;
  ${props =>
    props.fullDimension &&
    css`
      height: 100%;
    `}
`;
