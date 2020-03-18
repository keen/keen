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
