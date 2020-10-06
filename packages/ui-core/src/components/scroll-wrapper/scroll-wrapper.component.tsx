import React, { FC, useRef, useEffect, useState } from 'react';

import { Wrapper } from './scroll-wrapper.styles';

type Props = {
  /** React children nodes */
  children: React.ReactNode;
};

export const ScrollWrapper: FC<Props> = ({ children }) => {
  const { innerHeight } = window;
  const wrapper = useRef(null);
  const [maxHeight, setMaxHeight] = useState(0);

  useEffect(() => {
    const { top, height } =
      wrapper.current && wrapper.current.getBoundingClientRect();
    if (height > innerHeight - top) setMaxHeight(innerHeight - top);
  }, [wrapper]);

  return (
    <Wrapper ref={wrapper} maxHeight={maxHeight}>
      {children}
    </Wrapper>
  );
};

export default ScrollWrapper;
