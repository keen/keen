import React, { FC, useState, useCallback, useEffect } from 'react';
import { transparentize } from 'polished';
import { AnimatePresence } from 'framer-motion';
import { colors } from '@keen.io/colors';
import { Icon } from '@keen.io/icons';

import { MotionContainer, FadeMask, Close } from './modal.styles';

import Card from '../card';

import { ClosableIndicator } from './types';

const modalMotion = {
  initial: { y: 20, x: '-50%', opaicty: 0 },
  animate: { y: 0, opaicty: 1 },
  exit: { opacity: 0 },
};

type Props = {
  /** Modal visibility */
  isOpen: boolean;
  /** Children nodes renderer */
  children: (setClosable: ClosableIndicator) => React.ReactNode;
  /** Close event handler */
  onClose?: () => void;
  /** Use modal mask indicator */
  useMask?: boolean;
};

export const Modal: FC<Props> = ({
  children,
  onClose,
  isOpen,
  useMask = true,
}) => {
  const [closeable, setClosable] = useState(true);
  const closableIndicator = useCallback(
    (isClosable: boolean) => setClosable(isClosable),
    []
  );

  const closeHandler = useCallback(() => {
    if (closeable && onClose) onClose();
  }, [closeable]);

  useEffect(() => {
    const keyboardHandler = (keyEvent: KeyboardEvent) => {
      if ((keyEvent.charCode || keyEvent.keyCode) === 27) {
        closeHandler();
      }
    };

    document.addEventListener('keydown', keyboardHandler, false);

    return () => {
      document.removeEventListener('keydown', keyboardHandler, false);
    };
  }, []);

  const showMask = useMask && isOpen;

  return (
    <>
      {showMask && <FadeMask onClick={closeHandler} />}
      <AnimatePresence>
        {isOpen && (
          <MotionContainer {...modalMotion}>
            <Card>
              <Close onClick={closeHandler}>
                <Icon
                  type="close"
                  fill={transparentize(0.7, colors.blue['500'])}
                />
              </Close>
              {children(closableIndicator)}
            </Card>
          </MotionContainer>
        )}
      </AnimatePresence>
    </>
  );
};

export default Modal;
