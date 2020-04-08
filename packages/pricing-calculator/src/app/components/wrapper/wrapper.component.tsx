import React, { FC } from 'react';
import { Card } from '@keen.io/ui-core';

type Props = {
  children: React.ReactNode;
  useCard: boolean;
};

const Wrapper: FC<Props> = ({ children, useCard }) => {
  if (useCard) return <Card>{children}</Card>;
  return <>{children}</>;
};

export default Wrapper;
