import React from 'react';

export enum Socket {
  LEGEND = 'LegendSocket',
  CONTENT = 'ContentSocket',
  TITLE = 'TitleSocket',
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

export const getTitleJSX = (component: JSX.Element) =>
  component.type.name === Socket.TITLE;

export const TitleSocket = ({ children }: { children: React.ReactNode }) => (
  <>{children}</>
);
