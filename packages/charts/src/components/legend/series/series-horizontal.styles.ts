import styled from 'styled-components';

export const Container = styled.div`
  overflow: hidden;
  outline: none;
`;

export const Layout = styled.div<{
  itemSpace: number;
}>`
  padding: 15px;
  display: grid;
  gap: 8px ${(props) => props.itemSpace}px;
  grid-auto-flow: column;
  -webkit-box-pack: start;
  justify-content: flex-start;
`;
