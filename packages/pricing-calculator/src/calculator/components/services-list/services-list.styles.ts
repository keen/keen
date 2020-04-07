import styled from 'styled-components';
import { colors } from '@keen.io/colors';

export const Label = styled.div`
  font-size: 16px;
  line-height: 19px;
  color: ${colors.black['300']}
  font-family: 'Lato Regular', sans-serif;
  margin-left: 8px;
  cursor: pointer;
`;

export const Service = styled.div`
  display: flex;
  align-items: center;
`;

export const Contaier = styled.div`
  ${Service} + ${Service} {
    margin-top: 20px;
  }
`;
