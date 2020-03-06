import styled from 'styled-components';

export const ColorCard = styled.div<{ background: string }>`
  width: 100%;
  height: 6px;
  background: ${props => props.background};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 13px;
`;

export const ColorGradient = styled.div<{
  colors: string[];
}>`
  width: 100%;
  height: 6px;
  background: ${props =>
    `linear-gradient(45deg, ${props.colors[0]}, ${props.colors[1]})`};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 13px;
`;
