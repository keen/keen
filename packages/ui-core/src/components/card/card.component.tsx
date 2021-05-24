import styled, { css } from 'styled-components';
import { colors } from '@keen.io/colors';

export type Props = {
  backgroundColor?: string;
  borderRadius?: number;
  hasShadow?: boolean;
  hideOverflow?: boolean;
  hasPadding?: boolean;
  borderWidth?: number;
  borderColor?: string;
  padding?: number;
};

export const Card = styled.div<Props>`
  display: flex;
  flex-direction: column;
  height: 100%;
  background: ${(props) => props.backgroundColor};
  border: ${(props) => `${props.borderWidth}px solid ${props.borderColor}`};
  border-radius: ${(props) => props.borderRadius}px;
  box-sizing: border-box;
  box-shadow: ${(props) =>
    props.hasShadow ? '0px 2px 4px 0px rgba(29,39,41,0.15)' : 'none'};

  ${(props) =>
    props.hasPadding &&
    css`
      padding: ${props.padding}px;
    `};

  ${(props) =>
    props.hideOverflow &&
    css`
      overflow: hidden;
    `};
`;

Card.defaultProps = {
  backgroundColor: colors.white['500'],
  hasPadding: true,
  hasShadow: true,
  padding: 20,
  borderWidth: 20,
  borderColor: 'initial',
  borderRadius: 0,
};

export default Card;
