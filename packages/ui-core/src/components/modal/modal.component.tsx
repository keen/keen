import React, { FC, useState, useCallback, useEffect } from 'react';
import { transparentize } from 'polished';
import { AnimatePresence } from 'framer-motion';
import { colors } from '@keen.io/colors';
import { Icon } from '@keen.io/icons';

import { MotionContainer, FadeMask, Close, Header } from './modal.styles';

import Card from '../card';

import { ClosableIndicator } from './types';

const modalMotion = {
  initial: { y: 20, x: '-50%', opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { opacity: 0 },
};

type Props = {
  /** Title */
  renderTitle?: () => React.ReactNode;
  /** Modal visibility */
  isOpen: boolean;
  /** Children nodes renderer */
  children: (setClosable: ClosableIndicator) => React.ReactNode;
  /** Close event handler */
  onClose?: () => void;
  /** Use modal mask indicator */
  useMask?: boolean;
  /** Allow scroll when modal is open */
  blockScrollOnOpen?: boolean;
};

export const Modal: FC<Props> = ({
  renderTitle,
  children,
  onClose,
  isOpen,
  useMask = true,
  blockScrollOnOpen = true,
}) => {
  const [closeable, setClosable] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  const closableIndicator = useCallback(
    (isClosable: boolean) => setClosable(isClosable),
    []
  );

  const closeHandler = useCallback(() => {
    if (closeable && onClose) onClose();
  }, [closeable]);

  useEffect(() => {
    const preventDefault = (e: MouseEvent) => {
      e.preventDefault();
    };

    const keysArray = [33, 34, 38, 40];

    const keyboardHandler = (keyEvent: KeyboardEvent) => {
      if (
        keysArray.includes(keyEvent.charCode) ||
        keysArray.includes(keyEvent.keyCode)
      ) {
        keyEvent.preventDefault();
      }
      if ((keyEvent.charCode || keyEvent.keyCode) === 27) {
        closeHandler();
      }
    };

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
    setScrollY(window.scrollY);
  }, [window.scrollY]);

  const showMask = useMask && isOpen;

  return (
    <>
      {showMask && <FadeMask onClick={closeHandler} />}
      <AnimatePresence>
        {isOpen && (
          <MotionContainer {...modalMotion} scrollY={scrollY}>
            <Card>
              <Header>
                <div>{renderTitle && renderTitle()}</div>
                <Close onClick={closeHandler}>
                  <Icon
                    type="close"
                    fill={transparentize(0.7, colors.blue['500'])}
                  />
                </Close>
              </Header>
              {children(closableIndicator)}
            </Card>
          </MotionContainer>
        )}
      </AnimatePresence>
    </>
  );
};

export default Modal;
