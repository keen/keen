import React, { FC } from 'react';
import { colors } from '@keen.io/colors';
import { Icon } from '@keen.io/icons';

import { Container, Title, Close } from './modal-header.styles';

type Props = {
  /** React children node */
  children: React.ReactNode;
  /** Close event handler */
  onClose?: () => void;
};

const ModalHeader: FC<Props> = ({ children, onClose }) => (
  <Container>
    <Title>{children}</Title>
    {onClose && (
      <Close onClick={onClose} data-testid="modal-close">
        <Icon type="close" width={16} height={16} fill={colors.gray[500]} />
      </Close>
    )}
  </Container>
);

export default ModalHeader;
