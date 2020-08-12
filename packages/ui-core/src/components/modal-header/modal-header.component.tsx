import React, { FC } from 'react';
import { colors } from '@keen.io/colors';
import { Icon } from '@keen.io/icons';

import { Container, Title, Close } from './modal-header.styles';

type Props = {
  /** Modal title */
  title: string;
  /** Close event handler */
  onClose?: () => void;
};

const ModalHeader: FC<Props> = ({ title, onClose }) => (
  <Container>
    <Title>{title}</Title>
    {onClose && (
      <Close onClick={onClose} data-testid="modal-close">
        <Icon type="close" width={16} height={16} fill={colors.gray[500]} />
      </Close>
    )}
  </Container>
);

export default ModalHeader;
