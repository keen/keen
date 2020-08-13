import React, { FC } from 'react';
import { ToastProps } from 'react-toast-notifications';

import { Container } from './toast.styles';

type Props = {
  /** Children nodes */
  children: React.ReactNode;
  /** Show dismiss button indicator */
  showDismissButton?: boolean;
} & ToastProps;

const Toast: FC<Props> = ({
  children,
  appearance,
  onDismiss = null,
  showDismissButton,
  ...rest
}) => {
  console.log(onDismiss, 'sas', rest);

  return (
    <Container appearance={appearance}>
      {children}
      {showDismissButton ? (
        <div onClick={() => onDismiss()}>Dismiss</div>
      ) : null}
    </Container>
  );
};

export default Toast;
