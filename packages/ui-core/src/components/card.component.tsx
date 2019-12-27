import styled from 'styled-components';
import { colors } from '@keen/colors';

type Props = {
  backgroundColor?: string;
  border?: string;
  hasShadow?: boolean;
};

const Card = styled.div<Props>`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 10px;
  background: ${props => props.backgroundColor};
  border: ${props => props.border}
  box-shadow: ${props =>
    props.hasShadow ? '0 2px 5px 0 rgba(112,120,135,0.14)' : 'none'};
`;

Card.defaultProps = {
  border: 'none',
  backgroundColor: colors.white,
  hasShadow: true,
};

export default Card;
