import React, { forwardRef } from 'react';
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
  /** Position relative to document */
  positionRelativeToDocument?: boolean;
};

const dropdownMotion: MotionProps = {
  initial: { opacity: 0, top: 20 },
  animate: { opacity: 1, top: 2 },
  exit: { opacity: 0, top: 30 },
};

export const Dropdown = forwardRef<HTMLDivElement, Props>(
  (
    {
      isOpen,
      children,
      fullWidth = true,
      motion = dropdownMotion,
      positionRelativeToDocument = true,
    },
    ref
  ) => (
    <Wrapper isRelative={positionRelativeToDocument}>
      <AnimatePresence>
        {isOpen && (
          <Container ref={ref} {...motion} fullWidth={fullWidth}>
            {children}
          </Container>
        )}
      </AnimatePresence>
    </Wrapper>
  )
);

Dropdown.displayName = 'Dropdown';

export default Dropdown;
