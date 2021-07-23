import styled, { css } from 'styled-components';

export const Circle = styled.div<{ background: string }>`
  margin-right: 5px;
  border-radius: 50%;
  width: 12px;
  height: 12px;
  background: ${(props) => props.background};
  flex-shrink: 0;
`;

export const Wrapper = styled.div<{ maxWidth?: number }>`
  display: flex;
  align-items: center;
  cursor: pointer;

  ${(props) =>
    props.maxWidth &&
    css`
      max-width: ${props.maxWidth}px;
    `};
`;

export const StyledLabel = styled.div`
  cursor: pointer;
  transition: all 0.5s ease;
`;
