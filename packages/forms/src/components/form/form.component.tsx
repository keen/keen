import React, { FC } from 'react';

type Props = {
  onSubmit: () => void;
  isSubmitting: boolean;
  children?: React.ReactNode;
};

const Form: FC<Props> = ({ children, isSubmitting, onSubmit }) => (
  <form
    onKeyDown={(keyEvent: React.KeyboardEvent<HTMLFormElement>) => {
      if ((keyEvent.charCode || keyEvent.keyCode) === 13) {
        keyEvent.preventDefault();
        if (!isSubmitting) onSubmit();
      }
    }}
  >
    {children}
  </form>
);

export default Form;
