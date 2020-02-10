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
  box-sizing: border-box;
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
    border-style: solid;
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
            borderWidth: '3px 6px 3px 0',
            borderColor: `transparent ${arrowColor} transparent transparent`,
            top: '50%',
            bottom: 'auto',
            left: '-6px',
            right: 'auto',
            transform: 'translateY(-50%)',
          },
          right: {
            borderWidth: '3px 0 3px 6px',
            borderColor: `transparent transparent transparent ${arrowColor}`,
            top: '50%',
            bottom: 'auto',
            right: '-6px',
            transform: 'translateY(-50%)',
          },
          top: {
            borderWidth: '0 3px 6px 3px',
            borderColor: `transparent transparent ${arrowColor} transparent`,
            top: '-6px',
            bottom: 'auto',
            left: '50%',
            right: 'auto',
            transform: 'translateX(-50%)',
          },
          bottom: {
            borderWidth: '6px 3px 0 3px',
            borderColor: `${arrowColor} transparent transparent transparent`,
            top: 'auto',
            bottom: '-6px',
            left: '50%',
            right: 'auto',
            transform: 'translateX(-50%)',
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
