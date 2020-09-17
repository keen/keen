import styled, { css } from 'styled-components';
import { transparentize } from 'polished';
import { motion } from 'framer-motion';
import { colors } from '@keen.io/colors';

export const Container = styled.div<{ isActive?: boolean }>`
  position: relative;
  background: ${transparentize(0.9, colors.white[500])};
  border: solid 1px ${colors.gray[300]};
  border-radius: 2px;

  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;

  ${props =>
    props.isActive &&
    css`
      background: ${transparentize(0.7, colors.blue[100])};
    `}

  &:hover {
    background: ${transparentize(0.7, colors.blue[100])};
  }

  transition: background 0.2s linear;
`;

export const MotionChartSettings = styled(motion.div)`
  padding: 10px;
  border: solid 1px ${colors.gray[200]};
  background: ${colors.white[500]};

  position: absolute;
  top: 0;
  transform: translateX(100%);
`;

export const SettingsContainer = styled.div`
  height: 14px;
  width: 14px;
  display: flex;
  aling-items: center;
  justify-content: center;
  position: absolute;
  bottom: 0;
  right: 0;
`;
