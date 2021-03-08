import styled, { css } from 'styled-components';

export const TextContainer = styled.div`
  margin-bottom: 5px;
`;

export const Label = styled.div`
  margin-bottom: 10px;
`;

export const Container = styled.div<{ useColumns: boolean }>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  ${(props) =>
    props.useColumns &&
    css`
      flex-direction: column;
    `};
`;
