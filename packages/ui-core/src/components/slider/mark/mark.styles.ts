import styled from 'styled-components';

export const Circle = styled.div<{
  size: number;
  backgroundColor: string;
  borderColor: string;
}>`
  box-sizing: border-box;
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  border-radius: 50%;
  background: ${(props) => props.backgroundColor};
  border: solid 2px ${(props) => props.borderColor};
`;
