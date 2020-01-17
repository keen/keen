import React from 'react';
import styled from 'styled-components';
import { variant } from 'styled-system';
import { colors } from '@keen.io/colors';
import Color from 'color';
import { Position, Typography } from '../types';

export type TooltipMode = 'light' | 'dark';

type Props = Partial<Typography> & {
  children: React.ReactNode | string;
  mode?: TooltipMode;
  backgroundColor?: string;
  borderRadius?: string;
  hasShadow?: boolean;
  arrowDirection?: Position;
};

const LIGHT_MODE_BACKGROUND = Color(colors.white['500'])
  .fade(0.05)
  .rgb()
  .toString();
const DARK_MODE_BACKGROUND = Color(colors.black['200'])
  .fade(0.05)
  .rgb()
  .toString();

const Wrapper = styled.div<Props>`
  padding: 10px 15px;
  background-color: ${props => props.backgroundColor};
  border-radius: ${props => props.borderRadius};
  font-family: ${props => props.fontFamily};
  font-size: ${props => props.fontSize + 'px'};
  color: ${props => props.fontColor};
  box-shadow: ${props =>
    props.hasShadow ? '0 10px 24px 0 rgba(29, 39, 41, 0.15)' : 'none'};
  position: relative;
  ${variant({
    prop: 'mode',
    variants: {
      light: {
        backgroundColor: LIGHT_MODE_BACKGROUND,
        color: colors.black['200'],
      },
      dark: {
        backgroundColor: DARK_MODE_BACKGROUND,
        color: colors.white['500'],
      },
    },
  })}
  &::after {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    box-sizing: border-box;
    border: 4px solid ${props => props.backgroundColor};
    transform-origin: 0 0;
    box-shadow: ${props =>
      props.hasShadow ? '-3px 3px 24px 0 rgba(29, 39, 41, 0.15)' : 'none'};
    ${props => {
      let arrowColor = props.backgroundColor;
      switch (props.mode) {
        case 'light':
          arrowColor = LIGHT_MODE_BACKGROUND;
          break;
        case 'dark':
          arrowColor = DARK_MODE_BACKGROUND;
          break;
      }
      return variant({
        prop: 'arrowDirection',
        variants: {
          left: {
            borderColor: `${arrowColor} transparent transparent ${arrowColor}`,
            top: '50%',
            bottom: 'auto',
            left: '-2px',
            right: 'auto',
            transform: 'rotate(-45deg) translateY(-50%)',
          },
          right: {
            borderColor: `transparent ${arrowColor} ${arrowColor} transparent`,
            top: '50%',
            bottom: 'auto',
            right: '-5px',
            transform: 'rotate(-45deg) translateY(-50%)',
          },
          top: {
            borderColor: `${arrowColor} ${arrowColor} transparent transparent`,
            top: '-2px',
            bottom: 'auto',
            left: '50%',
            right: 'auto',
            transform: 'rotate(-45deg) translateX(-50%)',
          },
          bottom: {
            borderColor: `transparent transparent ${arrowColor} ${arrowColor}`,
            top: 'auto',
            bottom: '-5px',
            left: '50%',
            right: 'auto',
            transform: 'rotate(-45deg) translateX(-50%)',
          },
        },
      });
    }}
  }
`;

const Tooltip = ({ children, mode, arrowDirection, ...props }: Props) => {
  return (
    <Wrapper mode={mode} arrowDirection={arrowDirection} {...props}>
      {children}
    </Wrapper>
  );
};

Tooltip.defaultProps = {
  backgroundColor: colors.white['500'],
  fontColor: colors.black['200'],
  mode: 'light',
  borderRadius: '0px',
  hasShadow: true,
  arrowDirection: 'bottom',
};

export default Tooltip;
