import React, { FC } from 'react';
import { colors } from '@keen.io/colors';

import { Title } from '../../typography';
import Button from '../button';
import Anchor from '../anchor';

import { Description, Close, Container, Footer } from './confirmation.styles';

type Props = {
  title?: string;
  /** Offer name */
  children?: React.ReactNode;
  /** Confirm event handler */
  onConfirm: () => void;
  /** Cancel event handler */
  onCancel: () => void;
  /** Confirmation button text */
  confirmText?: string;
  /** Cancel button text */
  cancelText?: string;
};

const Confirmation: FC<Props> = ({
  title,
  children,
  onCancel,
  onConfirm,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
}) => {
  return (
    <Container>
      {title && (
        <Title variant="h3" color={colors.black['500']}>
          {title}
        </Title>
      )}
      {children && <Description>{children}</Description>}
      <Footer>
        <Button variant="secondary" onClick={onConfirm}>
          {confirmText}
        </Button>
        <Close>
          <Anchor onClick={onCancel}>{cancelText}</Anchor>
        </Close>
      </Footer>
    </Container>
  );
};

export default Confirmation;
