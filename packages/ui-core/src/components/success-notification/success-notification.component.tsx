import React, { FC } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Title } from '../../typography';
import { Icon } from '@keen.io/icons';
import { colors } from '@keen.io/colors';

import { Heading, Container } from './success-notification.styles';

const iconMotion = {
  initial: { opacity: 0, scale: 0.3 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0 },
  transition: { delay: 0.4, ease: 'easeInOut' },
};

type Props = {
  children?: React.ReactNode;
};

const SuccessNotification: FC<Props> = ({ children }) => (
  <Container>
    <AnimatePresence>
      <motion.div {...iconMotion}>
        <Icon type="check" width={55} height={55} fill={colors.green['400']} />
      </motion.div>
    </AnimatePresence>
    {children && (
      <Heading>
        <Title variant="h3" color={colors.green['400']}>
          {children}
        </Title>
      </Heading>
    )}
  </Container>
);

export default SuccessNotification;
