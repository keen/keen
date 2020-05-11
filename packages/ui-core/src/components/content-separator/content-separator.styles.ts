import styled from 'styled-components';
import { colors } from '@keen.io/colors';

export const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 20px 0;
`;

export const Line = styled.div`
  flex-basis: 100%;
  flex-shrink: 1;
  height: 1px;
  background: ${colors.gray['500']};
`;

export const Content = styled.div`
  padding: 0 15px;
  font-size: 16px;
  font-family: 'Lato Regular', sans-serif;
  line-height: 20px;

  flex-shrink: 0;
  color: ${colors.gray['400']};
`;
