import React, { FC } from 'react';
import Loader from '../loader';
import { Title } from '../../typography';
import { colors } from '@keen.io/colors';

import { Heading, Container } from './loading-screen.styles';

type Props = {
  title?: string;
};

const LoadingScreen: FC<Props> = ({ title }) => (
  <Container>
    <Loader width={90} height={90} fill={colors.blue['500']} />
    {title && (
      <Heading>
        <Title variant="h3" color={colors.black['500']}>
          {title}
        </Title>
      </Heading>
    )}
  </Container>
);

export default LoadingScreen;
