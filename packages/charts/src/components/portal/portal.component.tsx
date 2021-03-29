import React from 'react';
import { createPortal } from 'react-dom';

export const Portal = ({
  children,
  portalRef,
}: {
  children: React.ReactNode;
  portalRef: Element;
}) => createPortal(children, portalRef);
