import React, { FC, useRef, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import { Container } from './dropdown-list-container.styles';

type Props = {
  /** Set scroll position on active element */
  scrollToActive: boolean;
  /** Set scroll position on active element */
  children: (activeItemRef: React.MutableRefObject<any>) => React.ReactNode;
  /** Maximum container height */
  maxHeight?: number;
  /** Enable scroll shadow */
  scrollShadow?: boolean;
};

const DropdownListContainer: FC<Props> = ({
  children,
  scrollToActive,
  maxHeight = 200,
  scrollShadow = false,
}) => {
  const containerRef = useRef(null);
  const itemRef = useRef(null);

  const [inViewRefTop, inViewTop] = useInView();
  const [inViewRefBottom, inViewBottom] = useInView();

  useEffect(() => {
    if (scrollToActive && itemRef.current) {
      const containerOffsetTop = containerRef.current.offsetTop;
      const { offsetTop, offsetHeight } = itemRef.current;

      containerRef.current.scrollTop =
        offsetTop - offsetHeight - containerOffsetTop;
    }
  }, []);

  return (
    <Container
      ref={containerRef}
      style={{ maxHeight: `${maxHeight}px` }}
      overflowTop={scrollShadow && !inViewTop}
      overflowBottom={scrollShadow && !inViewBottom}
    >
      <div ref={inViewRefTop}></div>
      {children(itemRef)}
      <div ref={inViewRefBottom}></div>
    </Container>
  );
};

export default DropdownListContainer;
