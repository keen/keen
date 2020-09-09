import styled from 'styled-components';
import { variant } from 'styled-system';
import { AppearanceTypes } from 'react-toast-notifications';
import { motion } from 'framer-motion';
import { colors } from '@keen.io/colors';

const progressVariants = {
  prop: 'appearance',
  variants: {
    error: {
      background: colors.red[100],
    },
    info: {
      background: colors.lightBlue[400],
    },
    success: {
      background: colors.green[100],
    },
  },
};

export const Progress = styled(motion.div)<{
  appearance: AppearanceTypes;
}>`
  height: 5px;
  ${variant(progressVariants)};
`;
