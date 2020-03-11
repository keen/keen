import React from 'react';
import { Typography } from '../types';
declare type Props = {
  children: React.ReactNode;
  truncate?: boolean;
} & Typography;
declare const Text: ({ children, truncate, ...props }: Props) => JSX.Element;
export default Text;
