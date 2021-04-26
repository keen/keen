import React, { useEffect, useRef } from 'react';
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
  useEffect(() => {
    el.current = document.createElement('div');
    el.current.id = 'dynamic-portal';
    el.current.style.cssText = `z-index: ${zIndex || UI_LAYERS.tooltip};
                                position: absolute;
                                top: 0;
                                left: 0`;
    el.current.setAttribute('data-testid', 'dynamic-portal');
    document.body.appendChild(el.current);
    return () => {
      document.body.removeChild(el.current);
    };
  }, [zIndex]);
  return el.current ? createPortal(children, el.current) : null;
};
