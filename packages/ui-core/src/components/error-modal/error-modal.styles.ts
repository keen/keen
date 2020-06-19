import styled from 'styled-components';
import { colors } from '@keen.io/colors';

export const Container = styled.div`
  width: 500px;
`;

export const Description = styled.div`
  margin: 20px 0;
  font-family: 'Lato Regular', sans-serif;
  font-size: 16px;
  line-height: 24px;
  color: ${colors.black['500']};
`;

export const Close = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export const Footer = styled.div`
  display: flex;
`;
