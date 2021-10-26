import React, { FC } from 'react';
import { motion, TargetAndTransition } from 'framer-motion';
import { ToastProps, TransitionState } from 'react-toast-notifications';

import {
  Container,
  ContentContainer,
  Content,
  DismissButton,
} from './toast.styles';
import text from './text.json';

type Props = {
  /** Children nodes */
  children: React.ReactNode;
  /** Show dismiss button indicator */
  showDismissButton?: boolean;
} & ToastProps;

const toastMotion: Record<TransitionState, TargetAndTransition> = {
  entering: { scale: 1, opacity: 1 },
  entered: {},
  exiting: { opacity: 0, scale: 0.4 },
  exited: {},
};

const toastDuration: Record<TransitionState, number> = {
  entering: 800,
  entered: 0,
  exiting: 1200,
  exited: 0,
};

const Toast: FC<Props> = ({
  children,
  appearance,
  onDismiss,
  showDismissButton,
  transitionDuration,
  transitionState,
}) => (
  <motion.div
    initial={{ scale: 0, opacity: 0 }}
    animate={toastMotion[transitionState]}
    transition={{
      duration: transitionDuration / toastDuration[transitionState],
    }}
  >
    <Container appearance={appearance} onClick={() => onDismiss()}>
      <ContentContainer>
        <Content>{children}</Content>
        {showDismissButton && (
          <DismissButton
            data-testid="dismiss-button"
            role="button"
            onClick={() => onDismiss()}
          >
            {text.dismissButton}
          </DismissButton>
        )}
      </ContentContainer>
    </Container>
  </motion.div>
);

export default Toast;
