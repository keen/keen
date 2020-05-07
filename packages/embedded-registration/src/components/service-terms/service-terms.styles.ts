import styled from 'styled-components';
import { colors } from '@keen.io/colors';

export const Message = styled.div`
  margin: 30px 0 20px 0;
  font-size: 12px;
  line-height: 14px;
  font-family: 'Lato Regular', sans-serif;
  color: ${colors.black['100']};

  a {
    color: ${colors.blue['500']};
    font-family: 'Lato Bold', sans-serif;
    text-decoration: none;
  }
`;
