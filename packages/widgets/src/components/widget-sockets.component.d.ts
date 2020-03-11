import React from 'react';
export declare enum Socket {
  LEGEND = 'LegendSocket',
  CONTENT = 'ContentSocket',
  TITLE = 'TitleSocket',
}
export declare const getLegendJSX: (component: JSX.Element) => boolean;
export declare const LegendSocket: ({
  children,
}: {
  children: React.ReactNode;
}) => JSX.Element;
export declare const getContentJSX: (component: JSX.Element) => boolean;
export declare const ContentSocket: ({
  children,
}: {
  children: React.ReactNode;
}) => JSX.Element;
export declare const getTitleJSX: (component: JSX.Element) => boolean;
export declare const TitleSocket: ({
  children,
}: {
  children: React.ReactNode;
}) => JSX.Element;
