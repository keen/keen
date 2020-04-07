import styled from 'styled-components';
import { colors } from '@keen.io/colors';

export const Title = styled.div`
  font-size: 24px;
  font-family: 'Gangster Grotesk Bold', sans-serif;
  line-height: 29px;
  color: ${colors.green['500']};
`;

export const Anchor = styled.a`
  color: ${colors.blue['500']};
  font-family: 'Lato Bold', sans-serif;
  font-size: 14px;
  line-height: 17px;
  text-decoration: none;
`;

export const PlanComponents = styled.div`
  height: 100px;
`;

export const ActionsContainer = styled.div`
  margin: 20px 0;
`;

export const Heading = styled.div`
  margin-bottom: 15px;
  font-size: 16px;
  line-height: 19px;
  font-family: 'Gangster Grotesk Regular', sans-serif;
  color: ${colors.blue['500']};
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
