import styled from 'styled-components';
import { colors } from '@keen.io/colors';

type Props = {
  /** Custom color */
  color?: string;
  /** Custom color for hover state */
  hoverColor?: string;
};

export const Anchor = styled.a<Props>`
  color: ${props => props.color};
  font-family: 'Lato Bold', sans-serif;
  font-size: 14px;
  line-height: 16px;
  text-decoration: none;

  &:hover {
    color: ${props => props.hoverColor};
  }

  transition: all 0.2s linear;
`;

Anchor.defaultProps = {
  color: colors.blue['100'],
  hoverColor: colors.blue['200'],
};
