import styled from 'styled-components';

export const Option = styled.div`
  position: relative;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 46px;

  ${Option} + ${Option} {
    margin-top: 2px;
  }
`;
