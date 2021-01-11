import styled from 'styled-components';

export const Circle = styled.div<{ background: string }>`
  margin-right: 5px;
  border-radius: 50%;
  width: 12px;
  height: 12px;
  background: ${(props) => props.background};
  flex-shrink: 0;
`;

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  white-space: nowrap;
`;

export const StyledLabel = styled.div`
  cursor: pointer;
  transition: all 0.5s ease;
`;
