import React from 'react';
import styled, { ThemeProvider, css } from 'styled-components';
import theme from 'styled-theming';
import { colors } from '@keen.io/colors';
import { Position } from '../types';

export type TooltipMode = 'light' | 'dark';
type BulletPoint = {
  color: string;
  value: string;
};

type Props = {
  children?: React.ReactNode | string;
  mode?: TooltipMode;
  backgroundColor?: string;
  fontColor?: string;
  fontFamily?: string;
  fontSize?: number;
  borderRadius?: string;
  hasShadow?: boolean;
  arrowDirection?: Position;
  bulletList?: BulletPoint[];
};

const LIGHT_MODE_BACKGROUND = colors.white['500'];
const DARK_MODE_BACKGROUND = colors.black['200'];

const modeStyles = theme('mode', {
  light: css`
    background-color: ${LIGHT_MODE_BACKGROUND};
    color: ${colors.black['200']};
  `,
  dark: css`
    background-color: ${DARK_MODE_BACKGROUND};
    color: ${colors.white['500']};
  `,
});

const arrowStyles = (bg: string) =>
  theme('arrowDirection', {
    left: css`
      border-color: ${bg} transparent transparent ${bg};
      top: 50%;
      bottom: auto;
      left: -2px;
      right: auto;
      transform: rotate(-45deg) translateY(-50%);
    `,
    right: css`
      border-color: transparent ${bg} ${bg} transparent;
      top: 50%;
      bottom: auto;
      left: auto;
      right: -5px;
      transform: rotate(-45deg) translateY(-50%);
    `,
    top: css`
      border-color: ${bg} ${bg} transparent transparent;
      top: -2px;
      bottom: auto;
      left: 50%;
      right: auto;
      transform: rotate(-45deg) translateX(-50%);
    `,
    bottom: css`
      border-color: transparent transparent ${bg} ${bg};
      top: auto;
      bottom: -5px;
      left: 50%;
      right: auto;
      transform: rotate(-45deg) translateX(-50%);
    `,
  });

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
  ${modeStyles}
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
      switch (props.theme.mode) {
        case 'light':
          arrowColor = LIGHT_MODE_BACKGROUND;
          break;
        case 'dark':
          arrowColor = DARK_MODE_BACKGROUND;
          break;
      }
      return arrowStyles(arrowColor);
    }}
  }
`;

const BulletPoint = (props: { color: string }) => {
  const Bullet = styled.div`
    width: 8px;
    height: 8px;
    margin-right: 6px;
    border-radius: 50%;
    background-color: ${props.color};
  `;
  return <Bullet />;
};

const BulletList = (props: { list: BulletPoint[] }) => {
  const StyledBulletList = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
  `;
  const StyledBulletItem = styled.li<{ marginBottom: string }>`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin-bottom: ${props => props.marginBottom};
  `;

  const { list } = props;
  const listItems = list.map((item, idx) => {
    const marginBottom = list.length - 1 !== idx ? '11px' : undefined;
    return (
      <StyledBulletItem key={item.value} marginBottom={marginBottom}>
        <BulletPoint color={item.color} />
        {item.value}
      </StyledBulletItem>
    );
  });
  return <StyledBulletList>{listItems}</StyledBulletList>;
};

const Tooltip = ({
  children,
  mode,
  arrowDirection,
  bulletList,
  ...props
}: Props) => {
  return (
    <ThemeProvider theme={{ mode, arrowDirection }}>
      <Wrapper {...props}>
        {bulletList && bulletList.length ? (
          <BulletList list={bulletList} />
        ) : (
          children
        )}
      </Wrapper>
    </ThemeProvider>
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
