import styled, { css } from 'styled-components';

export const Wrapper = styled.div<{
  maxHeight: number;
}>`
  position: relative;

  ${(props) =>
    props.maxHeight &&
    css`
      overflow-y: scroll;
      max-height: ${props.maxHeight}px;
    `}
`;
