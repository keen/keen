/* eslint-disable react-hooks/rules-of-hooks */
import * as React from 'react';

import Button from '../button';
import { Modal } from './modal.component';

import { Title } from '../../typography';

export default {
  title: 'Components|Modal',
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
      <Modal
        isOpen={isOpen}
        onClose={() => setOpen(false)}
        renderTitle={() => <Title variant="h3">Title</Title>}
      >
        {() => <div>Modal content</div>}
      </Modal>
    </>
  );
};
