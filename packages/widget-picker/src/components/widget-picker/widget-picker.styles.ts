import styled from 'styled-components';

export const Option = styled.div`
  position: relative;
`;

export const Container = styled.div`
  ${Option} + ${Option} {
    margin-top: 2px;
  }
`;
