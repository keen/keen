import styled, { css } from 'styled-components';

export type IconPosition = 'top' | 'center' | 'bottom';

export const Container = styled.div<{
  position: IconPosition;
}>`
  display: flex;
  align-items: flex-start;
  height: 100%;

  ${(props) =>
    props.position === 'center' &&
    css`
      align-items: center;
    `}

  ${(props) =>
    props.position === 'bottom' &&
    css`
      align-items: flex-end;
    `}
`;

export const IconContainer = styled.div`
  position: relative;
`;

export const SVGContainer = styled.div`
  position: absolute;
  top: 50%;
  right: 50%;
  transform: translateX(50%) translateY(-50%);
  pointer-events: none;
`;
