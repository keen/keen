import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';
import { transparentize } from 'polished';
import { colors } from '@keen.io/colors';

import { ToggleVariant } from './types';

export const ToggleWrapper = styled.div<{ isDisabled: boolean }>`
  width: 60px;
  height: 22px;
  position: relative;
  cursor: pointer;

  ${(props) =>
    props.isDisabled &&
    css`
      opacity: 0.5;
      pointer-events: none;
    `};
`;

export const Track = styled.div<{ variant: ToggleVariant }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 60px;
  height: 22px;
  border-radius: 22px;
  overflow: hidden;

  ${(props) =>
    props.variant === 'primary' &&
    css`
      background-color: ${transparentize(0.3, colors.gray['400'])};
    `};

  ${(props) =>
    props.variant === 'secondary' &&
    css`
      background-color: ${colors.gray['500']};
    `};

  ${(props) =>
    props.variant === 'darkBlue' &&
    css`
      background-color: ${transparentize(0.4, colors.blue['200'])};
    `};
`;

export const TrackMotion = styled(motion.div)<{ variant: ToggleVariant }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 60px;
  height: 22px;
  border-radius: 22px;
  box-sizing: border-box;
  transform-origin: left center;

  ${(props) =>
    props.variant === 'primary' &&
    css`
      background-color: ${colors.green['300']};
    `};

  ${(props) =>
    props.variant === 'secondary' &&
    css`
      background-color: ${colors.lightBlue['500']};
    `};

  ${(props) =>
    props.variant === 'darkBlue' &&
    css`
      background-color: ${colors.lightBlue['500']};
    `};
`;

export const LabelMotion = styled(motion.div)`
  position: relative;
  width: 60px;
  height: 22px;
  padding: 4px 10px;
  border-radius: 22px;
  display: flex;
  align-items: center;
  font-family: 'Lato Regular', sans-serif;
  font-size: 11px;
  text-transform: uppercase;
  box-sizing: border-box;
`;

export const SwitcherMotion = styled(motion.div)<{ variant: ToggleVariant }>`
  position: absolute;
  top: 0;
  left: 0;
  height: 22px;
  width: 22px;
  border-radius: 50%;
  box-sizing: border-box;

  ${(props) =>
    props.variant === 'primary' &&
    css`
      background-color: ${colors.white['500']};
      border: 2px solid ${colors.green['500']};
    `};

  ${(props) =>
    props.variant === 'secondary' &&
    css`
      background-color: ${colors.gray['100']};
      border: 2px solid ${colors.blue['300']};
    `};

  ${(props) =>
    props.variant === 'darkBlue' &&
    css`
      background-color: ${colors.white['500']};
      border: 2px solid ${colors.white['500']};
    `};
`;
