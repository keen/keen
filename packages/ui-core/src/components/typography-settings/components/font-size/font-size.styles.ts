import styled from 'styled-components';
import { colors } from '@keen.io/colors';

export const Header = styled.div`
  display: flex;
  align-items: center;

  font-size: 14px;
  font-family: 'Lato Regular', sans-serif;
  color: ${colors.blue[500]};
  cursor: pointer;
`;

export const CaretDown = styled.div`
  margin-left: 10px;
`;
