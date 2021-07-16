import styled, { css } from 'styled-components';
import { colors } from '@keen.io/colors';

export type Props = {
  enabled?: boolean;
  backgroundColor?: string;
  borderRadius?: number;
  hasShadow?: boolean;
  hideOverflow?: boolean;
  borderWidth?: number;
  borderColor?: string;
  padding?: number;
};

export const Card = styled.div<Props>`
  display: flex;
  flex-direction: column;
  height: 100%;
  box-sizing: border-box;
  padding: ${(props) => props.padding}px;
  border: ${(props) => `${props.borderWidth}px solid transparent`};

  ${(props) =>
    props.hideOverflow &&
    css`
      overflow: hidden;
    `};

  ${(props) =>
    props.enabled &&
    css`
      background: ${(props: Props) => props.backgroundColor};
      border: ${(props) => `${props.borderWidth}px solid ${props.borderColor}`};
      border-radius: ${(props) => props.borderRadius}px;
      box-shadow: ${(props) =>
        props.hasShadow ? '0px 2px 4px 0px rgba(29,39,41,0.15)' : 'none'};
    `};
`;

Card.defaultProps = {
  enabled: true,
  backgroundColor: colors.white['500'],
  hasShadow: true,
  padding: 20,
  borderWidth: 0,
  borderColor: 'initial',
  borderRadius: 0,
};

export default Card;
