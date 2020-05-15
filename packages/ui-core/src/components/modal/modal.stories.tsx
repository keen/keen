/* eslint-disable react-hooks/rules-of-hooks */
import * as React from 'react';

import Button from '../button';
import { Modal } from './modal.component';

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
      <Modal isOpen={isOpen} onClose={() => setOpen(false)}>
        {() => <div>Modal content</div>}
      </Modal>
    </>
  );
};
