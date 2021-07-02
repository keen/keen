import styled from 'styled-components';

export const Container = styled.div`
  width: 66px;
`;

export const DropdownWrapper = styled.div<{ x: number; y: number }>`
  position: absolute;
  top: ${(props) => props.y}px;
  left: ${(props) => props.x}px;
  width: 66px;
`;
