import React, { FC } from 'react';
import { colors } from '@keen.io/colors';

import Anchor from '../anchor';
import { Title } from '../../typography';

import { Description, Close, Container, Footer } from './error-modal.styles';

type Props = {
  title?: string;
  /** Offer name */
  children?: React.ReactNode;
  /** Cancel event handler */
  onCancel: () => void;
  /** Cancel button text */
  cancelText?: string;
};

const ErrorModal: FC<Props> = ({
  title,
  children,
  onCancel,
  cancelText = 'Close',
}) => {
  return (
    <Container>
      {title && (
        <Title variant="h3" color={colors.orange['500']}>
          {title}
        </Title>
      )}
      {children && <Description>{children}</Description>}
      <Footer>
        <Close>
          <Anchor onClick={onCancel}>{cancelText}</Anchor>
        </Close>
      </Footer>
    </Container>
  );
};

export default ErrorModal;
