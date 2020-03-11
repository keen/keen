import React from 'react';
declare type Props = {
  children: (width: number, height: number) => React.ReactNode;
  mountTreshold?: number;
};
declare const ResponsiveWrapper: ({
  children,
  mountTreshold,
}: Props) => JSX.Element;
export default ResponsiveWrapper;
