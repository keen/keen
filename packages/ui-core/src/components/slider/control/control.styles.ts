import styled, { css } from 'styled-components';

export const Container = styled.div<{
  dragDirection: 'x' | 'y';
}>`
  ${(props) =>
    props.dragDirection === 'x' &&
    css`
      transform: translateX(-50%);
    `};

  ${(props) =>
    props.dragDirection === 'y' &&
    css`
      transform: translateY(-50%);
    `};
`;
