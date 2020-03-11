import React from 'react';
declare type Props = {
  x: number;
  y: number;
  color: string;
};
export declare const markMotion: {
  initial: {
    opacity: number;
    scale: number;
  };
  animate: {
    opacity: number;
    scale: number;
  };
  transition: {
    duration: number;
  };
  exit: {
    opacity: number;
    scale: number;
  };
};
declare const _default: React.MemoExoticComponent<({
  color,
  x,
  y,
}: Props) => JSX.Element>;
export default _default;
