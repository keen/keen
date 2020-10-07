import React, { FC, useRef, useEffect, useState } from 'react';

import { Wrapper } from './scroll-wrapper.styles';

type Props = {
  /** React children nodes */
  children: React.ReactNode;
};

export const ScrollWrapper: FC<Props> = ({ children }) => {
  const wrapper = useRef(null);
  const [maxHeight, setMaxHeight] = useState(0);

  useEffect(() => {
    const { offsetHeight } = document.body;
    const { scrollY, innerHeight } = window;
    const { top, height } =
      wrapper.current && wrapper.current.getBoundingClientRect();
    const topPosition = top + scrollY;
    const fullHeight = offsetHeight > innerHeight ? offsetHeight : innerHeight;
    if (height > fullHeight - topPosition)
      setMaxHeight(fullHeight - topPosition);
  }, [wrapper]);

  return (
    <Wrapper ref={wrapper} maxHeight={maxHeight}>
      {children}
    </Wrapper>
  );
};

export default ScrollWrapper;
