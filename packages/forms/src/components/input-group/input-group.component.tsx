import React from 'react';
import { useField } from 'formik';

import { Input, Label, Error } from '@keen.io/ui-core';

import ErrorContainer from '../error-container';

export type Props = {
  /** Field name */
  name: string;
  /** Label HTML element content */
  label?: string;
  /** Input HTML element type */
  type?: string;
  /** Icon render handler */
  renderIcon?: () => JSX.Element;
};

export const InputGroup = ({
  label,
  renderIcon,
  type = 'text',
  ...props
}: Props) => {
  const [field, meta] = useField(props);
  const hasError = !!(meta.touched && meta.error);

  return (
    <>
      {label && (
        <Label hasError={hasError} htmlFor={props.name}>
          {label}
        </Label>
      )}
      <Input
        hasError={hasError}
        type={type}
        id={props.name}
        renderIcon={renderIcon}
        {...field}
      />
      <ErrorContainer>
        {hasError && <Error data-error={props.name}>{meta.error}</Error>}
      </ErrorContainer>
    </>
  );
};

export default InputGroup;
