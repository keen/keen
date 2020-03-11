import styled from 'styled-components';

export const StyledItem = styled.div`
  & + & {
    margin-top: 5px;
  }
`;
