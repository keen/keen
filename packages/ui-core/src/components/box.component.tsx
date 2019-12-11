import React from 'react';

type Props = {
  children: React.ReactNode;
};

const Box = ({ children }: Props) => <div>{children}</div>;

export default Box;
