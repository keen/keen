import React, { FC, useState, useEffect } from 'react';

type Props = {
  /** React children nodes */
  children: React.ReactNode;
};

const Delayed: FC<Props> = ({ children }) => {
  const [visible, setVisibility] = useState(false);
  useEffect(() => setVisibility(true), []);

  return <>{visible && children}</>;
};

export default Delayed;
