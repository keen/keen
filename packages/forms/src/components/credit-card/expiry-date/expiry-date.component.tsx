import React, { FC } from 'react';
import { Label, FakeInput, Error } from '@keen.io/ui-core';

import ErrorContainer from '../../error-container';

import {
  Container,
  IFrameContainer,
  FieldWrapper,
  Separator,
} from './expiry-date.styles';

type Props = {
  /* Iframe month HTML element identifer */
  iframeMonthId: string;
  /* Iframe year HTML element identifer */
  iframeYearId: string;
  /* HTML label text */
  label?: string;
  /** Error message */
  error?: string;
};

const ExpiryDate: FC<Props> = ({
  iframeMonthId,
  iframeYearId,
  label,
  error,
}) => {
  const hasError = !!error;
  return (
    <>
      {label && <Label hasError={hasError}>{label}</Label>}
      <Container>
        <FakeInput hasError={hasError}>
          <FieldWrapper>
            <IFrameContainer id={iframeMonthId} />
          </FieldWrapper>
        </FakeInput>
        <Separator>/</Separator>
        <FakeInput hasError={hasError}>
          <FieldWrapper>
            <IFrameContainer id={iframeYearId} />
          </FieldWrapper>
        </FakeInput>
      </Container>
      <ErrorContainer>
        {hasError && <Error data-error="card-expire">{error}</Error>}
      </ErrorContainer>
    </>
  );
};

export default ExpiryDate;
