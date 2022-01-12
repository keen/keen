import styled from 'styled-components';
import { colors } from '@keen.io/colors';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  text-align: center;
`;

export const Title = styled.div`
  margin-bottom: 10px;
  font-size: 20px;
  font-family: 'Gangster Grotesk Regular', sans-serif;
  line-height: 24px;
  color: ${colors.blue[500]};
`;

export const Message = styled.div`
  font-size: 16px;
  font-family: 'Lato Regular', sans-serif;
  line-height: 26px;
  color: ${colors.black[100]};
`;
