import styled, { css } from 'styled-components';
import { colors } from '@keen.io/colors';
import { MIN_TOGGLE_WIDTH } from './toggle.component';

export const Label = styled.label<{ isDisabled: boolean }>`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  cursor: pointer;

  ${props =>
    props.isDisabled &&
    css`
      opacity: 0.5;
      pointer-events: none;
    `}
`;

export const TitleWrapper = styled.div`
  margin-left: 10px;
  font-size: 16px;
  font-family: 'Lato Regular', sans-serif;
  color: ${colors.black['300']};
`;

export const Track = styled.div<{ isChecked: boolean; width: number }>`
  display: flex;
  align-items: center;
  flex-shrink: 0;
  position: relative;
  border-radius: 22px;
  padding: 4px 10px;
  width: ${props =>
    props.width <= MIN_TOGGLE_WIDTH ? MIN_TOGGLE_WIDTH : props.width}px;
  height: 22px;
  font-family: 'Lato Regular', sans-serif;
  font-size: 11px;
  text-transform: uppercase;
  box-sizing: border-box;
  will-change: background-color, color, justify-content;
  transition: background-color 150ms ease-in, color 150ms ease-in;

  ${props =>
    props.isChecked
      ? css`
          background-color: ${colors.green['300']};
          color: ${colors.white['500']};
          justify-content: flex-start;
        `
      : css`
          background-color: ${colors.gray['400']};
          color: ${colors.black['100']};
          justify-content: flex-end;
        `}

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    height: 22px;
    width: 22px;
    border: 2px solid ${colors.green['500']};
    background-color: ${colors.white['500']};
    border-radius: 50%;
    box-sizing: border-box;
    will-change: transform;
    transition: transform 150ms ease-in;
    transform: ${props => {
      let translateLength = MIN_TOGGLE_WIDTH - 22;
      if (props.width > MIN_TOGGLE_WIDTH) {
        translateLength = props.width - 22;
      }
      return props.isChecked
        ? `translateX(${translateLength}px)`
        : 'translateX(0)';
    }};
  }
`;

export const HiddenInput = styled.input.attrs({ type: 'checkbox' })`
  border: 0;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;
