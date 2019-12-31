import React from 'react';

type Props = {
  children: React.ReactNode;
};

const StoryWrapper = ({ children }: Props) => (
  <div style={{ padding: ' 0 40px' }}>{children}</div>
);

export default StoryWrapper;
