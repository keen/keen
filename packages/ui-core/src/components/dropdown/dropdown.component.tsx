import React, { FC } from 'react';
import { AnimatePresence, MotionProps } from 'framer-motion';

import { Wrapper, Container } from './dropdown.styles';

type Props = {
  /** Open state indicator */
  isOpen: boolean;
  /** React children nodes */
  children: React.ReactNode;
  /** Expand container to full width */
  fullWidth?: boolean;
  /** Motion settings */
  motion?: MotionProps;
};

const dropdownMotion: MotionProps = {
  initial: { opacity: 0, top: 20 },
  animate: { opacity: 1, top: 2 },
  exit: { opacity: 0, top: 30 },
};

export const Dropdown: FC<Props> = ({
  isOpen,
  children,
  fullWidth = true,
  motion = dropdownMotion,
}) => (
  <Wrapper>
    <AnimatePresence>
      {isOpen && (
        <Container {...motion} fullWidth={fullWidth}>
          {children}
        </Container>
      )}
    </AnimatePresence>
  </Wrapper>
);

export default Dropdown;
