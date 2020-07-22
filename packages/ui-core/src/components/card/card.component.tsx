import styled, { css } from 'styled-components';
import { colors } from '@keen.io/colors';

export type Props = {
  backgroundColor?: string;
  border?: string;
  borderRadius?: string;
  hasShadow?: boolean;
  hideOverflow?: boolean;
  hasPadding?: boolean;
};

export const Card = styled.div<Props>`
  display: flex;
  flex-direction: column;
  height: 100%;
  background: ${props => props.backgroundColor};
  border: ${props => props.border};
  border-radius: ${props => props.borderRadius};
  box-sizing: border-box;
  box-shadow: ${props =>
    props.hasShadow ? '0px 2px 4px 0px rgba(29,39,41,0.15)' : 'none'};

  ${props =>
    props.hasPadding &&
    css`
      padding: 20px;
    `}

  ${props =>
    props.hideOverflow &&
    css`
      overflow: hidden;
    `}
`;

Card.defaultProps = {
  border: 'none',
  borderRadius: '0px',
  backgroundColor: colors.white['500'],
  hasPadding: true,
  hasShadow: true,
};

export default Card;
