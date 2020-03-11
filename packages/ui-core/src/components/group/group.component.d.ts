import React from 'react';
declare type Props = {
  children: React.ReactNode;
  groupNode?: React.FunctionComponent<{
    children: React.ReactNode;
  }>;
  chunks?: number;
};
declare const Group: ({ children, groupNode, chunks }: Props) => JSX.Element;
export default Group;
