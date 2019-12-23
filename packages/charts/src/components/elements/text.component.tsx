import React from 'react';

type Props = {
  children: React.ReactNode;
  dx: string | number;
  dy: string | number;
};

const Text = ({ children, dx, dy }: Props) => (
  <text dx={dx} dy={dy}>
    {children}
  </text>
);

export default Text;
