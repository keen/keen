import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { UI_LAYERS } from '../../constants';

type Props = {
  children: React.ReactNode;
  zIndex?: number;
};

export const DynamicPortal = ({
  children,
  zIndex,
}: Props): React.ReactPortal => {
  const el = useRef(null);
  const [, setIsBootstrapped] = useState(false); // since ref value is set as side effect, we need to call setState in order to force react to rerender component
  useEffect(() => {
    el.current = document.createElement('div');
    el.current.style.cssText = `z-index: ${zIndex || UI_LAYERS.tooltip};
                                position: absolute;
                                top: 0;
                                left: 0;
                                width: 100%;
                                `;
    el.current.setAttribute('data-testid', 'dynamic-portal');
    document.body.appendChild(el.current);
    setIsBootstrapped(true);
    return () => {
      document.body.removeChild(el.current);
    };
  }, [zIndex]);
  return el.current ? createPortal(children, el.current) : null;
};
