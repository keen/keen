import React from 'react';
import styled, { ThemeProvider, css } from 'styled-components';
import theme from 'styled-theming';
import { colors } from '@keen.io/colors';
import { Position } from '../types';

type TooltipMode = 'light' | 'dark';

type Props = {
  children: React.ReactNode | string;
  mode?: TooltipMode;
  backgroundColor?: string;
  color?: string;
  fontFamily?: string;
  fontSize?: number;
  borderRadius?: number;
  hasShadow?: boolean;
  arrowDirection?: Position;
};

const modeStyles = theme('mode', {
  light: css`
    background-color: ${colors.white['500']};
    color: ${colors.black['200']};
  `,
  dark: css`
    background-color: ${colors.black['200']};
    color: ${colors.white['500']};
  `,
});

const arrowStyles = (bg: string) =>
  theme('arrowDirection', {
    left: css`
      border-width: 6.5px 5px 6.5px 0;
      border-color: transparent ${bg} transparent transparent;
      top: 50%;
      bottom: auto;
      left: -5px;
      right: auto;
      transform: translateY(-50%);
    `,
    right: css`
      border-width: 6.5px 0 6.5px 5px;
      border-color: transparent transparent transparent ${bg};
      top: 50%;
      bottom: auto;
      left: auto;
      right: -5px;
      transform: translateY(-50%);
    `,
    top: css`
      border-width: 0 6.5px 5px 6.5px;
      border-color: transparent transparent ${bg} transparent;
      top: -5px;
      bottom: auto;
      left: 50%;
      right: auto;
      transform: translateX(-50%);
    `,
    bottom: css`
      border-width: 5px 6.5px 0 6.5px;
      border-color: ${bg} transparent transparent transparent;
      top: auto;
      bottom: -5px;
      left: 50%;
      right: auto;
      transform: translateX(-50%);
    `,
  });

const Wrapper = styled.div<{
  mode?: TooltipMode;
  backgroundColor?: string;
  color?: string;
  backgroundOpacity?: number;
  borderRadius?: number;
  fontFamily?: string;
  fontSize?: number;
  hasShadow?: boolean;
}>`
  ${modeStyles}
  padding: 10px 15px;
  background-color: ${props => props.backgroundColor};
  color: ${props => props.color};
  border-radius: ${props => props.borderRadius};
  font-family: ${props => props.fontFamily};
  font-size: ${props => props.fontSize};
  box-shadow: ${props =>
    props.hasShadow ? '0 10px 24px 0 rgba(29, 39, 41, 0.15)' : 'none'};
  position: relative;
  &::before {
    content: '';
    display: inline-block;
    width: 0;
    height: 0;
    border-style: solid;
    position: absolute;
    ${props => arrowStyles(props.backgroundColor)}
  }
`;

Wrapper.defaultProps = {
  // backgroundColor: colors.white['500'],
  // color: colors.black['200'],
  mode: 'light',
  borderRadius: 0,
  hasShadow: true,
};

const Tooltip = ({ children, mode, arrowDirection, ...props }: Props) => {
  console.log('**', mode, arrowDirection, props);
  return (
    <ThemeProvider theme={{ mode, arrowDirection }}>
      <Wrapper {...props}>{children}</Wrapper>
    </ThemeProvider>
  );
};

export default Tooltip;
