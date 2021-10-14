import styled from 'styled-components';
import { colors } from '@keen.io/colors';

export const Container = styled.div`
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: ${colors.white[400]};
  height: 100%;
`;

export const Header = styled.div`
  font-size: 20px;
  line-height: 24px;
  font-family: 'Lato', sans-serif;
  font-weight: 400;
  color: ${colors.gray[500]};
  margin-bottom: 10px;
`;
