import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;

  div + div {
    margin-left: 4px;
  }
`;
