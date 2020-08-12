import styled from 'styled-components';
import { colors } from '@keen.io/colors';

export const Container = styled.div`
  padding: 0 25px;
  height: 50px;
  box-sizing: border-box;
  border-bottom: solid 1px ${colors.gray[400]};

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Close = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-left: 10px;
`;

export const Title = styled.div`
  font-family: 'Gangster Grotesk Bold', sans-serif;
  font-size: 20px;
  line-height: 24px;
  color: ${colors.blue[500]};
`;
