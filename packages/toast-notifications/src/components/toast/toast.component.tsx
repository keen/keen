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

import DismissTimer from '../dismiss-timer';

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

const Toast: FC<Props> = ({
  children,
  appearance,
  onDismiss,
  showDismissButton,
  transitionDuration,
  transitionState,
  autoDismissTimeout,
  autoDismiss,
}) => (
  <motion.div
    initial={{ scale: 0, opacity: 0 }}
    animate={toastMotion[transitionState]}
    transition={{ duration: transitionDuration / 1000 }}
  >
    <Container appearance={appearance}>
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
      {autoDismiss && (
        <DismissTimer
          appearance={appearance}
          dismissTime={autoDismissTimeout / 1000}
        />
      )}
    </Container>
  </motion.div>
);

export default Toast;
