import styled, { css } from 'styled-components';

export const HeatmapWrapper = styled.div<{ isHidden: boolean }>`
  width: 100%;
  height: 100%;
  ${(props) =>
    props.isHidden &&
    css`
      visibility: hidden;
      position: absolute;
    `}
`;
