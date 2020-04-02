import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';
import { colors } from '@keen.io/colors';

export const TrackMotion = styled(motion.div)<{ isDisabled: boolean }>`
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
  cursor: pointer;
  ${props =>
    props.isDisabled &&
    css`
      opacity: 0.5;
      pointer-events: none;
    `}
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
