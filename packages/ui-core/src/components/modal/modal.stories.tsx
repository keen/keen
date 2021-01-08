/* eslint-disable react-hooks/rules-of-hooks */
import * as React from 'react';
import { colors } from '@keen.io/colors';

import { Title } from '../../typography';
import Button from '../button';
import { Modal } from './modal.component';
import ModalHeader from '../modal-header';
import ModalFooter from '../modal-footer';

export default {
  title: 'Components /Modal',
  parameters: {
    component: Modal,
    componentSubtitle: 'Displays modal window',
  },
};

export const basic = () => {
  const [isOpen, setOpen] = React.useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open</Button>
      <Modal isOpen={isOpen} onClose={() => setOpen(false)}>
        {() => (
          <div>
            <ModalHeader onClose={() => setOpen(false)}>Title</ModalHeader>
            <div style={{ padding: '20px 25px', width: '300px' }}>Content</div>
            <ModalFooter>Footer</ModalFooter>
          </div>
        )}
      </Modal>
    </>
  );
};

export const advanced = () => {
  const [isOpen, setOpen] = React.useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open</Button>
      <Modal isOpen={isOpen} onClose={() => setOpen(false)}>
        {() => (
          <div>
            <ModalHeader onClose={() => setOpen(false)}>
              <Title variant="h3" color={colors.red[500]}>
                Title
              </Title>
            </ModalHeader>
            <div style={{ padding: '20px 25px', width: '300px' }}>Content</div>
            <ModalFooter>Footer</ModalFooter>
          </div>
        )}
      </Modal>
    </>
  );
};
