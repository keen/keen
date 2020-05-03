import styled from 'styled-components';
import { colors } from '@keen.io/colors';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export const Hint = styled.div`
  margin-left: 8px;
  font-size: 14px;
  font-family: Lato Regular, sans-serif;
  color: ${colors.blue['500']};
`;
