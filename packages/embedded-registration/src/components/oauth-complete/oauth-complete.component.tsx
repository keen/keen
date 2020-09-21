import React, { FC, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Title, FadeLoader } from '@keen.io/ui-core';
import { colors } from '@keen.io/colors';

import { Container, Content } from './oauth-complete.styles';
import text from './text.json';

import { SignupError } from '../../types';

type Props = {
  /** Sign up event handler */
  onSignup: (
    userToken: string
  ) => Promise<{ organizationId: string } | { errors: Record<string, string> }>;
  /** Success event handler */
  onSuccess: (organizationId: string, companyDisclaimer: boolean) => void;
  /** Error event handler */
  onError: (error: { status: number; message: string }) => void;
};

const OAuthComplete: FC<Props> = ({ onSignup, onSuccess, onError }) => {
  const locationParams = useLocation();

  useEffect(() => {
    const userToken = locationParams.token;
    onSignup({ userToken })
      .then(() => {
        onSuccess('companyName', false);
      })
      .catch(({ status, message }: SignupError) => {
        onError({ status, message });
      });
  }, [onError, onSuccess]);

  return (
    <Container>
      <Title variant="h3" color={colors.blue['500']}>
        {text.title}
      </Title>
      <Content>
        <FadeLoader height={60} width={65} color={colors.blue['500']} />
      </Content>
    </Container>
  );
};

export default OAuthComplete;
