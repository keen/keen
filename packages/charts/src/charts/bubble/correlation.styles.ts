import styled from 'styled-components';

export const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 4px;
`;

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Value = styled.div`
  margin-left: 10px;
`;

export const Point = styled.div<{
  color: string;
}>`
  width: 8px;
  height: 8px;
  margin-right: 6px;
  border-radius: 50%;
  background-color: ${props => props.color};
`;
