import React, { FC } from 'react';

import Button from '../button';
import Anchor from '../anchor';

import { Description, Close, Container, Footer } from './modal-content.styles';

type Props = {
  /** Children */
  children?: React.ReactNode;
  /** Confirm event handler */
  onConfirm?: () => void;
  /** Cancel event handler */
  onCancel: () => void;
  /** Confirmation button text */
  confirmText?: string;
  /** Cancel button text */
  cancelText?: string;
};

const ModalContent: FC<Props> = ({
  children,
  onCancel,
  onConfirm,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
}) => {
  return (
    <Container>
      {children && <Description>{children}</Description>}
      <Footer>
        {onConfirm && (
          <Button variant="secondary" onClick={onConfirm}>
            {confirmText}
          </Button>
        )}
        <Close>
          <Anchor onClick={onCancel}>{cancelText}</Anchor>
        </Close>
      </Footer>
    </Container>
  );
};

export default ModalContent;
