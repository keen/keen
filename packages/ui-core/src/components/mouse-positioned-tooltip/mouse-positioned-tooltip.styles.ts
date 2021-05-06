import styled, { css } from 'styled-components';

export const TooltipWrapper = styled.div<{
  translateX: string;
  translateY: string;
}>`
  ${(props) => css`
    transform: translate(${props.translateX}, ${props.translateY});
  `};
`;
