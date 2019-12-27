import React from 'react';

export enum Socket {
  LEGEND = 'LegendSocket',
  CONTENT = 'ContentSocket',
}

export const getLegendJSX = (component: JSX.Element) =>
  component.type.name === Socket.LEGEND;

export const LegendSocket = ({ children }: { children: React.ReactNode }) => (
  <>{children}</>
);

export const getContentJSX = (component: JSX.Element) =>
  component.type.name === Socket.CONTENT;

export const ContentSocket = ({ children }: { children: React.ReactNode }) => (
  <>{children}</>
);
