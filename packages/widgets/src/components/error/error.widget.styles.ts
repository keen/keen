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
  font-family: 'Lato Regular', sans-serif;
  color: ${colors.gray[500]};
`;

export const Details = styled.div`
  font-size: 16px;
  line-height: 19px;
  font-family: 'Lato Regular', sans-serif;
  color: ${colors.black[100]};
  margin-top: 10px;
`;
