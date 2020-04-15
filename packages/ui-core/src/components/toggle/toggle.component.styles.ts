import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';
import { transparentize } from 'polished';
import { colors } from '@keen.io/colors';

export const ToggleWrapper = styled.div<{ isDisabled: boolean }>`
  width: 60px;
  height: 22px;
  position: relative;
  cursor: pointer;

  ${props =>
    props.isDisabled &&
    css`
      opacity: 0.5;
      pointer-events: none;
    `}
`;

export const Track = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 60px;
  height: 22px;
  border-radius: 22px;
  background-color: ${transparentize(0.3, colors.gray['400'])};
  overflow: hidden;
`;

export const TrackMotion = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 60px;
  height: 22px;
  border-radius: 22px;
  background: ${colors.green['300']};
  box-sizing: border-box;
  transform-origin: left center;
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

export const SwitcherMotion = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  height: 22px;
  width: 22px;
  border: 2px solid ${colors.green['500']};
  background-color: ${colors.white['500']};
  border-radius: 50%;
  box-sizing: border-box;
`;
