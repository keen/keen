import styled from 'styled-components';
import { colors } from '@keen.io/colors';

export const Notification = styled.div`
  margin-bottom: 15px;
`;

export const Heading = styled.div`
  font-family: 'Gangster Grotesk Regular', sans-serif;
  font-size: 30px;
  line-height: 34px;
  color: ${colors.green['500']};
`;

export const Label = styled.div`
  margin-right: 5px;
`;

export const Message = styled.div`
  margin: 50px 0;
  color: ${colors.black['500']};
  font-size: 16px;
  line-height: 19px;
  font-family: 'Lato Regular', sans-serif;
`;
