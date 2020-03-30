import styled from 'styled-components';

export const Layout = styled.div`
  padding: 15px;
  display: grid;
  grid-gap: 8px 10px;
  grid-auto-flow: column;
  justify-content: flex-start;
`;

export const GroupedSeries = styled.div`
  display: grid;
  grid-auto-flow: row;
  grid-row-gap: 8px;
  justify-content: flex-start;
`;
