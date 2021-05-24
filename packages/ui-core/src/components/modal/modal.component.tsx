import React, { FC, useState, useCallback, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';

import { MotionContainer, FadeMask } from './modal.styles';

import Card from '../card';

import { KEYS_ARRAY } from './constants';

import { ClosableIndicator } from './types';

const modalMotion = {
  initial: { y: 20, x: '-50%', opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { opacity: 0 },
};

type Props = {
  /** Modal visibility */
  isOpen: boolean;
  /** Children nodes renderer */
  children: (
    setClosable: ClosableIndicator,
    closeHandler: () => void
  ) => React.ReactNode;
  /** Close event handler */
  onClose?: () => void;
  /** Use modal mask indicator */
  useMask?: boolean;
  /** Disable scroll when modal is open */
  blockScrollOnOpen?: boolean;
  /** Adjust modal position based on page scroll Y */
  adjustPositionToScroll?: boolean;
  /** Close modal after click event on fade mask element */
  closeOnFadeMaskClick?: boolean;
};

export const Modal: FC<Props> = ({
  children,
  onClose,
  isOpen,
  useMask = true,
  adjustPositionToScroll = true,
  closeOnFadeMaskClick = true,
  blockScrollOnOpen = false,
}) => {
  const [closeable, setClosable] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  const closableIndicator = useCallback(
    (isClosable: boolean) => setClosable(isClosable),
    []
  );

  const closeHandler = useCallback(() => {
    if (closeable && onClose) onClose();
  }, [closeable, onClose]);

  const keyboardHandler = useCallback(
    (keyEvent: KeyboardEvent) => {
      if (
        KEYS_ARRAY.includes(keyEvent.charCode) ||
        KEYS_ARRAY.includes(keyEvent.keyCode)
      ) {
        keyEvent.preventDefault();
      }
      if ((keyEvent.charCode || keyEvent.keyCode) === 27) {
        closeHandler();
      }
    },
    [onClose]
  );

  const preventDefault = useCallback((e: MouseEvent) => {
    e.preventDefault();
  }, []);

  useEffect(() => {
    if (blockScrollOnOpen && isOpen) {
      document.addEventListener('wheel', preventDefault, { passive: false });
      document.addEventListener('mousewheel', preventDefault, {
        passive: false,
      });
      document.addEventListener('DOMMouseScroll', preventDefault, {
        passive: false,
      });
      document.addEventListener('keydown', keyboardHandler, false);
    }

    return () => {
      document.removeEventListener('wheel', preventDefault, false);
      document.removeEventListener('mousewheel', preventDefault, false);
      document.removeEventListener('DOMMouseScroll', preventDefault, false);
      document.removeEventListener('keydown', keyboardHandler, false);
    };
  }, [isOpen]);

  useEffect(() => {
    if (adjustPositionToScroll) {
      setScrollY(window.scrollY);
    }
  }, [adjustPositionToScroll, window.scrollY]);

  const showMask = useMask && isOpen;

  return (
    <>
      {showMask && (
        <FadeMask
          onClick={closeOnFadeMaskClick ? closeHandler : null}
          data-testid="fade-mask"
        />
      )}
      <AnimatePresence>
        {isOpen && (
          <MotionContainer
            {...modalMotion}
            scrollY={scrollY}
            data-testid="modal-container"
          >
            <Card hasPadding={false}>
              {children(closableIndicator, closeHandler)}
            </Card>
          </MotionContainer>
        )}
      </AnimatePresence>
    </>
  );
};

export default Modal;
