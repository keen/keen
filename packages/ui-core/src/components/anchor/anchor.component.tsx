import styled from 'styled-components';
import { colors } from '@keen.io/colors';

export const Anchor = styled.a`
  color: ${colors.blue['100']};
  font-family: 'Lato Bold', sans-serif;
  font-size: 14px;
  line-height: 16px;
  text-decoration: none;

  &:hover {
    color: ${colors.blue['200']};
  }

  transition: all 0.2s linear;
`;
